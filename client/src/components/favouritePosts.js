import * as React from 'react';
import MainNavBar from "./mainNavbar";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Grid, Tooltip } from '@mui/material';
import { useState } from 'react';
import RecipeReviewCard from "./recipeCard";
import Axios from "axios";

export default function FavouritePosts() {

  const navigate = useNavigate();

  useEffect(() => {
    if (!sessionStorage.getItem("authenticated")) {
      navigate("/");
    }
  }, []);

  const [posts, setPosts] = useState("none")
  const fetchFavouriteData = () => {
    Axios.get(`http://localhost:5000/favourites?userID=${sessionStorage.getItem("authenticated")}`).then((response) => {
        console.log(response)
      if (response.data === "none") {
        setPosts("none")
      } else {
        setPosts(response.data);
      }
    });
  };

  fetchFavouriteData();

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
        Welcome to your Favourited Recipes page. Here, you will find all the recipes you have favourited!
      </h4>
      {posts === "none" ? <h3 style={{display: "flex", justifyContent: "center"}}> No Favourited Recipes Yet!</h3> : 
        <div style={{padding: 20}}>
          <Grid container alignItems="stretch" spacing={2}>
            {posts.map((post) => (
              <Grid key={post.recipe_id} item xs={4} sm={3}>
                <RecipeReviewCard post={post}></RecipeReviewCard>
              </Grid>
        ))}
        </Grid>
          
        </div>}
    </div>
  );
}