import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "../../styles/styles";
import { categoriesData, productData } from "../../static/data";
import { AiOutlineHeart, AiOutlineSearch, AiOutlineShoppingCart } from "react-icons/ai";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { BiMenuAltLeft } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import DropDown from "./DropDown";
import NavBar from "./NavBar";
import {useSelector} from "react-redux";
import { backend_url } from "../../server";
import Cart from "../Cart/Cart";
import Wishlist from "../Wishlist/Wishlist";

const Headers = ({activeHeading}) => {
  const {isAuthenticated, user} = useSelector((state) => state.user)
  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState(null);
  const [active, setActive] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [openWishlist, setOpenWishlist] = useState(false);
  
  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    const filteredProducts =
      productData &&
      productData.filter((product) =>
        product.name.toLowerCase().includes(term.toLowerCase())
      );
    setSearchData(filteredProducts);
  };

  window.addEventListener("scroll", () => {
    if (window.scrollY > 70) {
      setActive(true);
    } else {
      setActive(false);
    }
  });

  return (
    <>
      <div className={`${styles.section}`}>
        <div className="hidden 800px:h-[50px] 800px:my-[20px] 800px:flex item-center justify-between ">
          {/* logo */}
          <div>
            <Link to="/">
              <img
                src="https://shopo.quomodothemes.website/assets/images/logo.svg"
                alt=""
              />
            </Link>
          </div>
          {/* search box */}
          <div className="relative w-[50%]">
            <input
              type="text"
              name="search"
              id="search"
              placeholder="Search"
              value={searchTerm}
              onChange={handleSearchChange}
              className="h-[40px] w-full px-2 border-purple-600 border-[2px] rounded-md"
            />
            <AiOutlineSearch
              size={30}
              className="absolute right-2 top-1.5 cursor-pointer"
            />
            {searchData && searchData.length !== 0 ? (
              <div className="absolute min-h-[30vh] bg-slate-50 shadow-sm-2 z-[9] p-4">
                {searchData &&
                  searchData.map((i, index) => {
                    const d = i.name;

                    const Product_name = d.replace(/\s+/g, "-");
                    return (
                      <Link to={`/product/${Product_name}`}>
                        <div className="w-full flex items-start-py-3">
                          <img
                            src={i.image_Url[0].url}
                            alt=""
                            className="w-[40px] h-[40px] mr-[10px]"
                          />
                          <h1>{i.name}</h1>
                        </div>
                      </Link>
                    );
                  })}
              </div>
            ) : null}
          </div>
          <div className={`${styles.button} `} style={{margin: 0}}>
            <Link to="/seller">
              <h1 className="text-white flex items-center">
                Become Seller <IoIosArrowForward className="ml-1" />
              </h1>
            </Link>
          </div>
        </div>
      </div>
      <div
        className={`${
          active === true ? "shadow-sm fixed top-0 left-0 z-10" : null
        } transition hidden 800px:flex items-center justify-between w-full bg-purple-600 h-[55px]`}
      >
        <div
          className={`${styles.section} relative ${styles.noramlFlex} justify-between `}
        >
          {/* categories */}
          <div onClick={() => setDropDown(!dropDown)}>
            <div className="relative h-[50px] mt-[5px] w-[270px] hidden 1000px:block">
              <BiMenuAltLeft className="absolute top-3 left-2" size={30} />
              <button className="h-[100%] w-full flex justify-between items-center pl-10 bg-white font-sans text-lg font-[500] select-none rounded-t-md">
                All Categories
              </button>
              <IoIosArrowDown
                size={20}
                className="absolute right-2 top-4 cursor-pointer"
                
              />
              {
                dropDown ?(
                  <DropDown
                  categoriesData={categoriesData}
                  setDropDown={setDropDown}
                  />
                ) : null
              }
            </div>
          </div>
              {/* nav items */}
              <div className={`${styles.noramlFlex}`}>
                <NavBar active={activeHeading}/>
              </div>
              <div className="flex">
                <div className={`${styles.noramlFlex}`}>
                  <div className="relative cursor-pointer mr-[15px]" onClick={()=> setOpenWishlist(true)}>
                    <AiOutlineHeart size={30} color="rgb(255 255 255/83%)" />
                    <span className="absolute right-0 top-0 rounded-full bg-[#4a3b85] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
                      0
                    </span>
                  </div>
                </div>
                <div className={`${styles.noramlFlex}`}>
                  <div className="relative cursor-pointer mr-[15px]" onClick={()=> setOpenCart(true)}>
                    <AiOutlineShoppingCart size={30} color="rgb(255 255 255/83%)" />
                    <span className="absolute right-0 top-0 rounded-full bg-[#4a3b85] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
                      0
                    </span>
                  </div>
                </div>
                <div className={`${styles.noramlFlex}`}>
                  <div className="relative cursor-pointer mr-[15px]">

                    {
                      isAuthenticated ? (
                        <Link to="/profile">
                          <img src={`${backend_url}//madara-1702551573990-149969847.png`} alt="" className="w-[40px] h-[40px] rounded-full" /> 
                          {/* <img src={`${backend_url}/${user.avatar}`} alt="" className="w-[40px] h-[40px] rounded-full" />  */}

                          </Link>
                      )
                      : (
                        <Link to="/login"><CgProfile size={30} color="rgb(255 255 255/83%)" /></Link>
                      )
                    }
                    
                  </div>
                </div>

                    {/* Cart pop up */}
                    {
                      openCart ? (
                        <Cart setOpenCart={setOpenCart} />
                      ) : null
                    }

                    {/* wishlist pop up */}
                    {
                      openWishlist ? (
                        <Wishlist setOpenWishlist={setOpenWishlist} />
                      ) : null
                    }

              </div>
        </div>
      </div>
    </>
  );
};

export default Headers;
