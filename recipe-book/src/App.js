// @flow

import "./App.css";
import * as React from "react";
import HARDCODED_DEV_DATA from "./constants/devData.js";
import Icon from "./common/Icon.js";
import SearchBar from "./common/SearchBar.js";

export type Recipe = {
  id: number,
  name: string,
  stars: "1" | "2" | "3" | "4" | "5",
  imageUrl?: string,
  instructions: string,
};

function App(): React.Node {
  return (
    <div className="App Vertical">
      <div className="Horizontal">
        <SearchBar
          value={""}
          onChange={(finalVal) => {
            console.log(finalVal);
          }}
        />
      </div>
    </div>
  );
}

export default App;
