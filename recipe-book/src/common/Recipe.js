// @flow

import * as React from "react";
import Icon from "./Icon.js";
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
  const stars = [];
  for (let star = 1; star <= 5; star++) {
    if (recipe.stars >= star) {
      stars.push(<Icon icon="faStar" key={"star" + star} />);
    }
  }
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
        {stars}
      </span>
    </div>
  );
}

export default Recipe;
