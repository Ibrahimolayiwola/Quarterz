import React, { useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoMdArrowDown } from "react-icons/io";

const Dropdown = ({selected, setSelected}) => {
  const [isActive, setIsActive] = useState(false);
  // const [selected, setSelected] = useState('Select service')
  const options = [
    "Property management",
    "Mortgage service",
    "Consulting service", 
    "Home buying", 
    "Home selling", 
    "Escrow service"
  ];

  return (
    <div className="dropdown w-full select-none cursor-pointer relative z-10">
      <div className="dropdown-tn  text-slate-200 flex justify-between items-center mb-1 px-2 w-full border-2 border-[#4f0a7d] focus:outline-none focus:border-none focus:ring-[#a73eed] h-14" onClick={(e) => setIsActive(!isActive)}>
        {selected}
        <IoMdArrowDown className="text-[#a73eed]" />
      </div>
      {isActive && (
        <div className="dropdown-content rounded-md overflow-hidden shadow-2xl shadow-slate-800 absolute top-[110%] left-0 w-[100%] bg-[#205]">
          {options.map((option) => (
            <div
              onClick={(e) => {
                setSelected(option)
                setIsActive(!isActive)
              }}
              className="dropdown-item bg-transparent p-2 text-slate-400 hover:bg-[#220055d5]"
            >
              {option}
            </div>
          ))}
        
        </div>
      )}
    </div>
  );
};

export default Dropdown;
