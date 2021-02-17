// @flow

import * as React from "react";
import "../App.css";
import { useState, useMemo } from "react";
import Icon from "./Icon.js";
import useDebouncedOnChange from "./useDebouncedOnChange.js";

type Props = {
  value: string,
  onChange: (string) => void,
};

function SearchBar(props: Props): React.Node {
  const [value, setValue] = useDebouncedOnChange(
    props.value,
    props.onChange,
    500
  );
  return (
    <div className="Border">
      <label>
        <Icon icon="faSearch" margin="0px 4px 1px 0px" />
        {value.length === 0 ? "Search:" : null}
        <input
          style={{ border: "none", focus: { outline: "none" } }}
          type="text"
          value={value}
          onChange={(event) => setValue(event.target.value)}
        />
      </label>
    </div>
  );
}

export default SearchBar;
