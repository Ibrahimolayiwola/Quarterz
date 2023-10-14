import React from 'react'
import { FcGoogle } from 'react-icons/fc'

const GAuth = () => {
  return (
    <button className='w-full bg-red-700 text-slate-200 flex justify-center items-center gap-2 p-2 rounded-md hover:bg-red-800 transition duration-200 shadow-lg'>
              <FcGoogle />
              Continue with Google
    </button>
  )
}

export default GAuth
