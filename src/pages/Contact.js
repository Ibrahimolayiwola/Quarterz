import React, { useState } from 'react'
import { FiMail } from "react-icons/fi";
import { LuPhoneCall } from "react-icons/lu";
import { GrMapLocation } from "react-icons/gr";
import { FaCheck } from "react-icons/fa6";
import { FaMapLocationDot } from "react-icons/fa6";
import { FaUser } from "react-icons/fa6";
import { IoIosMail } from "react-icons/io";
import { FaPhoneAlt } from "react-icons/fa";
import Dropdown from '../components/Dropdown';
import { MdEdit } from "react-icons/md";
import { MapContainer } from 'react-leaflet';
import Leaflet from '../components/Leaflet';


const Contact = () => {
  const options = [
    {value: 'Property management', label: 'Property management'},
    {value: 'Mortgage service', label: 'Mortgage service'},
    {value: 'Consulting service', label: 'Consulting service'},
    {value: 'Home buying', label: 'Home buying'},
    {value: 'Home selling', label: 'Home selling'},
    {value: 'Escrow service', label: 'Escrow service'}
  ]
  const listing = {
    latitude: 6.4667,
    longitude: 3.4500
  }

  const [selected, setSelected] = useState('')
  
  const initialValues = {
    name: '',
    email: '',
    phone: '',
    message: '',
    service: ''
  }
  const [formData, setFormData] = useState(initialValues)
  const {name, email, phone, message, service} = formData

  const onChange = e => {
    const {name, value} = e.target
    setFormData({...formData, [name] : value})

  }

  const onSubmit = () => {

  }

  return (
    <>
        <div className='p-[5rem] h-[22rem] bg-[#205] shadow-xl'>
            <div className='max-w-6xl mx-auto'>
              <h1 className='font-size-h text-slate-200 font-bold'>Contact Us</h1>
            </div> 
        </div>
        <div className=' my-[8.5rem] flex flex-col lg:flex-row gap-9 justify-center items-center max-w-[74rem] mx-auto p-4 '>
            <div className='lg:w-[20rem] flex flex-col justify-center items-center space-y-4  py-12 shadow-sm shadow-[#a73eed] rounded-sm flex-initial flex-grow flex-shrink flex-item-w'>
              <div className='relative'>
                <i className='text-slate-200  font-bold'>
                  <FiMail className='w-[4rem] h-[4rem]' />
                </i>
                <div className='bg-[#a73eed] w-7 h-7 flex items-center justify-center rounded-full absolute -top-2 -right-2'>
                  <FaCheck className='text-[#205]' />
                </div>
              </div>
              <h2 className='text-[1.5rem] font-bold text-slate-200'>Email Address</h2>
              <p className='text-slate-400 font-size-p text-center'>Ibrahimolayiwola333@gmail.com</p>
              <p className='text-slate-400 font-size-p text-center'>Azeezolayiwola555@gmail.com</p>
            </div>
            <div className='lg:w-[20rem] flex flex-col justify-center items-center space-y-4 py-12 rounded-sm shadow-sm shadow-[#a73eed] flex-initial flex-grow flex-shrink flex-item-w'>
              <div className='relative'>
                <i className='text-slate-200  font-bold'>
                  <LuPhoneCall className='w-[4rem] h-[4rem]' />
                </i>
                <div className='bg-[#a73eed] w-7 h-7 flex items-center justify-center rounded-full absolute -top-2 -right-2'>
                  <FaCheck className='text-[#205]' />
                </div>
              </div>
              <h2 className='text-[1.5rem] font-bold text-slate-200'>Phone number</h2>
              <p className='text-slate-400 font-size-p text-center'>+2348187654325</p>
              <p className='text-slate-400 font-size-p text-center'>+2346754329876</p>
            </div>
            <div className='lg:w-[20rem] flex flex-col justify-center items-center space-y-4  py-12 rounded-sm shadow-sm shadow-[#a73eed] flex-initial flex-shrink flex-grow flex-item-w'>
              <div className='relative'>
                <i className='text-slate-200  font-bold'>
                  <FaMapLocationDot className='w-[4rem] h-[4rem] text-slate-200' />
                </i>
                <div className='bg-[#a73eed] w-7 h-7 flex items-center justify-center rounded-full absolute -top-2 -right-2'>
                  <FaCheck className='text-[#205]' />
                </div>
              </div>
              <h2 className='text-[1.5rem] font-bold text-slate-200'>Office Address</h2>
              <p className='text-slate-400 font-size-p text-center'>18B Adeniran Ogunsanya</p>
              <p className='text-slate-400 font-size-p text-center'>Surulere Lagos</p>
            </div>
        </div>
        <div className='h-[650px] max-w-7xl mx-auto relative -mb-44 flex justify-center'>
        <div className='w-[90%] p-12 bg-[#205] shadow-2xl shadow-slate-800 z-20 absolute top-0 '>
          <h1 className='text-[1.5em] font-semibold text-slate-200 px-3  border-l-2 border-l-[#a73eed]'>
            Get a Quote
          </h1>
          <form 
            onSubmit={onSubmit}
            className='my-9 text-slate-200 '>
            <div className='flex gap-9 max-md:flex-col'>
              <div className='flex-1'>
                <div className='relative mb-6'>
                  <input 
                  type='text'
                  placeholder='Enter your name'
                  name='name'
                  value={name}
                  onChange={onChange}
                  
                  className='w-full bg-transparent focus:border-none border-2 focus:bg-transparent cursor-pointer border-[#4f0a7d] h-14 focus:outline-none focus:ring-[#a73eed] appearance-none'/>
                  <FaUser className='text-[#a73eed] absolute right-3 top-[40%]'/>
                </div>
                {/* <div className='relative'>
                  <select
                  style={{
                    appearance: 'none',
                    WebkitAppearance: 'none',
                    MozAppearance: 'none'
                  }}
                  value={service}
                  onChange={onChange}
                  id='service'
                  className='select w-full bg-transparent border-[#4f0a7d] hover:border-[#a73eed]  h-14 focus:outline-none focus:border-none focus:ring-[#a73eed]'>
                  
                    <option value='' disabled selected>Select services</option>
                    {
                      options.map(({value, label}) => (
                        <option className='select  text-slate-200 w-full bg-[#205] m-1 border-[#4f0a7d] hover:border-[#a73eed] active:border-[#a73eed] h-14' key={value} value={value}>{label}</option>
                      ))
                    }
                    
                  </select>
                  <FaUser className='text-[#a73eed] absolute right-3 top-[40%]'/>
                </div> */}
                <div>
                  <Dropdown selected={selected} setSelected={setSelected} />
                </div>
              </div>
              <div className='flex-1'>  
                <div className='relative mb-6'>
                  <input 
                  placeholder='Enter email address'
                  type='email'
                  name='email'
                  value={email}
                  onChange={onChange}
                  autoComplete='email'
                  className='w-full bg-transparent border-2 border-[#4f0a7d]  focus:outline-none focus:border-none focus:ring-[#a73eed] h-14 '/>
                  <IoIosMail className='text-[#a73eed] absolute right-3 top-[40%]'/>
                </div>
                <div className='relative'>
                  <input 
                  placeholder='Enter phone number'
                  type='number'
                  name='phone'
                  value={phone}
                  onChange={onChange}
                  className='w-full bg-transparent border-2 border-[#4f0a7d]  focus:outline-none focus:border-none focus:ring-[#a73eed] h-14 '/>
                  <FaPhoneAlt className='text-[#a73eed] absolute right-3 top-[40%]'/>
                </div>
              </div>
            </div>
            <div className='mt-6 relative'>
              <textarea
               type="text"
               name='message'
               value={message}
               onChange={onChange}
               className='w-full appearance-none bg-transparent border-2 border-[#4f0a7d]  min-h-[120px] focus:outline-none focus:border-none focus:ring-[#a73eed] '
               />
               <span className='absolute top-[10%] right-3 text-[#a73eed]'>
                <MdEdit />
               </span>
            </div>
            <button
              type='submit' 
              className='p-4 bg-[#a73eed] text-[#205] uppercase font-size-p mt-8 font-semibold'>get a free service</button>
          </form>
        </div>
        </div>
        <div className='flex '>
        <div  className=' h-[100vh] flex-1 z-10  overflow-x-hidden'>
          <Leaflet listing={listing} />
        </div>
        </div>
    </>
  )
}

export default Contact
