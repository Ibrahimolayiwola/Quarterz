import React, { useState } from "react";
import { FiMail } from "react-icons/fi";
import { LuPhoneCall } from "react-icons/lu";
import { GrMapLocation } from "react-icons/gr";
import { FaCheck } from "react-icons/fa6";
import { FaMapLocationDot } from "react-icons/fa6";
import { FaUser } from "react-icons/fa6";
import { IoIosMail } from "react-icons/io";
import { FaPhoneAlt } from "react-icons/fa";
import Dropdown from "../components/Dropdown";
import { MdEdit } from "react-icons/md";
import { MapContainer } from "react-leaflet";
import Leaflet from "../components/Leaflet";
import contactIcon1 from "../assets/contactUs-icon/contact-icon-1.png";
import contactIcon2 from "../assets/contactUs-icon/contact-icon-2.png";
import contactIcon3 from "../assets/contactUs-icon/contact-icon-3.png";

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

  const [selected, setSelected] = useState("Select service type");

  const initialValues = {
    name: "",
    email: "",
    phone: "",
    message: "",
    service: "",
  };
  const [formData, setFormData] = useState(initialValues);
  const { name, email, phone, message, service } = formData;

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const onSubmit = () => {};

  return (
    <>
      <div className="p-[5rem] h-[22rem] bg-slate-100 shadow-xl">
        <div className="max-w-6xl mx-auto">
          <h1 className="font-size-h text-slate-900 font-bold">Contact Us</h1>
        </div>
      </div>
      <div className="flex flex-col md-lg:flex-row gap-6 p-8 max-w-[75rem] md-lg:px-12 xl:px-8 mx-auto my-20">
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
      <div className="h-[650px] max-w-7xl mx-auto relative -mb-44 flex justify-center max-md:mb-1">
        <div className="w-[90%] p-12 bg-white border-2 border-slate-100 z-20 absolute top-0">
          <h1 className="text-[1.5em] font-semibold text-slate-800 px-3  border-l-2 border-l-orange-500">
            Get a Quote
          </h1>
          <form onSubmit={onSubmit} className="my-9 text-slate-200">
            <div className="flex gap-9 max-md:flex-col">
              <div className="flex-1">
                <div className="relative mb-6">
                  <input
                    type="text"
                    placeholder="Enter your name"
                    name="name"
                    value={name}
                    onChange={onChange}
                    className="w-full bg-transparent focus:border-none border-2 focus:bg-transparent cursor-pointer border-slate-200 h-14 focus:outline-none focus:ring-orange-600 appearance-none"
                  />
                  <FaUser className="text-orange-600 absolute right-3 top-[40%]" />
                </div>
                {/* <div className='relative'>
                  <select
                  style={{
                    appearance: 'none',
                    WebkitAppearance: 'none',
                    MozAppearance: 'none'
                  }}
                  value={service}
                  onChange={onChange}
                  id='service'
                  className='select w-full bg-transparent border-[#4f0a7d] hover:border-[#a73eed]  h-14 focus:outline-none focus:border-none focus:ring-[#a73eed]'>
                  
                    <option value='' disabled selected>Select services</option>
                    {
                      options.map(({value, label}) => (
                        <option className='select  text-slate-200 w-full bg-[#205] m-1 border-[#4f0a7d] hover:border-[#a73eed] active:border-[#a73eed] h-14' key={value} value={value}>{label}</option>
                      ))
                    }
                    
                  </select>
                  <FaUser className='text-[#a73eed] absolute right-3 top-[40%]'/>
                </div> */}
                <div>
                  <Dropdown selected={selected} setSelected={setSelected} />
                </div>
              </div>
              <div className="flex-1">
                <div className="relative mb-6">
                  <input
                    placeholder="Enter email address"
                    type="email"
                    name="email"
                    value={email}
                    onChange={onChange}
                    autoComplete="email"
                    className="w-full bg-transparent border-2 border-slate-200  focus:outline-none focus:border-none focus:ring-orange-600 h-14 "
                  />
                  <IoIosMail className="text-orange-600 absolute right-3 top-[40%]" />
                </div>
                <div className="relative">
                  <input
                    placeholder="Enter phone number"
                    type="number"
                    name="phone"
                    value={phone}
                    onChange={onChange}
                    className="w-full bg-transparent border-2 border-slate-200  focus:outline-none focus:border-none focus:ring-orange-600 h-14 "
                  />
                  <FaPhoneAlt className="text-orange-600 absolute right-3 top-[40%]" />
                </div>
              </div>
            </div>
            <div className="mt-6 relative">
              <textarea
                type="text"
                name="message"
                value={message}
                onChange={onChange}
                className="w-full appearance-none bg-transparent border-2 border-slate-200  min-h-[120px] focus:outline-none focus:border-none focus:ring-orange-600 "
              />
              <span className="absolute top-[10%] right-3 text-lg text-orange-600">
                <MdEdit />
              </span>
            </div>
            <button
              type="submit"
              className="p-4 bg-orange-600 text-white uppercase font-size-p mt-8 font-semibold"
            >
              get a free service
            </button>
          </form>
        </div>
      </div>
      <div className="flex ">
        <div className=" h-[100vh] flex-1 z-10  overflow-x-hidden">
          <Leaflet listing={listing} />
        </div>
      </div>
    </>
  );
};

export default Contact;
