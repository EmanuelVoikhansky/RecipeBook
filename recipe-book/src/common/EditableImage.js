// @flow

import * as React from "react";
import { useState } from "react";
import Icon from "./Icon.js";
import Image from "./Image.js";
import "../App.css";

type Props = {
  fallback: React.Node,
  src: ?string,
  onChange?: (string) => void,
  size: string,
  styleOverride?: Object,
};

function EditableImage({
  fallback,
  src,
  onChange,
  size,
  styleOverride,
}: Props): React.Node {
  const [mouseIn, setMouseIn] = useState(false);
  const image =
    src != null ? (
      <Image src={src} size={size} styleOverride={styleOverride} />
    ) : (
      fallback
    );
  if (onChange == null) {
    return image;
  }
  return (
    <div
      style={{
        position: "static",
      }}
      onMouseEnter={() => setMouseIn(true)}
      onMouseLeave={() => setMouseIn(false)}
    >
      <div
        style={{
          position: "relative",
          display: "flex",
          height: size,
          width: size,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {mouseIn ? (
          <label
            for="imageUpload"
            style={{
              position: "absolute",
              cursor: "pointer",
              width: "100%",
              height: "100%",
            }}
          >
            <Icon icon="faPencilAlt" />
          </label>
        ) : null}
        <input
          type="file"
          accept="image/*"
          id="imageUpload"
          style={{
            position: "absolute",
            opacity: 0, // this component is invisible
            zIndex: -1,
          }}
          onChange={(event) =>
            onChange(URL.createObjectURL(event.target.files[0]))
          }
        />
        {image}
      </div>
    </div>
  );
}

export default EditableImage;
