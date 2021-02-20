// @flow

import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as icons from "@fortawesome/free-solid-svg-icons";

type Props = {
  icon: string,
  margin?: string,
  size?: string,
  color?: string,
};

function Icon({ icon, margin, size, color }: Props): React.Node {
  return (
    <span style={{ margin: margin ?? "0px", color }}>
      {icons[icon] != null ? (
        <FontAwesomeIcon icon={icons[icon]} size={size} />
      ) : (
        <div>Can't find icon: {icon}</div>
      )}
    </span>
  );
}

export default Icon;
