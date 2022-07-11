import React, { useState, useContext } from "react";
import { login } from "../../context/authContext/apiCalls";
import { AuthContext } from "../../context/authContext/AuthContext";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isFetching, dispatch } = useContext(AuthContext);
  const handleLogin = (e) => {
    e.preventDefault();
    login({ email, password }, dispatch);
  };
  return (
    <>
      <div className="w-full h-screen flex items-center justify-center">
        <form className="flex flex-col">
          <input
            className="mb-4 p-3 outline-none border-2 border-gray-400 "
            type="text"
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="mb-4  p-3 outline-none border-2 border-gray-400 "
            type="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="bg-teal-500 outline-none text-white p-3 cursor-pointer"
            onClick={handleLogin}
            disabled={isFetching}
          >
            Login
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
