// @flow

import * as React from "react";
import Icon from "./Icon.js";
import StarRatingWidget from "./StarRatingWidget.js";
import "../App.css";

export type RecipeType = {
  id: number,
  name: string,
  stars: number,
  imageUrl?: string,
  instructions: string,
};

type Props = {
  recipe: RecipeType,
  onClick: () => void,
};

function Recipe({ recipe, onClick }: Props): React.Node {
  return (
    <div
      className="Border Vertical Centered"
      style={{
        width: "18vw",
        height: "18vw",
        padding: "8px",
        cursor: "pointer",
      }}
      onClick={onClick}
    >
      <Icon icon="faHamburger" size="6x" />
      <span>
        <p>{recipe.name}</p>
        <StarRatingWidget stars={recipe.stars} />
      </span>
    </div>
  );
}

export default Recipe;
