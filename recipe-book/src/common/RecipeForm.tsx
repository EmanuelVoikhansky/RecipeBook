import * as React from "react";
import { useState } from "react";
import Icon from "./Icon";
import TextInput from "./TextInput";
import EditableImage from "./EditableImage";
import "../App.css";
import StarRatingWidget from "./StarRatingWidget";
import type { RecipeType } from "../state/useCookbookReducer";
import type { Action } from "../state/useCookbookReducer";

type Props = {
  recipe: RecipeType,
  dispatch: (action: Action) => void,
  editable: boolean,
};

function RecipeForm(props: Props): JSX.Element {
  // don't update global state until user clicks save
  const [recipe, setRecipe] = useState(props.recipe);
  const save = () =>
    props.dispatch({
      type: "UPDATE_RECIPE",
      recipe,
    });

  const cancel = () =>
    props.dispatch({
      type: "SELECT_RECIPE",
      recipe: null,
    });

  const onDelete = () => {
    props.dispatch({
      type: "DELETE_RECIPE",
      recipe,
    });
  };

  const editable = props.editable === true;

  return (
    <div className="RecipeForm Vertical">
      <div className="RecipeFormBody Horizontal">
        <div className="RecipeFormDetails">
          <EditableImage
            fallback={
              <Icon
                icon="faHamburger"
                size="10x"
                color="var(--pico-muted-color)"
              />
            }
            src={recipe.imageUrl}
            onChange={
              editable
                ? (imageUrl) =>
                    setRecipe({
                      ...recipe,
                      imageUrl,
                    })
                : undefined
            }
            size="250px"
          />
          <TextInput
            value={recipe.name}
            onChange={
              editable
                ? (name) =>
                    setRecipe({
                      ...recipe,
                      name,
                    })
                : undefined
            }
            placeholder="Recipe name"
            margin="16px 0px 8px 0px"
          />
          <p>By: {recipe.author.name}</p>
          <StarRatingWidget
            stars={recipe.stars}
            setStars={
              editable
                ? (stars) =>
                    setRecipe({
                      ...recipe,
                      stars,
                    })
                : undefined
            }
          />
        </div>
        <TextInput
          value={recipe.instructions}
          onChange={
            editable
              ? (instructions) =>
                  setRecipe({
                    ...recipe,
                    instructions,
                  })
              : undefined
          }
          placeholder="Instructions"
          mode="textArea"
          style={{ flex: 1 }}
        />
      </div>
      {editable ? (
        <div className="ButtonRow Horizontal">
          <button className="outline Danger" onClick={onDelete}>
            Delete
          </button>
          <button className="secondary" onClick={cancel}>
            Cancel
          </button>
          <button onClick={save}>Save</button>
        </div>
      ) : null}
    </div>
  );
}

RecipeForm.defaultProps = {
  editable: true,
};

export default RecipeForm;
