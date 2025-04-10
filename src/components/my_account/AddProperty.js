import React, { useState } from "react";
import useUploadFile from "../../hooks/useUploadFile";
import { toast } from "react-toastify";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { auth, dataBase } from "../../config/firebase";
import { useNavigate } from "react-router";
import Spinner from "../Spinner";

const AddProperty = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    type: "sale",
    offer: false,
    regularPrice: 0,
    discountedPrice: 0,
    beds: 1,
    baths: 1,
    parking: false,
    furnished: false,
    address: "",
    latitude: 0,
    longitude: 0,
    images: [],
  });

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
    latitude,
    longitude,
    images,
  } = formData;

  const { uploadFile } = useUploadFile(images);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  let fileUrl = null;
  const handleChange = (e) => {
    const { id, value, files } = e.target;
    let bool = null;
    bool = value === "true" ? true : null;
    bool = value === "false" ? false : null;

    setFormData({
      ...formData,
      [id]: bool ?? value,
    });
    files &&
      setFormData({
        ...formData,
        images: files,
      });
    console.log(typeof value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (discountedPrice >= regularPrice) {
      setLoading(false);
      toast.error("Discounted price must be less than regular price");
      return;
    }

    if (images.length > 6) {
      setLoading(false);
      toast.error("Maximum of six images is allowed");
      return;
    }
    try {
      fileUrl = await uploadFile();
      if (fileUrl === null) {
        console.error("image upload failed");
        return;
      }
      const formDataCopy = {
        ...formData,
        imageUrls: fileUrl,
        timeStamp: serverTimestamp(),
        userRef: auth.currentUser.uid,
        agentName: auth.currentUser.displayName,
      };
      delete formDataCopy.images;
      !offer && delete formDataCopy.discountedPrice;
      const docRef = await addDoc(
        collection(dataBase, "properties"),
        formDataCopy
      );

      setLoading(false);
      toast.success("Property created successfully");
      navigate(`/category/${formData.type}/${docRef.id}`);
    } catch (error) {
      setLoading(false);
      toast.error("Error creating property");
      return;
    }
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <div>
      <form className=" flex justify-center items-center max-sm:text-xs">
        <div className="space-y-8 w-full">
          <div className="space-y-4">
            <p className="text-slate-800 font-medium">Property Description</p>
            <input
              id="name"
              value={name}
              placeholder="Name"
              type="text"
              required
              minLength={10}
              maxLength={32}
              onChange={handleChange}
              className="w-full bg-transparent focus:border-none border-2 focus:bg-transparent cursor-pointer border-slate-200 h-14 focus:outline-none focus:ring-secondary appearance-none"
            />
            <textarea
              id="description"
              value={description}
              placeholder="Description"
              required
              onChange={handleChange}
              type="text"
              className="w-full appearance-none bg-transparent border-2 border-slate-200  min-h-[120px] max-h-[120px] focus:outline-none focus:border-none focus:ring-secondary"
            />
          </div>
          <div className=" space-y-4">
            <p className="text-slate-800 font-medium ">Property Type</p>
            <div className="flex space-x-4">
              <button
                id="type"
                value="sale"
                type="button"
                onClick={handleChange}
                className={` py-2  font-medium  flex-1 uppercase transition-colors duration-200 ease-linear ${
                  type === "sale"
                    ? "bg-secondary text-white"
                    : "text-secondary border-2 border-slate-200 "
                }`}
              >
                Sale
              </button>
              <button
                id="type"
                value="rent"
                type="button"
                onClick={handleChange}
                className={` py-2  font-medium  flex-1 uppercase transition-colors duration-200 ease-in-out ${
                  type === "rent"
                    ? "bg-secondary text-white"
                    : "text-secondary border-2 border-slate-100"
                }`}
              >
                Rent
              </button>
            </div>
          </div>
          <div className="space-y-4">
            <p className="text-slate-800 font-medium">Property Price</p>
            <div className="flex space-x-4 mb-4">
              <button
                id="offer"
                type="button"
                value={true}
                onClick={handleChange}
                className={` py-2  font-medium  flex-1 uppercase transition-colors duration-300 ease-linear ${
                  offer
                    ? "bg-secondary text-white"
                    : "text-secondary border-2 border-slate-200"
                }`}
              >
                Offer
              </button>
              <button
                id="offer"
                type="button"
                value={false}
                onClick={handleChange}
                className={` py-2  font-medium  flex-1 uppercase transition-colors duration-300 ease-linear ${
                  !offer
                    ? "bg-secondary text-white"
                    : "text-secondary border-2 border-slate-200"
                }`}
              >
                No Offer
              </button>
            </div>
            <div className="flex space-x-4 ">
              <div className="flex-1 relative">
                <input
                  id="regularPrice"
                  value={regularPrice}
                  required
                  onChange={handleChange}
                  min={1000}
                  max={9999999}
                  type="number"
                  className="w-full bg-transparent transition-all duration-400 ease-out focus:border-none border-2 focus:bg-transparent cursor-pointer border-slate-200 py-2 focus:outline-none focus:ring-secondary"
                />
                <p className="absolute left-[40%] top-[30%] text-sm max-sm:text-xs text-slate-600">
                  Regular ($)
                </p>
              </div>
              <div className={`relative flex-1 ${!offer ? "hidden" : ""}`}>
                <input
                  id="discountedPrice"
                  value={discountedPrice}
                  type="number"
                  required
                  onChange={handleChange}
                  min={1000}
                  max={9999999}
                  className="w-full bg-transparent transition-all duration-400 ease-out focus:border-none border-2 focus:bg-transparent cursor-pointer border-slate-200 py-2 focus:outline-none focus:ring-secondary"
                />
                <p className="absolute left-[35%] top-[30%] text-sm max-sm:text-xs text-slate-400">
                  Discounted ($)
                </p>
              </div>
            </div>
          </div>
          <div className="space-y-4 ">
            <p className="text-slate-800 font-medium">Property features</p>
            <div className="space-y-4">
              <div className="flex space-x-4">
                <div className="flex-1 relative">
                  <input
                    id="beds"
                    value={beds}
                    type="number"
                    required
                    min={1}
                    max={18}
                    onChange={handleChange}
                    className="w-full bg-transparent focus:border-none border-2 focus:bg-transparent cursor-pointer border-slate-200 py-2 focus:outline-none focus:ring-secondary appearance-none"
                  />
                  <p className="absolute left-[40%] top-[30%] text-sm max-sm:text-xs text-slate-400">
                    bedrooms
                  </p>
                </div>
                <div className="relative flex-1">
                  <input
                    id="baths"
                    min={1}
                    max={18}
                    value={baths}
                    type="number"
                    required
                    onChange={handleChange}
                    className="w-full bg-transparent focus:border-none border-2 focus:bg-transparent cursor-pointer border-slate-200 py-2 focus:outline-none focus:ring-secondary appearance-none"
                  />
                  <p className="absolute left-[40%] top-[30%] text-sm max-sm:text-xs text-slate-400">
                    bathrooms
                  </p>
                </div>
              </div>
              <div className="flex space-x-4 mb-4">
                <button
                  id="parking"
                  value={true}
                  type="button"
                  onClick={handleChange}
                  className={` max-sm:text-xs py-2  font-medium  flex-1 uppercase transition-colors duration-300 ease-linear  ${
                    parking
                      ? "bg-secondary text-white"
                      : "text-secondary border-2 border-slate-200"
                  }`}
                >
                  Parking
                </button>
                <button
                  id="parking"
                  value={false}
                  type="button"
                  onClick={handleChange}
                  className={` max-sm:text-xs py-2 font-medium  flex-1 uppercase transition-colors duration-300 ease-linear ${
                    !parking
                      ? "bg-secondary text-white"
                      : "text-secondary border-2 border-slate-200"
                  }`}
                >
                  No Parking
                </button>
              </div>
              <div className="flex space-x-4 mb-4">
                <button
                  id="furnished"
                  className={`py-2 max-sm:text-xs  font-medium  flex-1 uppercase ${
                    furnished
                      ? "bg-secondary text-white"
                      : "text-secondary border-2 border-slate-200"
                  }`}
                  type="button"
                  value={true}
                  onClick={handleChange}
                >
                  Furnished
                </button>
                <button
                  id="furnished"
                  type="button"
                  value={false}
                  onClick={handleChange}
                  className={`py-2 max-sm:text-xs   font-medium  flex-1 uppercase transition-colors duration-300 ease-linear ${
                    !furnished
                      ? "bg-[#ff5a3] text-white"
                      : "text-secondary border-2 border-slate-200"
                  }`}
                >
                  Not furnished
                </button>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <p className="text-slate-800 font-medium">Property Location</p>
            <div>
              <input
                type="text"
                value={address}
                id="address"
                minLength={10}
                maxLength={64}
                required
                onChange={handleChange}
                placeholder="Address"
                className="w-full bg-transparent focus:border-none border-2 focus:bg-transparent cursor-pointer border-slate-200 h-14 focus:outline-none focus:ring-secondary appearance-none"
              />
            </div>
            <div className="flex space-x-4">
              <div className="flex-1 relative">
                <input
                  id="longitude"
                  value={longitude}
                  type="number"
                  required
                  onChange={handleChange}
                  className="w-full bg-transparent focus:border-none border-2 focus:bg-transparent cursor-pointer border-slate-200 py-2 focus:outline-none focus:ring-secondary appearance-none"
                />
                <p className="absolute left-[40%] top-[30%] text-sm max-sm:text-xs text-slate-400">
                  Longitude
                </p>
              </div>
              <div className="relative flex-1">
                <input
                  id="latitude"
                  value={latitude}
                  type="number"
                  required
                  onChange={handleChange}
                  className="w-full bg-transparent focus:border-none border-2 focus:bg-transparent cursor-pointer border-slate-200 py-2 focus:outline-none focus:ring-secondary appearance-none"
                />
                <p className="absolute left-[40%] top-[30%] text-sm max-sm:text-sm text-slate-400">
                  Latitude
                </p>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <p className="text-slate-800 font-medium">Property image</p>
            <div className="relative">
              <input
                type="file"
                multiple
                required
                onChange={handleChange}
                accept=".jpeg, .jpg, .png"
                className="w-full bg-transparent focus:border-none border-2 focus:bg-transparent cursor-pointer border-slate-200 h-14 focus:outline-none focus:ring-secondary appearance-none pt-3 pl-3"
              />
              <p className="absolute right-[15%] top-[35%] text-sm text-slate-400 max-sm:text-xs ">
                Max of six
              </p>
            </div>
          </div>
          <div>
            <button
              type="submit"
              onClick={handleSubmit}
              className="px-6 py-4 bg-secondary text-white font-medium  w-full uppercase cursor-pointer hover:bg-orange-700"
            >
              Create Property
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddProperty;
