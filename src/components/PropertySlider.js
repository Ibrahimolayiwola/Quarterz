import React from 'react'
import {Swiper, SwiperSlide} from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import {Pagination, Mousewheel, Autoplay, Navigation} from 'swiper/modules'

const PropertySlider = () => {
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
        }
      }}
      slidesPerView={1}
      spaceBetween={10}
      pagination = {{
        el: 'testimonial-pagination',
        type: 'bullets',
        clickable: true
      }   
      }
      mousewheel={true}
      modules={[Pagination, Mousewheel]}
      >
       <SwiperSlide>
        
       </SwiperSlide>

      </Swiper>
    </>
  )
}

export default PropertySlider
