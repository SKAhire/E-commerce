import React from "react";
import { AiOutlineFolderAdd, AiOutlineGift } from "react-icons/ai";
import { FiPackage, FiShoppingBag } from "react-icons/fi";
import { MdOutlineLocalOffer } from "react-icons/md";
import { VscNewFile } from "react-icons/vsc";
import { RxDashboard } from "react-icons/rx";
import { CiMoneyBill, CiSettings } from "react-icons/ci";
import { Link } from "react-router-dom";
import { BiMessageSquareDetail } from "react-icons/bi";
import { HiOutlineReceiptRefund } from "react-icons/hi";

const DashboardSidebar = ({ active, setActive }) => {
  return (
    <div className="w-full h-[89vh] bg-white shadow-sm overflow-y-scroll sticky top-0 left-0 z-10">
      {/* single items */}
      <div className="w-full flex items-center 800px:p-2 p-4">
        <Link to="/dashboard" className="w-full flex items-center 800px:hover:bg-gray-200 800px:p-2">
          <RxDashboard
            size={30}
            className={`${active === 1 ? "text-purple-600" : "text-[#555]"}`}
          />
          <h5
            className={`${
              active === 1 ? "text-purple-600" : "text-[#555]"
            } pl-2 text-[18px] font-[400] 800px:block hidden`}
          >
            Dashboard
          </h5>
        </Link>
      </div>
      <div className="w-full flex items-center 800px:p-2 p-4">
        <Link to="/dashboard-orders" className="w-full flex items-center 800px:hover:bg-gray-200 800px:p-2">
          <FiPackage
            size={30}
            className={`${active === 2 ? "text-purple-600" : "text-[#555]"}`}
          />
          <h5
            className={`${
              active === 2 ? "text-purple-600" : "text-[#555]"
            } pl-2 text-[18px] font-[400] 800px:block hidden`}
          >
            All Orders
          </h5>
        </Link>
      </div>
      <div className="w-full flex items-center 800px:p-2 p-4">
        <Link to="/dashboard-products" className="w-full flex items-center 800px:hover:bg-gray-200 800px:p-2">
          <FiShoppingBag
            size={30}
            className={`${active === 3 ? "text-purple-600" : "text-[#555]"}`}
          />
          <h5
            className={`${
              active === 3 ? "text-purple-600" : "text-[#555]"
            } pl-2 text-[18px] font-[400] 800px:block hidden `}
          >
            All Products
          </h5>
        </Link>
      </div>
      <div className="w-full flex items-center 800px:p-2 p-4">
        <Link to="/dashboard-create-product" className="w-full flex items-center 800px:hover:bg-gray-200 800px:p-2">
          <AiOutlineFolderAdd
            size={30}
            className={`${active === 4 ? "text-purple-600" : "text-[#555]"}`}
          />
          <h5
            className={`${
              active === 4 ? "text-purple-600" : "text-[#555]"
            } pl-2 text-[18px] font-[400] 800px:block hidden `}
          >
            Create Product
          </h5>
        </Link>
      </div>
      <div className="w-full flex items-center 800px:p-2 p-4">
        <Link to="/dashboard-events" className="w-full flex items-center 800px:hover:bg-gray-200 800px:p-2">
          <MdOutlineLocalOffer
            size={30}
            className={`${active === 5 ? "text-purple-600" : "text-[#555]"}`}
          />
          <h5
            className={`${
              active === 5 ? "text-purple-600" : "text-[#555]"
            } pl-2 text-[18px] font-[400] 800px:block hidden `}
          >
            All Events
          </h5>
        </Link>
      </div>
      <div className="w-full flex items-center 800px:p-2 p-4">
        <Link to="/dashboard-create-event" className="w-full flex items-center 800px:hover:bg-gray-200 800px:p-2">
          <VscNewFile
            size={30}
            className={`${active === 6 ? "text-purple-600" : "text-[#555]"}`}
          />
          <h5
            className={`${
              active === 6 ? "text-purple-600" : "text-[#555]"
            } pl-2 text-[18px] font-[400] 800px:block hidden `}
          >
            Create Event
          </h5>
        </Link>
      </div>
      <div className="w-full flex items-center 800px:p-2 p-4">
        <Link to="/dashboard-withdraw-money" className="w-full flex items-center 800px:hover:bg-gray-200 800px:p-2">
          <CiMoneyBill
            size={30}
            className={`${active === 7 ? "text-purple-600" : "text-[#555]"}`}
          />
          <h5
            className={`${
              active === 7 ? "text-purple-600" : "text-[#555]"
            } pl-2 text-[18px] font-[400] 800px:block hidden `}
          >
            Withdraw Money
          </h5>
        </Link>
      </div>
      <div className="w-full flex items-center 800px:p-2 p-4">
        <Link to="/dashboard-messages" className="w-full flex items-center 800px:hover:bg-gray-200 800px:p-2">
          <BiMessageSquareDetail
            size={30}
            className={`${active === 8 ? "text-purple-600" : "text-[#555]"}`}
          />
          <h5
            className={`${
              active === 8 ? "text-purple-600" : "text-[#555]"
            } pl-2 text-[18px] font-[400] 800px:block hidden `}
          >
            Shop Inbox
          </h5>
        </Link>
      </div>
      <div className="w-full flex items-center 800px:p-2 p-4">
        <Link to="/dashboard-coupons" className="w-full flex items-center 800px:hover:bg-gray-200 800px:p-2">
          <AiOutlineGift
            size={30}
            className={`${active === 9 ? "text-purple-600" : "text-[#555]"}`}
          />
          <h5
            className={`${
              active === 9 ? "text-purple-600" : "text-[#555]"
            } pl-2 text-[18px] font-[400] 800px:block hidden `}
          >
            Discount Codes
          </h5>
        </Link>
      </div>
      <div className="w-full flex items-center 800px:p-2 p-4">
        <Link to="/dashboard-refunds" className="w-full flex items-center 800px:hover:bg-gray-200 800px:p-2">
          <HiOutlineReceiptRefund
            size={30}
            className={`${active === 10 ? "text-purple-600" : "text-[#555]"}`}
          />
          <h5
            className={`${
              active === 10 ? "text-purple-600" : "text-[#555]"
            } pl-2 text-[18px] font-[400] 800px:block hidden `}
          >
            Refunds
          </h5>
        </Link>
      </div>
      <div className="w-full flex items-center 800px:p-2 p-4">
        <Link to="/dashboard-settings" className="w-full flex items-center 800px:hover:bg-gray-200 800px:p-2">
          <CiSettings
            size={30}
            className={`${active === 11 ? "text-purple-600" : "text-[#555]"}`}
          />
          <h5
            className={`${
              active === 11 ? "text-purple-600" : "text-[#555]"
            } pl-2 text-[18px] font-[400] 800px:block hidden `}
          >
            Settings
          </h5>
        </Link>
      </div>
    </div>
  );
};

export default DashboardSidebar;
