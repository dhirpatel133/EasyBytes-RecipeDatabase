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
import { red } from '@mui/material/colors';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import CommentIcon from '@mui/icons-material/Comment';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ScrollBar from 'react-custom-scrollbars'

function getFormattedDate(date) {
  let t = date.split(/[- :]/);
  let s = t[0] + '-' + t[1] + '-' + t[3]
  var d = new Date(s)
  return d.toDateString()
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

const RecipeReviewCard = ({post}) => {
  // console.log(post)
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ maxWidth: 500 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {post.first_name !== null ? post.first_name[0] + post.last_name[0] : "EB"}
          </Avatar>
        }
        action={
          <IconButton aria-label="favourite">
          <BookmarkIcon />
          </IconButton>
        }
        title={post.dish_name}
        subheader={getFormattedDate(post.date_created)}
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
        <IconButton aria-label="like post">
          <ThumbUpIcon />
        </IconButton>
        <IconButton aria-label="comment on post">
          <CommentIcon />
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
  );
}

export default RecipeReviewCard;
