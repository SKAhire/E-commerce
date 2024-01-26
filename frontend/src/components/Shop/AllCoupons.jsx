import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteShopCoupon,
} from "../../redux/actions/coupons";
import { Button } from "@material-ui/core";
import { AiOutlineDelete } from "react-icons/ai";
import Loader from "../layout/Loader";
import { DataGrid } from "@material-ui/data-grid";
import styles from "../../styles/styles";
import { RxCross1 } from "react-icons/rx";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify"

const AllCoupons = () => {
  const { product } = useSelector((state) => state.product);
  const { shop } = useSelector((state) => state.shop);
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [coupons,setCoupons] = useState([]);
  const [name, setName] = useState("");
  const [value, setValue] = useState(null);
  const [minAmount, setMinAmount] = useState(null);
  const [maxAmount, setMaxAmount] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState();

  // add coupon data to the database
  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios
      .post(
        `${server}/coupon/create-coupon`,
        {
          name,
          minAmount,
          maxAmount,
          selectedProducts,
          value,
          shopId: shop._id,
        },
        { withCredentials: true }
      )
      .then((res) => {
       toast.success("Coupon code created successfully!");
       setOpen(false);
       window.location.reload();
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  // fetching coupon data from data base
  const handleDelete = async (id) => {
    axios.delete(`${server}/coupon/delete-coupon/${id}`,{withCredentials: true}).then((res) => {
      toast.success("Coupon code deleted succesfully!")
    })
    window.location.reload();
  };

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${server}/coupon/get-coupons/${shop._id}`, {
        withCredentials: true,
      })
      .then((res) => {
        setIsLoading(false);
        setCoupons(res.data.coupon);
      })
      .catch((error) => {
        setIsLoading(false);
      });
  }, [dispatch]);

  const columns = [
    { field: "id", headerName: "Coupon Id", minWidth: 150, flex: 0.7 },
    { field: "name", headerName: "Name", minWidth: 180, flex: 1.4 },
    {
      field: "price",
      headerName: "Price",
      type: "number",
      minWidth: 100,
      flex: 0.6,
    },
    {
      field: "Delete",
      headerName: "",
      type: "number",
      minWidth: 100,
      flex: 0.8,
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Button onClick={() => handleDelete(params.id)}>
              <AiOutlineDelete size={20} />
            </Button>
          </>
        );
      },
    },
  ];

  const row = [];

  coupons &&
  coupons.forEach((item) => {
      row.push({
        id: item._id,
        name: item.name,
        price: item.value + "%",
      });
    });

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-full mx-8 pt-1 mt-10 bg-white">
          <div className="w-full flex justify-end">
            <div
              className={`${styles.button} !w-max !h-[45px] px-3 !rounded-[5px] mr-3 mb-3`}
              onClick={() => setOpen(true)}
            >
              <span className="text-white">Create Coupon Code</span>
            </div>
          </div>
          <DataGrid
            rows={row}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            autoHeight
          />

          {open && (
            <div className="flex items-center justify-center fixed top-0 left-0 w-full h-screen z-[2000] bg-[#000000b0]">
              <div className="w-[90%] 800px:w-[40%] h-[80vh] bg-white rounded-md shadow overflow-y-scroll">
                <div className="w-full flex justify-end p-3">
                  <RxCross1
                    size={30}
                    className="cursor-pointer"
                    onClick={() => setOpen(false)}
                  />
                </div>
                {/* create coupon form  */}
                <div className="w-full p-3">
                  <h5 className="text-center text-[30px] font-Poppins">
                    Create Coupon Code
                  </h5>
                  <form onSubmit={handleSubmit} aria-required={true}>
                    <br />
                    <div>
                      <label className="pb-2">
                        Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        required
                        type="text"
                        name="name"
                        className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-purple-600 focus:border-purple-600 sm:text-sm"
                        placeholder="Enter your coupon name..."
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <br />
                    <div>
                      <label className="pb-2">
                        Discount Percentage
                        <span className="text-red-500">*</span>
                      </label>
                      <input
                        required
                        type="number"
                        name="value"
                        className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-purple-600 focus:border-purple-600 sm:text-sm"
                        placeholder="Enter your coupon discount percent..."
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                      />
                    </div>
                    <br />
                    <div>
                      <label className="pb-2">
                        Minimum Amount
                        <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        name="minAmount"
                        className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-purple-600 focus:border-purple-600 sm:text-sm"
                        placeholder="Enter your coupon minimum amount..."
                        value={minAmount}
                        onChange={(e) => setMinAmount(e.target.value)}
                      />
                    </div>
                    <br />
                    <div>
                      <label className="pb-2">Maximum Amount</label>
                      <input
                        type="number"
                        name="maxAmount"
                        className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-purple-600 focus:border-purple-600 sm:text-sm"
                        placeholder="Enter your coupon Maximum amount..."
                        value={maxAmount}
                        onChange={(e) => setMaxAmount(e.target.value)}
                      />
                    </div>
                    <br />
                    <div>
                      <label className="pb-2">Select Product</label>
                      <select
                        name="category"
                        value={selectedProducts}
                        onChange={(e) => setSelectedProducts(e.target.value)}
                        className="mt-2 w-full px-3 h-[35px] border border-gray-300 rounded-[3px] focus:ring-purple-600 focus:border-purple-600 sm:text-sm"
                      >
                        <option value="Choose a product">
                          Choose a Product
                        </option>
                        {product &&
                          product.map((i) => (
                            <option value={i.name} key={i.name}>
                              {i.name}
                            </option>
                          ))}
                      </select>
                    </div>
                    <br />
                    <div>
                      <input
                        type="submit"
                        className="mt-2 appearance-none block w-full px-3 h-[35px] border hover:text-white font-[600] text-purple-600 rounded-[3px] focus:outline-none focus:ring-purple-600 hover:bg-purple-600 border-purple-600 sm:text-sm cursor-pointer"
                        value="Create"
                      />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default AllCoupons;
