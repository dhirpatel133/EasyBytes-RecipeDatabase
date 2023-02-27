import * as React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import { Button } from "@mui/material";
import { Stack } from '@mui/material';

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

const filter_by_cuisine = [
  "Mediterranean",
  "British",
  "French",
  "Mexican",
  "Indian",
  "Italian",
  "American"
];

const filter_by_meal_type = [
  "Breakfast",
  "Lunch",
  "Side Dish",
  "Dinner",
  "Dessert"
];

const filter_by_diet_label = [
  "Vegetarian",
  "Vegan",
  "Dairy Free",
  "Gluten Free"
];

const sort_categories = [
  "Calories (ASC)",
  "Calories (DESC)",
  "Cook Time (ASC)",
  "Cook Time (DESC)",
  "Servings (ASC)",
  "Servings (DESC)",
  "Health Score (ASC)",
  "Health Score (DESC)"
];

const SelectionModel = () => {
  const [cuisine, setCuisine] = React.useState([]);
  const [meal, setMeal] = React.useState([]);
  const [diet, setDiet] = React.useState([]);
  const [sort, setSort] = React.useState([]);

  const filter_by_cuisine_click = (event) => {
    const {
      target: { value }
    } = event;
    setCuisine(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const filter_by_meal_type_click = (event) => {
    const {
      target: { value }
    } = event;
    setMeal(typeof value === "string" ? value.split(",") : value);
  };

  const filter_by_diet_label_click = (event) => {
    const {
      target: { value }
    } = event;
    setDiet(typeof value === "string" ? value.split(",") : value);
  };

  const sort_categories_click = (event) => {
    const {
      target: { value }
    } = event;
    setSort(typeof value === "string" ? value.split(",") : value);
  };

  return (
    <div style={{padding: 10}}>
    <Stack direction="row" spacing={2}>
        <div>
        <FormControl sx={{ m: 1, width: 400 }}>
        <InputLabel id="cuisine">Cuisine</InputLabel>
        <Select
          labelId="cuisine"
          id="cuisine"
          value={cuisine}
          onChange={filter_by_cuisine_click}
          input={<OutlinedInput label="Tag" />}
          MenuProps={MenuProps}
        >
          {filter_by_cuisine.map((name) => (
            <MenuItem key={name} value={name}>
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl sx={{ m: 1, width: 400 }}>
        <InputLabel id="meal-type">Meal Type</InputLabel>
        <Select
          labelId="meal-type"
          id="meal-type"
          value={meal}
          onChange={filter_by_meal_type_click}
          input={<OutlinedInput label="Tag" />}
          MenuProps={MenuProps}
        >
          {filter_by_meal_type.map((name) => (
            <MenuItem key={name} value={name}>
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl sx={{ m: 1, width: 400 }}>
        <InputLabel id="diet-label">Diet Label</InputLabel>
        <Select
          labelId="diet-label"
          id="diet-label"
          value={diet}
          onChange={filter_by_diet_label_click}
          input={<OutlinedInput label="Tag" />}
          MenuProps={MenuProps}
        >
          {filter_by_diet_label.map((name) => (
            <MenuItem key={name} value={name}>
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl sx={{ m: 1, width: 375 }}>
        <InputLabel id="sort-categories">Sort Categories</InputLabel>
        <Select
          labelId="sort-categories"
          id="sort-categories"
          value={sort}
          onChange={sort_categories_click}
          input={<OutlinedInput label="Tag" />}
          MenuProps={MenuProps}
        >
          {sort_categories.map((name) => (
            <MenuItem key={name} value={name}>
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button variant="contained" style={{height: 55, width: 200}}>Search for Recipes</Button>
        </div>
    </Stack>
    </div>
  );
}

export default SelectionModel;