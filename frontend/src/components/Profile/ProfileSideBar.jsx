import React from 'react';
import { AiOutlineCreditCard, AiOutlineLogin, AiOutlineMessage } from 'react-icons/ai';
import { HiReceiptRefund, HiShoppingBag } from 'react-icons/hi';
import { RxPerson } from 'react-icons/rx';
import { TbAddressBook } from 'react-icons/tb';
import {
    MdOutlineTrackChanges,
  } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { server } from '../../server';
import {toast} from 'react-toastify'

const ProfileSideBar = ({active, setActive}) => {
    const navigate = useNavigate();

    const logoutHandler = () => {
      axios.get(`${server}/user/logout`, { withCredentials: true }).then((res) => {
        toast.success(res.data.message);
        window.location.reload(true)
        navigate('/login')
      }).catch((error) => {
        console.log(error.response.data.message);
      })
    }
  return (
    <div className='w-full bg-white shadow-sm p-4 pt-8 rounded-[10px]'>
      <div className="flex items-center cursor-pointer w-full mb-8 hover:bg-purple-600 hover:text-white p-2 " onClick={() => setActive(1)}>
        <RxPerson size={20} color={active === 1 ? "purple": ""} />
        <span className={`pl-3 ${active === 1 ? "text-[purple]" : ""} font-[600] 800px:block hidden`}>
            Profile
        </span>
      </div>
      <div className="flex items-center cursor-pointer w-full mb-8 hover:bg-purple-600 hover:text-white p-2 " onClick={() => setActive(2)}>
        <HiShoppingBag size={20} color={active === 2 ? "purple": ""} />
        <span className={`pl-3 ${active === 2 ? "text-[purple]" : ""} font-[600] 800px:block hidden`}>
            Order
        </span>
      </div>
      <div className="flex items-center cursor-pointer w-full mb-8 hover:bg-purple-600 hover:text-white p-2 " onClick={() => setActive(3)}>
        <HiReceiptRefund size={20} color={active === 3 ? "purple": ""} />
        <span className={`pl-3 ${active === 3 ? "text-[purple]" : ""} font-[600] 800px:block hidden`}>
            Refunds
        </span>
      </div>
      <div className="flex items-center cursor-pointer w-full mb-8 hover:bg-purple-600 hover:text-white p-2 " onClick={() => setActive(4) || navigate('/inbox')}>
        <AiOutlineMessage size={20} color={active === 4 ? "purple": ""} />
        <span className={`pl-3 ${active === 4 ? "text-[purple]" : ""} font-[600] 800px:block hidden`}>
            Inbox
        </span>
      </div>
      <div className="flex items-center cursor-pointer w-full mb-8 hover:bg-purple-600 hover:text-white p-2 " onClick={() => setActive(5)}>
        <MdOutlineTrackChanges size={20} color={active === 5 ? "purple": ""} />
        <span className={`pl-3 ${active === 5 ? "text-[purple]" : ""} font-[600] 800px:block hidden`}>
            Track Order
        </span>
      </div>
      <div className="flex items-center cursor-pointer w-full mb-8 hover:bg-purple-600 hover:text-white p-2 " onClick={() => setActive(6)}>
        <AiOutlineCreditCard size={20} color={active === 6 ? "purple": ""} />
        <span className={`pl-3 ${active === 6 ? "text-[purple]" : ""} font-[600] 800px:block hidden`}>
            Payment Methods
        </span>
      </div>
      <div className="flex items-center cursor-pointer w-full mb-8 hover:bg-purple-600 hover:text-white p-2 " onClick={() => setActive(7)}>
        <TbAddressBook size={20} color={active === 7 ? "purple": ""} />
        <span className={`pl-3 ${active === 7 ? "text-[purple]" : ""} font-[600] 800px:block hidden`}>
            Address
        </span>
      </div>
      <div className="flex items-center cursor-pointer w-full mb-8 hover:bg-purple-600 hover:text-white p-2 " onClick={() => setActive(8) || logoutHandler()}>
        <AiOutlineLogin size={20} color={active === 8 ? "purple": ""} />
        <span className={`pl-3 ${active === 8 ? "text-[purple]" : ""} font-[600] 800px:block hidden`}>
            Logout
        </span>
      </div>
    </div>
  )
}

export default ProfileSideBar
