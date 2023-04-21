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

export default function MyRecipes(props) {

  var recipeData = {
    dish_name: "",
    cuisine: "",
    cook_time: "",
    ingredients: "",
    instructions: "",
    calories: "",
    meal_type: "",
    health_label: "",
    health_score: "",
    servings: "",
    recipe_picture: ""
  }

  const [show, setShow] = useState(false);

  function toggleShow() {
    setShow(!show);
  }

  const navigate = useNavigate();

  useEffect(() => {
    if (!sessionStorage.getItem("authenticated")) {
      navigate("/");
    }
  }, []);

  const handleClickOpenNewPost = () => {
    toggleShow()
  };
  let id = sessionStorage.getItem("authenticated")
  let url = `http://localhost:5000/getUserPosts?user_id=${id}`;
  const [data, setData] = useState("");
  
    const getData = async (event) => {
      const res = await fetch(url);    
      const data = await res.json();
      const outputData = data;
      setData(outputData);
    };

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
        Welcome to your recipes page. Here, you will find all the posts that you have created!
      </h4>
      <Button onClick={() => handleClickOpenNewPost()} style={{"float": "right", "marginRight":"2.8%"}}>
        <Tooltip title="Add new recipe">
          <AddCircleIcon fontSize='large'></AddCircleIcon>
        </Tooltip>
      </Button>
      {data === "" ? <CircularProgress /> : 
        <div style={{padding: 20}}>
          <Grid container alignItems="stretch" spacing={2}>
            {data.map((post) => (
              <Grid key={post.recipe_id} item xs={4} sm={3}>
                <UserRecipeCard post={post}></UserRecipeCard>
              </Grid>
        ))}
        </Grid>
          
        </div>}
      {show && (
        <IndividualRecipeCard
          show={show}
          toggleShow={toggleShow}
          newPost = {true}
          recipeData={recipeData}
        />
      )}
    </div>
  );
}