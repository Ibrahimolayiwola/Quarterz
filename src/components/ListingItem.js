import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {FaLocationDot} from 'react-icons/fa6'
import Moment from 'react-moment';
import {IoMdTrash} from 'react-icons/io'
import {MdModeEdit} from 'react-icons/md'
// import { getAuth } from 'firebase/auth';

const ListingItem = ({listing, id,  onEdit, onDelete}) => {
  // const auth = getAuth()
  const navigate = useNavigate()
  return (
    <Link to={`/edit-list/${id}`}>
      <div className='relative shadow-lg border border-gray-700 bg-[#250950] shadow-slate-700   w-[250px] mx-auto rounded-lg overflow-hidden'>
        <img className='h-[170px] w-full object-cover hover:scale-105 transition-scale duration-200 ease-in' src={listing.imageUrl[0]} alt=''
        loading='lazy'/>
        <Moment fromNow className='absolute top-2 left-4 font-medium bg-[#205] text-xs px-2 py-1 rounded text-slate-200 uppercase'>{listing.timeStamp?.toDate()}</Moment>
        <div className='text-slate-200 text-xs font-medium p-3 '>
          <div className='flex gap-2 px-2'>
            <FaLocationDot className='text-green-500' />
            <p className=''>{listing.address}</p>
          </div>
            <p className='text-sm px-2 py-1 font-semibold'>{listing.name}</p>
            <p className='text-[#DAF] px-2 py-1'>
              {listing.offer ? 
               listing.discountedPrice
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '$' : 
              listing.regularPrice
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '$'}
              {listing.type === 'rent' && ' / month'}
            </p>
            <div className='flex gap-4'>
              <p className='px-2 py-1 rounded bg-[#205] shadow-md shadow-slate-600'>
                {listing.beds > 1 ?
                `${listing.beds} Beds`: 
                '1 Bed'}
              </p>
              <p className='px-2 py-1 rounded bg-[#205] shadow-md shadow-slate-600'>
                {listing.baths > 1 ?
                `${listing.baths} Baths`: 
                '1 Bath'}
              </p>

            </div>
              <div className='flex gap-2 absolute bottom-4 right-2'>
              {
                onEdit &&
                <MdModeEdit className='text-[15px] text-green-500 cursor-pointer' onClick={() => navigate(`edit-list/:${id}`)} />
              }
              {
                onDelete &&
                <IoMdTrash className='text-[15px] text-red-600 cursor-pointer' onClick={() => onDelete(id)} />
              }
            </div>
        </div>      
      </div>
    </Link>
  )
}

export default ListingItem
