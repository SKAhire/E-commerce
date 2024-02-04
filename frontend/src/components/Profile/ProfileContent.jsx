import React, { useState } from "react";
import { backend_url, server } from "../../server";
import { useDispatch, useSelector } from "react-redux";
import {
  AiOutlineArrowRight,
  AiOutlineCamera,
  AiOutlineDelete,
} from "react-icons/ai";
import styles from "../../styles/styles";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import { MdOutlineTrackChanges } from "react-icons/md";
import { updateUserInfo } from "../../redux/actions/user";
import axios from "axios";
import {toast} from 'react-toastify'

const ProfileContent = ({ active }) => {
  const { user } = useSelector((state) => state.user);
  const [name, setName] = useState(user && user.name);
  const [email, setEmail] = useState(user && user.email);
  const [phoneNumber, setPhoneNumber] = useState(user && user.phoneNumber);
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(null);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    // had an error because the parameter sequence was not matching in user->action
    dispatch(updateUserInfo(email, password, phoneNumber, name));
  };
  const handleAvatar = async (e) => {
    const file = e.target.files[0];
    setAvatar(file);
    const formData = new FormData();
    formData.append("image", e.target.files[0])

    await axios.put(`${server}/user/update-avatar`, formData, {
      headers: {
        "Content-Type" : "multipart/form-data"
      },
      withCredentials: true
    }).then((response) => {
      window.location.reload(true)
    }).catch((error) => {
      toast.error(error)
    })
  }

  return (
    <div className="w-full shadow-md bg-purple-100 rounded-md ">
      {/* Profile */}
      {active === 1 && (
        <>
          <div className="flex justify-center w-full">
            <div className="relative">
              {/* <img
                src={`${backend_url}/wallpaperflare-1705498442315-73567505.png`}
                alt={user}
                className="w-[150px] h-[150px] rounded-full object-cover border-[3px] border-[#4a3b85]"
              /> */}
              <img
                src={`${backend_url}/${user?.avatar}`}
                alt="profile image"
                className="w-[150px] h-[150px] rounded-full object-cover border-[3px] border-[#4a3b85] mt-2"
              />
              <div className="flex items-center w-[30px] h-[30px] bg-[#e3e9ee] rounded-full justify-center cursor-pointer absolute bottom-[5px] right-[5px]">
                <input type="file" id="image" className="hidden" onChange={handleAvatar}/>
                <label htmlFor="image">
                  <AiOutlineCamera className="cursor-pointer" />
                </label>
              </div>
            </div>
          </div>
          <br />
          <br />
          <div className="w-full px-5">
            <form onSubmit={handleSubmit}>
              <div className="w-full 800px:flex pb-3">
                <div className="w-[100%] 800px:w-[50%]">
                  <label className="block pb-2">Full Name:</label>
                  <input
                    placeholder="Enter your full name"
                    type="text"
                    autoComplete="on"
                    required
                    className={`${styles.input} p-2 !w-[95%] mb-4 800px:mb-0`}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="w-[100%] 800px:w-[50%]">
                  <label className="block pb-2">Email:</label>
                  <input
                    placeholder="Enter your email address"
                    type="email"
                    autoComplete="on"
                    className={`${styles.input} p-2 !w-[95%] mb-1 800px:mb-0`}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="w-full 800px:flex block pb-3">
                <div className="w-[100%] 800px:w-[50%]">
                  <label className="block pb-2">Phone No.:</label>
                  <input
                    type="number"
                    autoComplete="on"
                    placeholder="Enter your 10-digits phone number"
                    className={`${styles.input} p-2 !w-[95%] mb-4 800px:mb-0`}
                    value={phoneNumber}
                    maxLength={10}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                  />
                </div>
                <div className="w-[100%] 800px:w-[50%]">
                  <label className="block pb-2">Password:</label>
                  <input
                    type="password"
                    autoComplete="off"
                    className={`${styles.input} p-2 !w-[95%] mb-1 800px:mb-0`}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password!"
                    required
                  />
                </div>
              </div>
              <input
                type="submit"
                value="Update"
                className="w-[200px] h-[40px] border font-[600] border-purple-600 text-center rounded-[3px] text-purple-600 mt-6 mb-2 cursor-pointer hover:bg-purple-600 hover:text-white"
              />
            </form>
          </div>
        </>
      )}

      {/* Order */}
      {active === 2 && (
        <div>
          <AllOrders />
        </div>
      )}

      {/* Refund */}
      {active === 3 && (
        <div>
          <AllRefundOrders />
        </div>
      )}

      {/* Track order */}
      {active === 5 && (
        <div>
          <TrackOrder />
        </div>
      )}
      {/* Payment Method */}
      {active === 6 && (
        <div>
          <PaymentMethod />
        </div>
      )}
      {/* User Address */}
      {active === 7 && (
        <div>
          <Address />
        </div>
      )}
    </div>
  );
};

const AllOrders = () => {
  const orders = [
    {
      _id: "13somerandomtextasid13",
      orderItems: [
        {
          name: "iPhone 16 max pro",
        },
      ],
      totalPrice: 120,
      orderStatus: "Processing",
    },
  ];

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Delivered"
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },

    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },

    {
      field: " ",
      flex: 1,
      minWidth: 150,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/user/order/${params.id}`}>
              <Button>
                <AiOutlineArrowRight size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
  ];

  const row = [];

  orders &&
    orders.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: item.orderItems.length,
        total: "US$ " + item.totalPrice,
        status: item.orderStatus,
      });
    });

  return (
    <div className="pl-8 pt-1">
      <DataGrid
        className="bg-white"
        rows={row}
        columns={columns}
        pageSize={10}
        disableSelectionOnClick
        autoHeight
      />
    </div>
  );
};

const AllRefundOrders = () => {
  const orders = [
    {
      _id: "13somerandomtextasid13",
      orderItems: [
        {
          name: "iPhone 16 max pro",
        },
      ],
      totalPrice: 120,
      orderStatus: "Processing",
    },
  ];

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Delivered"
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },

    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },

    {
      field: " ",
      flex: 1,
      minWidth: 150,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/user/order/${params.id}`}>
              <Button>
                <AiOutlineArrowRight size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
  ];

  const row = [];

  orders &&
    orders.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: item.orderItems.length,
        total: "US$ " + item.totalPrice,
        status: item.orderStatus,
      });
    });

  return (
    <div className="pl-8 pt-1">
      <DataGrid
        className="bg-white"
        rows={row}
        columns={columns}
        pageSize={10}
        disableSelectionOnClick
        autoHeight
      />
    </div>
  );
};

const TrackOrder = () => {
  const orders = [
    {
      _id: "13somerandomtextasid13",
      orderItems: [
        {
          name: "iPhone 16 max pro",
        },
      ],
      totalPrice: 120,
      orderStatus: "Processing",
    },
  ];

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Delivered"
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },

    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },

    {
      field: " ",
      flex: 1,
      minWidth: 150,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/user/track/order/${params.id}`}>
              <Button>
                <MdOutlineTrackChanges size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
  ];

  const row = [];

  orders &&
    orders.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: item.orderItems.length,
        total: "US$ " + item.totalPrice,
        status: item.status,
      });
    });

  return (
    <div className="pl-8 pt-1">
      <DataGrid
        className="bg-white"
        rows={row}
        columns={columns}
        pageSize={10}
        disableSelectionOnClick
        autoHeight
      />
    </div>
  );
};

const PaymentMethod = () => {
  return (
    <div className="w-full px-5">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-[25px] font-[600] py-2">Payment Methods</h1>
        <div className={`${styles.button} !rounded-md`}>
          <span className="text-white">Add New</span>
        </div>
      </div>
      <br />
      <div className="w-full bg-white rounded-[4px] h-[70px] flex items-center justify-between px-3 shadow pr-10">
        <div className="flex items-center">
          <img
            src="https://bonik-react.vercel.app/assets/images/payment-methods/Visa.svg"
            alt=""
          />
          <h5 className="pl-5 font-[600]">Guru</h5>
        </div>
        <div className="pl-8 flex items-center">
          <h6>1234 **** **** ****</h6>
          <h5 className="pl-6">08/2024</h5>
        </div>
        <div className="flex items-center pl-8 justify-between min-w-[10%]">
          <AiOutlineDelete size={25} className="cursor-pointer text-[red]" />
        </div>
      </div>
    </div>
  );
};

const Address = () => {
  return (
    <div className="w-full px-5">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-[25px] font-[600] py-2">Addresses</h1>
        <div className={`${styles.button} !rounded-md`}>
          <span className="text-white">Add New</span>
        </div>
      </div>
      <br />
      <div className="w-full bg-white rounded-[4px] h-[70px] flex items-center justify-between px-3 shadow pr-10">
        <div className="flex items-center">
          <h5 className="pl-5 font-[600]">Default Address</h5>
        </div>
        <div className="pl-8 flex items-center">
          <h6>
            Juhu Tara Rd, opposite JW Marriott, Juhu Tara, Juhu, Mumbai,
            Maharashtra 400049, India
          </h6>
        </div>
        <div className="pl-8 flex items-center">
          <h6>9876543210</h6>
        </div>
        <div className="flex items-center pl-8 justify-between min-w-[10%]">
          <AiOutlineDelete size={25} className="cursor-pointer text-[red]" />
        </div>
      </div>
    </div>
  );
};

export default ProfileContent;
