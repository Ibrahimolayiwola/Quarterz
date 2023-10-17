import React from 'react'
import {auth} from '../config/firebase'

const Auhentication = () => {
    console.log(auth.currentUser.email)
  return (
    <div>
      
    </div>
  )
}

export default Auhentication
