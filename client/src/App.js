import React, {useState, useEffect} from 'react';
import axios from 'axios'
import { CircularProgress, Grid } from '@mui/material';
import RecipeReviewCard from './components/recipeCard';


let url = 'http://localhost:5000/'; 


const App = () => {
        let url = 'http://localhost:5000/getAllPosts'; 
        const [data, setData] = useState("");
      
        const getData = async (event) => {
          const res = await fetch(url);    
          const data = await res.json();
          console.log(data);
          const outputData = data;
          setData(outputData);
        };
        
        return (
          <div className="App">
            <h1>Welcome to EasyByte</h1>
            <h2>Click the Button Below to Retrive Data from a MySQL Database!</h2>
            <button onClick={getData}>Get Data</button>
            <br />
            <span>
            {" "}
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
            </span>
          </div>
        );

}

export default App;
