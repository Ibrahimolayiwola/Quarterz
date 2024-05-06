import React, { useEffect, useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Mousewheel, Autoplay, Navigation } from "swiper/modules";
import { getAuth } from "firebase/auth";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { dataBase } from "../../config/firebase.js";
import Moment from "react-moment";
import { CiLocationOn } from "react-icons/ci";
import { RiDeleteBin5Line } from "react-icons/ri";
import { MdOutlineStar } from "react-icons/md";
import { MdOutlineStarHalf } from "react-icons/md";
import { MdOutlineStarBorder } from "react-icons/md";
import Spinner from "../Spinner.js";

const MyProperties = () => {
  const auth = getAuth();
  const swiperRef = useRef()
  const [myListing, setMyListing] = useState([]);
  const size = 3;
  const [loading, setLoading] = useState(true)

  const pagination = {
    el:'.myProperty-pagination',
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
      setLoading(false)
    };

    fetchUserListing();
  }, [auth.currentUser.uid]);

  if (loading) {
    console.log('spinner on the way')
    return <Spinner />
  }

  return (
    <>

      <div className='xl:flex justify-between items-center py-6 text-slate-900 font-medium max-xl:w-[85%] max-xl:mx-auto xl:px-2'>
        <p className="max-xl:mb-4 max-xl:border-b max-xl:border-b-slate-200 max-xl:p-2">My Properties</p>
        <p className='xl:space-x-10 max-xl:flex max-xl:flex-col'>
          <span className=" max-xl:border-y max-xl:border-y-slate-200 max-xl:p-2">Date added</span>
          <span className=" max-xl:border-b max-xl:border-b-slate-200 max-xl:p-2">Actions</span>
          <span className=" max-xl:border-b max-xl:border-b-slate-200 max-xl:p-2">Delete</span>
        </p>
      </div>
      <Swiper 
      className=""
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
           className=""
           key={index}>
            <ul className="max-xl:w-[85%] max-xl:mx-auto">
              {lists.map((list) => {
                const {
                  data: { name, timeStamp, address, imageUrl },
                  id,
                } = list;
                return (
                  <li key={id} 
                     className="xl:flex xl:justify-between xl:items-center xl:py-6 xl:border-y xl:border-t-slate-200 xl:border-b-slate-200">
                    <div className="xl:flex xl:justify-center xl:items-center xl:gap-4 ">
                      <div className="p-2">
                        <img
                          className="xl:w-40 xl:h-28"
                          src={imageUrl[0]}
                          alt="property"
                        />
                      </div>
                      <div className=" max-xl:border-t max-xl:border-t-slate-200 max-xl:p-2 max-xl:mt-2 max-xl:text-sm">
                        <p className="">{name}</p>
                        <p className="flex items-center gap-1 mt-2">
                          <CiLocationOn />
                          {address}
                        </p>
                        <div className="text-yellow-500 text-sm flex gap-[1.5px] mt-2 xl:justify-center items-center">
                          <MdOutlineStar />
                          <MdOutlineStar />
                          <MdOutlineStar />
                          <MdOutlineStarHalf />
                          <MdOutlineStarBorder />
                          <span className="text-sm">(95 reviews)</span>
                        </div>
                      </div>
                    </div>
                    <div className=" xl:space-x-12 xl:text-center xl:pr-8 max-xl:flex max-xl:flex-col max-xl:text-sm">
                      <Moment format="MMM DD, YYYY" className="max-xl:mt-3 max-xl:border-y max-xl:border-y-slate-200 max-xl:p-2">
                        {timeStamp?.toDate()}
                      </Moment>
                      <button className="max-xl:text-left  max-xl:border-b max-xl:border-b-slate-200 max-xl:p-2">Edit</button>
                      <button className=" max-xl:border-b max-xl:border-b-slate-200 max-xl:p-2">
                        <RiDeleteBin5Line />
                      </button>
                    </div>
                  </li>
                )
              })}
            </ul>
          </SwiperSlide>
          )})}
        
      </Swiper>
      <div className="myProperty-pagination flex justify-center items-center gap-2 cursor-pointer p-4">

      </div>
    </>
  );
};
   


export default MyProperties
