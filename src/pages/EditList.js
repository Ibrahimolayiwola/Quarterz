import React, { useEffect, useState } from 'react'
import Spinner from '../components/Spinner'
import { toast } from 'react-toastify'
import useUploadFile from '../hooks/useUploadFile'
import {doc, getDoc, serverTimestamp, updateDoc } from 'firebase/firestore'
import { dataBase } from '../config/firebase'
import { useNavigate, useParams } from 'react-router'
import { ref, deleteObject } from 'firebase/storage'
import { storage } from '../config/firebase'
import { getAuth } from 'firebase/auth'
const EditList = () => {

   const auth = getAuth()

    const [formData, setFormData] = useState({
        type: 'sale',
        name: '',
        address: '',
        longitude: 0,
        latitude: 0,
        description: '',
        beds: 1,
        baths: 1,
        parking: false,
        furnished: false,
        offer: true,
        regularPrice: 50,
        discountedPrice: 30,
        images: []
      })
      const {
        type, 
        name, 
        address,
        longitude,
        latitude, 
        beds, 
        baths, 
        parking, 
        furnished, 
        description, 
        offer, 
        regularPrice, 
        discountedPrice,
        images,
        imageUrl
      } = formData
    
      const {upLoadFile} = useUploadFile(images)
      const [loading, setLoading] = useState(true)
      const navigate = useNavigate()
      let file_url
      
      const onChange = e => {
        let boolean = null
        const {id, value, files} = e.target
        if(value === 'true') boolean = true
        if(value === 'false') boolean = false
    
        setFormData({
          ...formData,
          [id]: boolean ?? value
        })
    
        if(files){
          setFormData({
            ...formData,
            images: files
          })
        }
      }

      const params = useParams()
    
      const onSubmit = async e => {
        
        e.preventDefault()
        setLoading(true)
        if(+discountedPrice >= +regularPrice){
          setLoading(false)
          toast.error('Discounted price need to be less than regular price')
          return
        }
        if(images.length > 6){
          setLoading(false)
          toast.error('Only maximum of 6 images are allowed')
          return
        }
      
        if(formData.userRef !== auth.currentUser.uid ){
          toast.error('Cannot edit Listing')
          navigate('/')
          return
        }
    
        try {
          await Promise.all([...imageUrl].map( imgUrl => deleteImage(imgUrl)))
          file_url = await upLoadFile()
          await updateFormData()
          setLoading(false)
          toast.success('Listing updated')
          navigate(`/category/${formData.type}/${params.listingId}`)
        } catch (error) {
          setLoading(false)
          toast.error('An error occurred while uploading images');
        } 
      }
    
      const updateFormData = async() => {
        const formDataCopy = {
          ...formData,
          imageUrl: file_url,
          timeStamp: serverTimestamp(),
        }
        delete formDataCopy.images
        !offer && delete formDataCopy.discountedPrice
        try { 
         await updateDoc (doc(dataBase, 'listings', params.listingId), formDataCopy)
        } catch (error) {
          console.error('an error occurred while updating doc  ',error)
        }
        
      }

      const deleteImage = async (imgUrl) => {
       
        try {
          const path = new URL(imgUrl).pathname;
          const filteredPath = path.slice(35) 
          const storageRef = ref(storage, filteredPath)
          await deleteObject(storageRef)
          console.log('image deleted successfully')
        } catch (error) {
          console.error('Error deleting image:', error);
        }
       
      }

      useEffect(() => {
        const getFile = async () => {
            const docRef = doc(dataBase, 'listings', params.listingId)
            try{
                const docSnap = await getDoc(docRef)
                if (docSnap.exists()){
                    setFormData({...docSnap.data()})  
                    }
                   
                setLoading(false)
            } catch (error) {
                console.error(error)
            }  
        }
        getFile()
        
     },[params.listingId, auth.currentUser.uid, navigate]) 
    
      if(loading){
        return <Spinner />
      }

  return (
    <div className='max-lg:max-w-md mx-auto max-w-6xl mt-6 '>
      <h1 className='text-lg font-bold text-slate-200 text-center'>Edit Listing</h1>
      <form onSubmit={onSubmit}>
        <div className='lg:flex lg:gap-10 w-full lg:p-4 '>
          <div className='flex-1'>
            <div className='mt-6'>
              <label className='text-slate-200 text-sm  font-semibold '>Sell/Rent</label>
              <div className='flex gap-6 mt-2'>
                <button 
                  id='type' 
                  value="sale" 
                  type='button'
                  onClick={onChange}
                  className={`w-full py-2 px-2 rounded font-medium uppercase shadow-xl text-sm ${type === 'sale' ? 'bg-green-700 text-white': 'bg-slate-200 text-slate-800'}`}>
                    sell
                </button>
                <button 
                  id='type' 
                  value="rent"
                  type='button'
                  onClick={onChange} 
                  className={`w-full py-2 px-2 rounded font-medium uppercase shadow-xl text-sm hover:shadow-xl focus:shadow-xl transition ease-in-out duration-200 ${type === 'rent' ? 'bg-green-800 text-slate-200': 'bg-slate-200 text-slate-800' }`}>
                    rent
                </button>
              </div>
            </div>
            <div className='my-3'>
              <label className='block mb-1.5 text-slate-200 text-sm font-semibold'>Name</label>
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
                <label  className='block mb-1.5 text-slate-200 text-sm font-medium '>Beds</label>
                <input 
                type='number'
                id='beds'
                maxLength="6"
                minLength="2"
                required
                value={beds}
                onChange={onChange}
                className='bg-slate-200 rounded w-20 p-2 text-center text-gray-700 border border-gray-300 transition ease-in-out duration-200 focus:bg-slate-200 focus:border-gray-700' />
              </div>
              <div>
                <label  className='block mb-1.5 text-slate-200 text-sm font-medium'>Baths</label>
                <input 
                type='number'
                id='baths'
                maxLength="6"
                minLength="2"
                required
                value={baths}
                onChange={onChange}
                className='bg-slate-200 rounded w-20 p-2 text-center text-gray-700' />
              </div>
            </div>
            <div className='mt-6'>
              <label className='text-slate-200 text-sm  font-semibold '>Parking spot</label>
              <div className='flex gap-6 mt-2'>
                <button 
                  type='button'
                  id='parking' 
                  value={true}
                  onClick={onChange} 
                  className={`w-full py-2 px-2 rounded font-medium uppercase shadow-xl text-sm ${parking ? 'bg-green-700 text-white' : 'bg-slate-200 text-slate-800'}`}>
                    Yes
                </button>
                <button 
                  id='parking'
                  value={false}
                  type='button'
                  onClick={onChange}
                  className={`w-full py-2 px-2 rounded font-medium uppercase shadow-xl text-sm hover:shadow-xl focus:shadow-xl transition ease-in-out duration-200 ${!parking ? 'bg-green-800 text-slate-200': 'bg-slate-200 text-slate-800' }`}>
                    No
                </button>
              </div>
            </div>
            <div className='mt-6'>
              <label className='text-slate-200 text-sm  font-semibold '>Furnished</label>
              <div className='flex gap-6 mt-2'>
                <button 
                  id='furnished'
                  type='button'
                  onClick={onChange}
                  value={true}
                  className={`w-full py-2 px-2 rounded font-medium uppercase shadow-xl text-sm ${furnished ?  'bg-green-700 text-white': 'bg-slate-200 text-slate-800' }`}>
                    Yes
                </button>
                <button 
                  id='furnished'
                  value={false}
                  type='button'
                  onClick={onChange} 
                  className={`w-full py-2 px-2 rounded font-medium uppercase shadow-xl text-sm hover:shadow-xl focus:shadow-xl transition ease-in-out duration-200 ${!furnished ? 'bg-green-800 text-slate-200': 'bg-slate-200 text-slate-800' }`}>
                  No
                </button>
              </div>
            </div>
            <div className='my-6'>
              <p className='text-sm font-semibold text-slate-200'>
                Images
              </p>
              <p className=' text-slate-200 text-xs mt-1 lg:mb-2'>
                The first image will be the cover image (max 6)
              </p>
              <input 
              type='file'
              multiple
              required
              onChange={onChange}
              accept='.jpg,.jpeg,.png'
              className='mt-2 w-full bg-slate-200 rounded  p-2 text-gray-700 border border-gray-300 focus:border-gray-700 focus:bg-slate-200 transition ease-in-out duration-200' />
            </div>
          </div>
          <div className='flex-1'>
            <div className='my-6'>
              <label className='block mb-3 text-slate-200 text-sm font-semibold'>Address</label>
              <textarea
                type='text'
                id='address'
                value={address}
                placeholder='Address'
                onChange={onChange}
                className='w-full bg-slate-200 text-gray-700 border border-gray-300 rounded shadow-lg hover:border-gray-200 focus:border-gray-600 focus:bg-slate-200 focus-text-gray-700' />
            </div>
            <div className='flex gap-6 lg:pt-6 lg:pb-1.5'>
              <div>
                <label className='mb-2 block text-slate-200 text-sm font-semibold'>Longitude</label>
                <input 
                  type='number'
                  min="-90"
                  max="90"
                  onChange={onChange}
                  id='longitude'
                  value={longitude}
                  required
                  className='w-20 text-center bg-slate-200 text-gray-700 border rounded border-gray-300 focus:border-gray-700 focus:bg-slate-200' />
              </div>
              <div>
                <label className='mb-2 block text-slate-200 text-sm font-semibold'>latitude</label>
                <input 
                  type='number'
                  min="-90"
                  max="90"
                  onChange={onChange}
                  id='latitude'
                  value={latitude}
                  required
                  className='w-20 text-center bg-slate-200 text-gray-700 border rounded border-gray-300 focus:border-gray-700 focus:bg-slate-200' />
              </div>
            </div>
            <div className='mt-6'>
              <label className='text-slate-200 text-sm  font-semibold '>Offer</label>
              <div className='flex gap-6 mt-2'>
                <button 
                  id='offer' 
                  value={true}
                  type='button'
                  onClick={onChange} 
                  className={`w-full py-2 px-2 rounded font-medium uppercase shadow-xl text-sm ${offer ? 'bg-green-700 text-white': 'bg-slate-200 text-slate-800' }`}>
                    Yes
                </button>
                <button 
                  id='offer' 
                  value={false}
                  type='button'
                  onClick={onChange} 
                  className={`w-full py-2 px-2 rounded font-medium uppercase shadow-xl text-sm hover:shadow-xl focus:shadow-xl transition ease-in-out duration-200 ${!offer ? 'bg-green-700 text-slate-200': 'bg-slate-200 text-slate-800' }`}>
                    No
                </button>
              </div>
            </div>
            <div className='flex gap-4'>
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
            </div>
            <div className='my-6'>
              <label className='block mb-3 text-slate-200 text-sm font-semibold'>Description</label>
              <textarea
                type='text'
                id='description'
                value={description}
                placeholder='Description'
                onChange={onChange}
                className='w-full bg-slate-200 text-gray-700 border border-gray-300 rounded shadow-lg hover:border-gray-200 focus:border-gray-600 focus:bg-slate-200 focus-text-gray-700' />
            </div>
            
          </div>
        </div>
        <div className='w-full lg:px-4'>
        <button 
          type='submit'
          required
          className='text-sm bg-green-700 w-full text-slate-200 uppercase rounded mt-6 shadow-lg px-4 py-2.5 my-11 font-semibold border border-gray-600 hover:bg-green-800 hover:shadow-2xl focus:bg-green-800 focus:shadow-2xl active:bg-green-900 active:shadow:2xl transition ease-in-out duration-150'>Update Listing
        </button>      
        </div>
      </form>
    </div>
  )
}

export default EditList
