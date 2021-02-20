// @flow

import * as React from "react";
import "../App.css";
import { useState, useMemo } from "react";
import Icon from "./Icon.js";
import useDebouncedOnChange from "./useDebouncedOnChange.js";

type Props = {
  value: string,
  onChange: (string) => void,
  placeholder?: string,
  icon?: string,
  debounce?: number,
  margin?: string,
};

function TextInput({
  value,
  onChange,
  icon,
  placeholder,
  debounce,
  margin,
}: Props): React.Node {
  const useDebounce = debounce != null && debounce > 0;
  const [debouncedValue, setDebouncedValue] = useDebouncedOnChange(
    value,
    onChange,
    debounce ?? 500
  );
  const curValue = useDebounce ? debouncedValue : value;
  const setValue = useDebounce ? setDebouncedValue : onChange;
  return (
    <div className="Border" style={{ margin: margin ?? "" }}>
      <label>
        {icon != null ? <Icon icon={icon} margin="0px 4px 1px 0px" /> : null}
        {curValue.length === 0 ? placeholder : null}
        <input
          style={{ border: "none", focus: { outline: "none" } }}
          type="text"
          value={curValue}
          onChange={(event) => setValue(event.target.value)}
        />
      </label>
    </div>
  );
}

export default TextInput;
