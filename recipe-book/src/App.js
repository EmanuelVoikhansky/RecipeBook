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
import useCookbookReducer from "./state/useCookbookReducer.js";

const RECIPES_PER_ROW = 3;

function App(): React.Node {
  const [state, dispatch] = useCookbookReducer({
    recipes: HARDCODED_DEV_DATA,
    account: HARDCODED_DEV_ACCOUNT,
  });

  const onSearch = (search) =>
    dispatch({
      type: "SEARCH",
      search: search.length > 0 ? search : null,
    });

  const powerSearch = (recipe) => {
    if (state.search == null) {
      return true;
    }
    const { id, name, instructions } = recipe;
    return (id + name + instructions).includes(state.search);
  };

  return (
    <div className="App Horizontal">
      <div className="SidePanel">
        {state.account ? <AccountWidget account={state.account} /> : null}
        <div className="VerticalSpacer" />
        <SearchBar value={state.search ?? ""} onChange={onSearch} />
      </div>
      <div className="RecipeGrid Centered">
        {HARDCODED_DEV_DATA.filter(powerSearch).map((recipe) => (
          <Recipe recipe={recipe} key={"recipe" + recipe.id} />
        ))}
      </div>
    </div>
  );
}

export default App;
