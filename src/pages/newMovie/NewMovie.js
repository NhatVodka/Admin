import React, { useContext, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import storage from "../../firebase";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { useNavigate } from "react-router-dom";
import { createMovie } from "../../context/movieContext/apiCalls";
import { MovieContext } from "../../context/movieContext/MovieContext";
const NewMovie = () => {
  const navigate = useNavigate();
  const { dispatch } = useContext(MovieContext);

  const [movie, setMovie] = useState(null);
  const [poster_path, setPoster_Path] = useState(null);
  const [backdrop_path, setBackdrop_Path] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [video, setVideo] = useState(null);
  const [cast, setCast] = useState(null);
  const [uploaded, setUploaded] = useState(0);
  const handleChange = (e) => {
    const value = e.target.files || e.target.value;
    setMovie({ ...movie, [e.target.name]: value });
  };
  const { File } = cast;
  console.log(File);
  // console.log(movie);
  const handleSelect = (e) => {
    let value = Array.from(e.target.selectedOptions, (option) => option.value);
    setMovie({ ...movie, [e.target.name]: value });
  };
  const handleUpload = (e) => {
    e.preventDefault();
    upload([
      { file: poster_path, label: "poster_path" },
      { file: backdrop_path, label: "backdrop_path" },
      { file: trailer, label: "trailer" },
      { file: video, label: "video" },
      { file: cast, label: "cast" },
    ]);
  };
  const handleCreate = (e) => {
    e.preventDefault();
    createMovie(movie, dispatch);
    navigate("/movies");
  };
  console.log(movie);
  // Firebase configs
  const storage = getStorage();
  const metadata = {
    contentType: "image/jpeg",
  };

  const upload = (items) => {
    items.forEach((item) => {
      // const fileName = new Date().getTime() + item.label + item.file.name;
      const storageRef = ref(storage, `/items/` + item.file.name);
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
            setMovie((prev) => {
              return { ...prev, [item.label]: url };
            });
            setUploaded((prev) => prev + 1);
          });
        }
      );
    });
  };
  return (
    <div className="flex ">
      <Sidebar />
      <div className="flex-[4]">
        <Navbar />
        <div className="p-5">
          <h1 className="text-2xl font-bold">New Movie</h1>
          <form className="flex flex-wrap gap-5">
            <div className="w-[400px] flex flex-col mt-3 mr-5">
              <label className="mb-3 text-base font-semibold text-gray-900">
                Title
              </label>
              <input
                className="h-5 p-4 border-2 border-gray-400 rounded"
                type="text"
                placeholder="John Smith"
                name="title"
                onChange={handleChange}
              />
            </div>
            <div className="w-[400px] flex flex-col mt-3 mr-5">
              <label className="mb-3 text-base font-semibold text-gray-900">
                Desc
              </label>
              <input
                className="h-20 p-4 border-2 border-gray-400 rounded"
                type="email"
                placeholder="JohnSmith1@gmail.com"
                name="desc"
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col mt-4">
              <label className="mb-1 text-base ">Poster</label>
              <input
                type="file"
                className="outline-none w-[400px]"
                name="poster_path"
                onChange={(e) => setPoster_Path(e.target.files[0])}
              />
            </div>
            <div className="flex flex-col mt-3">
              <label className="mb-1 text-base ">Backdrop</label>
              <input
                type="file"
                className="outline-none w-[400px]"
                name="backdrop_path"
                onChange={(e) => setBackdrop_Path(e.target.files[0])}
              />
            </div>
            <div className="w-[400px] flex flex-col mt-3 mr-5">
              <label className="mb-3 text-base font-semibold text-gray-900">
                Genre
              </label>
              <select
                multiple
                className="h-[100px] p-4 border-2 border-gray-400 rounded"
                name="genre"
                onChange={handleSelect}
              >
                <option value="Romance">Romance</option>
                <option value="Animation">Animation</option>
                <option value="Adventure">Adventure</option>
                <option value="Drama">Drama</option>
                <option value="Action">Action</option>
                <option value="Crime">Crime</option>
                <option value="Comedy">Comedy</option>
              </select>
            </div>
            <div className="w-[400px] flex flex-col mt-3 mr-5">
              <label className="mb-3 text-base font-semibold text-gray-900">
                Release_Date
              </label>
              <input
                className="h-5 p-4 border-2 border-gray-400 rounded"
                type="text"
                placeholder="2022"
                name="release_date"
                onChange={handleChange}
              />
            </div>
            <div className="w-[400px] flex flex-col mt-3 mr-5">
              <label className="mb-3 text-base font-semibold text-gray-900">
                Rating
              </label>
              <input
                className="h-5 p-4 border-2 border-gray-400 rounded"
                type="text"
                placeholder="7.5"
                name="vote_average"
                onChange={handleChange}
              />
            </div>

            <div className="w-[400px] flex flex-col mt-3 mr-5">
              <label className="mb-3 text-base font-semibold text-gray-400">
                Is Series?
              </label>
              <select
                className="h-6 rounded"
                name="isSeries"
                id="isSeries"
                onChange={handleChange}
              >
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>
            <div className="flex flex-col mt-4">
              <label className="mb-1 text-base ">Casts</label>
              <input
                multiple
                type="file"
                className="outline-none w-[400px]"
                name="cast"
                // onChange={(e) => {
                //   setCast(e.target.files);
                // }}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col mt-4">
              <label className="mb-1 text-base ">Trailer</label>
              <input
                type="file"
                className="outline-none w-[400px]"
                name="trailer"
                onChange={(e) => setTrailer(e.target.files[0])}
              />
            </div>
            <div className="flex flex-col mt-3">
              <label className="mb-1 text-base ">Video</label>
              <input
                type="file"
                className="outline-none w-[400px]"
                name="video"
                onChange={(e) => setVideo(e.target.files[0])}
              />
            </div>
            {uploaded === 5 ? (
              <div className="w-[400px] flex flex-col mt-3 mr-5">
                <button
                  className="w-[200px] outline-none bg-blue-800 text-white py-2 px-3 font-semibold rounded cursor-pointer "
                  onClick={handleCreate}
                >
                  Create
                </button>
              </div>
            ) : (
              <div className="w-[400px] flex flex-col mt-3 mr-5">
                <button
                  className="w-[200px] outline-none bg-blue-800 text-white py-2 px-3 font-semibold rounded cursor-pointer "
                  onClick={handleUpload}
                >
                  Upload
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewMovie;
