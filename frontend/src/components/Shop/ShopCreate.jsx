import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import styles from "../../styles/styles";
import { Link } from "react-router-dom";
import { RxAvatar } from "react-icons/rx";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify"

const ShopCreate = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [avatar, setAvatar] = useState("");
    const [password, setPassword] = useState({ pass: "", cpass: "" });
    const [phoneNumber, setPhoneNumber] = useState();
    const [address, setAddress] = useState("");
    const [zip, setZip] = useState();
    const [visible, setVisible] = useState(false);
    // const navigate = useNavigate();
  
    
    const handleFileInputChange = (e) => {
      const file = e.target.files[0];
      setAvatar(file);
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      const config = {Headers: {"Content-Type":"multipart/form-data"}};
      const newForm = new FormData();
  
      newForm.append("file", avatar);
      newForm.append("name", name);
      newForm.append("email", email);
      newForm.append("password", password);
  
      axios.post(`${server}/user/create-user`, newForm, config).then((res) => {
        toast.success(res.data.message);
        setName("")
        setEmail("")
        setPassword({ pass: "", cpass: "" })
        setAvatar();
      }).catch((err) => {
        toast.error(err.response.data.message)
      })
    };
  
    return (
      <div className="min-h-screen bg-gray-100 flex justify-center flex-col py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold py-2 text-white bg-purple-600 shadow sm:rounded-lg">
            Register as new seller
          </h2>
        </div>
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="">
                <label
                  htmlFor="avatar"
                  className="block text-sm font-medium text-gray-700"
                ></label>
                <div className="mt-2 flex justify-center flex-col items-center">
                  <div className="h-40 w-40 rounded-full overflow-hidden">
                    {avatar ? (
                      <img
                        src={URL.createObjectURL(avatar)}
                        alt="avatar"
                        className="h-full w-full object-cover rounded-full "
                      />
                    ) : (
                      <RxAvatar className="h-40 w-40" />
                    )}
                  </div>
                  <div className="my-4 text-center">
                    <label
                      htmlFor="file-input"
                      className=" px-4 py-2 border border-gray-300 cursor-pointer rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 "
                    >
                      <span>Set Avatar</span>
                      <input
                        type="file"
                        name="avatar"
                        id="file-input"
                        accept=".jpg,.jpeg,.png"
                        onChange={handleFileInputChange}
                        className="sr-only cursor-pointer"
                      />
                    </label>
                  </div>
                </div>
              </div>
  
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Shop Name
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    autoComplete="name"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                    className="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:ring-purple-500 focus:outline-none focus:border-purple-500 sm:text-sm"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                Email Address
                </label>
                <div className="mt-1">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    className="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:ring-purple-500 focus:outline-none focus:border-purple-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="phoneNumber"
                  className="block text-sm font-medium text-gray-700"
                >
                Phone No.
                </label>
                <div className="mt-1">
                  <input
                    type="number"
                    name="phoneNumber"
                    id="phoneNumber"
                    autoComplete="phoneNumber"
                    value={phoneNumber}
                    onChange={(e) => {
                        setPhoneNumber(e.target.value);
                    }}
                    className="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:ring-purple-500 focus:outline-none focus:border-purple-500 sm:text-sm"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="zip"
                  className="block text-sm font-medium text-gray-700"
                >
                  Zip No.
                </label>
                <div className="mt-1">
                  <input
                    type="number"
                    name="zip"
                    id="zip"
                    autoComplete="zip"
                    value={zip}
                    onChange={(e) => {
                        setZip(e.target.value);
                    }}
                    className="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:ring-purple-500 focus:outline-none focus:border-purple-500 sm:text-sm"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-gray-700"
                >
                Address
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="address"
                    id="address"
                    autoComplete="address"
                    value={address}
                    onChange={(e) => {
                        setAddress(e.target.value);
                    }}
                    className="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:ring-purple-500 focus:outline-none focus:border-purple-500 sm:text-sm"
                  />
                </div>
              </div>
  
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <div className="mt-1 relative">
                  <input
                    type={visible ? "text" : "password"}
                    name="password"
                    id="password"
                    autoComplete="current-password"
                    value={password.pass}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    className="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:ring-purple-500 focus:outline-none focus:border-purple-500 sm:text-sm"
                  />
                  {visible ? (
                    <AiOutlineEye
                      className="absolute right-2 top-2 cursor-pointer"
                      size={25}
                      onClick={() => setVisible(false)}
                    />
                  ) : (
                    <AiOutlineEyeInvisible
                      className="absolute right-2 top-2 cursor-pointer"
                      size={25}
                      onClick={() => setVisible(true)}
                    />
                  )}
                </div>
              </div>
              <div>
                <label
                  htmlFor="cpassword"
                  className="block text-sm font-medium text-gray-700"
                >
                  Comfirm Password
                </label>
                <div className="mt-1 relative">
                  <input
                    type={visible ? "text" : "password"}
                    name="cpassword"
                    id="cpassword"
                    autoComplete="current-password"
                    value={password.cpass}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    className="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:ring-purple-500 focus:outline-none focus:border-purple-500 sm:text-sm"
                  />
                  {visible ? (
                    <AiOutlineEye
                      className="absolute right-2 top-2 cursor-pointer"
                      size={25}
                      onClick={() => setVisible(false)}
                    />
                  ) : (
                    <AiOutlineEyeInvisible
                      className="absolute right-2 top-2 cursor-pointer"
                      size={25}
                      onClick={() => setVisible(true)}
                    />
                  )}
                </div>
              </div>
  
              <div>
                <button
                  type="submit"
                  className="group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700"
                >
                  Submit
                </button>
              </div>
              <div className={`${styles.noramlFlex} w-full`}>
                <h4>Already have an account? </h4>
                <Link to="/login" className="text-purple-600 pl-2">
                  Login
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };

export default ShopCreate
