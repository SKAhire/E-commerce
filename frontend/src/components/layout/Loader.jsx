import React from 'react'
import Lottie from "lottie-react";
import animationData from "../../assets/animations/Animation - 1706018004094.json";

const Loader = () => {
  return (
    <div className='w-full h-screen flex items-center justify-center'>
      <Lottie animationData={animationData} loop={false} autoplay={true} rendererSettings={{preserveAspectRatio: "xMidYMid slice"}} style={{height: "300px", width: "300px", }} />
    </div>
  )
}

export default Loader
