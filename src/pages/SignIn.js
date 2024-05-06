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
  }

  const onSignIn = async e => {
    e.preventDefault()
    const validateError = validate();
    if (Object.keys(validateError).length !== 0) {
      return;
    }

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
      <div className="px-[3rem] py-[8rem] h-[22rem] bg-slate-100">
        <div className="max-w-6xl mx-auto">
          <h1 className="font-size-h text-slate-900 font-bold">Account</h1>
        </div>
      </div>
      <div className="mt-40 mb-10">
        <h2 className="text-slate-900 font-size-h font-bold text-center m-6 m">
          Sign In <br /> To Your Account
        </h2>
        <p className="text-slate-600 text-center">
          Your journey to finding your perfect home <br /> starts here.
        </p>
      </div>
      <div className='flex max-lg:flex-col max-lg:items-center max-lg: justify-center items-start px-6 py-12 max-w-6xl mx-auto gap-28'>
       
        <div className='w-full md:w-[67%] lg:w-[45%] flex-1 max-sm:px-8'>
          <form className=''>
            <input
            className='w-full px-4 py-4 text-slate-700 opacity-50  border-[1.8px] border-slate-300 placeholder:text-slate-500 focus:border-none  focus:ring-orange-700'
            type='email'
            placeholder='Email address' 
            value={email}
            name='email' 
            onChange={handleChange} />
            <p className='text-red-600 text-sm'>{formErrors.email}</p>
            <div className='relative mt-8'>
            <input
            className='w-full px-4 py-4 text-slate-700 opacity-50  border-[1.8px] border-slate-300 placeholder:text-slate-500 focus:border-none  focus:ring-orange-700' 
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
            {/* <div className='flex justify-between items-center my-6 text-sm'>
              <div className='text-slate-200 flex gap-2'>
                <p>Don't have an account?</p>
                <Link to={'/sign-up'} className='text-red-800 hover:text-red-600 transition ease-out duration-200'>Register</Link>
              </div>
              <div><Link  className='text-[#057548] hover:text-[#6ec159] transition ease-out duration-200' to={'/forgot-password'}>Forgot password</Link></div>
            </div> */}
           <div className='flex justify-between items-center mt-8'>
            <button onClick={onSignIn} className=' bg-orange-600 uppercase text-center py-3 px-8 text-white font-medium  transition duration-200 max-sm:text-xs'>sign in</button>
            <GAuth />
           </div>
            <div className='mt-6'><Link  className='text-slate-500 hover:text-orange-600 transition ease-out duration-200 uppercase' to={'/forgot-password'}>Forgotten your password</Link></div>
          </form>
         
        </div>
        <div className='flex flex-col justify-center items-center gap-6 lg:flex-1 max-lg:w-[28rem] px-6'>
            <h2 className='text-xl uppercase text-slate-800 font-bold text-center'>
              don't have an account
            </h2>
            <p className='text-slate-600 text-center'>
              Add items to your wishlistget personalised recommendations
              check out more quickly track your orders register
            </p>
            <button  className=' bg-orange-600 uppercase text-center py-4 px-8 mt-4 text-white font-medium  transition duration-200'>
              <Link to={'/sign-up'}>create an account</Link>
            </button>
          </div>
      </div>
    </section>
  )
}

export default SignIn
