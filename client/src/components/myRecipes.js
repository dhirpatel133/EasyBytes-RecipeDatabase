import React from "react";
import MainNavBar from "./mainNavbar";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const MyRecipes = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!sessionStorage.getItem("authenticated")) {
      navigate("/");
    }
  }, []);

  return (
    <div>
      <header>
        <MainNavBar />
      </header>
      <h4
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        Welcome to you recipes page. Here, you will find all the posts that you
        have created!
      </h4>
    </div>
  );
};

export default MyRecipes;
