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
import LoginForm from "./common/LoginForm.js";
import AccountWidget from "./common/AccountWidget.js";
import Recipe from "./common/Recipe.js";
import Modal from "./common/Modal.js";
import { useQuery } from "./common/GraphQLCallers.js";
import useCookbookReducer from "./state/useCookbookReducer.js";

const RECIPES_PER_ROW = 3;

const ALL_RECIPES = `
  query {
    all_recipes {
      id
      name
      instructions
      author {
        name
      }
    }
  }
`;

function App(): React.Node {
  const [state, dispatch] = useCookbookReducer();

  const [recipes] = useQuery(ALL_RECIPES, {}, (response) =>
    dispatch({
      type: "SET_RECIPES",
      recipes: response.data.all_recipes,
    })
  );

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
      <div className="SidePanel Vertical">
        <div>
          {state.account ? (
            <AccountWidget
              account={state.account}
              onUpdateAccount={(account) =>
                dispatch({
                  type: "UPDATE_ACCOUNT",
                  account,
                })
              }
            />
          ) : null}
          <TextInput
            value={state.search ?? ""}
            onChange={onSearch}
            placeholder="Search: "
            icon="faSearch"
            margin="8px 0px 8px 0px"
            debounce={500}
          />
          {state.account ? (
            <button
              style={{
                width: "100%",
              }}
              className="LargeButton"
              onClick={() =>
                dispatch({
                  type: "ADD_RECIPE",
                })
              }
            >
              Add
            </button>
          ) : (
            <LoginForm
              onLoginSuccess={(account, token) =>
                dispatch({
                  type: "LOGIN",
                  account,
                  token,
                })
              }
            />
          )}
        </div>
        {state.account ? (
          <button
            style={{
              width: "100%",
            }}
            className="LargeButton"
            onClick={() =>
              dispatch({
                type: "LOGOUT",
              })
            }
          >
            Log Out
          </button>
        ) : null}
      </div>
      <div className="RecipeGrid Centered">
        {state.recipes.filter(powerSearch).map((recipe) => (
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
        {selectedRecipe ? (
          <RecipeForm
            recipe={selectedRecipe}
            dispatch={dispatch}
            editable={state.account?.id === selectedRecipe.author.id}
          />
        ) : null}
      </Modal>
    </div>
  );
}

export default App;
