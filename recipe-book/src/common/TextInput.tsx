import * as React from "react";
import "../App.css";
import useDebouncedOnChange from "./useDebouncedOnChange";

type Props = {
  value: string,
  onChange?: (value: string) => void,
  placeholder?: string,
  debounce?: number,
  margin?: string,
  style?: React.CSSProperties,
  type: string,
  mode: "singleLine" | "textArea",
};

function TextInput({
  value,
  onChange,
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
  const readOnly = onChange == null;
  return (
    <div className="TextInput" style={{ margin: margin ?? "", ...style }}>
      {mode === "singleLine" ? (
        <input
          type={type}
          value={curValue}
          placeholder={placeholder}
          aria-label={placeholder}
          readOnly={readOnly}
          onChange={(event) => setValue(event.target.value)}
        />
      ) : (
        <textarea
          value={curValue}
          placeholder={placeholder}
          aria-label={placeholder}
          readOnly={readOnly}
          onChange={(event) => setValue(event.target.value)}
        />
      )}
    </div>
  );
}

TextInput.defaultProps = {
  mode: "singleLine",
  type: "text",
};

export default TextInput;
