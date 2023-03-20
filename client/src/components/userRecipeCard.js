import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { red } from '@mui/material/colors';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ScrollBar from 'react-custom-scrollbars'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Axios from "axios";
import IndividualRecipeCard from './individualRecipe';

function getFormattedDate(date) {
  return date.substring(0,19).replace('T', ' ')
}
function deleteRecipe(recipe_id) {
    console.log(recipe_id)
    Axios.delete(`http://localhost:5000/deleteRecipes?recipe_id=${recipe_id}`)
}

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const UserRecipeCard = ({post}) => {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const [show, setShow] = useState(false);

  function toggleShow() {
    setShow(!show);
  }
  const handleClickOpenNewPost = () => {
    toggleShow()
  };
  return (
    <div>
    <Card sx={{ maxWidth: 500}}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
          </Avatar>
        }
        action={
          <IconButton aria-label="edit" onClick={() => { handleClickOpenNewPost() }}>
          <EditIcon fontSize = "medium"/>
          </IconButton>
        }
          
        title={post.dish_name}
        titleTypographyProps={{variant:'subtitle2' }}
        subheader={getFormattedDate(post.date_modified)}
      />
      <CardMedia
        component="img"
        height="300"
        width="300"
        image={post.recipe_picture}
        justifyContent="center"
      />
      <CardContent>
        <ScrollBar style={{height: 300}}>
        <Typography variant="body2" color="black">
          <strong>Cuisine:</strong> {post.cuisine}
        </Typography>
        <Typography variant="body2" color="black">
        <strong>Diet Labels:</strong> {post.health_label.replaceAll('|', ', ')}
        </Typography>
        <Typography variant="body2" color="black">
        <strong>Meal Types:</strong> {post.meal_type.replaceAll('|', ', ')}
        </Typography>
        <Typography variant="body2" color="black">
        <strong>Cook Time:</strong> {post.cook_time} mins
        </Typography>
        <Typography variant="body2" color="black">
        <strong>Calories:</strong> {post.calories}
        </Typography>
        <Typography variant="body2" color="black">
        <strong>Servings:</strong> {post.servings}
        </Typography>
        <Typography variant="body2" color="black">
        <strong>Ingredients:</strong> {post.ingredients.replaceAll('|', ', ')}
        </Typography>
        </ScrollBar>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="delete" onClick={() => { deleteRecipe(post.recipe_id) }}>
            <DeleteIcon fontSize="large" />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Instructions:</Typography>
          {post.instructions.split('|').map((instruction) => (
            <Typography paragraph>{instruction}</Typography>
          ))}
        </CardContent>
      </Collapse>
    </Card>
    {show && (
        <IndividualRecipeCard
          show={show}
          toggleShow={toggleShow}
          newPost = {false}
          recipeData={post}
        />
      )}
    </div>
  );
}

export default UserRecipeCard;
