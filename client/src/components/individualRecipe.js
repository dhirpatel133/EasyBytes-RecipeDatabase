import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { TextField } from "@mui/material";
import { Box } from "@mui/material";
import { useState } from "react";
import Axios from "axios";
import Swal from "sweetalert2";

export default function IndividualRecipeCard(props) {
  const navigate = useNavigate();
  console.log(props.recipeData)

  const [recipeName, setRecipeName] = useState(props.recipeData["dish_name"]);
  const [cuisineName, setCuisineName] = useState(props.recipeData["cuisine"]);
  const [cookTime, setCookTime] = useState(props.recipeData["cook_time"]);
  const [ingredients, setIngredients] = useState(
    props.recipeData["ingredients"]
  );
  const [instructions, setInstructions] = useState(
    props.recipeData["instructions"]
  );
  const [calories, setCalories] = useState(props.recipeData["calories"]);
  const [mealType, setMealType] = useState(props.recipeData["meal_type"]);
  const [healthLabel, setHealthLabel] = useState(
    props.recipeData["health_label"]
  );
  const [healthScore, setHealthScore] = useState(
    props.recipeData["health_score"]
  );
  const [servings, setServings] = useState(props.recipeData["servings"]);
  const [recipePicture, setRecipePicture] = useState(
    props.recipeData["recipe_picture"]
  );

  useEffect(() => {
    if (!sessionStorage.getItem("authenticated")) {
      navigate("/");
    }
  }, []);

  const alertError = (message, errIcon) => {
    Swal.fire({
      position: "top",
      icon: errIcon,
      title: message,
      showConfirmButton: false,
      timer: 2000,
    });
  };

  const updateRecipe = () => {
    props.toggleShow();
    if (props.newPost) {
      Axios.post("http://localhost:5000/createPost", {
        userID: sessionStorage.getItem("authenticated"),
        recipeName: recipeName,
        cuisine: cuisineName,
        cookTime: cookTime,
        ingredients: ingredients,
        instructions: instructions,
        calories: calories,
        mealType: mealType,
        healthLabel: healthLabel,
        healthScore: healthScore,
        servings: servings,
        recipePicture: recipePicture,
      }).then((response) => {
        // console.log(response.data[0]["user_id"]);
        if (response.data === "invalid") {
          props.toggleShow();
          let message = "Failed to create recipe.";
          let errIcon = "error";
          alertError(message, errIcon);
        } else {
          props.toggleShow();
          let message = "Recipe successfully created!";
          let errIcon = "success";
          alertError(message, errIcon);
        }
      });
    } else {
      Axios.put("http://localhost:5000/updatePost", {
        recipeID: props.recipeData.recipe_id,
        recipeName: recipeName,
        cuisine: cuisineName,
        cookTime: cookTime,
        ingredients: ingredients,
        instructions: instructions,
        calories: calories,
        mealType: mealType,
        healthLabel: healthLabel,
        healthScore: healthScore,
        servings: servings,
        recipePicture: recipePicture,
      }).then((response) => {
        // console.log(response.data[0]["user_id"]);
        if (response.data === "invalid") {
          props.toggleShow();
          let message = "Failed to update recipe.";
          let errIcon = "error";
          alertError(message, errIcon);
        } else {
          props.toggleShow();
          let message = "Recipe successfully created!";
          let errIcon = "success";
          alertError(message, errIcon);
        }
      });
    }
  };

  return (
    <div>
      <Dialog onClose={props.toggleShow} open={props.show}>
        <DialogTitle>Create New Recipe</DialogTitle>
        <DialogContent dividers>
          <Box
            component="form"
            marginTop={"2ch"}
            sx={{ display: "flex", flexWrap: "wrap" }}
            autoComplete="off"
          >
            <div>
              <TextField
                autoFocus
                required
                margin="normal"
                id="name"
                label="Recipe Name"
                defaultValue={props.recipeData["dish_name"]}
                onChange={(e) => setRecipeName(e.target.value)}
                variant="filled"
                sx={{ m: 1, width: "25ch" }}
              />
              <TextField
                autoFocus
                required
                margin="normal"
                id="name"
                defaultValue={props.recipeData["cuisine"]}
                onChange={(e) => setCuisineName(e.target.value)}
                label="Cuisine"
                variant="filled"
                sx={{ m: 1, width: "25ch" }}
              />
              <TextField
                autoFocus
                required
                margin="normal"
                id="name"
                label="Cook Time"
                defaultValue={props.recipeData["cook_time"]}
                onChange={(e) => setCookTime(e.target.value)}
                variant="filled"
                sx={{ m: 1, width: "25ch" }}
              />
              <TextField
                autoFocus
                required
                margin="normal"
                id="name"
                defaultValue={props.recipeData["calories"]}
                onChange={(e) => setCalories(e.target.value)}
                label="Calories"
                variant="filled"
                sx={{ m: 1, width: "25ch" }}
              />
              <TextField
                required
                id="filled-multiline-static"
                label="Ingredients"
                multiline
                rows={2}
                defaultValue={props.recipeData["ingredients"]}
                onChange={(e) => setIngredients(e.target.value)}
                fullWidth
                sx={{ m: 1, width: "51.69ch" }}
                variant="filled"
              />
              <TextField
                required
                id="filled-multiline-static"
                label="Recipe Instructions"
                multiline
                rows={2}
                defaultValue={props.recipeData["instructions"]}
                onChange={(e) => setInstructions(e.target.value)}
                fullWidth
                sx={{ m: 1, width: "51.69ch" }}
                variant="filled"
              />
              <TextField
                autoFocus
                margin="normal"
                id="name"
                label="Meal Type"
                defaultValue={props.recipeData["meal_type"]}
                onChange={(e) => setMealType(e.target.value)}
                variant="filled"
                sx={{ m: 1, width: "25ch" }}
              />
              <TextField
                autoFocus
                margin="normal"
                id="name"
                defaultValue={props.recipeData["health_label"]}
                onChange={(e) => setHealthLabel(e.target.value)}
                label="Health Labels"
                variant="filled"
                sx={{ m: 1, width: "25ch" }}
              />
              <TextField
                autoFocus
                margin="normal"
                id="name"
                label="Health Score"
                defaultValue={props.recipeData["health_score"]}
                onChange={(e) => setHealthScore(e.target.value)}
                variant="filled"
                sx={{ m: 1, width: "25ch" }}
              />
              <TextField
                autoFocus
                margin="normal"
                id="name"
                defaultValue={props.recipeData["servings"]}
                onChange={(e) => setServings(e.target.value)}
                label="Servings"
                variant="filled"
                sx={{ m: 1, width: "25ch" }}
              />
              <TextField
                id="filled-multiline-static"
                label="Recipe Picture URL"
                multiline
                rows={1}
                defaultValue={props.recipeData["recipe_picture"]}
                onChange={(e) => setRecipePicture(e.target.value)}
                fullWidth
                sx={{ m: 1, width: "51.69ch" }}
                variant="filled"
              />
            </div>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={updateRecipe}>
            Save changes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
