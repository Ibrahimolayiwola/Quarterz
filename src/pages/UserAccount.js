import React, { useState } from 'react'

const UserAccount = ({children}) => {
  const [activeTab, setActiveTab] = useState(children[0].props.label)
  const handleClick = (e, newActiveTab) => {
    e.preventDefault()
    setActiveTab(newActiveTab)
  }
  return (
    <>
      <section>
        <div className="px-[3rem] py-[8rem] h-[22rem] bg-slate-100">
          <div className="max-w-6xl mx-auto">
            <h1 className="font-size-h text-slate-900 font-bold">My Account</h1>
          </div>
        </div>
        <div className="mt-[7rem] flex flex-col justify-center xl:flex-row gap-12  max-w-[95%] mx-auto items-start ">
          <div className=" mx-auto xl:w-[30%] custom-swiper-width max-xl:px-6">
            <ul className=" mx-6 border border-slate-200">
              {children.map((tab) => {
                const { label, icon } = tab.props;
                return (
                  <li
                    key={label}
                    className={` border border-slate-200 text-slate-600 hover:text-orange-600 ${
                      label === activeTab &&
                      "bg-black text-white hover:text-white ring-x-2 ring-x-900"
                    }`}
                  >
                    <a
                      href="#anc"
                      onClick={(e) => handleClick(e, label)}
                      className="flex justify-between items-center p-6 gap-12"
                    >
                      <span>{label}</span>
                      <span>{icon}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="w-full xl:w-[68%]">
            {children.map((tabContent, index) =>
              tabContent.props.label === activeTab ? (
                <div
                  key={index}
                  className="tab-container custom-swiper-width mx-auto"
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
