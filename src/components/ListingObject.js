import React from 'react'
import { FaLocationDot } from 'react-icons/fa6'
import Moment from 'react-moment'
import { IoBedOutline } from "react-icons/io5";
import { MdBathtub } from "react-icons/md";
import { IoCarSportOutline } from "react-icons/io5";

const ListingObject = ({listing, id}) => {
  return (
    <div>
      <div className='w-[360px] rounded-sm bg-[#250950] text-slate-300 shadow-lg'>
        <div className='relative'>
          <img className='w-full object-cover hover:scale-105 transition-scale duration-200 ease-in' loading='lazy' src={listing.imageUrl[0]} alt=''/>
          <Moment fromNow className='font-medium absolute left-3 bottom-2  px-2 py-1 rounded text-slate-400'>{listing.timeStamp?.toDate()}</Moment>
        </div>
        <div className='px-6 py-4'>
          <p className='text-[#a73eed] px-2 py-1 font-bold mt-2'>
              {listing.offer ? 
               listing.discountedPrice
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '$' : 
              listing.regularPrice
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '$'}
              {listing.type === 'rent' && ' / month'}
          </p>
          <h1 className='text-lg text-slate-200 font-bold hover:text-[#a73eed] mt-2'>{listing.name}</h1>
          <p className='flex gap-2 mt-2'>
            <FaLocationDot className='text-green-500' />
            <span className='text-sm'>{listing.address}</span>    
          </p>
          <div className='flex mt-2'>
            <p className=' p-2 border-l border-[#a73eed]'>
              <IoBedOutline/>
              <span>
                {listing.beds > 1 ?
                `${listing.beds} Bedrooms`: 
                '1 Bedroom'}
              </span>
            </p>
            <p className='p-2 border-l border-[#a73eed]'>
              <MdBathtub/>
              <span>{listing.baths > 1 ?
                `${listing.baths} Bathrooms`: 
                '1 Bathroom'}
              </span>
            </p>
            <p className='p-2 border-l border-[#a73eed]'>
              <IoCarSportOutline />
              <span className='text-sm'>
                 {
                  listing.parking ? 'Car parking' : 'No Parking'
                }
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
    
  )
}

export default ListingObject
