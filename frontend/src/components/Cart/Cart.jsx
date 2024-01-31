import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { IoBagHandleOutline } from "react-icons/io5";
import { HiOutlineMinus, HiPlus } from "react-icons/hi";
import styles from "../../styles/styles";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { backend_url } from "../../server";
import { addToCart, removeFromCart } from "../../redux/actions/cart";
import { toast } from "react-toastify";

const Cart = ({ setOpenCart }) => {
  const { cart } = useSelector((state) => state.cart);

  const dispatch = useDispatch();
  const removeFromCartHandler = (data) => {
    dispatch(removeFromCart(data));
    toast.error("Item removed from cart!");
  };

  const quantityChangeHandler = (data) => {
    dispatch(addToCart(data));
  };
  const totalPrice = cart.reduce(
    (acc, item) => acc + item.qty * item.discountPrice,
    0
  );

  return (
    <div className="fixed top-0 left-0 w-full h-screen z-10 bg-[#0000004b] ">
      <div className="fixed top-0 right-0 min-h-full w-[25%] bg-white flex flex-col justify-between shadow-sm">
        {cart && cart.length === 0 ? (
          <div>
            <div className="flex w-full justify-end pt-5 pr-5">
              <RxCross1
                size={25}
                className="cursor-pointer"
                onClick={() => setOpenCart(false)}
              />
            </div>
            <div className={`${styles.noramlFlex} p-4`}>
              <IoBagHandleOutline size={25} />
              <h5 className="pl-2 font-[500] text-[20px]">
                {cart && cart.length} Items
              </h5>
            </div>
            <div className="flex items-center justify-center w-full mt-20">
              <h5>Cart is empty!</h5>
            </div>
          </div>
        ) : (
          <>
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
                <h5 className="pl-2 font-[500] text-[20px]">
                  {cart && cart.length} Items
                </h5>
              </div>

              {/* cart single items */}
              <br />
              <div className="w-full border-t">
                {cart &&
                  cart.map((i, index) => (
                    <CardSingle
                      key={index}
                      data={i}
                      quantityChangeHandler={quantityChangeHandler}
                      removeFromCartHandler={removeFromCartHandler}
                    />
                  ))}
              </div>
              <div className="px-5 mb-3">
                {/* checkout button */}
                <Link to="/checkout">
                  <div className="h-[45px] flex items-center w-[100%] justify-center rounded-[5px] bg-purple-600">
                    <h1 className="text-white text-[18px] font-[600]">
                      {" "}
                      Checkout Now (${totalPrice})
                    </h1>
                  </div>
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const CardSingle = ({ data, quantityChangeHandler, removeFromCartHandler }) => {
  const [value, setVaule] = useState(data.qty);
  const totalPrice = data.discountPrice * value;
  // const d = data.name;
  // const product_name = d.replace(/\s+/g, "-");

  const increment = (data) => {
    if (data.stock < data.qty) {
      toast.error("Product is limited!");
    } else {
      setVaule(value + 1);
      const updateCartData = { ...data, qty: value + 1 };
      quantityChangeHandler(updateCartData);
    }
  };
  const decrement = (data) => {
    setVaule(value === 1 ? 1 : value - 1);
    const updateCartData = { ...data, qty: value === 1 ? 1 : value - 1 };
    quantityChangeHandler(updateCartData);
  };

  return (
    <div className="border-b p-4">
      <div className="w-full flex items-center justify-between">
        <div>
          <div
            className={`bg-purple-600 border-purple-900 rounded-full w-[25px] h-[25px] ${styles.noramlFlex} justify-center cursor-pointer`}
            onClick={() => increment(data)}
          >
            <HiPlus size={15} color="#fff" />
          </div>
          <span className="pl-[10px]">{value}</span>
          <div
            className={`bg-gray-400 border-gray-600 rounded-full w-[25px] h-[25px] ${styles.noramlFlex} justify-center cursor-pointer`}
            onClick={() => decrement(data)}
          >
            <HiOutlineMinus size={15} color="#fff" />
          </div>
        </div>

        <img
          src={`${backend_url}/${data?.images[0]}`}
          alt=""
          className="w-[70px] h-[70px] m-2"
        />

        <Link to={`/product/${data?._id}`}>
          <div className="pl-[5px]">
            <h1 className="font-[600]">{data.name}</h1>
            <h4 className="font-[400] text-[15px] text-[#00000082]">
              {" "}
              ${data.discountPrice} * {value}{" "}
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
          onClick={() => removeFromCartHandler(data)}
        />
      </div>
    </div>
  );
};

export default Cart;
