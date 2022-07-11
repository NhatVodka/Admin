import React, { useContext, useEffect } from "react";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { CategoryContext } from "../../context/categoryContext/CategoryContext";
import {
  deleteCategory,
  getCategory,
} from "../../context/categoryContext/apiCalls";
const CategoryList = () => {
  const { category, dispatch } = useContext(CategoryContext);
  useEffect(() => {
    getCategory(dispatch);
  }, [dispatch]);
  const handleDelete = (id) => {
    deleteCategory(id, dispatch);
  };
  const columns = [
    { field: "_id", headerName: "ID", width: 250 },
    {
      field: "categoryName",
      headerName: "Category",
      width: 200,
    },
    {
      field: "page",
      headerName: "Page",
      width: 120,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link
              to={{
                pathname: "/category/" + params.row._id,
              }}
              state={{ category: params.row }}
            >
              <EditIcon className="text-green-500 cursor-pointer mr-5" />
            </Link>
            <DeleteIcon
              onClick={() => handleDelete(params.row._id)}
              className=" text-red-600 cursor-pointer"
            />
          </>
        );
      },
    },
  ];
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-[6]">
        <Navbar />
        <div className="flex-[4] p-5 w-full h-[600px]">
          <DataGrid
            rows={category}
            columns={columns}
            pageSize={8}
            rowsPerPageOptions={[8]}
            checkboxSelection
            disableSelectionOnClick
            getRowId={(r) => r._id}
          />
        </div>
      </div>
    </div>
  );
};

export default CategoryList;
