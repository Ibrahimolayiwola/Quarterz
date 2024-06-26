import React, { useEffect, useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Mousewheel, Autoplay, Navigation } from "swiper/modules";
import { getAuth } from "firebase/auth";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { dataBase } from "../config/firebase.js";
import Moment from "react-moment";
import { CiLocationOn } from "react-icons/ci";
import { RiDeleteBin5Line } from "react-icons/ri";
import { MdOutlineStar } from "react-icons/md";
import { MdOutlineStarHalf } from "react-icons/md";
import { MdOutlineStarBorder } from "react-icons/md";

const PropertySlider = () => {
  const auth = getAuth();
  const swiperRef = useRef()
  const [myListing, setMyListing] = useState([]);
  const size = 3;

  const pagination = {
    el:'.property-pagination',
    clickable: true,
    type: 'bullets'
  }

  const arrayChunk = (arr) => {
    return arr.reduce(
      (chunk, _, index) => (
        index % size === 0
          ? [...chunk, arr.slice(index, index + size)]
          : chunk) ,
      []
    );
  };

  useEffect(() => {
    let chunkList;
    const fetchUserListing = async () => {
      const listingRef = collection(dataBase, "listings");
      const q = query(
        listingRef,
        where("userRef", "==", auth.currentUser.uid),
        orderBy("timeStamp", "desc")
      );
      const listing = [];
      const querySnap = await getDocs(q);
      querySnap.forEach((doc) => {
        listing.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      chunkList = arrayChunk(listing);
      setMyListing(chunkList);
    };

    fetchUserListing();
  }, [auth.currentUser.uid]);

  return (
    <>

      <div className='flex justify-between items-center py-6 text-slate-900 font-medium'>
        <p>My Properties</p>
        <p className='space-x-10 text-center'>
          <span>Date added</span>
          <span>Actions</span>
          <span>Delete</span>
        </p>
      </div>
      <Swiper 
      className="w-full"
       ref={swiperRef}
      pagination={pagination}
      // autoplay={{
      //   delay: 20
      // }}
      navigation={{
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      }}
      modules={[Pagination, Mousewheel, Navigation, Autoplay]}
      slidesPerView={1}
      spaceBetween={10}
      
      >
        {
          myListing && myListing.map((lists, index) =>  {
          console.log(lists, index)
          return (
          <SwiperSlide 
           className="w-full"
           key={index}>
            <ul className=" w-full">
              {lists.map((list) => {
                const {
                  data: { name, timeStamp, address, imageUrl },
                  id,
                } = list;
                return (
                  <li key={id} 
                     className="flex justify-between w-full items-center py-6 border-y border-t-slate-200 border-b-slate-200">
                    <div className="flex justify-center items-center gap-4">
                      <div>
                        <img
                          className="w-40 h-28"
                          src={imageUrl[0]}
                          alt="property"
                        />
                      </div>
                      <div>
                        <p>{name}</p>
                        <p className="flex items-center gap-1 mt-1">
                          <CiLocationOn />
                          {address}
                        </p>
                        <div className="text-yellow-500 text-sm flex gap-[1.5px] mt-1 justify-center items-center">
                          <MdOutlineStar />
                          <MdOutlineStar />
                          <MdOutlineStar />
                          <MdOutlineStarHalf />
                          <MdOutlineStarBorder />
                          <span className="text-sm">(95 reviews)</span>
                        </div>
                      </div>
                    </div>
                    <div className=" space-x-12 text-center pr-8">
                      <Moment format="MMM DD, YYYY">
                        {timeStamp?.toDate()}
                      </Moment>
                      <button>Edit</button>
                      <button>
                        <RiDeleteBin5Line />
                      </button>
                    </div>
                  </li>
                )
              })}
            </ul>
          </SwiperSlide>
          )})}
        <div className="property-pagination bg-slate-400 absolute top-0 left-0">

        </div>
      </Swiper>
    </>
  );
};

export default PropertySlider;
