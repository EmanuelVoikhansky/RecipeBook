// @flow

import * as React from "react";
import Icon from "./Icon.js";
import "../App.css";

type Props = {
  stars: number,
};

function StarRatingWidget({ stars }: Props): React.Node {
  const rating = [];
  for (let star = 1; star <= 5; star++) {
    const color = stars >= star ? "gold" : "grey";
    rating.push(<Icon icon="faStar" color={color} key={"star" + star} />);
  }
  return <span className="Horizontal">{rating}</span>;
}

export default StarRatingWidget;
