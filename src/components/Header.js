import React, { useEffect, useState } from 'react'
import logo from '../assets/logo/logo.png'
import { useLocation, useNavigate } from 'react-router-dom'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
// import { auth } from '../config/firebase'

const Header = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [pageState, setPageState] = useState('Sign in')
  const auth = getAuth()

  const pathMatchRoute = route => {
    if (route === location.pathname){
      return true
    }
  }

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setPageState('Profile')
      } else {
        setPageState('/sign in')
      }
    } )
  },[auth])

  return (
    <div className='bg-[#205] w-full sticky top-0 z-10 shadow-2xl h-[70px]'>
      <header className='max-w-6xl mx-auto flex justify-between items-center'>
        <div >
            <img onClick={
              () => navigate('/')} 
              className='h-[70px] w-[120px] cursor-pointer' 
              src={logo} alt=''/>
        </div>
        <div>
            <ul className='text-slate-200 flex space-x-12 items-center'>
                <li 
                  onClick={
                  () => navigate('/')} 
                  className={`border-b-[1px] text-sm border-b-transparent font-normal hover:border-b-white cursor-pointer py-5 ${pathMatchRoute('/') && "border-b-2 border-b-slate-200 font-semibold"}`}>
                    Home
                </li>
                <li 
                  onClick={
                  () => navigate('/offers')} 
                  className={`border-b-[1px] text-sm border-b-transparent font-normal hover:border-b-white cursor-pointer py-5 ${pathMatchRoute('/offers') && "border-b-2 border-b-slate-200 font-semibold"}`}>
                    Offers
                </li>
                <li 
                  onClick={
                  () => navigate('/profile')} 
                  className={`border-b-[1px] text-sm transition ease-out duration-300 border-b-transparent font-normal hover:border-b-white cursor-pointer py-5 ${(pathMatchRoute('/sign-in') || pathMatchRoute('/profile')) && "border-b-slate-200 font-semibold"}`}>
                    {pageState}
                </li>
               
            </ul>
        </div>
      </header>
    </div>
  )
}

export default Header
