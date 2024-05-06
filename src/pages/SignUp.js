import { useState } from "react";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { Link } from "react-router-dom";
import GAuth from "../components/GAuth";
import { auth, dataBase } from "../config/firebase";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
} from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useValidate from "../hooks/useValidate";
import { useSelector, useDispatch } from "react-redux";
import { updateForm } from "../features/formSlice";

const SignUp = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    password: "",
    confirmPassword: "",
  });

  const {
    firstName,
    lastName,
    email,
    phone,
    address,
    password,
    confirmPassword,
  } = formData;
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [formErrors, validate] = useValidate(formData);
  const [userVerified, setUserVerified] = useState(false);
  let user;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const errors = validate();
    if (Object.keys(errors).length !== 0) {
      return;
    }

    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      user = userCredentials.user;
      await sendEmailVerification(user);

      // setUserVerified(auth.currentUser.emailVerified);
      await updateProfile(user, {
        displayName: firstName,
      });
      const formDataCopy = { ...formData };
      delete formDataCopy.password;
      delete formDataCopy.confirmPassword;
      // formDataCopy.timeStamp = serverTimestamp();
      dispatch(updateForm(formDataCopy));
      navigate("verify-email");
    } catch (error) {
      toast.error("Something went wrong with the registration");
    }
  };

  // console.log(auth);

  // useEffect(() => {
  //   if (userVerified) {
  //     uploadUserData();
  //     console.log("userData uploaded successfully");
  //   }
  // }, [userVerified, uploadUserData]);

  return (
    <section>
      <div className="px-[3rem] py-[8rem] h-[22rem] bg-slate-100">
        <div className="max-w-6xl mx-auto">
          <h1 className="font-size-h text-slate-900 font-bold">Account</h1>
        </div>
      </div>
      <div className="mt-40">
        <h2 className="text-slate-900 font-size-h font-bold text-center mt-6">
          Register <br /> Your Account
        </h2>
        <p className="text-slate-600 text-center">
          Your journey to finding your perfect home <br /> starts here.
        </p>
      </div>
      <div className="px-6 py-12 flex items-center justify-center max-w-5xl mx-auto  mt-8">
        <div className="w-full px-4 md:w-[62%] lg:w-[50%]">
          <form onSubmit={onSubmit} className="">
            <input
              className="w-full px-4 py-4 text-slate-700 opacity-50  border-[1.8px] border-slate-300 placeholder:text-slate-500 focus:border-none  focus:ring-orange-700"
              type="text"
              placeholder="First name"
              required
              value={firstName}
              name="firstName"
              onChange={handleChange}
            />
            <input
              className="w-full px-4 py-4 text-gray-700 border-[1.8px] border-gray-300 mt-7 opacity-50 placeholder:text-gray-500 focus:border-none focus:ring-orange-700"
              type="text"
              placeholder="Last name"
              required
              value={lastName}
              name="lastName"
              onChange={handleChange}
            />
            <input
              className="w-full px-4 py-4 text-gray-700 border-[1.8px] border-gray-300 opacity-50 placeholder:text-gray-500 mt-7 focus:border-none focus:ring-orange-700"
              type="email"
              placeholder="Email address"
              required
              value={email}
              name="email"
              onChange={handleChange}
            />
            <p className="text-sm text-red-600">{formErrors.email}</p>
            <input
              className="w-full px-4 py-4 text-gray-700 border-[1.8px] border-gray-300 opacity-50 placeholder:text-gray-500 mt-7 focus:border-none focus:ring-orange-700  autofill:ring-orange-700"
              type="tel"
              minLength="11"
              maxLength="14"
              placeholder="Phone number"
              required
              value={phone}
              name="phone"
              onChange={handleChange}
            />
            <input
              className="w-full px-4 py-4 text-gray-700 border-[1.8px] border-gray-300 opacity-50 placeholder:text-gray-500 mt-7 focus:border-none focus:ring-orange-700"
              type="text"
              minLength="10"
              maxLength="40"
              placeholder="Address"
              required
              value={address}
              name="address"
              onChange={handleChange}
            />
            <div className="relative mt-7">
              <input
                className="w-full  text-gray-700 border-[1.8px] border-gray-300 px-4 py-4 opacity-50 placeholder:text-gray-500 focus:border-none focus:ring-orange-700 select-none"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                required
                value={password}
                name="password"
                onChange={handleChange}
              />
              {showPassword ? (
                <AiFillEyeInvisible
                  onClick={() => setShowPassword(false)}
                  className="absolute top-5 right-3"
                />
              ) : (
                <AiFillEye
                  onClick={() => setShowPassword(true)}
                  className="absolute top-5 right-3"
                />
              )}
              <p className="text-sm text-red-600">{formErrors.password}</p>
            </div>
            <div className="relative mt-7">
              <input
                className="w-full  text-gray-700 border-[1.8px] border-gray-300 px-4 py-4 opacity-50 placeholder:text-gray-500 focus:border-none focus:ring-orange-700 select-none"
                type={showPassword ? "text" : "password"}
                placeholder="Confirm Password"
                value={confirmPassword}
                name="confirmPassword"
                onChange={handleChange}
              />
              <p className="text-sm text-red-600">
                {formErrors.confirmPassword}
              </p>
            </div>
            <div className=" justify-center items-start text-sm mt-6">
              <input
                type="checkbox"
                className="w-3 h-3  appearance-none border  focus:ring-0 border-slate-400 rounded-sm  checked:text-slate-500"
              />
              <span className="text-sm text-slate-500 ml-2">
                I consent to Herboil processing my personal data in order to
                send personalized marketing material in accordance with the
                consent form and the privacy policy.
              </span>
            </div>
            <div className=" justify-center items-start text-sm mt-6">
              <input
                type="checkbox"
                className="w-3 h-3 appearance-none border rounded-sm focus:ring-0 border-slate-400 checked:text-slate-500"
              />
              <span className="text-sm text-slate-500 ml-2">
                By clicking "create account". I consent to the privacy policy
              </span>
            </div>
            <div className="flex justify-between items-center mt-6 ">
              <button
                type="Submit"
                className=" bg-orange-600 uppercase text-center py-4 w-[40%] shadow-md text-white font-medium  hover:bg-orange-600 transition duration-200 max-sm:text-xs"
              >
                create account
              </button>
              <GAuth />
            </div>
            <div className="flex flex-col gap-6 mt-16 text-slate-500">
              <p className="text-center">
                By creating an account, you agree to our:
              </p>
              <Link
                to={"/home"}
                className="uppercase text-center hover:text-red-600 transition ease-out duration-200"
              >
                terms of conditions &nbsp; &nbsp; | &nbsp; &nbsp; privacy policy
              </Link>
              <Link
                to={"/sign-in"}
                className="uppercase mt-6 text-center hover:text-orange-600 transition ease-out duration-200"
              >
                already have an account?
              </Link>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
