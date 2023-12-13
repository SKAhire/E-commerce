import React from "react";
import {AiFillFacebook, AiFillGithub, AiFillInstagram, AiOutlineTwitter} from 'react-icons/ai'
import { footerProductLinks, footerSupportLinks, footercompanyLinks } from "../../static/data";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="bg-[#000] text-white">
      <div className="md:flex md:justify-between md:items-center sm:px-12 px-4 bg-purple-600 py-7">
        <h1 className="lg:text-4xl text-3xl md:mb-0 mb-6 lg:leading-normal font-semibold md: w-2/5">
          <span className="text-[#4a3b85]">Subscribe</span> us to get news <br /> events and offers
        </h1>
        <div>
            <input type="text" placeholder="Enter your email..." required className="text-gray-800 sm:w-72 w-full sm:mr-5 mr-1 lg:mb-0 mb-4 py-2.5 rounded px-2 focus:outline-none" />
            <button className="bg-[#4a3b85] hover:bg-[#806bd3] duration-300 px-5 py-2.5 rounded-md text-white md:w-auto w-full">Submit</button>
        </div>
      </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6 sm:px-8 px-5 py-16 sm:text-center">
            <ul className="px-5 text-center sm:text-start flex sm:block flex-col items-center">
                <img src="https://shopo.quomodothemes.website/assets/images/logo.svg" style={{filter: "brightness(0) invert(1)"}} alt="" />
                <br />
                <p>The home for all the product you need.</p>
                <div className="flex items-center mt-[15px]">
                    <AiFillFacebook size={25} className="cursor-pointer" />
                    <AiOutlineTwitter size={25} style={{marginLeft: "15px", cursor: "pointer"}} />
                    <AiFillInstagram size={25} style={{marginLeft: "15px", cursor: "pointer"}} />
                    <Link to={"https://github.com/SKAhire"} target="_blank"><AiFillGithub size={25} style={{marginLeft: "15px", cursor: "pointer"}} /></Link>
                </div>
            </ul>
            <ul className="text-center sm:text-start">
                <h1 className="mb-1 text-semibold">Shop</h1>
                {
                    footerProductLinks.map((link) => (
                        <li key={link.name}>
                            <Link to={link.link} className="text-gray-400 hover:text-purple-300 duration-300 cursor-pointer leading-6 text-sm" >{link.name}</Link>
                        </li>
                    ))
                }
            </ul>
            <ul className="text-center sm:text-start">
                <h1 className="mb-1 text-semibold">Company</h1>
                {
                    footercompanyLinks.map((link) => (
                        <li key={link.name}>
                            <Link to={link.link} className="text-gray-400 hover:text-purple-300 duration-300 cursor-pointer leading-6 text-sm" >{link.name}</Link>
                        </li>
                    ))
                }
            </ul>
            <ul className="text-center sm:text-start">
                <h1 className="mb-1 text-semibold">Support</h1>
                {
                    footerSupportLinks.map((link) => (
                        <li key={link.name}>
                            <Link to={link.link} className="text-gray-400 hover:text-purple-300 duration-300 cursor-pointer leading-6 text-sm" >{link.name}</Link>
                        </li>
                    ))
                }
            </ul>
        </div>
        <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10
         text-center pt-2 text-gray-400 text-sm pb-8"
      >
        <span>© 2023 Guru. All rights reserved.</span>
        <span>Terms · Privacy Policy</span>
        <div className="sm:block flex items-center justify-center w-full">
          <img
            src="https://hamart-shop.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffooter-payment.a37c49ac.png&w=640&q=75"
            alt=""
          />
        </div>
      </div>

    </div>
  );
};

export default Footer;
