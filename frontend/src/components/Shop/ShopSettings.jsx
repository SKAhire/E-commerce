import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { backend_url, server } from "../../server";
import { AiOutlineCamera } from "react-icons/ai";
import styles from "../../styles/styles";
import axios from "axios";
import { loadShop } from "../../redux/actions/user";
import { toast } from "react-toastify";

const ShopSettings = () => {
  const { shop } = useSelector((state) => state.shop);
  const [avatar,setAvatar] = useState();
  const [name,setName] = useState(shop && shop.name);
  const [description,setDescription] = useState(shop && shop.description ? shop.description : "");
  const [address,setAddress] = useState(shop && shop.address);
  const [phoneNumber,setPhoneNumber] = useState(shop && shop.phoneNumber);
  const [zipCode,setZipcode] = useState(shop && shop.zipCode);


  const dispatch = useDispatch();

  const handleImage = async (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    setAvatar(file);

    const formData = new FormData();

    formData.append("image", e.target.files[0]);

    await axios.put(`${server}/shop/update-shop-avatar`, formData,{
        headers: {
            "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
    }).then((res) => {
        dispatch(loadShop());
        toast.success("Avatar updated successfully!")
    }).catch((error) => {
        toast.error(error.response.data.message);
    })

  };

  const updateHandler = async (e) => {
    e.preventDefault();

    await axios.put(`${server}/shop/update-shop-info`, {
        name,
        address,
        zipCode,
        phoneNumber,
        description,
    }, {withCredentials: true}).then((res) => {
        toast.success("Shop info updated succesfully!");
        dispatch(loadShop());
    }).catch((error)=> {
        toast.error(error.response.data.message);
    })
  };



  return (
      <div className="w-[90%] 800px:w-[80%] my-5 bg-white shadow h-[80vh] rounded-[4px] p-3 overflow-y-scroll">
        <div className="w-full flex items-center justify-center">
          <div className="relative">
            <img
              src={
                avatar ? URL.createObjectURL(avatar) : `${backend_url}/${shop.avatar}`
              }
              alt=""
              className="w-[150px] h-[150px] rounded-full cursor-pointer"
            />
            <div className="w-[30px] h-[30px] bg-[#E3E9EE] rounded-full flex items-center justify-center cursor-pointer absolute bottom-[10px] right-[15px]">
              <input
                type="file"
                id="image"
                className="hidden"
                onChange={handleImage}
              />
              <label htmlFor="image" className="cursor-pointer">
                <AiOutlineCamera />
              </label>
            </div>
          </div>
        </div>

        {/* shop info */}
        <form
          aria-aria-required={true}
          className="flex flex-col items-center"
          onSubmit={updateHandler}
        >
          <div className="w-[100%] flex items-center flex-col 800px:w-[50%] mt-5">
            <div className="w-full pl-[3%]">
              <label className="block pb-2">Shop Name</label>
            </div>
            <input
              type="name"
              placeholder={`${shop.name}`}
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-purple-600 focus:border-purple-600 sm:text-sm`}
              required
            />
          </div>
          <div className="w-[100%] flex items-center flex-col 800px:w-[50%] mt-5">
            <div className="w-full pl-[3%]">
              <label className="block pb-2">Shop description</label>
            </div>
            <input
              type="name"
              placeholder={`${
                shop?.description
                  ? shop.description
                  : "Enter your shop description"
              }`}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={`mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-purple-600 focus:border-purple-600 sm:text-sm`}
            />
          </div>
          <div className="w-[100%] flex items-center flex-col 800px:w-[50%] mt-5">
            <div className="w-full pl-[3%]">
              <label className="block pb-2">Shop Address</label>
            </div>
            <input
              type="name"
              placeholder={shop?.address}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className={`mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-purple-600 focus:border-purple-600 sm:text-sm`}
              required
            />
          </div>

          <div className="w-[100%] flex items-center flex-col 800px:w-[50%] mt-5">
            <div className="w-full pl-[3%]">
              <label className="block pb-2">Shop Phone Number</label>
            </div>
            <input
              type="number"
              placeholder={shop?.phoneNumber}
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className={`mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-purple-600 focus:border-purple-600 sm:text-sm`}
              required
            />
          </div>

          <div className="w-[100%] flex items-center flex-col 800px:w-[50%] mt-5">
            <div className="w-full pl-[3%]">
              <label className="block pb-2">Shop Zip Code</label>
            </div>
            <input
              type="number"
              placeholder={shop?.zipCode}
              value={zipCode}
              onChange={(e) => setZipcode(e.target.value)}
              className={`mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-purple-600 focus:border-purple-600 sm:text-sm`}
              required
            />
          </div>

          <div className="w-[100%] flex items-center flex-col 800px:w-[50%] mt-5">
            <input
              type="submit"
              value="Update Shop"
              className={`mt-2 appearance-none block w-full px-3 h-[35px] border hover:text-white font-[600] text-purple-600 rounded-[3px] focus:outline-none focus:ring-purple-600 hover:bg-purple-600 border-purple-600 sm:text-sm cursor-pointer`}
              required
              readOnly
            />
          </div>
        </form>
      </div>
    
  );
};

export default ShopSettings;