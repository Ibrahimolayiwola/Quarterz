import { collection, getDocs, limit, orderBy, query, where } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { dataBase } from '../config/firebase'
import ListingObject from '../components/ListingObject'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Mousewheel, Autoplay, Navigation } from "swiper/modules";

const FeaturedListing = () => {
  const [featuredListing, setFeaturedListing] = useState([]);

  useEffect(() => {
    const OfferQuery = {
      firstProp: "offer",
      secondProp: true,
    };
    const rentQuery = {
      firstProp: "type",
      secondProp: "rent",
    };
    const listing = [];
    const fetchListing = async ({ firstProp, secondProp }) => {
      const docRef = collection(dataBase, "listings");
      const q = query(
        docRef,
        where(firstProp, "==", secondProp),
        orderBy("timeStamp", "desc"),
        limit(3)
      );

      try {
        const querySnap = await getDocs(q);
        querySnap.forEach((doc) => {
          listing.push({
            id: doc.id,
            data: doc.data(),
          });
        });

        setFeaturedListing(listing);
      } catch (error) {
        console.error(error);
      }
    };

    fetchListing(rentQuery);
    fetchListing(OfferQuery);
    // handleLoading()
  }, []);
  return (
    <>
      <Swiper
        breakpoints={{
          0: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          575: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
          1200: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
        }}
        slidesPerView={1}
        spaceBetween={10}
        pagination={{
          el: ".property-pagination",
          type: "bullets",
          clickable: true,
        }}
        mousewheel={true}
        modules={[Pagination, Mousewheel]}
        className=""
      >
        {featuredListing &&
          featuredListing.map(({ id, data }) => (
            <SwiperSlide className="" key={id}>
              <ListingObject listing={data} id={id} />
            </SwiperSlide>
          ))}
          <p className='property-pagination text-center  mt-8  flex items-center justify-center gap-1'></p>
      </Swiper>
      
    </>
  );
};

export default FeaturedListing
