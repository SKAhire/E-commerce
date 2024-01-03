import React from "react";
import {RxCross1} from "react-icons/rx";
import { BsCartPlus } from "react-icons/bs";
import styles from "../../styles/styles";
import { Link } from "react-router-dom";
import { AiOutlineHeart } from "react-icons/ai";

const Wishlist = ({ setOpenWishlist }) => {
  const cardData = [{
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
  },];
  return (
  <div className="fixed top-0 left-0 w-full h-screen z-10 bg-[#0000004b] ">
    <div className="fixed top-0 right-0 min-h-full w-[25%] bg-white flex flex-col justify-between shadow-sm">
        <div>
            <div className="flex w-full justify-end pt-5 pr-5">
                <RxCross1 size={25} className="cursor-pointer" onClick={() => setOpenWishlist(false)} />
            </div>

            {/* item length */}
            <div className={`${styles.noramlFlex} p-4`}>
                <AiOutlineHeart size={25} />
                <h5 className="pl-2 font-[500] text-[20px]">
                    3 items
                </h5>
            </div>

            {/* cart single items */}
            <br />
            <div className="w-full border-t">
                {
                    cardData && cardData.map((i, index) => (
                        <CardSingle key={index} data={i} />
                    ))
                }
            </div>
        </div>
    </div>
  </div>
  );
};

const CardSingle = ({data}) => {

    return (
        <div className="border-b p-4">
            <div className="w-full flex items-center">
                
            <BsCartPlus size={26} className="cursor-pointer" title="Add to Cart" />

                <img src="https://m.media-amazon.com/images/W/MEDIAX_792452-T1/images/I/71ySJCxI4JL.__AC_SX300_SY300_QL70_FMwebp_.jpg" alt="" className="w-[70px] h-[70px] m-2" />

                <Link to='/'>
                <div className="pl-[5px]">
                    <h1 className="font-[600]">{data.name}</h1>
                    <h4 className="font-[600] text-[17px] pt-[3px] text-red-600 font-Roboto">   ${data.price}
                    </h4>
                </div>
                </Link>
                <RxCross1 size={18} className="cursor-pointer" title="Remove from wishlist" />
            </div>
            
        </div>
    );
}

export default Wishlist;
