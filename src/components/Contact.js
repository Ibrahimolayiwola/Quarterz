import { doc, getDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { dataBase } from '../config/firebase'
import { toast } from 'react-toastify'

const Contact = ({userRef, listing}) => {


    const [landlord, setLandlord] = useState(null)
    const [message, setMessage] = useState(null)

    useEffect(() => {
        const getLandlord = async () => {
            const docRef = doc(dataBase, 'users', userRef)
           try{
            const docSnap = await getDoc(docRef)
            if(docSnap.exists()){
                setLandlord(docSnap.data())
            }
           } catch(error) {
            toast.error('Cannot get Landlord data')
           }
        }

        getLandlord()
    }, [userRef])
  return (
    <>
      {landlord && 
      (<div className='p-4'>
        <p>Contact {landlord.name} for {listing.name.toLowerCase()}</p>
        <div>
            <textarea className='w-[70%] text-slate-800 border border-slate-300 hover:border-slate-600 rounded-md mb-2 shadow-md hover:shadow-lg ho text-sm' value={message} onChange={e => setMessage(e.target.value)}>

            </textarea>
        </div>
        <a className='' href={`mailto:${landlord.email}?Subject=${listing.name}&body=${message}`}>
            <button className='text-slate-200 uppercase bg-green-700 hover:bg-green-800 shadow-md  text-sm text-enter font-medium px-4 py-2 rounded-md hover:shadow-lg transition ease-in-out duration-150' type='button' disabled={!message}>
                Send Message
            </button>
        </a>
      </div>)}
    </>
  )
}

export default Contact
