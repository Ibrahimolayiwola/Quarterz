import React from 'react'
import { FcGoogle } from 'react-icons/fc'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import {auth, dataBase} from '../config/firebase'
import { useNavigate } from 'react-router'
import { toast } from 'react-toastify'
import { doc, serverTimestamp, setDoc, getDoc } from 'firebase/firestore'

const GAuth = () => {
  const googleProvider = new GoogleAuthProvider()
  const navigate = useNavigate()

  const signInWithGoogle = async e => {
    e.preventDefault()
    try {
      const userCredentials = await signInWithPopup(auth, googleProvider)
      const user = userCredentials.user
      const userData = {
        name: user.displayName,
        email: user.email,
        timeStamp: serverTimestamp()
      }
      const docRef = doc(dataBase, 'users', user.uid)
      const docSnap = await getDoc(docRef)
      if(docSnap.exists()) return;
      await setDoc(docRef, userData)
      navigate('/')
      console.log('sign-in successful')
    } catch (error) {
      console.log('sign-in failed')
      toast.error('Sign in failed')
    }
  }
  return (
    <button type='button' onClick={signInWithGoogle} className=' bg-white text-[#ff5a3c] max-sm:text-xs flex justify-center items-center gap-2 py-4 px-2 transition duration-200 shadow-lg'>
              <FcGoogle />
              Continue with Google
    </button>
  )
}

export default GAuth
