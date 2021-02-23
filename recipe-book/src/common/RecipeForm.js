// @flow

import * as React from "react";
import Icon from "./Icon.js";
import TextInput from "./TextInput.js";
import "../App.css";
import StarRatingWidget from "./StarRatingWidget.js";
import type { RecipeType } from "./Recipe.js";

type Props = {
  recipe: RecipeType,
};

function RecipeForm({ recipe }: Props): React.Node {
  return (
    <div
      style={{
        width: "100%",
        height: "calc(100% - 24px)",
        justifyContent: "space-between",
      }}
      className="Horizontal"
    >
      <div>
        <Icon className="Border Centered" icon="faHamburger" size="10x" />
        <TextInput
          value={recipe.name}
          onChange={() => {}}
          placeholder="Recipe Name:"
          margin="8px 0px 8px 0px"
        />
        <StarRatingWidget stars={recipe.stars} />
      </div>
      <TextInput
        value={recipe.instructions}
        onChange={() => {}}
        placeholder="Instructions:"
        margin="0px 20px 0px 40px"
        mode="textArea"
      />
    </div>
  );
}

export default RecipeForm;
