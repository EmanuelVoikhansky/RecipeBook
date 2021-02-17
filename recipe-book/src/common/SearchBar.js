// @flow

import * as React from "react";
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
    <div
      style={{ border: "1px solid black", borderRadius: "4px", padding: "4px" }}
    >
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
