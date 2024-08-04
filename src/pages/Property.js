import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import { dataBase } from "../config/firebase";
import { useParams } from "react-router";
import Spinner from "../components/Spinner";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, FreeMode, Autoplay } from "swiper/modules";
import { FaLocationDot } from "react-icons/fa6";
// import Moment from 'react-moment'
import { FaBed } from "react-icons/fa";
import { MdBathtub } from "react-icons/md";
import { FaSquareParking } from "react-icons/fa6";
import { BsFillSignNoParkingFill } from "react-icons/bs";
import { MdChair } from "react-icons/md";
import { getAuth } from "firebase/auth";
import Contact from "../components/Contact";
import Leaflet from "../components/Leaflet";
import "../swiper-css/property-slider.css";
import { FaArrowLeft } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa6";
import { BsCalendarDate } from "react-icons/bs";
import { FaRegComments } from "react-icons/fa6";
import { IoLocationSharp } from "react-icons/io5";
import { IoIosStar } from "react-icons/io";
import { IoShieldCheckmarkOutline } from "react-icons/io5";
import agentImage from "../assets/images/testimonial/img3.jpg";
import { CgFacebook } from "react-icons/cg";
import { FaWhatsapp } from "react-icons/fa6";
import { TiSocialLinkedin } from "react-icons/ti";
import { FaInstagram } from "react-icons/fa";

const Property = () => {
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const auth = getAuth();
  const [contactLandlord, setContactLandlord] = useState(false);
  const {
    name,
    description,
    type,
    offer,
    regularPrice,
    discountedPrice,
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

  const swiperRef = useRef(null);
  const [swiperNav, setSwiperNav] = useState(true);

  useEffect(() => {
    const fetchProperty = async () => {
      const docRef = doc(dataBase, "properties", params.propertyId);
      try {
        const docSnap = await getDoc(docRef);
        docSnap.exists() && setProperty({ ...docSnap.data() });
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };
    fetchProperty();
  }, [params.propertyId]);

  const handlePrev = () => {
    swiperRef.current.swiper.slidePrev();
  };

  const handleNext = () => {
    swiperRef.current.swiper.slideNext();
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      {property !== null && (
        <div>
          <h1 className="text-slate-200 text-2xl font-semibold m-9">
            Property Details
          </h1>
          <div
            onMouseOver={() => setSwiperNav(true)}
            onMouseOut={() => setSwiperNav(false)}
          >
            <div>
              <button
                onClick={handlePrev}
                className={`h-12 w-12 rounded-full bg-slate-100 absolute top-[350px] z-10 left-10 flex justify-center items-center hover:bg-orange-600 hover:text-slate-100 ${
                  swiperNav ? "" : "hidden"
                }`}
              >
                <FaArrowLeft />
              </button>
              <button
                onClick={handleNext}
                className={`h-12 w-12 rounded-full bg-slate-100 absolute top-[350px] z-10 right-10 flex justify-center items-center hover:bg-orange-600 hover:text-slate-100 ${
                  swiperNav ? "" : "hidden"
                }`}
              >
                <FaArrowRight />
              </button>
            </div>
            <Swiper
              ref={swiperRef}
              slidesPerView={1}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
              }}
              spaceBetween={0}
              freeMode={true}
              pagination={{
                clickable: true,
              }}
              modules={[Pagination, FreeMode, Autoplay]}
              className="swiper w-full swiperContainer"
            >
              {imageUrls.map((url, index) => (
                <SwiperSlide className="swiperSlide" key={index}>
                  <img
                    className="w-full"
                    style={{
                      height: "400px",
                      // width: "100%",
                      objectFit: "cover",
                      display: "block",
                    }}
                    src={url}
                    alt="propertyImage"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div className="flex items-center mt-20 justify-around px-6">
            <div className=" space-y-4 max-w-[500px]  p-4">
              <div className="flex justify-start items-center gap-6 text-sm">
                <p className="uppercase px-2 py-1 bg-orange-600 text-white font-medium text-sm">
                  featured
                </p>
                <p className="uppercase px-2 py-1 bg-orange-400 text-white font-medium text-sm">
                  for rent
                </p>
                <p className="flex justify-center items-center gap-2">
                  <BsCalendarDate className="text-rose-500" />
                  <span>May 19, 2021</span>
                </p>
                <p className="flex justify-center items-center gap-2">
                  <FaRegComments className="text-rose-500 " />
                  <span>35 Comments</span>
                </p>
              </div>
              <p className="text-2xl font-bold">Diamond Manor Apartment</p>
              <p className="flex items-center gap-1">
                <IoLocationSharp className="text-orange-600" />
                <span>Belmont Gardens, Chicago</span>
              </p>
              <div>
                <p className="text-2xl font-bold pb-1">Description</p>
                <p className="text-sm text-slate-600">
                  To the left is the modern kitchen with central island, leading
                  through to the unique breakfast family room which feature
                  glass walls and doors out onto the garden and access to the
                  separate utility room.
                </p>
              </div>
              <div>
                <p className="text-2xl font-bold pb-2">Property Details</p>
                <div>
                  <ul className="grid grid-cols-2 gap-6 bg-slate-100 w-[400px] p-8  rounded-md">
                    <li className="flex items-center gap-2">
                      <span className="inline-block p-2 bg-orange-300 text-xl text-orange-600 rounded-sm">
                        <FaBed className="align-middle " />
                      </span>
                      <p className="text-slate-600 text-sm font-medium">
                        4 Bedrooms
                      </p>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="inline-block p-2 bg-orange-300 text-xl text-orange-600 rounded-sm">
                        <MdBathtub className="align-middle " />
                      </span>
                      <p className="text-slate-600 text-sm font-medium">
                        4 Bathrooms
                      </p>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="inline-block p-2 bg-orange-300 text-xl text-orange-600 rounded-sm">
                        <FaSquareParking className="align-middle " />
                      </span>
                      <p className="text-slate-600 text-sm font-medium">
                        Parking spot
                      </p>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="inline-block p-2 bg-orange-300 text-xl text-orange-600 rounded-sm">
                        <MdChair className="align-middle " />
                      </span>
                      <p className="text-slate-600 text-sm font-medium">
                        Furnished
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="max-w-[500px]">
              <div className="bg-orange-500 text-slate-100 rounded-t-md py-2 font-bold">
                <p className="text-center">Managed By</p>
              </div>
              <div className="w-[500px] space-y-6 bg-white shadow-lg p-6">
                <div>
                  <div className="flex items-center justify-around">
                    <div>
                      <img
                        className="rounded-full h-[110px] w-[110px]"
                        src={agentImage}
                        alt="agent"
                      />
                    </div>
                    <div>
                      <p className="text-indigo-600 text-sm mb-1 font-bold uppercase">
                        Jeff Kebeck
                      </p>
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-1 text-sm font-medium">
                          <span className="inline-block p-[2px] bg-orange-500 text-white rounded-full text-xs">
                            <IoIosStar className="align-middle" />
                          </span>
                          <span className="inline-block p-[2px] bg-orange-500 text-white rounded-full text-xs">
                            <IoIosStar className="align-middle" />
                          </span>
                          <span className="inline-block p-[2px] bg-orange-500 text-white rounded-full text-xs">
                            <IoIosStar className="align-middle" />
                          </span>
                          <span className="inline-block p-[2px] bg-orange-500 text-white rounded-full text-xs">
                            <IoIosStar className="align-middle" />
                          </span>
                          <span className="inline-block p-[2px] bg-orange-500 text-white rounded-full text-xs">
                            <IoIosStar className="align-middle" />
                          </span>
                          <p className="pl-1 text-xs">16 reviews</p>
                        </div>
                        <p className="text-xs flex items-center">
                          <span className="inline-block p-[2px] rounded-full bg-indigo-600 text-white text-xs">
                            <IoShieldCheckmarkOutline className="align-middle" />
                          </span>
                          <span className="font-semibold">Top Agent</span>
                        </p>
                      </div>
                      <div className="border-b-[1.5px] border-b-orange-600 my-4"></div>
                      <p className="text-xs">
                        <span className="font-semibold">15 years</span> of
                        experience in
                        <span> Property Management</span>
                      </p>
                    </div>
                  </div>
                  <div className="text-sm flex items-center gap-4 mt-2">
                    <p className="font-bold text-slate-800">Languages:</p>
                    <p className="px-2 text-xs py-1 bg-slate-100 rounded-md text-center">
                      French
                    </p>
                    <p className="px-2 py-1 rounded-md text-xs bg-slate-100 text-center">
                      English
                    </p>
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-bold text-sm">Quaterz Ratings</p>
                    <div className="border-b-[1.5px] border-b-orange-500 flex-1"></div>
                  </div>
                  <div className="flex gap-3 items-center my-2 justify-center">
                    <div className="flex flex-col justify-center text-center bg-slate-100 gap-1 py-2 text-xs px-3 rounded-md">
                      <p>Onboarding</p>
                      <div className="flex items-center gap-1 justify-center">
                        <span className="inline-block p-[2px] bg-orange-500 text-white rounded-full text-xs">
                          <IoIosStar className="align-middle" />
                        </span>
                        <span className="inline-block p-[2px] bg-orange-500 text-white rounded-full text-xs">
                          <IoIosStar className="align-middle" />
                        </span>
                        <span className="inline-block p-[2px] bg-orange-500 text-white rounded-full text-xs">
                          <IoIosStar className="align-middle" />
                        </span>
                        <span className="inline-block p-[2px] bg-orange-500 text-white rounded-full text-xs">
                          <IoIosStar className="align-middle" />
                        </span>
                        <span className="inline-block p-[2px] bg-orange-500 text-white rounded-full text-xs">
                          <IoIosStar className="align-middle" />
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col justify-center bg-slate-100 text-xs gap-1 py-2 px-3 rounded-md">
                      <p>Responsiveness</p>
                      <div className="flex items-center gap-1 justify-center">
                        <span className="inline-block p-[2px] bg-orange-500 text-white rounded-full text-xs">
                          <IoIosStar className="align-middle" />
                        </span>
                        <span className="inline-block p-[2px] bg-orange-500 text-white rounded-full text-xs">
                          <IoIosStar className="align-middle" />
                        </span>
                        <span className="inline-block p-[2px] bg-orange-500 text-white rounded-full text-xs">
                          <IoIosStar className="align-middle" />
                        </span>
                        <span className="inline-block p-[2px] bg-orange-500 text-white rounded-full text-xs">
                          <IoIosStar className="align-middle" />
                        </span>
                        <span className="inline-block p-[2px] bg-orange-500 text-white rounded-full text-xs">
                          <IoIosStar className="align-middle" />
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col justify-center bg-slate-100 text-xs gap-1 py-2 px-3 rounded-md">
                      <p>Communication</p>
                      <div className="flex items-center gap-1 justify-center">
                        <span className="inline-block p-[2px] bg-orange-500 text-white rounded-full text-xs">
                          <IoIosStar className="align-middle" />
                        </span>
                        <span className="inline-block p-[2px] bg-orange-500 text-white rounded-full text-xs">
                          <IoIosStar className="align-middle" />
                        </span>
                        <span className="inline-block p-[2px] bg-orange-500 text-white rounded-full text-xs">
                          <IoIosStar className="align-middle" />
                        </span>
                        <span className="inline-block p-[2px] bg-orange-500 text-white rounded-full text-xs">
                          <IoIosStar className="align-middle" />
                        </span>
                        <span className="inline-block p-[2px] bg-orange-500 text-white rounded-full text-xs">
                          <IoIosStar className="align-middle" />
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-3 items-center my-2 justify-center">
                    <div className="flex flex-col justify-center bg-slate-100 text-xs gap-1 py-2 px-3 rounded-md">
                      <p>Tenant Experience</p>
                      <div className="flex items-center gap-1 justify-center">
                        <span className="inline-block p-[2px] bg-orange-500 text-white rounded-full text-xs">
                          <IoIosStar className="align-middle" />
                        </span>
                        <span className="inline-block p-[2px] bg-orange-500 text-white rounded-full text-xs">
                          <IoIosStar className="align-middle" />
                        </span>
                        <span className="inline-block p-[2px] bg-orange-500 text-white rounded-full text-xs">
                          <IoIosStar className="align-middle" />
                        </span>
                        <span className="inline-block p-[2px] bg-orange-500 text-white rounded-full text-xs">
                          <IoIosStar className="align-middle" />
                        </span>
                        <span className="inline-block p-[2px] bg-orange-500 text-white rounded-full text-xs">
                          <IoIosStar className="align-middle" />
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col justify-center bg-slate-100 text-xs gap-1 py-2 px-3 rounded-md">
                      <p>Landlord Experience</p>
                      <div className="flex items-center gap-1 justify-center">
                        <span className="inline-block p-[2px] bg-orange-500 text-white rounded-full text-xs">
                          <IoIosStar className="align-middle" />
                        </span>
                        <span className="inline-block p-[2px] bg-orange-500 text-white rounded-full text-xs">
                          <IoIosStar className="align-middle" />
                        </span>
                        <span className="inline-block p-[2px] bg-orange-500 text-white rounded-full text-xs">
                          <IoIosStar className="align-middle" />
                        </span>
                        <span className="inline-block p-[2px] bg-orange-500 text-white rounded-full text-xs">
                          <IoIosStar className="align-middle" />
                        </span>
                        <span className="inline-block p-[2px] bg-orange-500 text-white rounded-full text-xs">
                          <IoIosStar className="align-middle" />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-bold text-sm">Agent Profile</p>
                    <div className="border-b-[1.5px] border-b-orange-500 flex-1"></div>
                  </div>
                  <div className="flex justify-center items-center gap-6 my-2">
                    <div className="space-x-2 pt-2">
                      <span className="inline-block p-1 rounded-md bg-indigo-500 text-white">
                        <CgFacebook className="align-middle" />
                      </span>
                      <span className="inline-block p-1 rounded-md bg-indigo-500 text-white">
                        <FaWhatsapp className="align-middle" />
                      </span>
                      <span className="inline-block p-1 rounded-md bg-indigo-500 text-white ">
                        <TiSocialLinkedin className="align-middle" />
                      </span>
                      <span className="inline-block p-1 rounded-md bg-indigo-500 text-white ">
                        <FaInstagram className="align-middle" />
                      </span>
                    </div>
                    <button className="bg-orange-500 text-slate-100 font-semibold px-4 py-1 text-sm flex-1 rounded-md">
                      Contact Agent
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* <div className="mt-20 max-w-5xl mx-auto shadow-sm shadow-[#a73eed] bg-[#205] lg:flex lg:gap-4 p-4 md:px-6 backdrop: lg:p-2">
            <div className=" flex-1 text-slate-200">
              <p className="text-[#a73eed] font-bold px-4 pt-2 ">
                {name} for -{" "}
                {offer
                  ? discountedPrice
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "$"
                  : regularPrice
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "$"}
                {type === "rent" && " /month"}
              </p>
              <div className="flex items-center gap-2 font-medium px-4">
                <FaLocationDot className="text-green-500" />
                <p>{address}</p>
              </div>
              <div className="text-slate-200 font-medium flex gap-4 px-4 py-2 items-center w-[400px]">
                <p className="text-center flex-1 text-sm px-4 py-1 bg-red-600 rounded-md">
                  {" "}
                  {type === "rent" ? "Rent" : "Sale"}
                </p>
                {offer && (
                  <p className="bg-green-600 rounded-md text-sm flex-1  text-center px-1 py-1 ">
                    ${+regularPrice - +discountedPrice} discount
                  </p>
                )}
              </div>
              <p className="px-4 py-2 flex flex-col">
                <span className="px-2 border-l-2 border-l-[#a73eed] font-semibold">
                  Description{" "}
                </span>
                <span>{description}</span>{" "}
              </p>
              <div className="px-4 py-2">
                <p className="px-2 border-l-2 border-l-[#a73eed] font-semibold">
                  Property features
                </p>
                <ul className="flex gap-9 mt-1 items-center">
                  <li className="flex items-center ">
                    <FaBed />
                    <span className="text-sm">
                      {beds === 1 ? "1 bed" : `${beds} beds`}
                    </span>
                  </li>
                  <li className="flex items-center ">
                    <MdBathtub />
                    <span className="text-sm">
                      {baths === 1 ? "1 bath" : `${baths} beds`}
                    </span>
                  </li>
                  <li className="flex items-center">
                    {parking ? (
                      <>
                        <FaSquareParking />
                        <span className="text-sm">Parking spot</span>
                      </>
                    ) : (
                      <>
                        <BsFillSignNoParkingFill />
                        <span className="text-sm">No Parking</span>
                      </>
                    )}
                  </li>
                  <li className="flex items-center">
                    <MdChair />
                    {furnished ? (
                      <span className="text-sm">Furnished</span>
                    ) : (
                      <span className="text-sm">Not Furnished</span>
                    )}
                  </li>
                </ul>
              </div>
              {userRef !== auth.currentUser?.uid && !contactLandlord && (
                <div className="px-6 py-4">
                  <button
                    onClick={() => setContactLandlord(true)}
                    className="text-sm bg-green-700 font-medium uppercase  px-7 py-2 text-slate-200 rounded-md w-full  shadow-md hover:bg-green-800 hover:shadow-lg transition ease-in-out duration-200 "
                  >
                    Contact the landlord
                  </button>
                </div>
              )}
              {contactLandlord && (
                <Contact userRef={userRef} property={property} />
              )}
            </div>
            <div className="p-4 h-[250px]  flex-1 z-10 overflow-x-hidden">
              <Leaflet property={property} />
            </div>
          </div> */}
        </div>
      )}
    </>
  );
};

export default Property;
