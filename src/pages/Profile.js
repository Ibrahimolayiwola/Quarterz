import React, { useEffect, useState } from 'react'
import { dataBase } from '../config/firebase'
import { useNavigate } from 'react-router'
import { getAuth, updateProfile } from 'firebase/auth'
import { collection, doc, getDocs, orderBy, query, updateDoc, where } from 'firebase/firestore'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'
import {ImHome} from 'react-icons/im'
import ListingItem from '../components/ListingItem'

const Profile = () => {
  const auth = getAuth()

  const fetchedData = {
    name: auth.currentUser.displayName,
    email: auth.currentUser.email
  }
  const [profileData, setProfileData] = useState(fetchedData)
  const {name, email} = profileData
  const navigate = useNavigate()
  const [changeDetail, setChangeDetail] = useState(false)
  const [listings, setListings] = useState([])
  const [loading, setLoading] = useState(true)
  const handleChange = e => {
    const {name, value} = e.target
    setProfileData({...profileData, [name]: value})
  }

  const signOut = e => {
    e.preventDefault()
    auth.signOut()
    navigate('/')
  }
  const applyChange = async () => {
    if ( auth.currentUser.displayName !== name ) {
      try {
        await updateProfile(auth.currentUser, {
          displayName: name
        })
        const userRef = doc(dataBase, 'users', auth.currentUser.uid)
        await updateDoc(userRef, {
          name
        })
        toast.success('User name updated successfully')
      } catch (error) {
        toast.error('Could not update user name')
      }
    }

  }
  

  useEffect(()=> {
    
  const fetchUserListing = async () => {
    const listingRef = collection(dataBase, 'listings')
    const q = query(
    listingRef, 
    where('userRef','==', auth.currentUser.uid),
    orderBy('timeStamp', 'desc')
    )
    let listing = []
    const querySnap = await getDocs(q)
    querySnap.forEach(doc => {
      listing.push({
        id: doc.id,
        data: doc.data()
      })
    })
   setListings(listing)
   setLoading(false) 
 }
  fetchUserListing()
  }, [auth.currentUser.uid])

  return (
    <>
      <section className='max-w-4xl md:max-w-6xl  mx-auto flex flex-col items-center justify-center gap-6 '>
        <h2 className='text-[#DAF] text-lg font-bold text-center mt-6'>My Profile</h2>
        <div className='w-full md:w-[40%] mt-4'>
          <form className='w-full'>
              <div className='w-full mb-4'>
                <input 
                className={`w-full text-gray-800 rounded border-gray-300 transition ease-out duration-200 ${changeDetail && 'bg-green-700 text-slate-200'}`} 
                value={name} 
                name='name' 
                onChange={handleChange} 
                disabled={!changeDetail} 
                />
              </div>
              <div>
                <input className='w-full text-gray-800 rounded border-2 border-gray-300 transition ease-out duration-200' value={email} name='email'  disabled />
              </div>
              <div className=' text-sm flex justify-between mt-6 '>
                <p 
                  className='text-white'>Do you want to change your name ? 
                  <button 
                  onClick={(e) => {
                  e.preventDefault()
                  changeDetail && applyChange()
                  setChangeDetail((prevState) => !prevState)}} 
                  className='text-red-600 transition ease-out duration-200 cursor-pointer mx-2'>
                  {changeDetail ? 'Apply change': 'Edit'}
                  </button>
                </p>
                <button onClick={signOut} className='text-green-800 hover:text-green-600 transition ease-in-out duration-200'>Sign out</button>
              </div>
          </form>
          <div>
            <button className='w-full px-4 py-3 bg-green-700 hover:bg-green-800 rounded-md shadow-lg mt-6'>
              <Link to='/create-list' className='text-slate-200 flex items-center justify-center gap-2 text-sm'>
                    <ImHome className=' text-yellow-600 font-medium bg-yellow-400 rounded-xl text-2xl p-1'/>
                    SELL OR RENT YOUR HOME
              </Link>
            </button>
          </div>
        </div>  
      </section>
      <section className='max-w-6xl mt-9'>
        {
        loading && (listings.length === 0) ? (
        <p 
        className='text-white'>
          Loading...
        </p>) : (
        <div>
          <h2 className=' text-slate-200 font-bold text-center'>My Listings</h2>
          <ul>
            {listings.map(listing => (
              <li
                key={listing.id}>
                <ListingItem 
                id={listing.id} 
                listing={listing.data}
                /> 
              </li> 
              ))}
            </ul>
          </div>
        )}
        {
        !loading && (listings.length === 0) && (
        <p className='text-slate-200'>
        You don't have any listings yet. Create one</p>
        )}
      </section>
    </>
  )
}

export default Profile
