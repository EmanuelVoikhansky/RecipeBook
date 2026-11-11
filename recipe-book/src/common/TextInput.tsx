import * as React from "react";
import "../App.css";
import { useState, useMemo } from "react";
import Icon from "./Icon";
import useDebouncedOnChange from "./useDebouncedOnChange";

type Props = {
  value: string,
  onChange?: (value: string) => void,
  placeholder?: string,
  icon?: string,
  debounce?: number,
  margin?: string,
  style?: React.CSSProperties,
  type: string,
  mode: "singleLine" | "textArea",
};

function TextInput({
  value,
  onChange,
  icon,
  placeholder,
  debounce,
  margin,
  mode,
  type,
  style,
}: Props): JSX.Element {
  const noOp = (_: string) => {};
  const useDebounce = debounce != null && debounce > 0;
  const [debouncedValue, setDebouncedValue] = useDebouncedOnChange(
    value,
    onChange ?? noOp,
    debounce ?? 500
  );
  const curValue = useDebounce ? debouncedValue : value;
  const setValue = useDebounce ? setDebouncedValue : onChange ?? noOp;
  return (
    <div
      className="Border"
      style={{
        margin: margin ?? "",
        width: "calc(100% - 10px)",
        ...style,
      }}
    >
      <label>
        {icon != null ? <Icon icon={icon} margin="0px 4px 1px 0px" /> : null}
        {curValue.length === 0 ? placeholder : null}
        {mode === "singleLine" ? (
          <input
            style={{
              border: "none",
              cursor: onChange == null ? "default" : undefined,
            }}
            type={type}
            value={curValue}
            onChange={(event) => setValue(event.target.value)}
          />
        ) : (
          <textarea
            style={{
              resize: "none",
              border: "none",
              outline: "none",
              height: "100%",
              width: "100%",
              cursor: onChange == null ? "default" : undefined,
            }}
            value={curValue}
            onChange={(event) => setValue(event.target.value)}
          />
        )}
      </label>
    </div>
  );
}

TextInput.defaultProps = {
  mode: "singleLine",
  type: "text",
};

export default TextInput;
