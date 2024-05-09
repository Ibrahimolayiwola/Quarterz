import React, { useCallback, useEffect, useState } from "react";
import homeImg from "../assets/images/home-img.png";
import { FaHome } from "react-icons/fa";
import FeaturedListing from "./FeaturedListing";
import AboutUs from "../components/AboutUs";
// import clientImg from '../assets/images/client_img.jpg'
import backgroundImage from "../assets/images/client_img.jpg";
import TestimonialSlider from "../components/TestimonialSlider";
import { auth, dataBase } from "../config/firebase";
import { useSelector } from "react-redux";
import { doc, getDoc, setDoc } from "firebase/firestore";

const Home = () => {
  const formDataCopy = useSelector((state) => state.form);
  const [userVerified, setUserVerified] = useState(false);
  const uploadData = useCallback(async () => {
    if (userVerified) {
      const docRef = doc(dataBase, "users", auth.currentUser.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return;
      }
      await setDoc(docRef, formDataCopy);
    }
  }, [formDataCopy, userVerified]);

  useEffect(() => {
    auth.onAuthStateChanged((userCred) => {
      if (userCred) {
        const { emailVerified } = userCred;
        setUserVerified(emailVerified);
      }
    });
    uploadData();
  }, [uploadData, userVerified]);

  return (
    <>
      <section className="bg-slate-100 flex flex-col-reverse  lg:flex-row max-h-[800px] py-9 shadow-sm  items-center max-sm:gap-8">
        <div className="flex-1 max-sm:p-4">
          <div className="flex justify-center lg:ml-16">
            <img className="width-img" src={homeImg} alt="home-img" />
          </div>
        </div>
        <div className="flex-1 flex items-center justify-end max-sm:p-4">
          <div className=" justify-self-end md:p-16 max-sm:px-8">
            <div className="flex gap-2 items-center justify-end mb-2">
              <FaHome className="text-orange-600 text-lg" />
              <p className="text-slate-900 font-medium font-size-p">
                Real Estate Agency
              </p>
            </div>
            <h1 className="text-slate-900 font-size-h py-2 font-bold text-right">
              The Right Place To Find Your Dream Home
            </h1>
            <p className="text-slate-600 text-right  py-4 px-6 font-size-p border-r border-orange-600 mb-4 mt-2">
              We understand the significance of finding a perfect home and we
              are here to guide you every step to find your dream home
            </p>
            <div className="flex space-x-6 mt-2 justify-end items-center font-medium">
              <button className="text-slate-100 text-center px-5 py-3 uppercase bg-orange-600  font-size-p ">
                Our Services
              </button>
              <button className="text-slate-800 text-center px-5 py-3 uppercase bg-  shadow-md font-size-p">
                Learn more
              </button>
            </div>
          </div>
        </div>
      </section>
      <section>
        <AboutUs />
      </section>
      <section>
        <div className="my-40">
          <h1 className="text-center mb-2">
            <span className="text-red-500 text-lg  px-4 py-2  font-semibold">
              Properties
            </span>
          </h1>
          <h1 className="text-xl text-slate-900  m-9 font-bold px-20">
            Featured Listing
          </h1>
          <div className="mx-6 featured-listing">
            <FeaturedListing />
          </div>
        </div>
      </section>
      <section className="h-screen relative ">
        <div
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          className="absolute top-0 left-0 h-[500px] w-[100%] -z-10 "
        ></div>
        <div className="max-w-[80rem] relative mx-auto">
          <div className="testimonial-wrapper ">
            <div className="px-12 flex flex-col pt-48 relative">
              <p className="text-slate-100 font-size-p font-medium">
                Client,s Testimonial
              </p>
              <h2 className="font-size-h text-slate-100 font-bold">
                See What,s Our Client <br /> Says About Us
              </h2>
            </div>
            <TestimonialSlider />
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
