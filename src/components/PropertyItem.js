import React, { useEffect, useState } from 'react'
import { FaLocationDot } from 'react-icons/fa6'
import Moment from 'react-moment'
import { IoBedOutline } from "react-icons/io5";
import { MdBathtub } from "react-icons/md";
import { IoCarSportOutline } from "react-icons/io5";
import {IoMdTrash} from 'react-icons/io'
import {MdModeEdit} from 'react-icons/md'
import { IoAddSharp } from "react-icons/io5";
// import { HiViewfinderCircle } from "react-icons/hi2";
import { IoMdHeartEmpty } from "react-icons/io";
import { auth } from '../config/firebase';
import { useLocation, useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

const ListingObject = ({ property, id, onEdit, onDelete }) => {
  const location = useLocation();
  const [agentName, setAgentName] = useState("");
  const navigate = useNavigate();
  const {
    name,
    description,
    type,
    offer,
    regularPrice,
    discountedPrice,
    timeStamp,
    beds,
    baths,
    parking,
    furnished,
    address,
    userRef,
    latitude,
    longitude,
    imageUrls,
  } = property || {};
  useEffect(() => {
    if (name) {
      const nameParts = name.split(" ");
      setAgentName(nameParts[0]);
    }
  }, [name]);

  return (
    <>
      <div className="w-full rounded-sm bg-[#fff] text-slate-500 overflow-hidden shadow-xl my-1">
        <div className="relative">
          <img
            loading="lazy"
            className="w-full object-cover hover:scale-105 transition-scale duration-200 ease-in"
            src={imageUrls[0]}
            alt=""
          />
          <Moment
            fromNow
            className="font-medium absolute left-3 bottom-2  px-2 py-1 rounded text-slate-400"
          >
            {timeStamp?.toDate()}
          </Moment>
        </div>
        <Link to={`category/${type}/${id}`}>
          <div className="px-6 py-4">
            <p className="text-red-500 px-2 py-1 font-bold mt-2 ">
              {offer
                ? discountedPrice
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "$"
                : regularPrice
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "$"}
              {type === "rent" && " / month"}
            </p>
            <h1 className="text-lg text-slate-900 font-bold hover:text-red-500 mt-2 px-2">
              {name}
            </h1>
            <p className="flex gap-1.5 mt-2 px-2 items-center">
              <FaLocationDot className="text-green-500" />
              <span className="">{address}</span>
            </p>
            <div className="flex mt-3 text-sm">
              <p className=" px-3 py-1 ">
                <IoBedOutline className="mb-1" />
                <span className="mt-1">
                  {beds > 1 ? `${beds} Bedrooms` : "1 Bedroom"}
                </span>
              </p>
              <p className="px-3 py-1 border-l border-slate-600">
                <MdBathtub className="mb-1" />
                <span className="">
                  {baths > 1 ? `${baths} Bathrooms` : "1 Bathroom"}
                </span>
              </p>
              <p className="px-3 py-1 border-l border-slate-600 ">
                <IoCarSportOutline className="mb-1" />
                <span className="">
                  {parking ? "Car parking" : "No Parking"}
                </span>
              </p>
            </div>
          </div>
        </Link>

        <div className="flex justify-between items-center px-6 py-6  border-t">
          <div className="flex items-center gap-2">
            {/* {
                listing.photoUrl && 
                (<img className='h-8 w-8 rounded-full' src={listing.photoUrl} alt=''/>)
              } */}
            <div>
              {/* {
                  agentName && 
                  (<p>{agentName}</p>) 
                }       */}
              <p className="text-xs text-slate">Property Agent</p>
            </div>
          </div>
          <div className="flex text-slate-100 items-center gap-2">
            {location.pathname !== "/profile" && (
              <>
                <div className="p-1.5 bg-slate-100 hover:bg-red-500 text-slate-600 hover:text-slate-100">
                  <IoMdHeartEmpty className="" />
                </div>
                <div className="p-1.5 bg-slate-100  hover:bg-red-500 hover:text-slate-100 text-slate-600">
                  <IoAddSharp
                    onClick={() => navigate(`category/${type}/${id}`)}
                    className=""
                  />
                </div>
              </>
            )}
            {userRef === auth.currentUser?.uid &&
              location.pathname === "/profile" && (
                <>
                  <div
                    onClick={() => onEdit(id)}
                    className="p-1.5 bg-slate-100 hover:bg-red-500 text-slate-600 hover:text-slate-100"
                  >
                    <MdModeEdit className="" />
                  </div>
                  <div
                    onClick={() => onDelete(id)}
                    className="p-1.5 bg-slate-100 hover:bg-red-500 text-slate-600 hover:text-slate-100"
                  >
                    <IoMdTrash className="" />
                  </div>
                </>
              )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ListingObject
