// @flow

import "./App.css";
import * as React from "react";
import {
  HARDCODED_DEV_DATA,
  HARDCODED_DEV_ACCOUNT,
} from "./constants/devData.js";
import Icon from "./common/Icon.js";
import SearchBar from "./common/SearchBar.js";
import AccountWidget from "./common/AccountWidget.js";

export type Recipe = {
  id: number,
  name: string,
  stars: "1" | "2" | "3" | "4" | "5",
  imageUrl?: string,
  instructions: string,
};

function App(): React.Node {
  return (
    <div className="App Horizontal">
      <div className="SidePanel">
        <AccountWidget account={HARDCODED_DEV_ACCOUNT} />
        <div className="VerticalSpacer" />
        <SearchBar value={""} onChange={() => {}} />
      </div>
    </div>
  );
}

export default App;
