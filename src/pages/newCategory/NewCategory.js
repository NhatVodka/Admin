import React, { useContext, useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { createCategory } from "../../context/categoryContext/apiCalls";
import { CategoryContext } from "../../context/categoryContext/CategoryContext";
import { getMovies } from "../../context/movieContext/apiCalls";
import { MovieContext } from "../../context/movieContext/MovieContext";
import { useNavigate } from "react-router-dom";
const NewCategory = () => {
  const { dispatch } = useContext(CategoryContext);
  const { movies, dispatch: dispatchMovie } = useContext(MovieContext);
  const [category, setCategory] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    getMovies(dispatchMovie);
  }, [dispatchMovie]);

  const handleChange = (e) => {
    const value = e.target.value;
    setCategory({ ...category, [e.target.name]: value });
  };
  const handleSelect = (e) => {
    let value = Array.from(e.target.selectedOptions, (option) => option.value);
    setCategory({ ...category, [e.target.name]: value });
  };
  const handleCreate = (e) => {
    e.preventDefault();
    createCategory(category, dispatch);
    navigate("/category/");
  };
  // console.log(
  //   movies.filter((item) => {
  //     return category?.results.includes(item._id);
  //   })
  // );
  console.log(category);
  return (
    <div className="flex ">
      <Sidebar />
      <div className="flex-[4]">
        <Navbar />
        <div className="p-5">
          <h1 className="text-2xl font-bold">New Category</h1>
          <form className="flex flex-wrap gap-10">
            <div className="w-[400px] flex flex-col mt-3 mr-5 gap-10">
              <div className="w-[400px] flex flex-col mt-3 mr-5">
                <label className="mb-3 text-xl font-semibold text-black">
                  Title
                </label>
                <input
                  className="h-5 p-4 border-2 border-gray-400 rounded"
                  type="text"
                  placeholder="Trending"
                  name="categoryName"
                  onChange={handleChange}
                />
              </div>
              <div className="w-[400px] flex flex-col mt-3 mr-5">
                <label className="mb-3 text-xl font-semibold text-black">
                  Page
                </label>
                <input
                  className="h-5 p-4 border-2 border-gray-400 rounded"
                  type="text"
                  placeholder="1"
                  name="page"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="w-[400px] flex flex-col mt-3 mr-5">
              <label className="mb-3  text-xl font-semibold text-black">
                Movies
              </label>
              <select
                multiple
                className="h-[200px] rounded"
                name="results"
                id="results"
                onChange={handleSelect}
              >
                {movies.map((movie) => (
                  <option key={movie._id} value={movie._id}>
                    {movie.title}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-[100px] self-center mr-5">
              <button
                className="outline-none bg-blue-800 text-white py-2 px-3 font-semibold rounded cursor-pointer "
                onClick={handleCreate}
              >
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewCategory;
