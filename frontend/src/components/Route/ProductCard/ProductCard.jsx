import React, { useEffect, useState } from "react";
import ProductDetailsCard from "../ProductDetailsCard/ProductDetailsCard"
import { Link } from "react-router-dom";
import styles from "../../../styles/styles";
import {
  AiFillHeart,
  AiFillStar,
  AiOutlineEye,
  AiOutlineHeart,
  AiOutlineShoppingCart,
  AiOutlineStar,
} from "react-icons/ai";
import { backend_url } from "../../../server";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addToCart } from "../../../redux/actions/cart";
import { addToWishlist, removeFromWishlist } from "../../../redux/actions/wishlist";

function ProductCard({ data }) {
  const { cart } = useSelector((state) => state.cart);
  const { wishlist } = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [click, setClick] = useState(false);

  // const d = data.name;
  // const product_name = d.replace(/\s+/g, "-");

  useEffect(() => {
  if(wishlist && wishlist.find((i) => i._id === data._id )){
    setClick(true)
  }else{
    setClick(false)
  }
  }, [wishlist, data._id])
  

  const addToCartHandler = (id) => {
    const itemExists = cart && cart.find((i) => i._id === id);
    if (itemExists) {
      toast.error("Item already in cart!");
    } else {
      const cartData = { ...data, qty: 1 };
      dispatch(addToCart(cartData));
      toast.success("Item added to cart successfully!");
    }
  };

  const removeFromWishlistHandler = (data) => {
    setClick(!click);
    dispatch(removeFromWishlist(data))
    toast.error("Item removed from wishlist!");
  }
  const addToWishlistHandler = (data) => {
    setClick(!click);
    dispatch(addToWishlist(data))
    toast.success("Item added to wishlist!");
  }

  return (
    <>
      <div className="w-full h-[370px] bg-white rounded-lg shadow-sm p-3 relative cursor-pointer">
        <div className="flex justify-end"></div>
        <Link to={`/product/${data._id}`}>
          <img
            src={`${backend_url}/${data.images && data.images[0]}`}
            alt={data.name}
            className="w-full h-[170px] object-contain"
          />
        </Link>
        <Link to={`/shop/${data.shop._id}`}>
          <h5 className={`${styles.shop_name}`}>{data.shop.name}</h5>
        </Link>
        <Link to={`/product/${data._id}`}>
          <h4 className="pb-4 font-[500]">
            {data.name.length > 40 ? data.name.slice(0, 40) + "..." : data.name}
          </h4>
          <div className="flex">
            <AiFillStar
              className="mr-2 cursor-pointer"
              size={20}
              color="#f6Ba00"
            />
            <AiFillStar
              className="mr-2 cursor-pointer"
              size={20}
              color="#f6Ba00"
            />
            <AiFillStar
              className="mr-2 cursor-pointer"
              size={20}
              color="#f6Ba00"
            />
            <AiFillStar
              className="mr-2 cursor-pointer"
              size={20}
              color="#f6Ba00"
            />
            <AiOutlineStar
              className="mr-2 cursor-pointer"
              size={20}
              color="#f6Ba00"
            />
          </div>
          <div className="flex py-3 items-center justify-between">
            <div className="flex">
              <h5 className={`${styles.productDiscountPrice}`}>
                {data.originalPrice  === 0 ? data.originalPrice  : data.discountPrice}$
              </h5>
              <h4 className={`${styles.price}`}>
                {data.originalPrice  ? data.originalPrice  + " $" : null}
              </h4>
            </div>
            <span className="font-[400] text-[17px] text-purple-600">
              13 sold
            </span>
          </div>
        </Link>
        {/* side options */}
        <div>
          {click ? (
            <AiFillHeart
              size={22}
              className="cursor-pointer absolute right-2 top-5"
              onClick={() => removeFromWishlistHandler(data)}
              color={click ? "red" : "#333"}
              title="Remove from wishlist"
            />
          ) : (
            <AiOutlineHeart
              size={22}
              className="cursor-pointer absolute right-2 top-5"
              onClick={() => addToWishlistHandler(data)}
              color={click ? "red" : "#333"}
              title="Add to wishlist"
            />
          )}
          <AiOutlineEye
              size={22}
              className="cursor-pointer absolute right-2 top-14"
              onClick={() => setOpen(!open)}
              color={"#333"}
              title="Qucik view"
            />
          <AiOutlineShoppingCart
              size={25}
              className="cursor-pointer absolute right-2 top-24"
              onClick={() => addToCartHandler(data._id)}
            
              color={"#444"}
              title="Add to cart"
            />
            {
                open ? 
                (<ProductDetailsCard setOpen={setOpen} data={data} />) : null
            }
        </div>
      </div>
    </>
  );
}

export default ProductCard;
