// @flow

import "./App.css";
import * as React from "react";
import {
  HARDCODED_DEV_DATA,
  HARDCODED_DEV_ACCOUNT,
} from "./constants/devData.js";
import Icon from "./common/Icon.js";
import SearchBar from "./common/SearchBar.js";
import AccountWidget from "./common/AccountWidget.js";
import Recipe from "./common/Recipe.js";

const RECIPES_PER_ROW = 3;

function App(): React.Node {
  return (
    <div className="App Horizontal">
      <div className="SidePanel">
        <AccountWidget account={HARDCODED_DEV_ACCOUNT} />
        <div className="VerticalSpacer" />
        <SearchBar value={""} onChange={() => {}} />
      </div>
      <div className="RecipeGrid Centered">
        {HARDCODED_DEV_DATA.map((recipe) => (
          <Recipe recipe={recipe} key={"recipe" + recipe.id} />
        ))}
      </div>
    </div>
  );
}

export default App;
