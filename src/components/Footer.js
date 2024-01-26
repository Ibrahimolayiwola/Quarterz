import React from "react";
import logo from "../assets/logo/logo.png";
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

const Footer = () => {
  return (
    <>
      <div className="flex items-start justify-center gap-10 p-6 bg-black">
        <div className="text-slate-200 flex-1 pb-6 -mt-3">
          <div className="">
            <img src={logo} className=" w-[120px] cursor-pointer" />
          </div>
          <div className="flex flex-col gap-4 ">
            <p className="text-slate-200 -mt-2">
              Lorem Ipsum is simply dummy text of the and typesetting industry.
              Lorem Ipsum is dummy text of the printing.
            </p>
            <div className="flex gap-2 items-center mt-2">
              <IoLocationOutline />
              <p>Festac town, Lagos State Nigeria</p>
            </div>
            <div className="flex gap-2 items-center">
              <FiPhoneCall />
              <p>+23457974697</p>
            </div>
            <div className="flex gap-2 items-center">
              <GoMail />
              <p>Ibrahimolayiwola333@gmail.com</p>
            </div>
            <div className="flex gap-3">
              <FaFacebookF />
              <FaTwitter />
              <BsLinkedin />
              <FaYoutube />
            </div>
          </div>
        </div>
        <div className="text-slate-200 flex-1">
          <h1 className="text-xl font-bold">Company</h1>
          <ul className="flex flex-col gap-4 mt-6">
            <li>About</li>
            <li>Blog</li>
            <li>All Properties</li>
            <li>location Map</li>
            <li>FAQ</li>
            <li>Contact us</li>
          </ul>
        </div>
        <div className="text-slate-200 flex-1">
          <h1 className="text-xl font-bold">Services</h1>
          <ul className="flex flex-col gap-4 mt-6">
            <li>Order tracking</li>
            <li>Wish List</li>
            <li>Login</li>
            <li>My Account</li>
            <li>Terms and Conditions</li>
            <li>Promotional Offers</li>
          </ul>
        </div>
        <div className="text-slate-200 flex-1">
          <h1 className="text-xl font-bold">Customer Care</h1>
          <ul className="flex flex-col gap-4 mt-6">
            <li>Login</li>
            <li>My Account</li>
            <li>Wish List</li>
            <li>Order Tracking</li>
            <li>FAQ</li>
            <li>Contact Us</li>
          </ul>
        </div>
        <div className="flex-1 text-slate-200 ">
          <h1 className="text-slate-200 text-xl font-bold mb-5">News Letter</h1>
          <p className="mb-5">Subscribe to our weekly Newsletter and receive updates via email</p>
          <div className="flex justify-center items-center mb-5">
            <input type="email" placeholder="Email*" className="flex-1 py-4" />
            <div className="bg-[#a73eed] px-4 py-[20px] text-lg">
            <IoIosSend />
            </div>
          </div>
          <p>We Accept</p>
          <div className="flex text-lg items-center justify-around py-2 bg-white text-[#205] mt-4">
            <FaAmazonPay className="text-2xl text-sky-400"  />
            <FaCcMastercard className="text-2xl text-orange-500" />
            <RiVisaLine className="text-2xl" />
            <SiDiscover className="text-2xl font-bold" />
            <SiAmericanexpress className="text-2xl text-sky-400" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
