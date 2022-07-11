import Home from "./pages/home/Home";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/login/Login";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import MovieList from "./pages/movieList/MovieList";
import Movie from "./pages/movie/Movie";
import { useContext } from "react";
import { AuthContext } from "./context/authContext/AuthContext";
import NewMovie from "./pages/newMovie/NewMovie";
import CategoryList from "./pages/categoryList/CategoryList";
import Category from "./pages/category/Category";
import NewCategory from "./pages/newCategory/NewCategory";

function App() {
  const { user } = useContext(AuthContext);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={user ? <Navigate to="/dashboard" /> : <Login />}
          ></Route>

          {user && (
            <Route path="/dashboard">
              <Route index element={<Home />}></Route>
              <Route path="users">
                <Route index element={<UserList />}></Route>
                <Route path=":userId" element={<User />}></Route>
              </Route>
              <Route path="newuser" element={<NewUser />}></Route>
              <Route path="movies">
                <Route index element={<MovieList />}></Route>
                <Route path=":movieId" element={<Movie />}></Route>
              </Route>
              <Route path="newmovie" element={<NewMovie />}></Route>
              <Route path="category">
                <Route index element={<CategoryList />}></Route>
                <Route path=":categoryId" element={<Category />}></Route>
              </Route>
              <Route path="newcategory" element={<NewCategory />}></Route>
            </Route>
          )}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
