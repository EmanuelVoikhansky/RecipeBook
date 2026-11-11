import { useState, useMemo } from "react";
import debounce from "./debounce";

/**
 * Takes in an initial value and an updater function for that value. Returns
 * a debounced version of that value and that updater. Once at least *wait* ms
 * have passed since the last time the debounced updater has been called, calls
 * the original updater function with the final debounced value
 **/
export default function useDebouncedOnChange<T>(
  initialValue: T,
  onChange: (value: T) => void,
  wait: number
): [T, (newValue: T) => void] {
  const [value, setValue] = useState(initialValue);
  const debouncedOnChange = useMemo(() => debounce(onChange, wait), [
    onChange,
    wait,
  ]);
  const debouncedSetValue = (newValue: T) => {
    setValue(newValue);
    debouncedOnChange(newValue);
  };
  return [value, debouncedSetValue];
}
