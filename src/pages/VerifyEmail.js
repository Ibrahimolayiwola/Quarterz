import React, { useCallback, useEffect, useState } from "react";
import emailIcon from "../assets/contactUs-icon/contact-icon-1.png";
import { auth, dataBase } from "../config/firebase";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { doc, setDoc } from "firebase/firestore";

const VerifyEmail = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const userData = useSelector((state) => state.form);
  const [userVerified, setUserVerified] = useState(false);

  const uploadData = useCallback(async () => {
    try {
      await setDoc(doc(dataBase, "users", auth.currentUser.uid), userData);
      navigate("/");
    } catch (error) {
      console.error(error.message);
    }
  }, [userData, navigate]);

  useEffect(() => {
    const { email, emailVerified } = auth.currentUser;
    setEmail(email);
    setUserVerified(emailVerified);

    if (userVerified) {
      uploadData();
    }
  }, [uploadData]);
  return (
    <div className="flex flex-col justify-center items-center gap-10 mt-16 text-slate-700">
      <div>
        <img src={emailIcon} alt="userEmail" />
      </div>
      <div>
        <h1 className="text-slate-800 text-xl font-semibold text-center mb-2">
          Verify your email to continue
        </h1>
        <p className="text-center text-slate-500 leading-6">
          We just sent an email to the address: <br />
          {email} <br />
          Please check your email and select the link provided to <br /> verify
          your address.
        </p>
      </div>
      <div className="flex justify-center items-center gap-8">
        <button className="px-4 py-2 rounded-2xl text-center text-orange-600 border-2 border-orange-600 w-36 font-semibold">
          Send again
        </button>
        <button className="px-4 py-2 rounded-2xl text-center bg-orange-600  border-2 border-orange-600 text-slate-100 w-36 font-semibold">
          Go to mail box
        </button>
      </div>
    </div>
  );
};

export default VerifyEmail;
