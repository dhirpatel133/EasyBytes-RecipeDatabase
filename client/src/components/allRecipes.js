import React, {useState, useEffect} from 'react';
import { CircularProgress, Grid } from '@mui/material';

const AllRecipes = () => {

    let url = 'http://localhost:5000/getAllPosts'; 

    const [postData, setData] = useState("");
    
    const getData = async (event) => {
        const res = await fetch(url);    
        const data = await res.json();
        const outputData = data;
        setData(outputData);
        console.log(postData)
    };
    
    return(
        <div className='cards'>
            <button onClick={getData}>Get Data</button>

            <div>
                postData === "" ? <CircularProgress /> : (
                    <Grid container alignItems="stretch" spacing={3}>
                {postData.map((post) => (
                    <Grid key={post.recipe_id} item xs={12} sm={6}>
                        <h1>post.dish_name</h1>
                    </Grid>
                ))}
            </Grid>

                )
            </div>

            
            
        </div>
        
        // !posts.length ? <CircularProgress /> : (
        //     <Grid className={classes.container} container alignItems="stretch" spacing={3}>
        //         {posts.map((post) => (
        //             <Grid key={post._id} item xs={12} sm={6}>
        //                 <Post post={post} setCurrentId={setCurrentId} />
        //             </Grid>
        //         ))}
        //     </Grid>
        // )
    );
}

export default AllRecipes;