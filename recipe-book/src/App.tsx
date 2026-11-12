import "./App.css";
import * as React from "react";
import {
  HARDCODED_DEV_DATA,
  HARDCODED_DEV_ACCOUNT,
} from "./constants/devData";
import Icon from "./common/Icon";
import TextInput from "./common/TextInput";
import RecipeForm from "./common/RecipeForm";
import LoginForm from "./common/LoginForm";
import AccountWidget from "./common/AccountWidget";
import Recipe from "./common/Recipe";
import Modal from "./common/Modal";
import ThemeToggle from "./common/ThemeToggle";
import useCookbookReducer from "./state/useCookbookReducer";
import type { RecipeType } from "./state/useCookbookReducer";

const RECIPES_PER_ROW = 3;

function App(): JSX.Element {
  const [state, dispatch] = useCookbookReducer({
    recipes: HARDCODED_DEV_DATA,
  });

  const { selectedRecipe } = state;

  const onSearch = (search: string) =>
    dispatch({
      type: "SEARCH",
      search: search.length > 0 ? search : null,
    });

  const selectRecipe = (recipe: RecipeType | null) => {
    dispatch({
      type: "SELECT_RECIPE",
      recipe,
    });
  };

  const powerSearch = (recipe: RecipeType) => {
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
          <div className="SidePanelHeader Horizontal">
            <h1>Cookbook</h1>
            <ThemeToggle />
          </div>
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
            type="search"
            placeholder="Search recipes"
            margin="0px 0px 16px 0px"
            debounce={500}
          />
          {state.account ? (
            <button
              style={{
                width: "100%",
              }}
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
              onLoginSuccess={(account) =>
                dispatch({
                  type: "LOGIN",
                  account,
                })
              }
              onLoginFailure={() => {}}
            />
          )}
        </div>
        {state.account ? (
          <button
            style={{
              width: "100%",
            }}
            className="secondary outline"
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
      <div className="RecipeGrid">
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
