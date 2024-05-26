import React, { useCallback, useEffect, useState } from "react";
import emailIcon from "../assets/contactUs-icon/contact-icon-1.png";
import { auth, dataBase } from "../config/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useSelector } from "react-redux";

const VerifyEmail = () => {
  const [userEmail, setUserEmail] = useState("");
  const { email } = auth.currentUser;
  const [userVerified, setUserVerified] = useState(false);
  const formDataCopy = useSelector((state) => state.form);
  const [user, setUser] = useState(null);
  const emailVerified = user ? user.emailVerified : false;
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
    setUserEmail(email);

    const unsubscribe = auth.onAuthStateChanged((userCred) => {
      if (userCred) {
        setUser(userCred);
      }
    });

    setUserVerified(emailVerified);
    uploadData();
    return () => unsubscribe();
  }, [email, uploadData, emailVerified]);

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
          {userEmail} <br />
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
