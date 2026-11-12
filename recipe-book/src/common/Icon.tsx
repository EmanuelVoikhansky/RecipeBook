import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as icons from "@fortawesome/free-solid-svg-icons";
import type {
  IconDefinition,
  SizeProp,
} from "@fortawesome/fontawesome-svg-core";

// icons are looked up by their export name, e.g. "faSearch"
const iconsByName = (icons as unknown) as Record<
  string,
  IconDefinition | undefined
>;

type Props = {
  icon: string,
  margin?: string,
  size?: SizeProp,
  color?: string,
  onClick?: () => void,
};

function Icon({ icon, margin, size, color, onClick }: Props): JSX.Element {
  const definition = iconsByName[icon];
  return (
    <span
      style={{
        cursor: onClick ? "pointer" : undefined,
        margin: margin ?? "0px",
        color,
      }}
      onClick={onClick}
    >
      {definition != null ? (
        <FontAwesomeIcon icon={definition} size={size} />
      ) : (
        <div>Can't find icon: {icon}</div>
      )}
    </span>
  );
}

export default Icon;
