import React from 'react'
import UserAccount from '../../pages/UserAccount'
import AccountDetails from './AccountDetails'
import Address from './Address'
import Dashboard from './Dashboard'
import PasswordChange from './PasswordChange'
import Payment from './Payment'
import AddProperty from './AddProperty'
import MyProfile from './MyProfile'
import { AiFillHome } from "react-icons/ai";
import { MdLocationOn } from "react-icons/md";
import { RiUser3Fill } from "react-icons/ri";
import { MdOutlineStorage } from "react-icons/md";
import { RiSecurePaymentFill } from "react-icons/ri";
import { BiSolidLockAlt } from "react-icons/bi";
import MyProperties from './MyProperties'

const TabComponent = () => {
    const dashboardIcon = <AiFillHome/>
    const profileIcon = <RiUser3Fill/>
    const addressIcon = <MdLocationOn/>
    const passwordIcon = <BiSolidLockAlt/>
    const propertyIcon = <MdOutlineStorage/>
    const paymentIcon = <RiSecurePaymentFill/>
    const accountIcon = <RiUser3Fill/>
  return (
    <>
      <UserAccount>
        <AccountDetails label="Account Details" icon={accountIcon}/>
        <Address label="Address" icon={addressIcon}/> 
        <Dashboard label="Dashboard" icon={dashboardIcon} />
        <PasswordChange label="Change Password" icon={passwordIcon}/>
        <Payment label="Payments" icon={paymentIcon} />
        <AddProperty label="Add Property" icon={propertyIcon}/>
        <MyProfile label="Profile" icon={profileIcon}/>
        <MyProperties label="My Properties" icon={propertyIcon}/>
      </UserAccount>
    </>
  )
}

export default TabComponent
