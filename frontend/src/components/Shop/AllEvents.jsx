import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteShopEvent, getAllEventsShop } from "../../redux/actions/event";
import { Button } from "@material-ui/core";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import { Link } from "react-router-dom";
import Loader from "../layout/Loader";
import { DataGrid } from "@material-ui/data-grid";


const AllEvents = () => {
  const { event, isLoading } = useSelector((state) => state.event);
  const { shop } = useSelector((state) => state.shop);
  const dispatch = useDispatch();

  const handleDeleteEvent = (id) => {
    dispatch(deleteShopEvent(id))
    window.location.reload(true);
  }

  useEffect(() => {
    dispatch(getAllEventsShop(shop._id));
  }, [dispatch, shop._id]);

  const columns = [
    { field: "id", headerName: "Event Id", minWidth: 150, flex: 0.7 },
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
        const event_name = d.replace(/\s+/g, "-");
        return (
            <>
                <Link to={`/event/${event_name}`}>
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
                    <Button onClick={() => handleDeleteEvent(params.id)}>
                        <AiOutlineDelete size={20} />
                    </Button>
            </>
        )
      }
    },
  ];

  const row = [];

  event && event.forEach((item) => {
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

export default AllEvents;
