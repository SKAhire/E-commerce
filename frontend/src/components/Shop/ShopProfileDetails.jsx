import React, { useEffect, useState } from "react";
import ProductCard from "../Route/ProductCard/ProductCard";
import styles from "../../styles/styles";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductsShop } from "../../redux/actions/product";

const ShopProfileDetails = ({ isOwner }) => {
  const [active, setActive] = useState(1);
  const { product } = useSelector((state) => state.product);
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllProductsShop(id));
  }, [dispatch, id]);

  return (
    <div className="w-full">
      <div className="flex items-center w-full justify-between">
        <div className="w-full flex">
          <div className="flex items-center" onClick={() => setActive(1)}>
            <h5
              className={`font-[600] text-[20px] cursor-pointer pr-[20px] ${
                active === 1 ? "text-purple-600" : ""
              }`}
            >
              Shop Products
            </h5>
          </div>
          <div className="flex items-center" onClick={() => setActive(2)}>
            <h5
              className={`font-[600] text-[20px] cursor-pointer pr-[20px] ${
                active === 2 ? "text-purple-600" : ""
              }`}
            >
              Running Events
            </h5>
          </div>
          <div className="flex items-center" onClick={() => setActive(3)}>
            <h5
              className={`font-[600] text-[20px] cursor-pointer pr-[20px] ${
                active === 3 ? "text-purple-600" : ""
              }`}
            >
              Shop Reviews
            </h5>
          </div>
        </div>
        <div>
          {isOwner && (
            <div>
              <Link to="/dashboard">
                <div className={`${styles.button} !rounded-[4px] h-[42px]`}>
                  <span className="text-[#fff]">Go Dashboard</span>
                </div>
              </Link>
            </div>
          )}
        </div>
      </div>
      <br />

      <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] xl:grid-cols-4 xl:gap-[20px]mb-12 border-0">
        {product &&
          product.map((i, index) => (
            <ProductCard data={i} key={index} isShop={true} />
          ))}
      </div>
    </div>
  );
};

export default ShopProfileDetails;
