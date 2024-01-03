import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { IoBagHandleOutline } from "react-icons/io5";
import { HiOutlineMinus, HiPlus } from "react-icons/hi";
import styles from "../../styles/styles";
import { Link } from "react-router-dom";

const Cart = ({ setOpenCart }) => {
  const cardData = [
    {
      name: "Laptop Screen Keyboard Cleaner Kit",
      description: "test",
      price: 999,
    },
    {
      name: "Laptop Screen Keyboard Cleaner Kit",
      description: "test",
      price: 999,
    },
    {
      name: "Laptop Screen Keyboard Cleaner Kit",
      description: "test",
      price: 999,
    },
  ];
  return (
    <div className="fixed top-0 left-0 w-full h-screen z-10 bg-[#0000004b] ">
      <div className="fixed top-0 right-0 min-h-full w-[25%] bg-white flex flex-col justify-between shadow-sm">
        <div>
          <div className="flex w-full justify-end pt-5 pr-5">
            <RxCross1
              size={25}
              className="cursor-pointer"
              onClick={() => setOpenCart(false)}
            />
          </div>

          {/* item length */}
          <div className={`${styles.noramlFlex} p-4`}>
            <IoBagHandleOutline size={25} />
            <h5 className="pl-2 font-[500] text-[20px]">3 items</h5>
          </div>

          {/* cart single items */}
          <br />
          <div className="w-full border-t">
            {cardData &&
              cardData.map((i, index) => <CardSingle key={index} data={i} />)}
          </div>
        </div>
        <div className="px-5 mb-3">
          {/* checkout button */}
          <Link to="/checkout">
            <div className="h-[45px] flex items-center w-[100%] justify-center rounded-[5px] bg-purple-600">
              <h1 className="text-white text-[18px] font-[600]">
                {" "}
                Checkout Now ($10000)
              </h1>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

const CardSingle = ({ data }) => {
  const [value, setVaule] = useState(1);
  const totalPrice = data.price * value;

  return (
    <div className="border-b p-4">
      <div className="w-full flex items-center">
        <div>
          <div
            className={`bg-purple-600 border-purple-900 rounded-full w-[25px] h-[25px] ${styles.noramlFlex} justify-center cursor-pointer`}
            onClick={() => setVaule(value + 1)}
          >
            <HiPlus size={15} color="#fff" />
          </div>
          <span className="pl-[10px]">{value}</span>
          <div
            className={`bg-gray-400 border-gray-600 rounded-full w-[25px] h-[25px] ${styles.noramlFlex} justify-center cursor-pointer`}
            onClick={() => setVaule(value === 1 ? 1 : value - 1)}
          >
            <HiOutlineMinus size={15} color="#fff" />
          </div>
        </div>

        <img
          src="https://m.media-amazon.com/images/W/MEDIAX_792452-T1/images/I/71ySJCxI4JL.__AC_SX300_SY300_QL70_FMwebp_.jpg"
          alt=""
          className="w-[70px] h-[70px] m-2"
        />

        <Link to='/'> 
          <div className="pl-[5px]">
            <h1 className="font-[600]">{data.name}</h1>
            <h4 className="font-[400] text-[15px] text-[#00000082]">
              {" "}
              ${data.price} * {value}{" "}
            </h4>
            <h4 className="font-[600] text-[17px] pt-[3px] text-red-600 font-Roboto">
              Total Price: ${totalPrice}
            </h4>
          </div>
        </Link>
        <RxCross1
          size={18}
          className="cursor-pointer"
          title="Remove from cart"
        />
      </div>
    </div>
  );
};

export default Cart;
