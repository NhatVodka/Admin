import React from "react";
import "./widget.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonIcon from "@mui/icons-material/Person";
import CategoryIcon from "@mui/icons-material/Category";
import MovieIcon from "@mui/icons-material/Movie";
import CommentIcon from "@mui/icons-material/Comment";
const Widget = ({ type }) => {
  let data;

  // temporary

  const amount = 100;
  const diff = 20;

  switch (type) {
    case "users":
      data = {
        title: "USERS",
        isMoney: false,
        link: "See all users",
        icon: <PersonIcon className="icon" />,
      };
      break;
    case "category":
      data = {
        title: "CATEGORY",
        isMoney: false,
        link: "See all category",
        icon: <CategoryIcon className="icon" />,
      };
      break;
    case "movies":
      data = {
        title: "MOVIES",
        isMoney: false,
        link: "See all movies",
        icon: <MovieIcon className="icon" />,
      };
      break;
    case "comments":
      data = {
        title: "COMMENTS",
        isMoney: false,
        link: "See all comments",
        icon: <CommentIcon className="icon" />,
      };
      break;

    default:
      break;
  }
  return (
    <div className="widget">
      <div className="left flex flex-col justify-between">
        <span className="text-sm font-bold text-gray-400">{data.title}</span>
        <span className="tetx-2xl font-medium">
          {data.isMoney} {amount}
        </span>
        <span className="w-max text-base font-medium border-b-[1px] border-gray-400 ">
          {data.link}
        </span>
      </div>
      <div className="right flex flex-col justify-between">
        <div className="percentage flex items-center text-base font-medium text-green-600">
          <KeyboardArrowUpIcon />
          {diff}
        </div>
        {data.icon}
      </div>
    </div>
  );
};

export default Widget;
