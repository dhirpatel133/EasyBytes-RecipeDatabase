import React, {useState, useEffect} from 'react';
import { CircularProgress, Grid } from '@mui/material';
import RecipeReviewCard from './recipeCard';

const AllRecipes = (test) => {
    // iif goes here
    let url = 'http://localhost:5000/getAllPosts'; 
    const [data, setData] = useState("");
  
    const getData = async (event) => {
      const res = await fetch(url);    
      const data = await res.json();
      console.log(data);
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