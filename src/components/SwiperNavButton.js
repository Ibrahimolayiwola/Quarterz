import React from 'react'
import { useSwiper } from 'swiper/react'
import { IoArrowBackOutline } from "react-icons/io5";
import { IoArrowForwardOutline } from "react-icons/io5";


const SwiperNavButton = () => {
 const swiper = useSwiper()

  return (
    <div className='bg-red-500'>
      <button className='text-lg text-slate-200' onClick={() => swiper.slidePrev()}>
        <IoArrowBackOutline />
      </button>
      <button className='text-lg text-slate-100' onClick={() => swiper.slideNext()}>
        <IoArrowForwardOutline />
      </button>
    </div>
  )
}

export default SwiperNavButton
