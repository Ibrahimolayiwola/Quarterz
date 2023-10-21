import React, { useState } from 'react'
import signInImage from '../assets/images/sign-in.jpg'
import {AiFillEyeInvisible, AiFillEye} from 'react-icons/ai'
import { Link } from 'react-router-dom'
import GAuth from '../components/GAuth'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../config/firebase'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import useValidate from '../hooks/useValidate'

const SignIn = () => {
  const initialValues = {
    email: '',
    password: ''
  }
  const [formData, setFormData] = useState(initialValues)
  const {email, password} = formData
  const [formErrors, validate] = useValidate(formData)
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  const handleChange = e => {
    const {name, value} = e.target
    setFormData({...formData, [name]: value})
    console.log(auth.currentUser)
  }

  const onSignIn = async e => {
    e.preventDefault()
    validate()
    try {
      const userCredentials = await signInWithEmailAndPassword(auth, email, password)
      if (userCredentials) 
      navigate('/')
    } catch (err){
      toast.error('invalid user credentials')
    }
  }

 

  return (
    <section>
      <h2 className='text-slate-200 text-2xl font-bold text-center mt-6'>Sign In</h2>
      <div className='flex justify-center flex-wrap items-center px-6 py-12 max-w-5xl mx-auto overflow-hidden'>
        <div className='w-full md:w-[67%] lg:w-[50%] mb-12 md:mb-6'>
          <img className='w-full rounded-2xl h-[400px]' src={signInImage} alt='sign-in'/>
        </div>
        <div className='w-full md:w-[67%] lg:w-[40%] lg:ml-20'>
          <form className=''>
            <input
            className='w-full px-4 py-2 text-gray-700 text-lg border-gray-300 rounded-md'
            type='email'
            placeholder='Email address' 
            value={email}
            name='email' 
            onChange={handleChange} />
            <p className='text-red-600 text-sm'>{formErrors.email}</p>
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
                 <AiFillEyeInvisible onClick={e => setShowPassword(false)} className='absolute top-3 right-3 cursor-pointer' />
                ):(
                  <AiFillEye onClick={e => setShowPassword(true)} className='absolute top-3 right-3 cursor-pointer' />
                )
              }
            <p className='text-red-600 text-sm'>{formErrors.password}</p>
            </div>
            <div className='flex justify-between items-center my-6 text-sm'>
              <div className='text-slate-200 flex gap-2'>
                <p>Don't have an account?</p>
                <Link to={'/sign-up'} className='text-red-800 hover:text-red-600 transition ease-out duration-200'>Register</Link>
              </div>
              <div><Link  className='text-[#057548] hover:text-[#6ec159] transition ease-out duration-200' to={'/forgot-password'}>Forgot password</Link></div>
            </div>
            <button onClick={onSignIn} className='w-full bg-green-700 uppercase text-center p-2 shadow-md text-slate-200 font-medium rounded-md hover:bg-green-800 active:bg-green-800 transition duration-200'>sign in</button>
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

export default SignIn
