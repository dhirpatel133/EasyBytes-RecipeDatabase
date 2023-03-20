import * as React from 'react';
import Button from '@mui/material/Button';
import MainNavBar from "./mainNavbar";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Grid, Tooltip } from '@mui/material';
import { useState } from 'react';
import IndividualRecipeCard from './individualRecipe';

export default function MyRecipes(props) {

  var recipeData = {
    recipe_name: "",
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

  /*const alertError = (message, errIcon) => {
    Swal.fire({
      position: "top",
      icon: errIcon,
      title: message,
      showConfirmButton: false,
      timer: 2000,
    });
  };

  const updateUser = () => {
    if (firstName === "" || lastName === "") {
      props.toggleShow();
      let message = "Profile not updated. First and last name are required fields.";
      let errIcon = "error";
      alertError(message, errIcon);
    } else {
      Axios.post("http://localhost:5000/updateUserData", {
        userID: sessionStorage.getItem("authenticated"),
        firstName: firstName,
        lastName: lastName,
        preferenceOne: preferenceOne,
        preferenceTwo: preferenceTwo,
        preferenceThree: preferenceThree,
        userPicture: userPicture,
      }).then((response) => {
        // console.log(response.data[0]["user_id"]);
        if (response.data === "invalid") {
          props.toggleShow();
          let message = "Failed to update your data. Please try again.";
          let errIcon = "error";
          alertError(message, errIcon);
        } else {
          props.toggleShow();
          let message = "Your profile has been updated!";
          let errIcon = "success";
          alertError(message, errIcon);
        }
      });
    }
  };*/

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
      <Button onClick={() => handleClickOpenNewPost()} style={{"float": "right", "marginRight":"4%"}}>
        <Tooltip title="Add new recipe">
          <AddCircleIcon fontSize='large'></AddCircleIcon>
        </Tooltip>
      </Button>
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