import React, { useState } from "react";
import {
  getAuth,
  reauthenticateWithCredential,
  updatePassword,
} from "firebase/auth";
import { EmailAuthProvider } from "firebase/auth/cordova";
import { toast } from "react-toastify";
import useValidate from "../../hooks/useValidate";

const PasswordChange = () => {
  const [formData, setFormData] = useState({
    currentPassword: "",
    password: "",
    confirmPassword: "",
  });

  const { currentPassword, password, confirmPassword } = formData;
  const [formErrors, validate] = useValidate(formData);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const auth = getAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validate();
    if (Object.keys(errors).length !== 0) {
      return;
    }
    const user = auth.currentUser;

    if (user) {
      try {
        const credential = EmailAuthProvider.credential(
          user.email,
          currentPassword
        );
        await reauthenticateWithCredential(user, credential);

        await updatePassword(user, password);
        toast.success("Password updated successfully");
      } catch (error) {
        toast.error("Password update failed");
      }
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <input
            type="password"
            placeholder="Current password"
            required
            minLength={8}
            maxLength={64}
            name="currentPassword"
            value={currentPassword}
            onChange={handleChange}
            className="w-full bg-transparent focus:border-none border-2 focus:bg-transparent cursor-pointer border-slate-200 h-16 focus:outline-none focus:ring-orange-600 appearance-none placeholder:text-slate-300"
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="New password"
            name="password"
            value={password}
            onChange={handleChange}
            required
            minLength={8}
            maxLength={64}
            className="w-full bg-transparent focus:border-none border-2 focus:bg-transparent cursor-pointer border-slate-200 h-16 focus:outline-none focus:ring-orange-600 appearance-none placeholder:text-slate-300"
          />
          <p className="text-red-700 text-xs">{formErrors.password}</p>
        </div>
        <div>
          <input
            type="password"
            placeholder="Confirm new password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={handleChange}
            required
            minLength={8}
            maxLength={64}
            className="w-full bg-transparent focus:border-none border-2 focus:bg-transparent cursor-pointer border-slate-200 h-16 focus:outline-none focus:ring-orange-600 appearance-none placeholder:text-slate-300"
          />
          <p className="text-red-700 text-xs">{formErrors.confirmPassword}</p>
        </div>
        <button
          type="submit"
          className="h-14 w-44 bg-orange-600 text-slate-100 text-lg hover:bg-black"
        >
          Save changes
        </button>
      </form>
    </div>
  );
};

export default PasswordChange;
