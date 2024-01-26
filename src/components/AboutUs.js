import React from "react";
import aboutImg from "../assets/images/aboutImg.png";
import { HiHomeModern } from "react-icons/hi2";
import { ImUserTie } from "react-icons/im";
import { MdStorage } from "react-icons/md";
import aboutImg3 from "../assets/images/aboutImg3.jpg";
import { IoCheckmarkSharp } from "react-icons/io5";
import { AiOutlineDollarCircle } from "react-icons/ai";
import { FaRegHandshake } from "react-icons/fa6";
import { FaHome } from "react-icons/fa";
import { FaHandHolding } from "react-icons/fa6";
import { IoHomeOutline } from "react-icons/io5";
import { RiHome8Line } from "react-icons/ri";
import { HiArrowLongRight } from "react-icons/hi2";
const AboutUs = () => {
  return (
    <>
      <div className="my-24">
        <h1 className="text-center">
          <span className=" px-3 py-1.5 text-lg font-semibold text-orange-600">
            About Us
          </span>
        </h1>
        <div className="mb-9  flex flex-col-reverse  lg:flex-row gap-8 p-9 justify-center items-start">
          <div className="flex-1 p-6">
            <img className="size-aboutImg" src={aboutImg} alt="" />
          </div>
          <div className="flex-1">
            <h1 className="text-slate-900 font-size-h leading-normal font-bold py-4 pr-4">
              Dream Living Spaces <br />
              Setting New Build
            </h1>
            <p className="text-slate-500 pb-4 pr-6 font-size-p">
              Over 3,000 people work for us in more than 20 countries all over
              this breadth of global coverage, combined with specialist
              services.{" "}
            </p>
            <div className="mt-9">
              <div className="mb-4 flex gap-4 justify-center p-6 border border-gray-100 hover:shadow-xl transition-all ease-out duration-200">
                <span className="text-6xl text-orange-600 font-bold">
                  <HiHomeModern />
                </span>
                <div className="">
                  <h1 className="text-slate-900 font-semibold text-xl ">
                    The perfect Residency
                  </h1>
                  <p className="text-slate-600 mt-2 font-size-p">
                    Lorem ipsum dolor sit amet, consectetur adipisic do eiusmod
                    tempor incididunt ut labore et
                  </p>
                </div>
              </div>
              <div className="mb-4 flex gap-4 justify-center p-6 border border-gray-100 hover:shadow-xl transition-all ease-out duration-200">
                <span className="text-6xl text-orange-600 font-bold">
                  <ImUserTie />
                </span>
                <div>
                  <h1 className="text-slate-900 font-semibold text-xl ">
                    Global Architect Experts
                  </h1>
                  <p className="text-slate-600 mt-2 font-size-p">
                    Lorem ipsum dolor sit amet, consectetur adipisic do eiusmod
                    tempor incididunt ut labore et
                  </p>
                </div>
              </div>
              <div className="flex gap-4 justify-center p-6  border border-gray-100 hover:shadow-xl transition-all ease-out duration-200">
                <span className="text-6xl text-orange-600 font-bold">
                  <MdStorage />
                </span>
                <div>
                  <h1 className="text-slate-900 font-semibold text-xl ">
                    Built-in Storage Cupboard
                  </h1>
                  <p className="text-slate-600 mt-2 font-size-p">
                    Lorem ipsum dolor sit amet, consectetur adipisic do eiusmod
                    tempor incididunt ut labore et
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex max-lg:flex-col bg-slate-100 items-center justify-center gap-3">
          <div className="flex-1 p-9">
            <div className="mb-6">
              <h1 className="text-orange-600 text-lg mb-3 font-medium">
                Building Facilities
              </h1>
              <h2 className="text-slate-900 mb-3 font-bold font-size-h leading-normal">
                Making Living Spaces More Beautiful
              </h2>
              <p className="text-slate-600 font-size-p">
                Over 39,000 people work for us in more than 70 countries all
                over the This breadth of global coverage, combined with
                specialist services
              </p>
            </div>
            <div className="mt-16">
              <ul className="grid grid-cols-2 gap-6">
                <li className="flex gap-4 justify-start items-center">
                  <span className="p-1 text-2xl w-7 h-7 flex items-center rounded-full  text-orange-600 font-bold bg-red-100">
                    <IoCheckmarkSharp className="inline" />
                  </span>
                  <p className=" text-slate-600 font-size-p">
                    Living rooms are pre-wired for Surround
                  </p>
                </li>
                <li className="flex gap-4 justify-start items-center">
                  <span className="p-1 text-2xl w-7 h-7 flex items-center rounded-full  text-red-500 font-bold bg-red-100">
                    <IoCheckmarkSharp className="inline" />
                  </span>
                  <p className=" text-slate-600 font-size-p">
                    Nestled in the Buckhead Vinings communities
                  </p>
                </li>
                <li className="flex gap-4 justify-start items-center">
                  <span className="p-1 text-2xl w-7 h-7 flex items-center rounded-full  text-red-500 font-bold bg-red-100 ">
                    <IoCheckmarkSharp className="inline" />
                  </span>
                  <p className=" text-slate-600 font-size-p">
                    A rare combination of inspired architecture
                  </p>
                </li>
                <li className="flex gap-4 justify-start items-center">
                  <span className="p-1 text-2xl w-7 h-7 flex items-center rounded-full  text-red-500 font-bold bg-red-100">
                    <IoCheckmarkSharp className="inline" />
                  </span>
                  <p className=" text-slate-600 font-size-p">
                    Luxurious interior design and amenities
                  </p>
                </li>
                <li className="flex gap-4 justify-start items-center">
                  <span className="p-1 text-2xl w-7 h-7 flex items-center rounded-full  text-red-500 font-bold bg-red-100">
                    <IoCheckmarkSharp className="inline" />
                  </span>
                  <p className=" text-slate-600 font-size-p">
                    Private balconies with stunning views
                  </p>
                </li>
                <li className="flex gap-4 justify-start items-center">
                  <span className="p-1 text-2xl w-7 h-7 flex items-center rounded-full  text-red-500 font-bold bg-red-100">
                    <IoCheckmarkSharp className="inline" />
                  </span>
                  <p className=" text-slate-600 font-size-p">
                    Outdoor grilling with dining court
                  </p>
                </li>
              </ul>
            </div>
          </div>
          <div className="flex-1">
            <img src={aboutImg3} alt="" />
          </div>
        </div>
        <div>
          <div className="my-24">
            <h1 className="text-lg text-red-500 font-semibold text-center mb- 6">
              Our Services
            </h1>
            <h2 className="font-size-h text-slate-900 font-bold text-bold text-center my-6">
              Our Main Focus
            </h2>
            
            <div className=" flex gap-6 p-6 flex-col sm:flex-row sm:flex-wrap justify-center items-center ">
              <div className=" flex flex-col justify-center items-center gap-6 px-6 py-9  text-center text-slate-300  hover:text-red-500 hover:border-b-2 shadow-2xl  hover:border-b-red-500 transition-colors duration-500 ease-linear sm:flex-initial sm:w-[300px] sm:flex-shrink-0 sm:flex-grow">
                <div className="flex flex-col justify-center  items-center text-red-400 text-center my-6">
                  <RiHome8Line className="text-[45px] text-center" />
                  <FaHandHolding className="text-[60px] -mt-14 z-20" />
                </div>
                <h1 className="text-2xl text-slate-900 font-bold hover:text-red-500 transition-all duration-200 ease-in-out">
                  Buy a Home
                </h1>
                <p className="text-slate-600 text-center font-size-p ">
                  over 1 million+ homes for sale available on the website, we
                  can match you with a house you will want to call home.
                </p>
                <div className="flex items-center justify-center font-semibold mt-6 mb-3">
                  <span>Find a home</span>
                  <span className="pt-1">
                    <HiArrowLongRight />
                  </span>
                </div>
                
              </div>
              <div className="flex flex-col justify-center items-center gap-6 px-6 py-9 text-center text-slate-300 shadow-2xl hover:border-b-2 hover:text-red-500 hover:border-b-red-500 transition-colors duration-500 ease-linear sm:flex-initial sm:w-[300px] sm:flex-shrink-0 sm:flex-grow">
                <div className="flex flex-col justify-center items-center text-red-400 text-center my-6">
                  <AiOutlineDollarCircle className="text-[25px] text-center z-20 -mb-3 font-medium" />
                  <FaHome className="text-[45px] " />
                </div>
                <h1 className="text-2xl text-slate-900 font-bold hover:text-red-500 transition-all duration-200 ease-in-out">
                  Rent a Home
                </h1>
                <p className="text-slate-600 text-center font-size-p">
                  over 1 million+ homes for sale available on the website, we
                  can match you with a house you will want to call home.
                </p>
                <div className="flex items-center justify-center font-semibold mt-6 mb-3">
                  <span>Find a home</span>
                  <span className="pt-1">
                    <HiArrowLongRight />
                  </span>
                </div>
              </div>
              <div className="flex flex-col justify-center items-center gap-6 px-6 py-9 shadow-2xl text-center text-slate-300 hover:border-b-2 hover:text-red-500 hover:border-b-red-500 transition duration-500 sm:flex-initial sm:w-[300px] sm:flex-shrink-0 sm:flex-grow-half lg:flex-grow">
                <div className="flex flex-col justify-center  items-center text-red-400 text-center my-6">
                  <IoHomeOutline className="text-[25px] text-center  font-bold" />
                  <FaRegHandshake className="text-[45px] -mt-[6px]" />
                </div>
                <h1 className="text-2xl text-slate-900 font-bold hover:text-red-500">
                  Sell a Home
                </h1>
                <p className="text-slate-600 text-center font-size-p">
                  over 1 million+ homes for sale available on the website, we
                  can match you with a house you will want to call home.
                </p>
                <div className="flex items-center justify-center font-semibold mt-6 mb-3">
                  <span className="">Find a home</span>
                  <span className="pt-1">
                    <HiArrowLongRight />
                  </span>
                </div>
              </div>
            </div>
            {/* </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutUs;
