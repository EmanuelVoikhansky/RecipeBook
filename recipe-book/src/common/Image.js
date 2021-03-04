// @flow

import * as React from "react";

type Props = {
  src: string,
  size: string,
  styleOverride?: Object,
};

function Image({ src, size, styleOverride }: Props): React.Node {
  return (
    <div
      style={{
        backgroundImage: `url(${src})`,
        backgroundSize: "cover",
        backgroundPosition: "top center",
        backgroundRepeat: "no-repeat",
        borderRadius: "6px",
        height: size,
        width: size,
        ...styleOverride,
      }}
    />
  );
}

export default Image;
