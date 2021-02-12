// @flow

import type {Recipe} from '../App.js';

const HARDCODED_DEV_DATA: Array<Recipe> = [
  {
    id: 1,
    name: "Roast Beef",
    stars: '4',
    instructions: "How to cook roast beef...."
  },
  {
    id: 2,
    name: "Borscht",
    stars: '5',
    instructions: "Beets. Lots and lots of purple."
  },
  {
    id: 3,
    name: "Brussel Sprouts",
    stars: "2",
    instructions: "No thanks"
  },
  {
    id: 4,
    name: "Omlette",
    stars: "3",
    instructions: "Non-scrambled scrambled eggs"
  },
  {
    id: 5,
    name: "Haggis",
    stars: "1",
    instructions: "But why tho????"
  }
];

export default {
  HARDCODED_DEV_DATA
}
