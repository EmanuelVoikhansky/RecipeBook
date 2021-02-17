import { useState, useMemo } from "react";
import debounce from "./debounce.js";

/**
 * Takes in an initial value and an updater function for that value. Returns
 * a debounced version of that value and that updater. Once at least *wait* ms
 * have passed since the last time the debounced updater has been called, calls
 * the original updater function with the final debounced value
 **/
export default function useDebouncedOnChange(initialValue, onChange, wait) {
  const [value, setValue] = useState(initialValue);
  const debouncedOnChange = useMemo(() => debounce(onChange, wait), [
    onChange,
    wait,
  ]);
  const debouncedSetValue = (newValue) => {
    setValue(newValue);
    debouncedOnChange(newValue);
  };
  return [value, debouncedSetValue];
}
