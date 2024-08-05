import { collection, getDocs, limit, orderBy, query, where } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { dataBase } from '../config/firebase'
import ListingObject from "../components/PropertyItem";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Mousewheel, Autoplay, Navigation } from "swiper/modules";

const FeaturedListing = () => {
  const [featuredListing, setFeaturedListing] = useState([]);

  useEffect(() => {
    const property = [];
    const fetchListing = async () => {
      const docRef = collection(dataBase, "properties");
      const q = query(
        docRef,
        where("type", "==", "sale"),
        orderBy("timeStamp", "desc"),
        limit(3)
      );

      try {
        const querySnap = await getDocs(q);
        if (querySnap.empty) {
          return;
        }
        querySnap.forEach((doc) => {
          property.push({
            id: doc.id,
            data: doc.data(),
          });
        });

        setFeaturedListing(property);
      } catch (error) {
        console.error(error);
      }
    };
    fetchListing();
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
          el: ".pagination",
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
              <ListingObject property={data} id={id} />
            </SwiperSlide>
          ))}
        <p className="pagination text-center  mt-8  flex items-center justify-center gap-1"></p>
      </Swiper>
    </>
  );
};

export default FeaturedListing
