import React from 'react'
import spinner from '../assets/svg/spinner.svg'

const Spinner = () => {
  return (
    <div className='bg-[#205] bg-opacity-50 flex items-center justify-center fixed top-0 bottom-0 right-0 left-0 z-30'>
      <div>
        <img src={spinner} alt='Loading...' className='h-24' />
      </div>
    </div>
  )
}

export default Spinner
