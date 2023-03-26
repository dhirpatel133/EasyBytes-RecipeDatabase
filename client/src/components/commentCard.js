import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";

import Typography from "@mui/material/Typography";
import { Grid, Avatar } from '@mui/material';

function getFormattedDate(date) {
    return date.substring(0, 19).replace("T", " ");
}

const CommentCard = ({ comment, onClick }) => {

  return (  
    <div>

        <Grid container wrap="nowrap" spacing={2}>
          <Grid item>
            <Avatar src={comment.user_picture} />
          </Grid>
          <Grid justifyContent="left" item xs zeroMinWidth>
            <h4 style={{ margin: 0, textAlign: "left" }}>{comment.user_name}</h4>
            <p style={{ textAlign: "left" }}>
              {comment.content}
            </p>
            <p style={{ textAlign: "left", color: "gray" }}>
              posted {getFormattedDate(comment.date_created)}
            </p>
          </Grid>
        </Grid>

    </div>
  );
};

export default CommentCard;
