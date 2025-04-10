import React, { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa6";
import { IoIosMail } from "react-icons/io";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import Dropdown from "./Dropdown";

const Demo = () => {
  const [selected, setSelected] = useState("Select service type");
  const initialValues = {
    name: "",
    email: "",
    phone: "",
    message: "",
    service: "",
  };
  const [formData, setFormData] = useState(initialValues);
  const { name, email, phone, message, service } = formData;

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const onSubmit = () => {
    return;
  };

  return (
    <div className="h-[650px]  flex justify-center relative w-full">
      <div className="w-full p-12 bg-white border-2 border-slate-100 absolute top-0">
        <h1 className="text-[1.5em] font-semibold text-slate-800 px-3  border-l-2 border-l-[#ff5a3c]">
          Get a Quote
        </h1>
        <form onSubmit={onSubmit} className="my-9 text-slate-200">
          <div className="flex gap-9 max-md:flex-col">
            <div className="flex-1">
              <div className="relative mb-6">
                <input
                  type="text"
                  placeholder="Enter your name"
                  name="name"
                  value={name}
                  onChange={onChange}
                  className="w-full bg-transparent focus:border-none border-2 focus:bg-transparent cursor-pointer border-slate-200 h-14 focus:outline-none focus:ring-orange-600 appearance-none"
                />
                <FaUser className="text-[#ff5a3c] absolute right-3 top-[40%]" />
              </div>

              <div>
                <Dropdown selected={selected} setSelected={setSelected} />
              </div>
            </div>
            <div className="flex-1">
              <div className="relative mb-6">
                <input
                  placeholder="Enter email address"
                  type="email"
                  name="email"
                  value={email}
                  onChange={onChange}
                  autoComplete="email"
                  className="w-full bg-transparent border-2 border-slate-200  focus:outline-none focus:border-none focus:ring-orange-600 h-14 "
                />
                <IoIosMail className="text-[#ff5a3c] absolute right-3 top-[40%]" />
              </div>
              <div className="relative">
                <input
                  placeholder="Enter phone number"
                  type="number"
                  name="phone"
                  value={phone}
                  onChange={onChange}
                  className="w-full bg-transparent border-2 border-slate-200  focus:outline-none focus:border-none focus:ring-orange-600 h-14 "
                />
                <FaPhoneAlt className="text-[#ff5a3c] absolute right-3 top-[40%]" />
              </div>
            </div>
          </div>
          <div className="mt-6 relative">
            <textarea
              type="text"
              name="message"
              value={message}
              onChange={onChange}
              className="w-full appearance-none bg-transparent border-2 border-slate-200  min-h-[120px] focus:outline-none focus:border-none focus:ring-orange-600 resize-none"
            />
            <span className="absolute top-[10%] right-3 text-lg text-[#ff5a3c]">
              <MdEdit />
            </span>
          </div>
          <button
            type="submit"
            className="p-4 bg-[#ff5a3c] text-white uppercase font-size-p mt-8 font-semibold"
          >
            get a free service
          </button>
        </form>
      </div>
    </div>
  );
};

export default Demo;
