import React, { useRef, useEffect, useState } from "react";
import MainNavBar from "./mainNavbar";
import AllRecipes from "./allRecipes";
import SelectionModel from "./selectionModel";
import { useNavigate, useLocation } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [data, setData] = useState({
    cuisine: "",
    meal_type: "",
    diet_label: "",
    sort: "",
  });

  const userIDRef = useRef(null);

  if (location.state) {
    userIDRef.current = location.state.userId;
  }

  useEffect(() => {
    if (!sessionStorage.getItem("authenticated")) {
      navigate("/");
    }
  }, []);

  return (
    <div className="Home">
      <header>
        <MainNavBar />
      </header>
      <h4
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        Welcome to EasyBytes user {userIDRef.current}
      </h4>
      <SelectionModel
        style={{ padding: 300 }}
        toChild={data}
        sendToParent={setData}
      ></SelectionModel>
      <div>
        <AllRecipes search={data}></AllRecipes>
      </div>
    </div>
  );
};

export default Home;
