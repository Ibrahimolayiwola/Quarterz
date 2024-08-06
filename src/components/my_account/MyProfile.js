import React, { useEffect, useState } from "react";
import { dataBase, storage } from "../../config/firebase";
import { getAuth } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { CiLocationOn } from "react-icons/ci";
import { GoMail } from "react-icons/go";
import { MdOutlinePhoneInTalk } from "react-icons/md";
import GetQuote from "../GetQuote";
import { CiUser } from "react-icons/ci";
import useUploadFile from "../../hooks/useUploadFile";
import { deleteObject, ref } from "firebase/storage";

const MyProfile = (e) => {
  const [userData, setUserData] = useState({});
  const auth = getAuth();
  const [image, setImage] = useState([]);
  const { uploadFile } = useUploadFile(image);
  const [uploaded, setUploaded] = useState(true);
  const [imageUrl, setImageUrl] = useState("");
  const { name, firstName, lastName, email, phone, address } = userData || null;

  const uploadImage = async () => {
    if (uploaded) {
      return;
    }
    if (userData.profileImage) {
      deleteImage(userData.profileImage);
    }
    console.log(typeof uploadFile);
    try {
      const url = await uploadFile();
      if (url) {
        setImageUrl(url);
        const docRef = doc(dataBase, "users", auth.currentUser.uid);
        updateDoc(docRef, {
          profileImage: url,
        });
        setUploaded(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onChange = (e) => {
    setImage(e.target.files);
    setUploaded(false);
  };

  const deleteImage = async (imgUrl) => {
    try {
      const path = new URL(imgUrl).pathname;
      const filteredPath = path.slice(35);
      const storageRef = ref(storage, filteredPath);
      await deleteObject(storageRef);
      console.log("image deleted successfully");
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const docRef = doc(dataBase, "users", auth.currentUser.uid);
      try {
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserData(docSnap.data());
          if (docSnap.data().profileImage) {
            setImageUrl(docSnap.data().profileImage);
          }
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchUserData();
  }, [auth.currentUser.uid]);

  return (
    <div className="">
      <div className="flex items-center space-x-6 p-12 bg-white border-2 border-slate-100 mb-10">
        <div className=" w-[140px] h-[150px] flex items-center justify-center flex-col">
          <div className="flex flex-col items-center justify-center relative w-[140px] h-[140px] rounded-full overflow-hidden bg-slate-200">
            <label htmlFor="userImage">
              <CiUser
                className={`text-7xl text-slate-600 ${
                  imageUrl ? "hidden" : ""
                }`}
              />
              <img
                className={`h-full w-full object-cover ${
                  imageUrl ? "" : "hidden"
                }`}
                src={imageUrl}
                alt="user.jpg"
              />
            </label>
            <button
              className={`text-[8px] p-[2px] bg-red-700 text-slate-100 rounded-md uppercase absolute  bottom-1 ${
                uploaded ? "hidden" : ""
              }`}
              onClick={uploadImage}
            >
              {imageUrl ? "update Image" : "upload Image"}
            </button>
            <input
              className="hidden"
              id="userImage"
              type="file"
              onChange={onChange}
              accept=".jpg,.jpeg,.png"
            />
          </div>
        </div>
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-orange-600">
            {name ? name : `${firstName} ${lastName}`}
          </h1>
          <p className="flex text-slate-500  items-center gap-2">
            <CiLocationOn className="text-green-700" />{" "}
            {address ? address : "Allen avenue, Lagos"}
          </p>
          <p className="flex text-slate-500 items-center gap-2">
            <MdOutlinePhoneInTalk /> {phone ? phone : "+1345726246"}
          </p>
          <p className="flex text-slate-500 items-center gap-2">
            <GoMail className="text-orange-600" /> {email}
          </p>
        </div>
      </div>
      <GetQuote />
    </div>
  );
};

export default MyProfile;
