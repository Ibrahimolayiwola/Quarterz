import React, { useState } from "react";
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
      <div className="dropdown-tn  text-slate-600 flex justify-between items-center mb-1 px-2 w-full border-2 border-slate-200 focus:outline-none focus:border-none focus:ring-orange-600 h-14" onClick={(e) => setIsActive(!isActive)}>
        {selected}
        <IoMdArrowDown className="text-orange-600" />
      </div>
      {isActive && (
        <div className="dropdown-content rounded-md overflow-hidden shadow-2xl shadow-slate-200 absolute top-[110%] left-0 w-[100%] bg-white">
          {options.map((option) => (
            <div
              onClick={(e) => {
                setSelected(option)
                setIsActive(!isActive)
              }}
              className="dropdown-item bg-transparent p-2 text-slate-600 hover:bg-slate-100"
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
