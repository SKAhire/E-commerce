import React from "react";
import { useSelector } from "react-redux";
import { backend_url } from "../../server";
import styles from "../../styles/styles";

const ShopInfo = ({isOwner}) => {
  const { shop } = useSelector((state) => state.shop);

  const logoutHandler = ()=> {

  }

  return (
    <div>
      <div className="w-full py-5">
        <div className="w-full flex justify-center items-center">
          <img
            src={`${backend_url}/${shop?.avatar}`}
            alt=""
            className="h-[150px] w-[150px] object-cover rounded-full"
          />
        </div>
        <h3 className="text-center py-2 text-[20px]">{shop.name}</h3>
        <p className="text-[16px] text-[#000000a6] p-[10px] flex items-center">
          {/* {shop.description} */}
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste
          molestiae velit eius, dignissimos, veritatis minima delectus
          exercitationem fugit voluptatibus perspiciatis voluptatum similique
          beatae!
        </p>
      </div>
      <div className="p-3">
        <h5 className="font-[600]">Address:</h5>
        <h6 className="text-[#000000a6]">
            {shop.address}
        </h6>
      </div>
      <div className="p-3">
        <h5 className="font-[600]">Phone Number:</h5>
        <h6 className="text-[#000000a6]">
            {shop.phoneNumber}
        </h6>
      </div>
      <div className="p-3">
        <h5 className="font-[600]">Total Products:</h5>
        <h6 className="text-[#000000a6]">
            13
        </h6>
      </div>
      <div className="p-3">
        <h5 className="font-[600]">Shop Rating:</h5>
        <h6 className="text-[#000000a6]">
            4/5
        </h6>
      </div>
      <div className="p-3">
        <h5 className="font-[600]">Joined On:</h5>
        <h6 className="text-[#000000a6]">
            {shop.createdAt.slice(0, 10)}
        </h6>
      </div>
      
      {
        isOwner && (
            <div className="py-3 px-4">
                <div className={`${styles.button} !w-full !h-[42px] hover:bg-slate-800 !rounded-[5px]`}>
                    <span className="text-white">Edit Shop</span>
                </div>
                <div className={`${styles.button} !w-full !h-[42px] hover:bg-slate-800 !rounded-[5px]`} onClick={logoutHandler}>
                    <span className="text-white">Logout</span>
                </div>
            </div>
        )
      }
    </div>
  );
};

export default ShopInfo;
