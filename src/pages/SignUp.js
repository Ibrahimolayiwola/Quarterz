import React, { useState } from 'react'
import signInImage from '../assets/images/sign-in.jpg'
import {AiFillEyeInvisible, AiFillEye} from 'react-icons/ai'
import { Link } from 'react-router-dom'
import GAuth from '../components/GAuth'
import {auth, dataBase} from '../config/firebase'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { doc, serverTimestamp, setDoc } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'
import {toast} from 'react-toastify'
import useValidate from '../hooks/useValidate'

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  })
  
  const {name, email, password} = formData
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()
  const [formErrors, validate] = useValidate(formData)

  const handleChange = e => {
    const {name, value} = e.target
    setFormData({...formData, [name]: value})
  }

  const onSubmit = async e => {
    e.preventDefault()
    validate()
    if (Object.keys(formErrors).length === 0) {
      try {
        const userCredentials = await createUserWithEmailAndPassword(auth, email , password)
        updateProfile(auth.currentUser, {
          displayName: name
        })
        const user = userCredentials.user
        const formDataCopy = {...formData}
        delete formDataCopy.password
        formDataCopy.timeStamp = serverTimestamp()
        await setDoc(doc(dataBase, 'users', user.uid), formDataCopy)
        navigate('/')
      } catch (error) {
        toast.error('Something went wrong with the registration')
      }
    }
  }

  return (
    <section>
      <h2 className='text-slate-200 text-2xl font-bold text-center mt-6'>Sign Up</h2>
      <div className='flex justify-center flex-wrap items-center px-6 py-12 max-w-5xl mx-auto overflow-hidden'>
        <div className='w-full md:w-[67%] lg:w-[50%] mb-12 md:mb-6'>
          <img className='w-full rounded-2xl h-[400px]' src={signInImage} alt='sign-in'/>
        </div>
        <div className='w-full md:w-[67%] lg:w-[40%] lg:ml-20'>
          <form onSubmit={onSubmit} className=''>
          <input
            className='w-full px-4 py-2 text-gray-700 text-lg border-gray-300 rounded-md'
            type='text'
            placeholder='Full name' 
            value={name}
            name='name' 
            onChange={handleChange} />
            <input
            className='w-full px-4 py-2 text-gray-700 text-lg border-gray-300 rounded-md mt-4'
            type='email'
            placeholder='Email address' 
            value={email}
            name='email' 
            onChange={handleChange} />
            <p className='text-sm text-red-600'>{formErrors.email}</p>
            <div className='relative mt-4'>
            <input
            className='w-full text-lg text-gray-700 border-gray-300 px-4 py-2 rounded-md' 
            type={showPassword ? 'text' : 'password'}
            placeholder='Password' 
            value={password}
            name='password' 
            onChange={handleChange} />
              {
                showPassword ? (
                 <AiFillEyeInvisible 
                  onClick={
                  () => setShowPassword(false)} 
                  className='absolute top-3 right-3' />
                ):(
                  <AiFillEye 
                  onClick={
                  () => setShowPassword(true)} 
                  className='absolute top-3 right-3' />
                )
              }
            </div>
            <p className='text-sm text-red-600'>{formErrors.password}</p>
            <div className='flex justify-between items-center my-6 text-sm'>
              <div className='text-slate-200 flex gap-2'>
                <p>Have an account?</p>
                <Link to={'/sign-in'} className='text-red-800 hover:text-red-600 transition ease-out duration-200'>Sign in</Link>
              </div>
            </div>
            <button className='w-full bg-green-700 uppercase text-center p-2 shadow-md text-slate-200 font-medium rounded-md hover:bg-green-800 active:bg-green-800 transition duration-200'>sign up</button>
            <div className='flex items-center my-4 before:border-b before:flex-1 before:border-gray-400 after:flex-1 after:border-b after:border-gray-400'>
              <p className='mx-4 text-center font-medium text-slate-300'>OR</p>
            </div>
            <GAuth />
          </form>
        </div>
      </div>
    </section>
  )
}

export default SignUp
