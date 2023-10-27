import React, { useState } from 'react'

const CreateList = () => {
  const [formData, setFormData] = useState({
    type: 'sale',
    name: '',
    address: '',
    description: '',
    beds: 1,
    baths: 1,
    parking: false,
    furnished: false,
    offer: true,
    regularPrice: 50,
    discountedPrice: 30,
  })
  const {
    type, 
    name, 
    address, 
    beds, 
    baths, 
    parking, 
    furnished, 
    description, 
    offer, 
    regularPrice, 
    discountedPrice
  } = formData

  const onChange = e => {

  }

  return (
    <div className='max-w-md mx-auto mt-6 '>
      <h1 className='text-lg font-bold text-slate-200 text-center'>Create a Listing</h1>
      <from>
        <div className='mt-6'>
          <label className='text-slate-200 text-sm  font-semibold '>Sell/Rent</label>
          <div className='flex gap-6 mt-2'>
            <button id='type' value="sale" className={`w-full py-2 px-2 rounded font-medium uppercase shadow-xl text-sm ${type === 'sale' ? 'bg-green-700 text-white': 'bg-slate-200 text-slate-800'}`}>sell</button>
            <button id='type' value="rent" className={`w-full py-2 px-2 rounded font-medium uppercase shadow-xl text-sm hover:shadow-xl focus:shadow-xl transition ease-in-out duration-200 ${type === 'rent' ? 'bg-green-800 text-slate-200': 'bg-slate-200 text-slate-800' }`}>rent</button>
          </div>
        </div>
        <div className='my-6'>
          <label for='name' className='block mb-3 text-slate-200 text-sm font-semibold'>Name</label>
          <input
            type='text'
            id='name'
            placeholder='Name'
            value={name}
            onChange={onChange}
            maxLength="32"
            minLength="10"
            required
            className='w-full bg-slate-200 text-gray-700 border border-gray-300 rounded shadow-lg hover:border-gray-200 focus:border-gray-600 focus:bg-slate-200 focus-text-gray-700' />
        </div>
        
        <div className='flex gap-6'>
          <div>
            <label for="beds" className='block mb-2 text-slate-200 text-sm font-medium'>Beds</label>
            <input 
            type='number'
            id='beds'
            maxLength="6"
            minLength="2"
            required
            value={beds}
            onChange={onChange}
            className='bg-white rounded w-20 p-2 text-center text-gray-700 border border-gray-300 transition ease-in-out duration-200 focus:bg-slate-200 focus:border-gray-700' />
          </div>
          <div>
            <label for="baths" className='block mb-2 text-slate-200 text-sm font-medium'>Baths</label>
            <input 
            type='number'
            id='baths'
            maxLength="6"
            minLength="2"
            required
            value={baths}
            onChange={onChange}
            className='bg-white rounded w-20 p-2 text-center text-gray-700' />
          </div>
        </div>
        <div className='mt-6'>
          <label className='text-slate-200 text-sm  font-semibold '>Parking spot</label>
          <div className='flex gap-6 mt-2'>
            <button id='parking' value="true" className={`w-full py-2 px-2 rounded font-medium uppercase shadow-xl text-sm ${parking ? 'bg-green-700 text-white' : 'bg-slate-200 text-slate-800'}`}>Yes</button>
            <button id='parking' value="false" className={`w-full py-2 px-2 rounded font-medium uppercase shadow-xl text-sm hover:shadow-xl focus:shadow-xl transition ease-in-out duration-200 ${!parking ? 'bg-green-800 text-slate-200': 'bg-slate-200 text-slate-800' }`}>No</button>
          </div>
        </div>
        <div className='mt-6'>
          <label className='text-slate-200 text-sm  font-semibold '>Furnished</label>
          <div className='flex gap-6 mt-2'>
            <button id='furnished' value="true" className={`w-full py-2 px-2 rounded font-medium uppercase shadow-xl text-sm ${furnished ?  'bg-green-700 text-white': 'bg-slate-200 text-slate-800' }`}>Yes</button>
            <button id='furnished' value="false" className={`w-full py-2 px-2 rounded font-medium uppercase shadow-xl text-sm hover:shadow-xl focus:shadow-xl transition ease-in-out duration-200 ${!furnished ? 'bg-green-800 text-slate-200': 'bg-slate-200 text-slate-800' }`}>No</button>
          </div>
        </div>
        <div className='my-6'>
          <label for='address' className='block mb-3 text-slate-200 text-sm font-semibold'>Address</label>
          <textarea
            type='text'
            id='address'
            value={address}
            placeholder='Address'
            onChange={onChange}
            className='w-full bg-slate-200 text-gray-700 border border-gray-300 rounded shadow-lg hover:border-gray-200 focus:border-gray-600 focus:bg-slate-200 focus-text-gray-700' />
        </div>
        <div className='my-6'>
          <label for='address' className='block mb-3 text-slate-200 text-sm font-semibold'>Description</label>
          <textarea
            type='text'
            id='description'
            value={description}
            placeholder='Description'
            onChange={onChange}
            className='w-full bg-slate-200 text-gray-700 border border-gray-300 rounded shadow-lg hover:border-gray-200 focus:border-gray-600 focus:bg-slate-200 focus-text-gray-700' />
        </div>
        <div className='mt-6'>
          <label className='text-slate-200 text-sm  font-semibold '>Offer</label>
          <div className='flex gap-6 mt-2'>
            <button id='offer' value="false" className={`w-full py-2 px-2 rounded font-medium uppercase shadow-xl text-sm ${offer ? 'bg-green-700 text-white': 'bg-slate-200 text-slate-800' }`}>Yes</button>
            <button id='type' value="true" className={`w-full py-2 px-2 rounded font-medium uppercase shadow-xl text-sm hover:shadow-xl focus:shadow-xl transition ease-in-out duration-200 ${!offer ? 'bg-green-800 text-slate-200': 'bg-slate-200 text-slate-800' }`}>No</button>
          </div>
        </div>
        <div className='mt-6'>
          <label className='text-slate-200 text-sm font-semibold '>Regular price</label>
          <div className='flex gap-4 items-center mt-2'>
            <input
              type='number'
              id='regularPrice'
              value={regularPrice}
              onChange={onChange}
              min="50"
              max="10000000" 
              className='bg-slate-200 rounded shadow-lg border border-gray-300 focus:border-gray-700 text-gray-700 pr-4' />
              {type === 'rent' ?
              (<span className='text-sm font-normal text-slate-200'>$/Month</span>) : ( <span className='text-slate-200 text-sm font-medium'>$</span>) }
          </div>    
        </div>
        {offer && (
          <div className='mt-6'>
          <label className='text-slate-200 text-sm font-semibold block mb-2'>Discounted price</label>
          <input 
            className='text-gray-700 bg-slate-200 border border-gray-300 transition ease-in-out duration-200 focus:border-gray-700 focus:bg-slate-200  rounded'
            type='number' 
            id='discountedPrice'
            value={discountedPrice}
            onChange={onChange}
            min="50"
            max="100000000"
            required= {offer}  
            />
          <span className='text-slate-200 ml-4 text-sm font-medium'>$</span>
        </div>
        )}
        <div className='my-6'>
          <p className='text-sm font-semibold text-slate-200'>
            Images
          </p>
          <p className=' text-slate-200 text-xs mt-1'>
            The first image will be the cover image (max 6)
          </p>
          <input 
          type='file'
          multiple
          required
          accept='.jpg,.jpeg,.png'
          className='mt-2 w-full bg-slate-200 rounded  p-2 text-gray-700 border border-gray-300 focus:border-gray-700 focus:bg-slate-200 transition ease-in-out duration-200' />
        </div>
        <button className='text-sm bg-green-700 w-full text-slate-200 uppercase rounded mt-6 shadow-lg px-4 py-2.5 my-11 font-semibold border border-gray-600 hover:bg-green-800 hover:shadow-2xl focus:bg-green-800 focus:shadow-2xl active:bg-green-900 active:shadow:2xl transition ease-in-out duration-150'>Create Listing
        </button>
      </from>
    </div>
  )
}

export default CreateList

