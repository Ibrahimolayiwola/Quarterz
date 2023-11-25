import React from 'react'
import homeImg from '../assets/images/home-img.png'
import { FaHome } from "react-icons/fa";
import ListingObject from '../components/ListingObject';
import OfferListing from './OfferListing';
import RentListing from './RentListing';

const Home = () => {
  const offerQuery = {
    first: 'type',
    second: 'rent',
  }
  const listQuery = {
    first: 'offer',
    second: true
  }

  return (
    <>
    <section className='flex max-h-[800px] py-9 shadow-2xl '>
      <div className='flex-1'>
        <div className='flex justify-center pl-16'>
        <img className='w-[500px]' src={homeImg} alt='home-img'/>
        </div>
      </div>
      <div className='flex-1 flex items-center justify-end pr-16'>
        <div className=' justify-self-end'>
        <div className='flex gap-2 items-center justify-end mb-2'>
          <FaHome className='text-[#a73eed] text-lg'/>
          <p className='text-slate-300 font-medium'>Real Estate Agency</p>
        </div>
        <h1  className='text-slate-200 text-4xl py-2 font-bold text-center w-[400px]'>The Right Place To Find Your Dream Home</h1>
        <p className='text-slate-400 text-center max-w-[400px] p-4 text-sm'>We understand the significance of finding a perfect home and we are here to guide you every step to find your dream home</p>
        <div className='flex space-x-6 mt-2 justify-center font-medium'>
          <button className='text-slate-[#205] text-center px-5 py-3 uppercase bg-[#9537d4] border border-slate-600 shadow-md '>Our Services</button>
          <button className='text-slate-200 text-center px-5 py-3 uppercase bg-[#205] border border-slate-600 shadow-md '>Learn more</button>
        </div>
        </div>
      </div>
    </section>
    <section>
      <div className='mt-20'>
        <h1 className='text-center mb-6'><span className='bg-[#a73eed] text-lg text-[#205] px-4 py-2 uppercase font-semibold rounded-3xl'>Properties</span></h1>
        <h1 className='text-xl text-slate-200  m-9 font-bold px-6'>Featured Listing</h1>
        <OfferListing />
        <RentListing myQuery={listQuery} />
      </div>
    </section>
    </>
  )
}

export default Home
