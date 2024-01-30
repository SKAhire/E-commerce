import React from "react";
import { RxCross1 } from "react-icons/rx";
import { BsCartPlus } from "react-icons/bs";
import styles from "../../styles/styles";
import { Link } from "react-router-dom";
import { AiOutlineHeart } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { removeFromWishlist } from "../../redux/actions/wishlist";
import { toast } from "react-toastify";
import { backend_url } from "../../server";
import { addToCart } from "../../redux/actions/cart";

const Wishlist = ({ setOpenWishlist }) => {
  const { wishlist } = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();

  const removeFromWishlistHandler = (data) => {
    dispatch(removeFromWishlist(data));
    toast.error("Item removed from wishlist!");
  };

  return (
    <div className="fixed top-0 left-0 w-full h-screen z-10 bg-[#0000004b] ">
      <div className="fixed top-0 right-0 min-h-full w-[25%] bg-white flex flex-col justify-between shadow-sm">
        <div>
          <div className="flex w-full justify-end pt-5 pr-5">
            <RxCross1
              size={25}
              className="cursor-pointer"
              onClick={() => setOpenWishlist(false)}
            />
          </div>

          {/* item length */}
          <div className={`${styles.noramlFlex} p-4`}>
            <AiOutlineHeart size={25} color="red" />
            <h5 className="pl-2 font-[500] text-[20px]">
              {wishlist && wishlist.length} items
            </h5>
          </div>

          {/* cart single items */}
          <br />
          {wishlist && wishlist.length === 0 ? (
            <div>
              <div className="flex items-center justify-center w-ful mt-20">
                <h5>Wishlist is empty!</h5>
              </div>
            </div>
          ) : (
            <div className="w-full border-t">
              {wishlist &&
                wishlist.map((i, index) => (
                  <CardSingle
                    key={index}
                    data={i}
                    removeFromWishlistHandler={removeFromWishlistHandler}
                  />
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const CardSingle = ({ data, removeFromWishlistHandler }) => {
  const { cart } = useSelector((state) => state.cart);
  const d = data.name;
  const product_name = d.replace(/\s+/g, "-");
  const dispatch = useDispatch();

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

  return (
    <div className="border-b p-4">
      <div className="w-full flex items-center justify-between">
        <BsCartPlus
          size={26}
          className="cursor-pointer"
          title="Add to Cart"
          onClick={() => addToCartHandler(data._id)}
        />

        <img
          src={`${backend_url}/${data?.images[0]}`}
          alt=""
          className="w-[70px] h-[70px] m-2"
        />

        <Link to={`/product/${product_name}`}>
          <div className="pl-[5px]">
            <h1 className="font-[600]">{data.name}</h1>
            <h4 className="font-[600] text-[17px] pt-[3px] text-red-600 font-Roboto">
              {" "}
              ${data.discountPrice}
            </h4>
          </div>
        </Link>
        <RxCross1
          size={18}
          className="cursor-pointer"
          title="Remove from wishlist"
          onClick={() => removeFromWishlistHandler(data)}
        />
      </div>
    </div>
  );
};

export default Wishlist;
