import React, { useState } from 'react'
import {auth} from '../config/firebase'
import { useNavigate } from 'react-router'

const UserAccount = ({children}) => {
  const [activeTab, setActiveTab] = useState(children[0].props.label)
  const navigate = useNavigate()
  const handleClick = (e, newActiveTab) => {
    e.preventDefault()
    setActiveTab(newActiveTab)
    if(newActiveTab === "Logout"){
      console.log(activeTab, 'user about to sign out')
      auth.signOut()
      navigate("/sign-in")
    }
  }
  return (
    <>
      <section>
        <div className=" h-[22rem] bg-slate-100">
          <div className="max-w-6xl mx-auto h-full flex justify-center items-center">
            <h1 className="font-size-h text-slate-900 font-bold">My Account</h1>
          </div>
        </div>
        <div className="mt-[7rem] flex flex-col justify-center xl:flex-row gap-12  max-w-[95%] mx-auto items-start ">
          <div className="w-full sm:w-[75%] xl:w-[30%] mx-auto">
            <ul className=" border border-slate-200">
              {children.map((tab) => {
                const { label, icon } = tab.props;
                return (
                  <li
                    key={label}
                    className={` border border-slate-200 text-slate-600 hover:text-secondary ${
                      label === activeTab &&
                      "bg-black text-white"
                    }`}
                  >
                    <a
                      href="#anc"
                      onClick={(e) => handleClick(e, label)}
                      className="flex justify-between items-center p-6"
                    >
                      <span>{label}</span>
                      <span>{icon}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="w-full sm:w-[75%] xl:w-[68%] mx-auto">
            {children.map((tabContent, index) =>
              tabContent.props.label === activeTab ? (
                <div
                  key={index}
                  className="tab-container"
                >
                  {tabContent}
                </div>
              ) : (
                ""
              )
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default UserAccount
