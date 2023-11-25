import { collection, getDocs, limit, orderBy, query, where } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { dataBase } from '../config/firebase'
import ListingObject from '../components/ListingObject'

const RentListing = ({myQuery}) => {
    const [rentListing, setRentListing] = useState(null)
    const {first, second} = myQuery

    useEffect(() => {
        const fetchRentListing = async () => {
            const docRef = collection(dataBase, 'listings')
            const q = query(
                docRef,
                where(first, '==', second),
                orderBy('timeStamp', 'desc'),
                limit(3)
            )
            const listing = []
            try{
                const querySnap = await getDocs(q)
                querySnap.forEach((doc) => {
                    listing.push({
                        id: doc.id,
                        data: doc.data()
                    })
                })
                setRentListing(listing)
            } catch(error) {
                console.error(error)
            }
        }

        fetchRentListing()
    },[])
  return (
    <>
        <div className='my-9 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center items-center gap-6 max-w-6xl mx-auto'>
      {
        rentListing && rentListing.map(({id, data}) => (
            <ListingObject listing={data} id={id}/>
        ) )
       }
      </div>
    </>
  )
}

export default RentListing
