import React, { useContext, useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import PasswordIcon from "@mui/icons-material/Password";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import MailIcon from "@mui/icons-material/Mail";
import PublishIcon from "@mui/icons-material/Publish";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import { Link, useParams } from "react-router-dom";
import storage from "../../firebase";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { UserContext } from "../../context/userContext/UserContext";
import axios from "axios";
import { updateUser } from "../../context/userContext/apiCalls";

const User = () => {
  const dispatch = useContext(UserContext);

  const { userId } = useParams();
  const [user, setUser] = useState([]);
  const [profilePic, setProfilePic] = useState(user.profilePic);
  const [uploaded, setUploaded] = useState(0);

  const getUser = async () => {
    try {
      const res = await axios.get(`/users${userId ? `/${userId}` : ""}`, {
        headers: {
          token: "nhat " + JSON.parse(localStorage.getItem("user")).accessToken,
        },
      });
      setUser(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUser();
  }, []);
  // console.log(user);
  const { username, email, password, _id, isAdmin } = user;
  const handleChange = (e) => {
    const value = e.target.value;
    setUser({
      ...user,
      [e.target.name]: value,
    });
  };
  const handleUpdateUser = (id) => {
    updateUser(id, user, dispatch);
  };
  const handleUpload = (e) => {
    e.preventDefault();
    upload([{ file: profilePic, label: "profilePic" }]);
  };

  // Firebase configs
  const storage = getStorage();
  const metadata = {
    contentType: "image/jpeg",
  };

  const upload = (items) => {
    items.forEach((item) => {
      const fileName = new Date().getTime() + item.label + item.file;
      const storageRef = ref(storage, `/items/${fileName}`);
      const uploadTask = uploadBytesResumable(storageRef, item.file, metadata);
      uploadTask.on(
        "state changed",
        (snapshot) => {
          const progress = Math.trunc(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          console.log("Upload is " + progress + " % done");
        },
        (err) => {
          console.log(err);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            setUser((prev) => {
              return { ...prev, [item.label]: url };
            });
            setUploaded((prev) => prev + 1);
          });
        }
      );
    });
  };
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-[6]">
        <Navbar />
        <div className="flex-[4] p-5">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Edit User</h1>
            <Link to="/newuser">
              <button className="w-20 outline-none p-[5px] rounded-md bg-green-400 cursor-pointer text-white text-lg font-semibold">
                Create
              </button>
            </Link>
          </div>
          <div className="flex mt-5">
            <div className="flex-[1] p-5 shadow-lg h-[500px]">
              <div className="flex items-center">
                <img
                  className="w-10 h-10 rounded-full object-cover"
                  src={user.profilePic}
                  alt=""
                />
                <div className="flex flex-col ml-3">
                  <span className="font-semibold">{username}</span>
                  <span className="font-semibold">ID: {_id}</span>
                  <span className="font-light">{`${
                    isAdmin ? "Admin" : "Guess"
                  }`}</span>
                </div>
              </div>
              <div className="mt-5">
                <span className="text-lg font-semibold text-gray-500">
                  Account Details
                </span>
                <div className="flex items-center my-5 mx-0 text-gray-400">
                  <ManageAccountsIcon className=" text-base " />
                  <span className="ml-3 text-black">User Name: {username}</span>
                </div>
                <div className="flex items-center my-5 mx-0 text-gray-400">
                  <CreditCardIcon className=" text-base " />
                  <span className="ml-3 text-black">ID: {_id}</span>
                </div>
                <div className="flex items-center my-5 mx-0 text-gray-400">
                  <MailIcon className=" text-base " />
                  <span className="ml-3 text-black">Email: {email}</span>
                </div>
                {/* <div className="flex items-center my-5 mx-0 text-gray-400">
                  <PasswordIcon className=" text-base " />
                  <span className="ml-3 text-black">Password: {password}</span>
                </div> */}
                <div className="flex items-center my-5 mx-0 text-gray-400">
                  <PermIdentityIcon className=" text-base " />
                  <span className="ml-3 text-black">
                    Role: {`${isAdmin ? "Admin" : "Guess"}`}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex-[2] p-5 shadow-lg ml-5">
              <span className="text-2xl font-bold">Edit</span>
              <form className="flex justify-between mt-5">
                <div>
                  <div className="flex flex-col mt-3">
                    <label className="mb-1 text-base ">User name</label>
                    <input
                      type="text"
                      placeholder={username}
                      className="border-b-2 outline-none w-[250px]"
                      name="username"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="flex flex-col mt-3">
                    <label className="mb-1 text-base ">Email</label>
                    <input
                      type="text"
                      placeholder={email}
                      className="border-b-2 outline-none w-[250px]"
                      name="email"
                      onChange={handleChange}
                    />
                  </div>
                  {/* <div className="flex flex-col mt-3">
                    <label className="mb-1 text-base ">Password</label>
                    <input
                      type="text"
                      placeholder="abcxyz..."
                      className="border-b-2 outline-none w-[250px]"
                      name="password"
                      onChange={handleChange}
                    />
                  </div> */}
                  {/* <div className="flex flex-col mt-3">
                    <label className="mb-1 text-base ">IsAdmin</label>
                    <input
                      type="text"
                      placeholder="True..."
                      className="border-b-2 outline-none w-[250px]"
                      name="isAdmin"
                      onChange={handleChange}
                    />
                  </div> */}
                  <div className="flex flex-col mt-3">
                    <label className="mb-1 text-base ">Profile Pic</label>
                    <input
                      type="file"
                      className="border-b-2 outline-none w-[250px]"
                      name="profilePic"
                      onChange={(e) => setProfilePic(e.target.files[0])}
                    />
                  </div>
                </div>
                <div className="flex flex-col justify-between">
                  <div className="flex items-center">
                    <img
                      className="w-[100px] h-[100px] rounded-lg object-cover mr-5"
                      src={user.profilePic}
                      alt=""
                    />
                    <label htmlFor="file">
                      <PublishIcon className="cursor-pointer" />
                    </label>
                    <input style={{ display: "none" }} type="file" id="file" />
                  </div>
                  {uploaded === 1 ? (
                    <button
                      className="outlinie-none p-1 cursor-pointer rounded-md bg-blue-600 text-white "
                      onClick={() => handleUpdateUser(userId)}
                    >
                      Update
                    </button>
                  ) : (
                    <button
                      className="outlinie-none p-1 cursor-pointer rounded-md bg-blue-600 text-white "
                      onClick={handleUpload}
                    >
                      Upload
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;
