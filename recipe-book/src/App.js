// @flow

import "./App.css";
import * as React from "react";
import {
  HARDCODED_DEV_DATA,
  HARDCODED_DEV_ACCOUNT,
} from "./constants/devData.js";
import Icon from "./common/Icon.js";
import TextInput from "./common/TextInput.js";
import RecipeForm from "./common/RecipeForm.js";
import AccountWidget from "./common/AccountWidget.js";
import Recipe from "./common/Recipe.js";
import Modal from "./common/Modal.js";
import useCookbookReducer from "./state/useCookbookReducer.js";

const RECIPES_PER_ROW = 3;

function App(): React.Node {
  const [state, dispatch] = useCookbookReducer({
    recipes: HARDCODED_DEV_DATA,
    account: HARDCODED_DEV_ACCOUNT,
  });

  const { selectedRecipe } = state;

  const onSearch = (search) =>
    dispatch({
      type: "SEARCH",
      search: search.length > 0 ? search : null,
    });

  const selectRecipe = (recipe) => {
    dispatch({
      type: "SELECT_RECIPE",
      recipe,
    });
  };

  const powerSearch = (recipe) => {
    const { search } = state;
    if (search == null) {
      return true;
    }
    const { id, name, instructions } = recipe;
    return (id + name + instructions)
      .toLowerCase()
      .includes(search.toLowerCase());
  };

  return (
    <div className="App Horizontal">
      <div className="SidePanel">
        {state.account ? <AccountWidget account={state.account} /> : null}
        <div className="VerticalSpacer" />
        <TextInput
          value={state.search ?? ""}
          onChange={onSearch}
          placeholder="Search: "
          icon="faSearch"
          debounce={500}
        />
      </div>
      <div className="RecipeGrid Centered">
        {HARDCODED_DEV_DATA.filter(powerSearch).map((recipe) => (
          <Recipe
            recipe={recipe}
            key={"recipe" + recipe.id}
            onClick={() => selectRecipe(recipe)}
          />
        ))}
      </div>
      <Modal
        isShown={selectedRecipe != null}
        onClose={() => selectRecipe(null)}
      >
        {selectedRecipe ? <RecipeForm recipe={selectedRecipe} /> : null}
      </Modal>
    </div>
  );
}

export default App;
