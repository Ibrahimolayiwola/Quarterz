import React from 'react'
import UserAccount from '../../pages/UserAccount'
import FavoriteProperties from "./FavoriteProperties";
import Address from "./Address";
import Dashboard from "./Dashboard";
import PasswordChange from "./PasswordChange";
import Payment from "./Payment";
import AddProperty from "./AddProperty";
import MyProfile from "./MyProfile";
import { AiFillHome } from "react-icons/ai";
import { MdLocationOn } from "react-icons/md";
import { RiUser3Fill } from "react-icons/ri";
import { MdOutlineStorage } from "react-icons/md";
import { RiSecurePaymentFill } from "react-icons/ri";
import { BiSolidLockAlt } from "react-icons/bi";
import { FaHeart } from "react-icons/fa";
import MyProperties from "./MyProperties";

const TabComponent = () => {
  const dashboardIcon = <AiFillHome />;
  const profileIcon = <RiUser3Fill />;
  const addressIcon = <MdLocationOn />;
  const passwordIcon = <BiSolidLockAlt />;
  const propertyIcon = <MdOutlineStorage />;
  const paymentIcon = <RiSecurePaymentFill />;
  const favoriteIcon = <FaHeart />;
  return (
    <>
      <UserAccount>
        <MyProfile label="Profile" icon={profileIcon} />

        {/* <Address label="Address" icon={addressIcon}/>  */}
        {/* <Dashboard label="Dashboard" icon={dashboardIcon} /> */}
        <PasswordChange label="Change Password" icon={passwordIcon} />
        <Payment label="Payments" icon={paymentIcon} />
        <AddProperty label="Add Property" icon={propertyIcon} />
        <MyProperties label="My Properties" icon={propertyIcon} />
        <FavoriteProperties label="Favorite Properties" icon={favoriteIcon} />
      </UserAccount>
    </>
  );
};

export default TabComponent
