import React from 'react'
import logo from '../assets/logo/logo.png'
import { useLocation, useNavigate } from 'react-router-dom'

const Header = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const pathMatchRoute = route => {
    return route === location.pathname ? true : false;
  }

  return (
    <div className='bg-[#205] w-full sticky top-0 z-10 shadow-lg h-[70px]'>
      <header className='max-w-6xl mx-auto flex justify-between items-center'>
        <div >
            <img onClick={() => navigate('/')} className='h-[70px] w-[120px] cursor-pointer' src={logo} alt=''/>
        </div>
        <div>
            <ul className='text-[#DAF] flex space-x-12 items-center'>
                <li onClick={() => navigate('/')} className={`border-b-[2px] border-b-transparent font-medium hover:border-b-[#DAF] cursor-pointer py-5 ${pathMatchRoute('/') && "border-b-[#DAF] font-semibold"}`}>
                    Home
                </li>
                <li onClick={() => navigate('/offers')} className={`border-b-[2px] border-b-transparent font-medium hover:border-b-[#DAF] cursor-pointer py-5 ${pathMatchRoute('/offers') && "border-b-[#DAF] font-semibold"}`}>
                    Offers
                </li>
                <li onClick={() => navigate('/sign-in')} className={`border-b-[2px] border-b-transparent font-medium hover:border-b-[#DAF] cursor-pointer py-5 ${pathMatchRoute('/sign-in') && "border-b-[#DAF] font-semibold"}`}>
                    Sign in
                </li>
               
            </ul>
        </div>
      </header>
    </div>
  )
}

export default Header
