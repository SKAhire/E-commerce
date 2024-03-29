import React, { useEffect, useState } from "react";
import { backend_url, server } from "../../server";
import styles from "../../styles/styles";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Loader from "../layout/Loader";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductsShop } from "../../redux/actions/product";

const ShopInfo = ({ isOwner }) => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { product } = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
    dispatch(getAllProductsShop(id));

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
  }, [setIsLoading, id, dispatch]);

  const logoutHandler = () => {
    axios.get(`${server}/shop/logout-shop`, { withCredentials: true });
    window.location.reload(true);
  };

  const totalReviewsLength =
    product &&
    product.reduce((acc, product) => acc + product.reviews.length, 0);

  const totalRatings =
    product &&
    product.reduce(
      (acc, product) =>
        acc + product.reviews.reduce((sum, review) => sum + review.rating, 0),
      0
    );

  const averageRating = totalRatings / totalReviewsLength || 0;

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
              {data.description}
              
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
            <h6 className="text-[#000000a6]">{product && product.length}</h6>
          </div>
          <div className="p-3">
            <h5 className="font-[600]">Shop Rating:</h5>
            <h6 className="text-[#000000a6]">{averageRating}/5</h6>
          </div>
          <div className="p-3">
            <h5 className="font-[600]">Joined On:</h5>
            <h6 className="text-[#000000a6]">
              {data?.createdAt?.slice(0, 10)}
            </h6>
          </div>

          {isOwner && (
            <div className="py-3 px-4">
              <Link to="/settings">
                <div
                  className={`${styles.button} !w-full !h-[42px] !rounded-[5px]`}
                >
                  <span className="text-white">Edit Shop</span>
                </div>
              </Link>
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
