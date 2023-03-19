import React, {useState} from 'react';
import { CircularProgress, Grid } from '@mui/material';
import RecipeReviewCard from './recipeCard';

const AllRecipes = (search) => {
    
    let url = ''
    if ((search.search.cuisine === '' && search.search.meal_type === '' && search.search.diet_label === '' && search.search.sort === '') || (search.search.cuisine === "Any" && search.search.meal_type === "Any" && search.search.diet_label === "Any" && search.search.sort === "Any")) {
        url = 'http://localhost:5000/getAllPosts';
    }
    else {
        let counter = 0
        let filterCategory = ""
        let filterValues = ""
        let sortValue = ""
        let order = " ASC"
        url = "http://localhost:5000/getCustomPosts?"
        // console.log(search.search)
        if (search.search.cuisine.length !== 0 && search.search.cuisine[0] !== "Any") {
            filterCategory += "cuisine"
            filterValues += `${search.search.cuisine}`
            counter++
        }
        if (search.search.meal_type.length !== 0 && search.search.meal_type[0] !== "Any") {
            counter > 0 ? filterCategory += ',' : filterCategory += '';
            filterCategory += "meal_type"
            counter > 0 ? filterValues += ',' : filterValues += '';
            filterValues += `${search.search.meal_type}`
            counter++
        }
        if (search.search.diet_label.length !== 0 && search.search.diet_label[0] !== "Any") {
            counter > 0 ? filterCategory += ',' : filterCategory += '';
            filterCategory += "health_label"
            counter > 0 ? filterValues += ',' : filterValues += '';
            filterValues += `${search.search.diet_label}`
            counter++
        }
        if (search.search.sort.length !== 0 && search.search.sort[0] !== "Any") {
            // console.log(search.search.sort[0])
            if (search.search.sort[0].includes("DESC")) {
                order = " DESC"
            }
            // console.log(order)
            if (search.search.sort[0].includes("Calories")) {
                sortValue += "calories"
            }
            else if (search.search.sort[0].includes("Cook Time")) {
                sortValue += "cook_time"
            }
            else if (search.search.sort[0].includes("Servings" )) {
                sortValue += "servings"
            }
            else if (search.search.sort[0].includes("Health Score")) {
                sortValue += "health_score"
            }
        }
        if (filterCategory !== "" && filterValues !== "") {
            url += "filterCategory=" + filterCategory + "&" + "filterValue=" + filterValues
        }  
        if (sortValue !== "") {
            counter > 0 ? url += '&' : filterValues += '';
            url += "sortValue=" + sortValue + order
        }

    }

    const [data, setData] = useState("");
  
    const getData = async (event) => {
      const res = await fetch(url);    
      const data = await res.json();
    //   console.log(data);
      const outputData = data;
      setData(outputData);
    };

    getData();
    
    return (
      <div className="App" style={{padding: 10}}>
        <div>
            {data === "" ? <CircularProgress /> : 
            <div>
              <Grid container alignItems="stretch" spacing={2}>
                {data.map((post) => (
                  <Grid key={post.recipe_id} item xs={4} sm={3}>
                    <RecipeReviewCard post={post}></RecipeReviewCard>
                  </Grid>
            ))}
            </Grid>
              
            </div>}
        </div>
      </div>
    );
}

export default AllRecipes;