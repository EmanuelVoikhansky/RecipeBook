import * as React from "react";

type Props = {
  src: string,
  size: string,
  styleOverride?: React.CSSProperties,
};

function Image({ src, size, styleOverride }: Props): JSX.Element {
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
