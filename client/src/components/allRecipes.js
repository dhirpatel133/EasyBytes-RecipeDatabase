import React, { useState } from "react";
import { CircularProgress, Grid } from "@mui/material";
import RecipeReviewCard from "./recipeCard";
import Axios from "axios";
import UserProfileModal from "./userProfileModal";

const AllRecipes = (search) => {
  const [show, setShow] = useState(false);
  const [data, setData] = useState("");
  const [userData, setUserData] = useState({
    user_name: "",
    first_name: "",
    last_name: "",
    preference_one: "",
    preference_two: "",
    preference_three: "",
    user_picture: "",
  });

  function toggleShow() {
    setShow(!show);
  }

  const fetchUserData = (userId) => {
    Axios.post("http://localhost:5000/userData", {
      userID: userId,
    }).then((response) => {
      if (response.data === "invalid") {
        alert("Username or password don't match. \nPlease try again!");
      } else {
        setUserData({
          user_name: response.data[0]["user_name"],
          first_name: response.data[0]["first_name"],
          last_name: response.data[0]["last_name"],
          preference_one: response.data[0]["preference_one"],
          preference_two: response.data[0]["preference_two"],
          preference_three: response.data[0]["preference_three"],
          user_picture: response.data[0]["user_picture"],
        });
      }
    });
  };

  const showOthersProfile = (userId) => {
    fetchUserData(userId);
    setTimeout(function () {
      toggleShow();
    }, 250);
  };

  let url = "";
  if (
    (search.search.cuisine === "" &&
      search.search.meal_type === "" &&
      search.search.diet_label === "" &&
      search.search.sort === "") ||
    (search.search.cuisine === "Any" &&
      search.search.meal_type === "Any" &&
      search.search.diet_label === "Any" &&
      search.search.sort === "Any")
  ) {
    url = "http://localhost:5000/getAllPosts";
  } else {
    let counter = 0;
    let filterCategory = "";
    let filterValues = "";
    let sortValue = "";
    let order = " ASC";
    url = "http://localhost:5000/getCustomPosts?";
    // console.log(search.search)
    if (
      search.search.cuisine.length !== 0 &&
      search.search.cuisine[0] !== "Any"
    ) {
      filterCategory += "cuisine";
      filterValues += `${search.search.cuisine}`;
      counter++;
    }
    if (
      search.search.meal_type.length !== 0 &&
      search.search.meal_type[0] !== "Any"
    ) {
      counter > 0 ? (filterCategory += ",") : (filterCategory += "");
      filterCategory += "meal_type";
      counter > 0 ? (filterValues += ",") : (filterValues += "");
      filterValues += `${search.search.meal_type}`;
      counter++;
    }
    if (
      search.search.diet_label.length !== 0 &&
      search.search.diet_label[0] !== "Any"
    ) {
      counter > 0 ? (filterCategory += ",") : (filterCategory += "");
      filterCategory += "health_label";
      counter > 0 ? (filterValues += ",") : (filterValues += "");
      filterValues += `${search.search.diet_label}`;
      counter++;
    }
    if (search.search.sort.length !== 0 && search.search.sort[0] !== "Any") {
      // console.log(search.search.sort[0])
      if (search.search.sort[0].includes("DESC")) {
        order = " DESC";
      }
      // console.log(order)
      if (search.search.sort[0].includes("Calories")) {
        sortValue += "calories";
      } else if (search.search.sort[0].includes("Cook Time")) {
        sortValue += "cook_time";
      } else if (search.search.sort[0].includes("Servings")) {
        sortValue += "servings";
      } else if (search.search.sort[0].includes("Health Score")) {
        sortValue += "health_score";
      }
    }
    if (filterCategory !== "" && filterValues !== "") {
      url +=
        "filterCategory=" +
        filterCategory +
        "&" +
        "filterValue=" +
        filterValues;
    }
    if (sortValue !== "") {
      counter > 0 ? (url += "&") : (filterValues += "");
      url += "sortValue=" + sortValue + order;
    }
  }

  const getData = async (event) => {
    const res = await fetch(url);
    const data = await res.json();
    //   console.log(data);
    const outputData = data;
    setData(outputData);
  };

  getData();

  return (
    <div className="App" style={{ padding: 10 }}>
      <div>
        {data === "" ? (
          <CircularProgress />
        ) : (
          <div>
            <Grid container alignItems="stretch" spacing={2}>
              {data.map((post) => (
                <Grid key={post.recipe_id} item xs={4} sm={3}>
                  <RecipeReviewCard
                    post={post}
                    onClick={() => showOthersProfile(post.user_id)}
                  ></RecipeReviewCard>
                </Grid>
              ))}
            </Grid>
          </div>
        )}
      </div>
      {show && userData && (
        <UserProfileModal
          show={show}
          myProfile={false}
          toggleShow={toggleShow}
          userData={userData}
        />
      )}
    </div>
  );
};

export default AllRecipes;
