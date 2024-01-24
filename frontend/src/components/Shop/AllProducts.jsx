import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteShopProduct, getAllProductsShop } from "../../redux/actions/product";
import { Button } from "@material-ui/core";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import { Link } from "react-router-dom";
import Loader from "../layout/Loader";
import { DataGrid } from "@material-ui/data-grid";


const AllProducts = () => {
  const { product, isLoading } = useSelector((state) => state.product);
  const { shop } = useSelector((state) => state.shop);
  const dispatch = useDispatch();

  const handleDeleteProduct = (id) => {
    dispatch(deleteShopProduct(id))
    window.location.reload(true);
  }

  useEffect(() => {
    dispatch(getAllProductsShop(shop._id));
  }, [dispatch]);

  const columns = [
    { field: "id", headerName: "Product Id", minWidth: 150, flex: 0.7 },
    { field: "name", headerName: "Name", minWidth: 180, flex: 1.4 },
    {
      field: "price",
      headerName: "Price",
      type: "number",
      minWidth: 100,
      flex: 0.6,
    },
    {
      field: "Stock",
      headerName: "Stock",
      type: "number",
      minWidth: 80,
      flex: 0.5,
    },
    {
      field: "sold",
      headerName: "Sold Out",
      type: "number",
      minWidth: 130,
      flex: 0.6,
    },
    {
      field: "Preview",
      headerName: "",
      type: "number",
      minWidth: 100,
      flex: 0.8,
      sortable: false,
      renderCell: (params) => {
        const d = params.row.name;
        const product_name = d.replace(/\s+/g, "-");
        return (
            <>
                <Link to={`/product/${product_name}`}>
                    <Button>
                        <AiOutlineEye size={20} />
                    </Button>
                </Link>
            </>
        )
      }
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
                    <Button onClick={() => handleDeleteProduct(params.id)}>
                        <AiOutlineDelete size={20} />
                    </Button>
            </>
        )
      }
    },
  ];

  const row = [];

  product && product.forEach((item) => {
    row.push({
        id: item._id,
        name: item.name,
        price: "US$ " + item.discountPrice,
        Stock: item.stock,
        sold: 10,
    });
  });


  return (
       <>
         {
            isLoading ? (
                <Loader />
            ) : (
                <div className="w-full mx-8 pt-1 mt-10 bg-white">
                    <DataGrid
                        rows={row}
                        columns={columns}
                        pageSize={10}
                        disableSelectionOnClick
                        autoHeight
                    />
                </div>
            )
        }
       </>
    )
};

export default AllProducts;
