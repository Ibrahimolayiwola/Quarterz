import { doc, getDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { dataBase } from '../config/firebase'
import { useParams } from 'react-router'
import Spinner from '../components/Spinner'
import {Swiper, SwiperSlide} from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import {Pagination} from 'swiper/modules'
import {FaLocationDot} from 'react-icons/fa6' 
// import Moment from 'react-moment'
import { FaBed } from "react-icons/fa";
import { MdBathtub } from "react-icons/md"
import { FaSquareParking } from "react-icons/fa6"
import { BsFillSignNoParkingFill } from "react-icons/bs"
import { MdChair } from "react-icons/md"
import { getAuth } from 'firebase/auth'
import Contact from '../components/Contact'
import Leaflet from '../components/Leaflet'

const Listing = () => {
    const [listing, setListing] = useState(null)
    const [loading, setLoading] = useState(true)
    const params = useParams()
    const auth = getAuth()
    const [contactLandlord, setContactLandlord] = useState(false)
   


    useEffect(() => {
        const fetchListing = async () => {
            const docRef = doc(dataBase, 'listings', params.listingId)
            try {
                const docSnap = await getDoc(docRef)
                setListing({...docSnap.data()})
            } catch(error){
                console.error(error)
            }
            setLoading(false)
        }
        fetchListing()
    },[params.listingId,])

    if (loading) {
        return <Spinner />
    }

  return (
    <>
        <h1 className='text-slate-200 text-2xl font-semibold m-9'>Property Details</h1>
        {/* <Swiper
         
       
       navigation={
        true
       }
        pagination= {{
            clickable: true
        }}
        scrollbar={{ draggable: true}}
        effect='fade'
        autoplay={{delay: 3000 }}
        modules={[EffectFade, Keyboard, Navigation, Pagination, Scrollbar, A11y, Autoplay]}
        >
            {listing.imageUrl.map((url, index) => (
                <SwiperSlide className='' key={index}>
                   <img className='w-full' style={{
                    height: '400px',
                    objectFit: 'cover'
                   }} src={url} alt=''/>
                </SwiperSlide>
            ))}
        </Swiper> */}
        <Swiper
            slidesPerView={'auto'}
            spaceBetween={30}
            centeredSlides={true}
            pagination={{
                clickable: true,
            }}
            modules= {[Pagination]}
            className='swiper w-full '
            >
            
            {listing.imageUrl.map((url, index) => (
                <SwiperSlide className='swiper-slide w-44 overflow-hidden' key={index}>
                   <img className='w-full' style={{
                    // height: '400px',
                    objectFit: 'cover'
                   }} src={url} alt=''/>
                </SwiperSlide>
            ))}
        </Swiper>
        <div className='mt-20 max-w-5xl mx-auto shadow-sm shadow-[#a73eed] bg-[#205] lg:flex lg:gap-4 p-4 md:px-6 backdrop: lg:p-2'>
            <div className=' flex-1 text-slate-200'>
                <p className='text-[#a73eed] font-bold px-4 pt-2 '>
                    {listing.name} for - {listing.offer ? 
               listing.discountedPrice
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '$' : 
              listing.regularPrice
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '$'}
              {listing.type === 'rent' && ' /month'}</p>
              <div className='flex items-center gap-2 font-medium px-4'>
                <FaLocationDot className='text-green-500'/>
                <p>{listing.address}</p>

              </div>
              <div className='text-slate-200 font-medium flex gap-4 px-4 py-2 items-center w-[400px]'>
                <p className='text-center flex-1 text-sm px-4 py-1 bg-red-600 rounded-md'> {listing.type === 'rent' ? 'Rent': 'Sale'}</p>
                {
                    listing.offer && (<p className='bg-green-600 rounded-md text-sm flex-1  text-center px-1 py-1 '>
                        ${+listing.regularPrice - +listing.discountedPrice} discount
                    </p>)
                }
              </div>
              <p className='px-4 py-2 flex flex-col'><span className='px-2 border-l-2 border-l-[#a73eed] font-semibold'>Description </span><span>{listing.description}</span> </p>
                <div className='px-4 py-2'>
                    <p className='px-2 border-l-2 border-l-[#a73eed] font-semibold'>Property features
                    </p>
                    <ul className='flex gap-9 mt-1 items-center'>
                        <li className='flex items-center '>
                            <FaBed/>
                            <span className='text-sm'>{listing.beds === 1 ? '1 bed': `${listing.beds} beds`}</span>
                        </li>
                        <li className='flex items-center '>
                            <MdBathtub/>
                            <span className='text-sm'>{listing.baths === 1 ? '1 bath': `${listing.baths} beds`}</span>
                        </li>
                        <li className='flex items-center'>
                            {
                                listing.parking ? (<><FaSquareParking/><span className='text-sm'>Parking spot</span></>) : (<><BsFillSignNoParkingFill/><span className='text-sm'>No Parking</span></>)
                            }
                        </li>
                        <li className='flex items-center'>
                            <MdChair/>
                            {
                                listing.furnished ? (<span className='text-sm'>Furnished</span>) : (<span className='text-sm'>Not Furnished</span>)
                            }
                        </li>
                        
                    </ul>
                </div>
               {
                listing.userRef !== auth.currentUser?.uid && !contactLandlord &&
                ( <div className='px-6 py-4'>
                <button onClick={() => setContactLandlord(true)} className='text-sm bg-green-700 font-medium uppercase  px-7 py-2 text-slate-200 rounded-md w-full  shadow-md hover:bg-green-800 hover:shadow-lg transition ease-in-out duration-200 '>Contact the landlord</button>
            </div>)
               }
               {
                contactLandlord && 
                (<Contact userRef={listing.userRef} listing={listing} />)
               }
            </div>
            <div className='p-4 h-[250px]  flex-1 z-10 overflow-x-hidden'>
                <Leaflet listing={listing} />
            </div>
           
        </div>
       
    </>
  )
}

export default Listing
