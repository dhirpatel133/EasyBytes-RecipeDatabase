import * as React from 'react';
import Button from '@mui/material/Button';
import MainNavBar from "./mainNavbar";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Grid, Tooltip } from '@mui/material';
import { useState } from 'react';
import IndividualRecipeCard from './individualRecipe';
import { CircularProgress } from '@mui/material';
import UserRecipeCard from './userRecipeCard';
import Axios from "axios";

export default function SuggestedPosts() {

  const navigate = useNavigate();

  useEffect(() => {
    if (!sessionStorage.getItem("authenticated")) {
      navigate("/");
    }
  }, []);

  const [userData, setUserData] = useState({
    user_name: "",
    first_name: "",
    last_name: "",
    preference_one: "",
    preference_two: "",
    preference_three: "",
    user_picture: "",
  });

  const fetchUserData = async () => {
    Axios.post("http://localhost:5000/userData", {
      userID: sessionStorage.getItem("authenticated"),
    }).then((response) => {
      if (response.data === "invalid") {
        alert("Username or password don't match. \nPlease try again!");
      } else {
        console.log(response.data)
        setUserData({
          preference_one: response.data[0]["preference_one"],
          preference_two: response.data[0]["preference_two"],
          preference_three: response.data[0]["preference_three"]
        });
        // console.log(userData);
      }
    });
  };

  const [posts, setPosts] = useState("none")
  const fetchSuggestedData = async () => {
    Axios.post("http://localhost:5000/getSuggestedPosts", {
      preferenceOne: userData.preference_one,
      preferenceTwo: userData.preference_two,
      preferenceThree: userData.preference_three
    }).then((response) => {
        console.log(response)
      if (response.data === "none") {
        setPosts("none")
      } else {
        setPosts(response.data);
      }
    });
  };

  const getData = async () => {
    await fetchUserData();
    await fetchSuggestedData();
  } 

  getData();

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
        Welcome to your Suggested Recipes page. Here, you will find all recipes suggested to you by EasyBytes based on your preferences!
      </h4>
      {posts === "none" ? <h3 style={{display: "flex", justifyContent: "center"}}> No Suggested Recipes!</h3> : 
        <div style={{padding: 20}}>
          <Grid container alignItems="stretch" spacing={2}>
            {posts.map((post) => (
              <Grid key={post.recipe_id} item xs={4} sm={3}>
                <UserRecipeCard post={post}></UserRecipeCard>
              </Grid>
        ))}
        </Grid>
          
        </div>}
    </div>
  );
}