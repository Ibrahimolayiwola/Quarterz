import { collection, getDocs, limit, orderBy, query, where } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { dataBase } from '../config/firebase'
import ListingObject from '../components/ListingObject'

const FeaturedListing = () => {
    const [featuredListing, setFeaturedListing] = useState([])
    

    useEffect(() => {
        const OfferQuery = {
            firstProp: 'offer',
            secondProp: true
        }
        const rentQuery = {
            firstProp: 'type',
            secondProp: 'rent'
        }
        const listing = []
        const fetchListing = async ({firstProp, secondProp}) => {
            const docRef = collection(dataBase, 'listings')
            const q = query(
                docRef,
                where(firstProp, '==', secondProp),
                orderBy('timeStamp', 'desc'),
                limit(3)
            )
                   
            try{
                const querySnap = await getDocs(q)
                querySnap.forEach((doc) => {
                    listing.push({
                        id: doc.id,
                        data: doc.data()
                    })
                })

                setFeaturedListing(listing)

                
            } catch(error) {
                console.error(error)
            }
        }

        fetchListing(rentQuery)   
        fetchListing(OfferQuery)
        // handleLoading()   
    },[])
  return (
    <>
        <div className='my-9 p-4 px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  mx-auto items-center justify-center justify-items-center gap-4 '>
        {
        featuredListing && featuredListing.map(({id, data}) => (
            <ListingObject key={id} listing={data} id={id}/>
        ) )
        } 
        </div>
    </>
  )
}

export default FeaturedListing
