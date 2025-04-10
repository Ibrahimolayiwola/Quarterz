import React, { useState } from "react";
import Leaflet from "../components/Leaflet";
import contactIcon1 from "../assets/contactUs-icon/contact-icon-1.png";
import contactIcon2 from "../assets/contactUs-icon/contact-icon-2.png";
import contactIcon3 from "../assets/contactUs-icon/contact-icon-3.png";
import Demo from "../components/GetQuote";

const Contact = () => {
  const options = [
    { value: "Property management", label: "Property management" },
    { value: "Mortgage service", label: "Mortgage service" },
    { value: "Consulting service", label: "Consulting service" },
    { value: "Home buying", label: "Home buying" },
    { value: "Home selling", label: "Home selling" },
    { value: "Escrow service", label: "Escrow service" },
  ];
  const listing = {
    latitude: 6.4667,
    longitude: 3.45,
  };

  return (
    <>
      <div className="p-[5rem] h-[25rem] flex justify-center items-center bg-slate-100 shadow-xl">
        <div className="max-w-7xl mx-auto">
          <h1 className="font-size-h text-slate-900 font-bold text-center">Contact</h1>
        </div>
      </div>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md-lg:flex-row gap-6 p-8  md-lg:px-12 xl:px-8 mx-auto my-20">
          <div className="flex-1 flex flex-col justify-center items-center gap-4 border-2 shadow-sm border-slate-100 py-12">
            <div className="">
              <img src={contactIcon1} alt="icon1" />
            </div>
            <h2 className="text-[1.5rem] font-bold text-slate-800">
              Email Address
            </h2>
            <div>
              <p className="text-slate-600 font-size-p text-center mb-1">
                Highbee@gmail.com
              </p>
              <p className="text-slate-600 font-size-p text-center">
                Azeez@gmail.com
              </p>
            </div>
          </div>
          <div className="flex-1 flex flex-col justify-center items-center gap-4 border-2 border-gray-100 py-12 shadow-sm">
            <div className="">
              <img src={contactIcon2} alt="icon2" />
            </div>
            <h2 className="text-[1.5rem] font-bold text-slate-800">
              Phone number
            </h2>
            <div>
              <p className="text-slate-600 font-size-p text-center mb-1">
                +2348187654325
              </p>
              <p className="text-slate-600 font-size-p text-center">
                +2346754329876
              </p>
            </div>
          </div>
          <div className="flex-1 flex flex-col justify-center items-center gap-4 border-2 border-slate-100 py-12 shadow-sm">
            <div className="">
              <img src={contactIcon3} alt="icon3" />
            </div>
            <h2 className="text-[1.5rem] font-bold text-slate-800">
              Office Address
            </h2>
            <div>
              <p className="text-slate-600 font-size-p text-center mb-1">
                18B Allen avenue
              </p>
              <p className="text-slate-600 font-size-p text-center">
                Festac Town
              </p>
            </div>
          </div>
        </div>
        <div className="h-[650px] mx-auto relative -mb-44 flex justify-center max-md:mb-1 px-16">
          <Demo className="w-[90%]" />
        </div>
      </div>
    </>
  );
};

export default Contact;
