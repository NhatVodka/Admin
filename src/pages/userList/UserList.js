import React, { useContext, useEffect, useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { DataGrid } from "@mui/x-data-grid";
import { userRows } from "../../Userdata";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/userContext/UserContext";
import { deleteUser, getUsers } from "../../context/userContext/apiCalls";
const UserList = () => {
  const { users, dispatch } = useContext(UserContext);
  useEffect(() => {
    getUsers(dispatch);
  }, []);
  const handleDelete = (id) => {
    deleteUser(id, dispatch);
  };
  const columns = [
    { field: "_id", headerName: "ID", width: 200 },
    {
      field: "username",
      headerName: "User",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="flex items-center">
            <img
              src={params.row.profilePic}
              className="w-8 h-8 rounded-[50%] object-cover mr-3"
              alt=""
            />
            {params.row.username}
          </div>
        );
      },
    },
    { field: "email", headerName: "Email", width: 200 },
    {
      field: "password",
      headerName: "Password",
      width: 200,
    },
    {
      field: "isAdmin",
      headerName: "IsAdmin",
      width: 150,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/users/" + params.row._id}>
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
            rows={users}
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

export default UserList;
