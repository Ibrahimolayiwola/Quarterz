import React from 'react'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'

const Leaflet = ({listing}) => {

    // const {latitude, longitude} = listing
    const latitude = +listing.latitude
    const longitude = +listing.longitude

    console.log(typeof latitude, latitude, longitude)
  return (
    <MapContainer  
    center={[latitude, longitude]} 
    zoom={13} 
    scrollWheelZoom={false}
    style={{height: '100%', width: '100%'}}>
    <TileLayer 
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    <Marker position={[latitude, longitude]}>
      <Popup>
        A pretty CSS3 popup. <br /> Easily customizable.
      </Popup>
    </Marker>
  </MapContainer>
  )
}

export default Leaflet
// 6.5244 3.3792