// @flow

import * as React from "react";
import { useState } from "react";
import Icon from "./Icon.js";

type Props = {
  value: string,
  onChange: (string) => void,
};

function SearchBar(props: Props): React.Node {
  const [value, setValue] = useState(props.value);
  return (
    <form
      style={{ border: "1px solid black", borderRadius: "4px", padding: "4px" }}
      onSubmit={() => props.onChange(value)}
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
    </form>
  );
}

export default SearchBar;
