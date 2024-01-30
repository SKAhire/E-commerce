import React, { useEffect, useState } from "react";
import { backend_url, server } from "../../server";
import styles from "../../styles/styles";
import axios from "axios";
import { useParams } from "react-router-dom";
import Loader from "../layout/Loader";

const ShopInfo = ({ isOwner }) => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const { id } = useParams();
  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${server}/shop/get-shop-info/${id}`)
      .then((res) => {
        setData(res.data.shop);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }, []);

  const logoutHandler = () => {
    axios.get(`${server}/shop/logout-shop`, { withCredentials: true });
    window.location.reload(true);
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <div className="w-full py-5">
            <div className="w-full flex justify-center items-center">
              <img
                src={`${backend_url}/${data.avatar}`}
                alt=""
                className="h-[150px] w-[150px] object-cover rounded-full"
              />
            </div>
            <h3 className="text-center py-2 text-[20px]">{data.name}</h3>
            <p className="text-[16px] text-[#000000a6] p-[10px] flex items-center">
              {/* {data.description} */}
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Enim
              eius exercitationem quos assumenda distinctio fugiat esse autem
              quod molestiae consequatur labore voluptas natus, optio ea?
            </p>
          </div>
          <div className="p-3">
            <h5 className="font-[600]">Address:</h5>
            <h6 className="text-[#000000a6]">{data.address}</h6>
          </div>
          <div className="p-3">
            <h5 className="font-[600]">Phone Number:</h5>
            <h6 className="text-[#000000a6]">{data.phoneNumber}</h6>
          </div>
          <div className="p-3">
            <h5 className="font-[600]">Total Products:</h5>
            <h6 className="text-[#000000a6]">13</h6>
          </div>
          <div className="p-3">
            <h5 className="font-[600]">Shop Rating:</h5>
            <h6 className="text-[#000000a6]">4/5</h6>
          </div>
          <div className="p-3">
            <h5 className="font-[600]">Joined On:</h5>
            <h6 className="text-[#000000a6]">
              {data?.createdAt?.slice(0, 10)}
            </h6>
          </div>

          {isOwner && (
            <div className="py-3 px-4">
              <div
                className={`${styles.button} !w-full !h-[42px] hover:bg-slate-800 !rounded-[5px]`}
              >
                <span className="text-white">Edit Shop</span>
              </div>
              <div
                className={`${styles.button} !w-full !h-[42px] hover:bg-slate-800 !rounded-[5px]`}
                onClick={logoutHandler}
              >
                <span className="text-white">Logout</span>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ShopInfo;
