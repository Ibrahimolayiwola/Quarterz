import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { TiHomeOutline } from "react-icons/ti";
import { IoClose } from "react-icons/io5";
import { IoSearchSharp } from "react-icons/io5";
import { RiFacebookFill } from "react-icons/ri";
import { RiTwitterXLine } from "react-icons/ri";
import { RiLinkedinBoxFill } from "react-icons/ri";
import { RiInstagramLine } from "react-icons/ri";
import { FaRegUser } from "react-icons/fa";

const Header = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [pageState, setPageState] = useState("Sign in");
  const auth = getAuth();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setPageState("Profile");
      } else {
        setPageState("Sign in");
      }
    });
  }, [auth]);

  return (
    <>
      <header className=" w-full fixed top-0 z-20   bg-white">
        {/* Background overlay for mobile menu pop-up  */}
        <div className="max-w-7xl mx-auto flex justify-between items-center h-16 px-6 py-2 max-md:shadow-md max-md:shadow-slate-400">
          <Link
            className=" w-auto flex justify-center items-center cursor-pointer gap-2"
            to="/"
          >
            <TiHomeOutline className="text-[#ff5a3c] text-4xl" />
            <span className=" text-3xl font-bold text-slate-black">
              Quarterz
            </span>
          </Link>
          <div className="max-md:hidden">
            <ul className="text-[#ff5a3c] font-medium flex space-x-12 items-center">
              <li className="border-b text-sm border-b-transparent font-semibold hover:border-b-orange-600 cursor-pointer py-5">
                <Link to="/">Home</Link>
              </li>

              <li className="border-b text-sm border-b-transparent font-semibold hover:border-b-orange-600 cursor-pointer py-5">
                <Link to="/user-account">{pageState}</Link>
              </li>
              <li className="border-b text-sm border-b-transparent font-semibold hover:border-b-orange-600 cursor-pointer py-5">
                <Link to="/sign-up">Register</Link>
              </li>
              <li className="border-b text-sm border-b-transparent font-semibold hover:border-b-orange-600 cursor-pointer py-5">
                <Link to="/contact">Contact</Link>
              </li>
            </ul>
          </div>
          {/* hamburger menu  */}
          <div
            className={`hamburger_menu`}
            onClick={() => {
              setToggleMenu(!toggleMenu);
            }}
          >
            <span className=""></span>
          </div>
        </div>
      </header>
      {/* mobile nav */}
      <div
        className={`h-[100vh] fixed z-20 w-[90%] sm:w-[80%]  bg-white md:hidden top-0 p-10 space-y-12 transition-all duration-300 ease-out overflow-y-auto scroll-bar ${
          toggleMenu ? "-translate-x-0" : "-translate-x-[100%]"
        }`}
      >
        <div className="flex justify-between items-center pt-6 -mb-3">
          <Link
            className=" w-auto flex justify-center items-center cursor-pointer gap-2"
            to="/"
          >
            <TiHomeOutline className="text-[#ff5a3c] text-4xl" />
            <span className="text-2xl sm:text-3xl font-bold text-slate-700">
              Quarterz
            </span>
          </Link>
          <div
            className="text-3xl font-bold text-[#fb412a] cursor-pointer"
            onClick={() => {
              setToggleMenu(!toggleMenu);
            }}
          >
            <IoClose />
          </div>
        </div>
        <hr />
        <div className="-mt-4 relative">
          <input
            type="text"
            placeholder="Search..."
            className="w-full h-20  border-2 border-slate-300 p-6 placeholder:text-slate-600 focus:border-none focus:ring-orange-600 "
          />
          <IoSearchSharp className="absolute right-6 top-[40%] text-slate-800 font-bold cursor-pointer" />
        </div>
        <div className="space-y-12" onClick={() => setToggleMenu(!toggleMenu)}>
          <ul className="uppercase text-slate-600 space-y-6 font-semibold">
            <li className=" hover:text-[#ff5a3c] cursor-pointer">
              <Link to="/">Home</Link>
            </li>
            <li className=" hover:text-[#ff5a3c] cursor-pointer">
              <Link to="/sign-in">Sign in</Link>
            </li>
            <li className=" hover:text-[#ff5a3c] cursor-pointer">
              <Link to="/sign-up">Register</Link>
            </li>
            <li className=" hover:text-[#ff5a3c] cursor-pointer">
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
          <hr />
          <Link
            to="/user-account"
            className="flex items-center gap-6 cursor-pointer"
          >
            <div className="h-14 w-14 flex justify-center items-center bg-slate-100 border border-slate-300 hover:bg-[#fb412a] hover:text-white">
              <FaRegUser />
            </div>
            <p className="text-slate-600 font-semibold hover:text-[#fb412a] cursor-pointer">
              My Account
            </p>
          </Link>
          <hr />
          <ul className="flex items-center gap-6">
            <li>
              <Link
                to="/"
                className="h-10 w-10 flex justify-center items-center bg-[#f2f6f7] hover:bg-[#fb412a] hover:text-white border border-slate-300 cursor-pointer"
              >
                <RiFacebookFill />
              </Link>
            </li>
            <li>
              <Link
                to="/"
                className=" h-10 w-10 flex justify-center items-center bg-[#f2f6f7] hover:bg-[#fb412a] hover:text-white border border-slate-300 cursor-pointer"
              >
                <RiTwitterXLine />
              </Link>
            </li>
            <li>
              <Link
                to="/"
                className=" h-10 w-10 flex justify-center items-center bg-[#f2f6f7] hover:bg-[#fb412a] hover:text-white border border-slate-300 cursor-pointer"
              >
                <RiLinkedinBoxFill />
              </Link>
            </li>
            <li>
              <Link
                to="/"
                className=" h-10 w-10 flex justify-center items-center bg-[#f2f6f7] hover:bg-[#fb412a] hover:text-white border border-slate-300 cursor-pointer"
              >
                <RiInstagramLine />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Header;
