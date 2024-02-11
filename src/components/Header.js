import React, { useEffect, useState } from 'react'
import logo from '../assets/logo/home-logo/logo.png'
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
        setPageState('Sign in')
      }
    } )
  },[auth])

  return (
    <div className='bg-[#fff] w-full sticky top-0 z-50 shadow-2xl h-[70px]  left-0'>
      <header className='max-w-6xl mx-auto flex justify-between items-center z-50'>
        <div >
            <img onClick={
              () => navigate('/')} 
              className='cursor-pointer' 
              src={logo} alt=''/>
        </div>
        <div>
            <ul className='text-red-500 font-medium flex space-x-12 items-center'>
                <li 
                  onClick={
                  () => navigate('/')} 
                  className={`border-b-[1px] text-sm border-b-transparent font-semibold hover:border-b-orange-600 cursor-pointer py-5 ${pathMatchRoute('/') && "border-b-2 border-b-orange-600 font-semibold"}`}>
                    Home
                </li>
                <li 
                  onClick={
                  () => navigate('/offers')} 
                  className={`border-b-[1px] text-sm border-b-transparent font-semibold hover:border-b-orange-600 cursor-pointer py-5 ${pathMatchRoute('/offers') && "border-b-2 border-b-orange-600 font-semibold"}`}>
                    Offers
                </li>
                <li 
                  onClick={
                  () => navigate('/profile')} 
                  className={`border-b-[1px] text-sm transition ease-out duration-300 border-b-transparent font-semibold hover:border-b-orange-600 cursor-pointer py-5 ${(pathMatchRoute('/sign-in') || pathMatchRoute('/profile')) && "border-b-orange-600 font-semibold"}`}>
                    {pageState}
                </li>
                <li 
                  onClick={
                  () => navigate('/contact')} 
                  className={`border-b-[1px] text-sm border-b-transparent font-semibold hover:border-b-orange-600 cursor-pointer py-5 ${pathMatchRoute('/offers') && "border-b-2 border-b-orange-600 font-semibold"}`}>
                    Contact
                </li>
            </ul>
        </div>
      </header>
    </div>
  )
}

export default Header
