import React from 'react'

const ListingItem = ({listing, id}) => {
  return (
    <div className='text-slate-200'>
      These are your listings
      {listing.name}

    </div>
  )
}

export default ListingItem
