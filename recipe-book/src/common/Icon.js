// @flow

import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as icons from "@fortawesome/free-solid-svg-icons";

type Props = {
  icon: string,
  margin?: string,
  size?: string,
  color?: string,
  onClick?: () => void,
};

function Icon({ icon, margin, size, color, onClick }: Props): React.Node {
  return (
    <span
      style={{
        cursor: onClick ? "pointer" : undefined,
        margin: margin ?? "0px",
        color,
      }}
      onClick={onClick}
    >
      {icons[icon] != null ? (
        <FontAwesomeIcon icon={icons[icon]} size={size} />
      ) : (
        <div>Can't find icon: {icon}</div>
      )}
    </span>
  );
}

export default Icon;
