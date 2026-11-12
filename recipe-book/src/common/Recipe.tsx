import * as React from "react";
import Icon from "./Icon";
import Image from "./Image";
import StarRatingWidget from "./StarRatingWidget";
import "../App.css";
import type { RecipeType } from "../state/useCookbookReducer";

type Props = {
  recipe: RecipeType,
  onClick: () => void,
};

function Recipe({ recipe, onClick }: Props): JSX.Element {
  const { imageUrl } = recipe;
  return (
    <article className="RecipeCard Vertical" onClick={onClick}>
      {imageUrl != null ? (
        <Image src={imageUrl} size="150px" />
      ) : (
        <Icon
          icon="faHamburger"
          size="6x"
          color="var(--pico-muted-color)"
        />
      )}
      <p className="RecipeCardName">{recipe.name}</p>
      <StarRatingWidget stars={recipe.stars} />
    </article>
  );
}

export default Recipe;
