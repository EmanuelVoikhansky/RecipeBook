import * as React from "react";
import Icon from "./Icon";
import useTheme from "./useTheme";

function ThemeToggle(): JSX.Element {
  const [theme, toggleTheme] = useTheme();
  const label =
    theme === "dark" ? "Switch to light mode" : "Switch to dark mode";
  return (
    <button
      className="secondary outline IconButton"
      onClick={toggleTheme}
      aria-label={label}
      title={label}
    >
      <Icon icon={theme === "dark" ? "faSun" : "faMoon"} />
    </button>
  );
}

export default ThemeToggle;
