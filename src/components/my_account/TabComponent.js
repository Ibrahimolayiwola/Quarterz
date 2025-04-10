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
import { VscSignOut } from "react-icons/vsc";
import MyProperties from "./MyProperties";
import LogOut from './LogOut';

const TabComponent = () => {
  const dashboardIcon = <AiFillHome />;
  const profileIcon = <RiUser3Fill />;
  const addressIcon = <MdLocationOn />;
  const passwordIcon = <BiSolidLockAlt />;
  const propertyIcon = <MdOutlineStorage />;
  const paymentIcon = <RiSecurePaymentFill />;
  const favoriteIcon = <FaHeart />;
  const logoOutIcon = <VscSignOut />;
  return (
    <>
      <UserAccount>
        <MyProfile label="Profile" icon={profileIcon} />

        {/* <Address label="Address" icon={addressIcon}/>  */}
        {/* <Dashboard label="Dashboard" icon={dashboardIcon} /> */}
        <PasswordChange label="ChangePassword" icon={passwordIcon} />
        <Payment label="Payments" icon={paymentIcon} />
        <AddProperty label="AddProperty" icon={propertyIcon} />
        <MyProperties label="MyProperties" icon={propertyIcon} />
        <FavoriteProperties label="FavoriteProperties" icon={favoriteIcon} />
        <LogOut label="Logout" icon={logoOutIcon} />
      </UserAccount>
    </>
  );
};

export default TabComponent
