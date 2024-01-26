import React, { useEffect, useState } from 'react'
// import {doc} from 'firebase/storage'
import {dataBase} from '../config/firebase'
import { collection, getDocs, limit, orderBy, query, where } from 'firebase/firestore'
import ListingObject from '../components/ListingObject'

const OfferListing = () => {
    const [offerListing, setOfferListing] = useState(null)

    useEffect(() => {
        const fetchOfferListing = async () => {
            const docRef = collection(dataBase, 'listings') 
            const q = query(
                docRef,
                where('offer', '==', true ),
                orderBy('timeStamp', 'desc'),
                limit(3)
            )
            const listing = []
            try{
                const docSnap = await getDocs(q)
                    docSnap.forEach((doc) => {
                        listing.push({
                            id: doc.id,
                            data: doc.data()
                        })
                    })
    
                setOfferListing(listing)
            } catch (error) {
                console.error(error)
            }
        }
        fetchOfferListing()
    }, [])
  return (
    <>
      <div className='my-6 max-sm:px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center items-center gap-6 max-w-6xl mx-auto'>
      {
        offerListing && offerListing.map(({id, data}) => (
            <ListingObject key={id} listing={data} id={id}/>
        ) )
       }
      </div>
    </>
  )
}

export default OfferListing
