import React, {useState, useEffect} from 'react';
import axios from 'axios'
import SelectionModel from './components/selectionModel';
import AllRecipes from './components/allRecipes';
import { padding, style } from '@mui/system';
import MainNavBar from './components/mainNavbar';


let url = 'http://localhost:5000/'; 


const App = () => {
  const [data, setData] = useState({"cuisine": '', "meal_type": '', "diet_label": '', "sort": ''});
  return (
    <div className="App">
      <header><MainNavBar/></header>
      <SelectionModel style={{padding: 300}} toChild={data} sendToParent={setData}></SelectionModel>
      <div>
          <AllRecipes search={data}></AllRecipes>
      </div>
    </div>
  );

}

export default App;
