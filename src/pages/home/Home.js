import React, { useState, useEffect, useMemo } from "react";
import Chart from "../../components/chart/Chart";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Widget from "../../components/widget/Widget";
import WidGetLarge from "../../components/widgetLarge/WidGetLarge";
import WidGetSmall from "../../components/widgetSmall/WidGetSmall";
import axios from "axios";

const Home = () => {
  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Agu",
      "Sep",
      "Oct",
      "Nov",
      "Dec ",
    ],
    []
  );

  const [userStats, setUserStats] = useState([]);

  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await axios.get("/users/stats", {
          headers: {
            token:
              "nhat eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYjJiOGUzMzQ1ZTY3YzQ4YTU4MjM5MiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY1Njc1MDI2OCwiZXhwIjoxNjU3MTgyMjY4fQ.ZKOW3rJ6Vd6mBeRAQI-mTYa8LuJaN9NbVUX3Jlsxs2g",
          },
        });
        const statsList = res.data.sort(function (a, b) {
          return a._id - b._id;
        });
        statsList.map((item) =>
          setUserStats((prev) => [
            ...prev,
            {
              name: MONTHS[item._id - 1],
              "New User": item.total,
            },
          ])
        );
      } catch (error) {
        console.log(error);
      }
    };
    getStats();
  }, [MONTHS]);
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-[6]">
        <Navbar />
        <div className="flex p-5">
          <Widget type="users"></Widget>
          <Widget type="category"></Widget>
          <Widget type="movies"></Widget>
          <Widget type="comments"></Widget>
        </div>
        <Chart
          data={userStats}
          title="User Analytics"
          grid
          dataKey="New User"
        />
        <div className="flex m-5">
          <WidGetSmall />
          <WidGetLarge />
        </div>
      </div>
    </div>
  );
};

export default Home;
