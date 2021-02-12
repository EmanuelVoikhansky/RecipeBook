// @flow

import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as icons from "@fortawesome/free-solid-svg-icons";

type Props = {
  icon: string,
  margin?: string,
};

function Icon({ icon, margin }: Props): React.Node {
  return (
    <span style={{ margin: margin ?? "0px" }}>
      {icons[icon] != null ? (
        <FontAwesomeIcon icon={icons[icon]} />
      ) : (
        <div>Can't find icon: {icon}</div>
      )}
    </span>
  );
}

export default Icon;
