import React, { useState } from 'react'
import { auth } from '../config/firebase'
import { useNavigate } from 'react-router'

const Profile = () => {

  const fetchedData = {
    name: auth.currentUser.displayName,
    email: auth.currentUser.email
  }
  const [profileData, setProfileData] = useState(fetchedData)
  const {name, email} = profileData
  const navigate = useNavigate()

  const handleChange = e => {
    const {name, value} = e.target
    setProfileData({...profileData, [name]: value})
  }

  const signOut = e => {
    e.preventDefault()
    auth.signOut()
    navigate('/')
  }
  return (
    <>
      <section className='max-w-6xl mx-auto flex flex-col items-center justify-center gap-6'>
        <h2 className='text-slate-200 text-lg font-bold text-center mt-6'>My Profile</h2>
        <form className='w-full md:w-[40%]'>
            <div className='w-full mb-4'>
              <input className='w-full text-gray-800 rounded border-gray-300 transition ease-out duration-200' value={name} name='name' onChange={handleChange} disabled />
            </div>
            <div>
              <input className='w-full text-gray-800 rounded border-2 border-gray-300 transition ease-out duration-200' value={email} name='email' onChange={handleChange} disabled />
            </div>
            <div className=' text-sm flex justify-between mt-6'>
              <p className='text-white'>Do you want to change your name ? <span className='text-red-600 transition ease-out duration-200 cursor-pointer'>Edit</span></p>
              <button onClick={signOut} className='text-green-800 hover:text-green-600 transition ease-in-out duration-200'>Sign out</button>
            </div>
        </form>
        
      </section>
    </>
  )
}

export default Profile
