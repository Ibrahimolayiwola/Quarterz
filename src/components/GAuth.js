import React from 'react'
import { FcGoogle } from 'react-icons/fc'
import { GoogleAuthProvider } from 'firebase/auth'
import { signInWithPopup } from 'firebase/auth'
import {auth} from '../config/firebase'

const GAuth = () => {
  const googleProvider = new GoogleAuthProvider()
  const signInWithGoogle = async e => {
    e.preventDefault()
    try {
      await signInWithPopup(auth, googleProvider)
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <button onClick={signInWithGoogle} className='w-full bg-red-700 text-slate-200 flex justify-center items-center gap-2 p-2 rounded-md hover:bg-red-800 transition duration-200 shadow-lg'>
              <FcGoogle />
              Continue with Google
    </button>
  )
}

export default GAuth
