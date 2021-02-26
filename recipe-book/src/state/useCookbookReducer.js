// @flow

import { useReducer } from "react";
import type { RecipeType } from "../common/Recipe.js";
import type { Account } from "../common/AccountWidget.js";

/**
 * App state management lives here. The state represents the UI's data, actions
 * are what the user can do. Reduce is how we translate the action and old State
 * into the next state. The react useReducer hook handles the state updates.
 * once Reduce returns a new render cycle is kicked off.
 **/

export type State = {
  recipes: Array<RecipeType>,
  search?: string,
  selectedRecipe?: RecipeType,
  account?: Account,
};

export type Action =
  | {
      type: "SET_RECIPES",
      recipes: Array<RecipeType>,
    }
  | {
      type: "SEARCH",
      search: ?string,
    }
  | {
      type: "SELECT_RECIPE",
      recipe: ?RecipeType,
    }
  | {
      type: "UPDATE_RECIPE",
      recipe: RecipeType,
    }
  | {
      type: "LOGIN",
      account: Account,
    }
  | {
      type: "LOGOUT",
    }
  | {
      type: "ADD_RECIPE",
    };

const defaultState: State = {
  recipes: [],
};

const reduce = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_RECIPES":
      return {
        ...state,
        recipes: action.recipes,
      };
    case "SEARCH":
      return {
        ...state,
        search: action.search ?? undefined,
      };
    case "SELECT_RECIPE":
      return {
        ...state,
        selectedRecipe: action.recipe ?? undefined,
      };
    case "UPDATE_RECIPE":
      return {
        ...state,
        selectedRecipe: undefined,
        recipes: state.recipes.map((recipe) => {
          if (recipe.id === action.recipe.id) {
            return action.recipe;
          }
          return recipe;
        }),
      };
    case "LOGIN":
      return {
        ...state,
        account: action.account,
      };
    case "LOGOUT":
      return {
        ...state,
        account: undefined,
      };
    case "ADD_RECIPE":
      return {
        ...state,
        selectedRecipe: {
          id: state.recipes.length, //temporary workaround, server will set IDs in future
          name: "",
          stars: 0,
          instructions: "",
        },
      };
    default:
      throw "Invalid action type: " + action.type;
  }
};

export default function useCookbookReducer(
  startingState?: State
): [State, (Action) => void] {
  return useReducer(reduce, startingState ?? defaultState);
}
