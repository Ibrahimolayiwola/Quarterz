import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../config/firebase.js";

const useAuthStatus = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log(auth);
    console.log(auth.currentUser);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user);
        setLoggedIn(true);
      }
      setLoading(false);
    });
  }, []);

  return [loggedIn, loading];
};

export default useAuthStatus;
