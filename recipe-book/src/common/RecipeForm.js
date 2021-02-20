// @flow

import * as React from "react";
import Icon from "./Icon.js";
import TextInput from "./TextInput.js";
import "../App.css";
import type { RecipeType } from "./Recipe.js";

type Props = {
  recipe: RecipeType,
};

function RecipeForm({ recipe }: Props): React.Node {
  return (
    <div
      style={{ width: "100%", justifyContent: "space-between" }}
      className="Horizontal"
    >
      <div>
        <Icon className="Border Centered" icon="faHamburger" size="10x" />
        <TextInput
          value={recipe.name}
          onChange={() => {}}
          placeholder={"Recipe Name:"}
          margin={"8px 0px 0px 0px"}
        />
      </div>
      <div></div>
    </div>
  );
}

export default RecipeForm;
