import React, { useRef } from 'react'
import {Swiper, SwiperSlide} from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import {Pagination, Autoplay, Navigation} from 'swiper/modules'
import client1 from '../assets/images/testimonial/img1.jpg'
import client2 from '../assets/images/testimonial/img2.jpg'
import client3 from '../assets/images/testimonial/img3.jpg'
import client4 from '../assets/images/testimonial/img4.jpg'
import { TiStarFullOutline } from "react-icons/ti";
import SwiperNavButton from './SwiperNavButton'
import { IoArrowBackOutline } from "react-icons/io5";
import { IoArrowForwardOutline } from "react-icons/io5";

const Slider = () => {

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

    <div className=' absolute right-12 top-[35%] flex gap-6 items-center'>
      <button className='text-xl text-slate-200 bg-orange-600 p-5 font-bold' onClick={handlePrev}>
        <IoArrowBackOutline />
      </button>
      <button className='text-xl bg-white text-slate-900 p-5 font-bold hover:bg-orange-500 hover:text-slate-200' onClick={handleNext}>
        <IoArrowForwardOutline />
      </button>
    </div>
      <Swiper
        ref={swiperRef}
        slidesPerView={2}
        spaceBetween={50}
        pagination={false}
       
        modules={[Pagination, Autoplay, Navigation]}
        className="mySwiper  mt-16 flex justify-center "
      >
        {
          clientData.map(client => (
            <SwiperSlide className='swiper-slide rounded-md'>
          <div className='p-8'>
            <div className='flex justify-between items-center'>
              <div className='flex items-center gap-4'>
                <div>
                  <img src={client.photo} className='w-16 h-16 rounded-full object-cover' />
                </div>
                <div>
                  <p className=' font-bold text-slate-900'>
                    {client.name} 
                  </p>
                  <p className='text-slate-500 uppercase'>
                    selling agent
                  </p>
                </div>
              </div>
              <div className='flex items-center gap-0.5'>
                <TiStarFullOutline className='text-yellow-500 hover:text-red-500' />
                <TiStarFullOutline className='text-yellow-500 hover:text-red-500' />
                <TiStarFullOutline className='text-yellow-500 hover:text-red-500' />
                <TiStarFullOutline className='text-yellow-500 hover:text-red-500' />
                <TiStarFullOutline className='text-yellow-500 hover:text-red-500' />
               
              </div>
            </div>
            <div className='mt-4'>
              <p className='text-slate-500 '>
                {client.feedback}
              </p>
            </div>
          </div>
          
        </SwiperSlide>
          ))
        }
        
      </Swiper>
    </>
  )
}

export default Slider
