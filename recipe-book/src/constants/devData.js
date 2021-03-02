// @flow

import type { RecipeType } from "../state/useCookbookReducer.js";
import type { Account } from "../state/useCookbookReducer.js";

export const HARDCODED_DEV_ACCOUNT: Account = {
  id: 1,
  name: "Paul Holly",
};

const HARDCODED_DEV_ACCOUNT_2: Account = {
  id: 2,
  name: "Rordon Gamsey",
};

export const HARDCODED_DEV_DATA: Array<RecipeType> = [
  {
    id: 1,
    name: "Roast Beef",
    stars: 4,
    instructions: "How to cook roast beef....",
    author: HARDCODED_DEV_ACCOUNT,
  },
  {
    id: 2,
    name: "Borscht",
    stars: 5,
    instructions: "Beets. Lots and lots of purple.",
    author: HARDCODED_DEV_ACCOUNT,
  },
  {
    id: 3,
    name: "Brussel Sprouts",
    stars: 2,
    instructions: "No thanks",
    author: HARDCODED_DEV_ACCOUNT,
  },
  {
    id: 4,
    name: "Omlette",
    stars: 3,
    instructions: "Non-scrambled scrambled eggs",
    author: HARDCODED_DEV_ACCOUNT_2,
  },
  {
    id: 5,
    name: "Haggis",
    stars: 1,
    instructions: "But why tho????",
    author: HARDCODED_DEV_ACCOUNT,
  },
];
