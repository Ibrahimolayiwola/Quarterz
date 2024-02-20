import React from "react";
import logo from "../assets/logo/home-logo/logo-2.png";
import { FaFacebookF } from "react-icons/fa";
import { BsLinkedin } from "react-icons/bs";
import { FaTwitter } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import { FiPhoneCall } from "react-icons/fi";
import { GoMail } from "react-icons/go";
import { DivOverlay } from "leaflet";
import { FaAmazonPay } from "react-icons/fa";
import { FaCcMastercard } from "react-icons/fa6";
import { RiVisaLine } from "react-icons/ri";
import { SiDiscover } from "react-icons/si";
import { SiAmericanexpress } from "react-icons/si";
import { IoIosSend } from "react-icons/io";
import paymentLogo from "../assets/logo/payment-logo/payment-4.png";
import { HiArrowLongRight } from "react-icons/hi2";
import { GoArrowRight } from "react-icons/go";

const Footer = () => {

  const year = new Date().getFullYear()
  return (
    <>
      <div className="mt-60 relative">
        <div className="w-[90%] sm:w-[80%] md:w-[90%] max-w-[75rem]  bg-orange-600 absolute left-0 right-0 -top-20  h-42 mx-auto p-12 mb-20">
          <div className="flex flex-col gap-6 justify-between items-center md-lg:flex-row">
            <div>
              <h1 className="font-size-h text-white font-bold">
                Looking for a dream home?
              </h1>
              <p className="text-sm text-white mt-4">
                We can help you realize your dream of new home
              </p>
            </div>
            <div>
              <button className="text-slate-800 bg-white flex justify-center items-center py-4 font-size-p  px-8">
                <span>Explore properties</span>
                <span className="mx-1">
                  <GoArrowRight className="" />
                </span>
              </button>
            </div>
          </div>
        </div>
        <div className="bg-black pt-40 ">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-20 lg-xl:flex lg-xl:gap-10 p-6 items-start justify-center xl:p-10 xl-2xl:p-24 2xl:px-36  2xl-3xl:px-40 2.6xl:px-40 2.6xl:gap-24 max-sm:pt-24">
            <div className="text-slate-200 pb-6">
              <div className="">
                <img src={logo} className=" cursor-pointer" />
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-slate-200 mt-2 pr-2">
                  Lorem Ipsum is simply dummy text of the and typesetting
                  industry. Lorem Ipsum is dummy text of the printing.
                </p>
                <div className="flex gap-2 items-center mt-1">
                  <IoLocationOutline />
                  <p>Festac town, Lagos State Nigeria</p>
                </div>
                <div className="flex gap-2 items-center">
                  <FiPhoneCall />
                  <p>+23457974697</p>
                </div>
                <div className="flex gap-2 items-center">
                  <GoMail />
                  <p>Ibrahim333@gmail.com</p>
                </div>
                <div className="flex gap-3">
                  <FaFacebookF />
                  <FaTwitter />
                  <BsLinkedin />
                  <FaYoutube />
                </div>
              </div>
            </div>
            <div className="text-slate-200 w-44 lg-xl:flex-initial lg-xl:flex-shrink-0">
              <h1 className="text-xl font-bold">Company</h1>
              <ul className="flex flex-col gap-3 mt-4">
                <li>About</li>
                <li>Blog</li>
                <li>All Properties</li>
                <li>location Map</li>
                <li>FAQ</li>
                <li>Contact us</li>
              </ul>
            </div>
            <div className="text-slate-200 w-44 lg-xl:flex-initial lg-xl:flex-shrink-0">
              <h1 className="text-xl font-bold">Services</h1>
              <ul className="flex flex-col gap-3 mt-4">
                <li>Order tracking</li>
                <li>Wish List</li>
                <li>Login</li>
                <li>My Account</li>
                <li>Terms and Conditions</li>
                <li>Promotional Offers</li>
              </ul>
            </div>
            <div className="text-slate-200 w-44 lg-xl:flex-initial lg-xl:flex-shrink-0">
              <h1 className="text-lg font-bold">Customer Care</h1>
              <ul className="flex flex-col gap-3 mt-4">
                <li>Login</li>
                <li>My Account</li>
                <li>Wish List</li>
                <li>Order Tracking</li>
                <li>FAQ</li>
                <li>Contact Us</li>
              </ul>
            </div>
            <div className=" text-slate-200 ">
              <h1 className="text-slate-200 text-xl font-bold mb-4">
                News Letter
              </h1>
              <p className="mb-4">
                Subscribe to our weekly Newsletter and receive updates via email
              </p>
              <div className="flex justify-start items-center mb-4">
                <input
                  type="email"
                  placeholder="Email*"
                  className="flex-1 py-4"
                />
                <div className="bg-orange-600 px-4 py-[20px] text-lg">
                  <IoIosSend />
                </div>
              </div>
              <p>We Accept</p>
              <div className=" mt-4">
                <img src={paymentLogo} alt="payment" />
              </div>
            </div>
          </div>
         <div className="w-full bg-gray-900 ">
         <div className=" text-slate-100 p-8 flex flex-col justify-center gap-4  items-center md:flex-row md:justify-between xl:px-10 xl-2xl:px-24 2xl:px-36  2xl-3xl:px-40 2.6xl:px-40">
            <div>
              <p>All rights reserved @ Company {year}</p>
            </div>
            <div>
              <ul className="flex gap-4 justify-center items-center">
                <li>Terms & Conditions</li>
                <li>Claims</li>
                <li>Privacy & Policy</li>
              </ul>
            </div>
          </div>
         </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
