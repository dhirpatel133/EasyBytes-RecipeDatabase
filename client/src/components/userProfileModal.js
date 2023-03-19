import * as React from "react";
import Axios from "axios";
import Swal from "sweetalert2";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  Box,
} from "@mui/material";

export default function FormDialog(props) {
  const [open, setOpen] = React.useState(props.show);
  const [firstName, setFirstName] = React.useState(
    props.userData["first_name"]
  );
  const [lastName, setLastName] = React.useState(props.userData["last_name"]);
  const [preferenceOne, setPreferenceOne] = React.useState(
    props.userData["preference_one"]
  );
  const [preferenceTwo, setPreferenceTwo] = React.useState(
    props.userData["preference_two"]
  );
  const [preferenceThree, setPreferenceThree] = React.useState(
    props.userData["preference_three"]
  );
  const [userPicture, setUserPicture] = React.useState(
    props.userData["user_picture"]
  );

  const handleClose = () => {
    setOpen(false);
  };

  const alertError = (message, errIcon) => {
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
  };

  return (
    <div>
      <Dialog open={props.show} onClose={handleClose}>
        <DialogTitle>
          <Typography variant="h4" align="center">
            Update Profile
          </Typography>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <AccountCircleIcon sx={{ fontSize: 170 }}></AccountCircleIcon>
          </div>
        </DialogTitle>
        <DialogContent>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <TextField
              margin="normal"
              id="outlined-read-only-input"
              label="User Name"
              defaultValue={props.userData["user_name"]}
              InputProps={{
                readOnly: true,
              }}
            />
          </div>
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
                label="First Name"
                defaultValue={props.userData["first_name"]}
                onChange={(e) =>
                  setFirstName(e.target.value, console.log(firstName))
                }
                variant="filled"
                sx={{ m: 1, width: "25ch" }}
              />
              <TextField
                autoFocus
                required
                margin="normal"
                id="name"
                defaultValue={props.userData["last_name"]}
                onChange={(e) =>
                  setLastName(e.target.value, console.log(lastName))
                }
                label="Last Name"
                variant="filled"
                sx={{ m: 1, width: "25ch" }}
              />
              <TextField
                id="filled-multiline-static"
                label="Profile Picture URL"
                multiline
                rows={1}
                defaultValue={props.userData["user_picture"]}
                onChange={(e) =>
                  setUserPicture(e.target.value, console.log(userPicture))
                }
                fullWidth
                sx={{ m: 1, width: "51.69ch" }}
                variant="filled"
              />
              <TextField
                id="filled-multiline-static"
                label="Preference 1"
                multiline
                rows={2}
                defaultValue={props.userData["preference_one"]}
                onChange={(e) =>
                  setPreferenceOne(e.target.value, console.log(preferenceOne))
                }
                fullWidth
                sx={{ m: 1, width: "51.69ch" }}
                variant="filled"
              />
              <TextField
                id="filled-multiline-static"
                label="Preference 2"
                multiline
                rows={2}
                defaultValue={props.userData["preference_two"]}
                onChange={(e) =>
                  setPreferenceTwo(e.target.value, console.log(preferenceTwo))
                }
                fullWidth
                sx={{ m: 1, width: "51.69ch" }}
                variant="filled"
              />
              <TextField
                id="filled-multiline-static"
                label="Preference 3"
                multiline
                rows={2}
                defaultValue={props.userData["preference_three"]}
                onChange={(e) =>
                  setPreferenceThree(
                    e.target.value,
                    console.log(preferenceThree)
                  )
                }
                fullWidth
                sx={{ m: 1, width: "51.69ch" }}
                variant="filled"
              />
            </div>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.toggleShow}>Cancel</Button>
          <Button onClick={updateUser}>Update</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
