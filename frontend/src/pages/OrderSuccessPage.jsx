import React from "react";
import Lottie from "lottie-react";
import animationData from "../assets/animations/107043-success.json";
import Headers from "../components/layout/Headers";
import Footer from "../components/layout/Footer";
const OrderSuccessPage = () => {
  return (
    <div>
      <Headers />
      <Success />
      <Footer />
    </div>
  );
};

const Success = () => {
//   const defaultOptions = {
//     loop: false,
//     autoplay: true,
//     animationData: animationData,
//     rendererSettings: {
//       preserveAspectRatio: "xMidYMid slice",
//     },
//   };
  return (
    <div className="flex flex-col justify-center items-center">
      <Lottie animationData={animationData} loop={false} autoplay={true} rendererSettings={{preserveAspectRatio: "xMidYMid slice"}} style={{height: "300px", width: "300px", }} />
      <h5 className="text-center mb-14 text-[25px] text-[#000000a1]">
        Your order is successful 👍
      </h5>
      <br />
      <br />
    </div>
  );
};

export default OrderSuccessPage;
