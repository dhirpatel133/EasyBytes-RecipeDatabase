import { AccountBox } from "./components/accountBox";
import styled from "styled-components";
import { Routes, Route } from "react-router-dom";
import Home from "./components/homePage";
import MyRecipes from "./components/myRecipes";
import SuggestedPosts from "./components/suggestedPosts";
import FavouritePosts from "./components/favouritePosts";

const AppContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const App = () => {
  return (
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route
        path="/"
        element={
          <AppContainer>
            <AccountBox />
          </AppContainer>
        }
      />
      <Route path="/myRecipes" element={<MyRecipes />} />
      <Route path="/suggestedPosts" element={<SuggestedPosts />} />
      <Route path="/favouritedPosts" element={<FavouritePosts />} />
    </Routes>
  );
};

export default App;
