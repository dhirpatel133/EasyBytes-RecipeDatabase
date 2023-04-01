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
  Select,
  OutlinedInput,
  MenuItem,
  ListItemText,
  InputLabel
} from "@mui/material";
import FormControl from "@mui/material/FormControl";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    }
  }
};

const cuisine_preference = [
  "None",
  "Mediterranean",
  "British",
  "French",
  "Mexican",
  "Indian",
  "Italian",
  "American"
];

const meal_preference = [
  "None",
  "Breakfast",
  "Lunch",
  "Side Dish",
  "Snack",
  "Dinner",
  "Dessert"
];

const diet_preference = [
  "None",
  "Vegetarian",
  "Vegan",
  "Dairy Free",
  "Gluten Free"
];

export default function FormDialog(props) {
  const [open, setOpen] = React.useState(props.show);
  const [firstName, setFirstName] = React.useState(
    props.userData["first_name"]
  );
  const [lastName, setLastName] = React.useState(props.userData["last_name"]);
  const [preferenceOne, setPreferenceOne] = React.useState(
    props.userData["preference_one"] != null ? props.userData["preference_one"] : "None"
  );
  const [preferenceTwo, setPreferenceTwo] = React.useState(
    props.userData["preference_two"] != null ? props.userData["preference_two"] : "None"
  );
  const [preferenceThree, setPreferenceThree] = React.useState(
    props.userData["preference_three"] != null ? props.userData["preference_three"] : "None"
  );
  const [userPicture, setUserPicture] = React.useState(
    props.userData["user_picture"]
  );

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
      let message =
        "Profile not updated. First and last name are required fields.";
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
        if (response.data === "invalid") {
          props.toggleShow();
          let message = "Failed to update your data. Please try again.";
          let errIcon = "error";
          alertError(message, errIcon);
        } else {
          setTimeout(props.toggleShow(), 250);
          let message = "Your profile has been updated!";
          let errIcon = "success";
          alertError(message, errIcon);
        }
      });
    }
  };

  return (
    <div>
      <Dialog open={props.show} onClose={props.toggleShow}>
        <DialogTitle>
          {props.myProfile ? (
            <Typography variant="h4" align="center">
              Update Your Profile
            </Typography>
          ) : (
            <Typography variant="h4" align="center">
              {props.userData["user_name"]} Profile
            </Typography>
          )}
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
                InputProps={!props.myProfile && {readOnly: true}}
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
                InputProps={!props.myProfile && {readOnly: true}}
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
                InputProps={!props.myProfile && {readOnly: true}}
              />
             <FormControl sx={{ m: 1, width: "51.69ch" }}>
                <InputLabel id="meal-type">Cuisine Preference</InputLabel>
                <Select
                  labelId="cuisine-type"
                  id="cuisine-type"
                  defaultValue={preferenceOne}
                  onChange={(e) =>
                    setPreferenceOne(
                      e.target.value,
                      console.log(preferenceOne)
                    )
                  }
                  input={<OutlinedInput label="Tag" />}
                  MenuProps={MenuProps}
                >
                  {cuisine_preference.map((name) => (
                    <MenuItem key={name} value={name}>
                      <ListItemText primary={name} />
                    </MenuItem>
                  ))}
                </Select>
            </FormControl >
            <FormControl sx={{ m: 1, width: "51.69ch" }}>
                <InputLabel id="diet-type">Diet Preference</InputLabel>
                <Select
                  labelId="diet-type"
                  id="diet-type"
                  defaultValue={preferenceTwo}
                  onChange={(e) =>
                    setPreferenceTwo(
                      e.target.value,
                      console.log(e.target.value),
                    )
                  }
                  input={<OutlinedInput label="Tag" />}
                  MenuProps={MenuProps}
                >
                  {diet_preference.map((name) => (
                    <MenuItem key={name} value={name}>
                      <ListItemText primary={name} />
                    </MenuItem>
                  ))}
                </Select>
            </FormControl>
            <FormControl sx={{ m: 1, width: "51.69ch" }}>
                <InputLabel id="meal-type">Meal Type Preference</InputLabel>
                <Select
                  labelId="meal-type"
                  id="meal-type"
                  defaultValue={preferenceThree}
                  onChange={(e) =>
                    setPreferenceThree(
                      e.target.value,
                      console.log(e.target.value)
                    )
                  }
                  input={<OutlinedInput label="Tag" />}
                  MenuProps={MenuProps}
                >
                  {meal_preference.map((name) => (
                    <MenuItem key={name} value={name}>
                      <ListItemText primary={name} />
                    </MenuItem>
                  ))}
                </Select>
            </FormControl>
            </div>
          </Box>
        </DialogContent>
        <DialogActions>
          {props.myProfile && (
            <>
              <Button onClick={props.toggleShow}>Cancel</Button>
              <Button onClick={updateUser}>Update</Button>
            </>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
}
