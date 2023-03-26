import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { TextField } from "@mui/material";
import { Box } from "@mui/material";
import Axios from "axios";
import Swal from "sweetalert2";

export default function MakeComment(props) {
    const [content, setComment] = useState("");


    const alertError = (message, errIcon) => {
        Swal.fire({
        position: "top",
        icon: errIcon,
        title: message,
        showConfirmButton: false,
        timer: 2000,
        });
    };

    const newComment = () => {
        props.toggleShow();
        console.log(content)
        console.log(props.recipeID)
        console.log(sessionStorage.getItem("authenticated"))
        Axios.post("http://localhost:5000/createComment", {
            content: content,
            userID: sessionStorage.getItem("authenticated"),
            recipeID: props.recipeID
        }).then((response) => {
            // console.log(response.data[0]["user_id"]);
            if (response.data === "invalid") {
            props.toggleShow();
            let message = "Failed to comment.";
            let errIcon = "error";
            alertError(message, errIcon);
            } else {
            props.toggleShow();
            let message = "Commented!";
            let errIcon = "success";
            alertError(message, errIcon);
            }
        });
    };

    return (
        <div>
        <Dialog onClose={props.toggleShow} open={props.show}>
            <DialogTitle>Create Comment</DialogTitle>
            <DialogContent dividers>
            <Box
                component="form"
                marginTop={"2ch"}
                sx={{ display: "flex", flexWrap: "wrap" }}
                autoComplete="off"
            >
                
                <TextField
                required
                id="filled-multiline-static"
                label="Comment"
                rows={2}
                onChange={(e) => setComment(e.target.value)}
                fullWidth
                sx={{ m: 1, width: "51.69ch" }}
                variant="filled"
                />
            </Box>
            </DialogContent>
            <DialogActions>
            <Button autoFocus onClick={newComment}>
                Comment
            </Button>
            </DialogActions>
        </Dialog>
        </div>
    );
}
