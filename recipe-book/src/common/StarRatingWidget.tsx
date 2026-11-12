import * as React from "react";
import Icon from "./Icon";
import "../App.css";

type Props = {
  stars: number,
  setStars?: (stars: number) => void,
};

function StarRatingWidget({ stars, setStars }: Props): JSX.Element {
  const rating: JSX.Element[] = [];
  for (let star = 1; star <= 5; star++) {
    const color = stars >= star ? "gold" : "grey";
    rating.push(
      <div
        key={"star" + star}
        style={{ cursor: setStars ? "pointer" : undefined }}
        onClick={() => setStars && setStars(star)}
      >
        <Icon icon="faStar" color={color} />
      </div>
    );
  }
  return <span className="Horizontal">{rating}</span>;
}

export default StarRatingWidget;
