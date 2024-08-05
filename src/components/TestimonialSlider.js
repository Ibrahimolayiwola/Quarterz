import React, { useRef } from 'react'
import {Swiper, SwiperSlide} from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import {Pagination, Mousewheel, Autoplay, Navigation} from 'swiper/modules'
import client1 from '../assets/images/testimonial/img1.jpg'
import client2 from '../assets/images/testimonial/img2.jpg'
import client3 from '../assets/images/testimonial/img3.jpg'
import client4 from '../assets/images/testimonial/img4.jpg'
import { TiStarFullOutline } from "react-icons/ti";
import SwiperNavButton from './SwiperNavButton'
import { IoArrowBackOutline } from "react-icons/io5";
import { IoArrowForwardOutline } from "react-icons/io5";

const TestimonialSlider = () => {

  const swiperRef = useRef()

  const clientData = [
    {
      name: 'Jacob William',
      photo: client1,
      feedback: ' The team was professional, responsive, and went above and beyond to help me find the perfect property. They demonstrated in-depth knowledge of the market and guided me through every step of the buying process.'
    },
    {
      name: 'Micheal Job',
      photo: client2,
      feedback: ' The team was professional, responsive, and went above and beyond to help me find the perfect property. They demonstrated in-depth knowledge of the market and guided me through every step of the buying process.'
    },
    {
      name: 'David Francis',
      photo: client3,
      feedback: ' The team was professional, responsive, and went above and beyond to help me find the perfect property. They demonstrated in-depth knowledge of the market and guided me through every step of the buying process.'
    },
    {
      name: 'Joseph Morgan',
      photo: client4,
      feedback: ' The team was professional, responsive, and went above and beyond to help me find the perfect property. They demonstrated in-depth knowledge of the market and guided me through every step of the buying process.'
    }
  ]

  const handleNext = () => {
    swiperRef.current.swiper.slideNext()
  }

  const handlePrev = () => {
    swiperRef.current.swiper.slidePrev()
  }



  return (
    <>
      <div className=" absolute right-12 top-[40%] flex gap-6 items-center max-lg:hidden">
        <button
          className="text-xl text-slate-200 bg-orange-600 p-5 font-bold"
          onClick={handlePrev}
        >
          <IoArrowBackOutline />
        </button>
        <button
          className="text-xl bg-white text-slate-900 p-5 font-bold hover:bg-orange-600 hover:text-slate-200"
          onClick={handleNext}
        >
          <IoArrowForwardOutline />
        </button>
      </div>
      <Swiper
        ref={swiperRef}
        breakpoints={{
          0: {
            slidesPerView: 1,
            spaceBetween: 30,
          },
          760: {
            slidesPerView: 2,
            spaceBetween: 40,
          },
        }}
        slidesPerView={1}
        spaceBetween={10}
        mousewheel={true}
        pagination={{
          el: ".pagination",
          type: "bullets",
          clickable: true,
        }}
        modules={[Pagination, Mousewheel, Autoplay, Navigation]}
        className="my-swiper "
      >
        {clientData.map((client) => (
          <SwiperSlide
            key={client.name}
            className=" swiper-slide rounded-md bg-[#fff] shadow-md my-6"
          >
            <div className="p-8">
              <div className="flex justify-between items-center max-lg:flex-col-reverse gap-3">
                <div className="flex items-center gap-4">
                  <div>
                    <img
                      src={client.photo}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                  </div>
                  <div>
                    <p className=" font-bold text-slate-900 font-size-p">
                      {client.name}
                    </p>
                    <p className="text-slate-500 uppercase font-size-p">
                      selling agent
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-0.5">
                  <TiStarFullOutline className="text-yellow-500 hover:text-red-500" />
                  <TiStarFullOutline className="text-yellow-500 hover:text-red-500" />
                  <TiStarFullOutline className="text-yellow-500 hover:text-red-500" />
                  <TiStarFullOutline className="text-yellow-500 hover:text-red-500" />
                  <TiStarFullOutline className="text-yellow-500 hover:text-red-500" />
                </div>
              </div>
              <div className="mt-4">
                <p className="text-slate-500 font-size-p">{client.feedback}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
        <div className="pagination text-center lg:hidden mt-8 z-20 flex items-center justify-center gap-1"></div>
      </Swiper>
    </>
  );
}

export default TestimonialSlider
