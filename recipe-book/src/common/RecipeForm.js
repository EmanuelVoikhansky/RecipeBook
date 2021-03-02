// @flow

import * as React from "react";
import { useState } from "react";
import Icon from "./Icon.js";
import TextInput from "./TextInput.js";
import EditableImage from "./EditableImage.js";
import "../App.css";
import StarRatingWidget from "./StarRatingWidget.js";
import type { RecipeType } from "../state/useCookbookReducer.js";
import type { Action } from "../state/useCookbookReducer.js";

type Props = {
  recipe: RecipeType,
  dispatch: (Action) => void,
  editable: boolean,
};

function RecipeForm(props: Props): React.Node {
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

  const editable = props.editable === true;

  return (
    <div
      className="Vertical"
      style={{ alignItems: "flex-end", height: "calc(100% - 24px)" }}
    >
      <div
        style={{
          width: "100%",
          height: "calc(100% - 24px)",
          margin: "16px 0px 16px 0px",
          justifyContent: "space-between",
        }}
        className="Horizontal"
      >
        <div style={{ marginLeft: "16px" }}>
          <EditableImage
            fallback={
              <Icon className="Border Centered" icon="faHamburger" size="10x" />
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
            placeholder="Recipe Name:"
            margin="8px 0px 8px 0px"
          />
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
          placeholder="Instructions:"
          margin="0px 20px 0px 40px"
          mode="textArea"
        />
      </div>
      {editable ? (
        <div className="Horizontal">
          <button
            style={{ marginRight: "8px" }}
            className="LargeButton"
            onClick={cancel}
          >
            Cancel
          </button>
          <button className="LargeButton Confirm" onClick={save}>
            Save
          </button>
        </div>
      ) : null}
    </div>
  );
}

RecipeForm.defaultProps = {
  editable: true,
};

export default RecipeForm;
