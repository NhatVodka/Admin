import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import { AuthContextProvider } from "./context/authContext/AuthContext";
import { MovieContextProvider } from "./context/movieContext/MovieContext";
import { CategoryContextProvider } from "./context/categoryContext/CategoryContext";
import { UserContextProvider } from "./context/userContext/UserContext";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <AuthContextProvider>
    <MovieContextProvider>
      <CategoryContextProvider>
        <UserContextProvider>
          <App />
        </UserContextProvider>
      </CategoryContextProvider>
    </MovieContextProvider>
  </AuthContextProvider>
  // </React.StrictMode>
);
