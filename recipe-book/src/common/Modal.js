// @flow

import * as React from "react";
import "../App.css";
import Icon from "./Icon.js";

type Props = {
  isShown: boolean,
  onClose: () => void,
  children: React.Node,
  width: string,
  height: string,
};

const MODAL_BACKGROUND_STYLE = {
  display: "flex",
  position: "fixed",
  zIndex: 1,
  left: 0,
  top: 0,
  width: "100vw",
  height: "100vh",
  overflow: "none",
  backgroundColor: "rgba(0,0,0,0.4)",
};

const MODAL_FOREGROUND_STYLE = {
  padding: "16px",
  zIndex: 2,
  borderRadius: "6px",
  backgroundColor: "white",
  overflow: "auto",
};

function Modal({
  isShown,
  onClose,
  children,
  height,
  width,
}: Props): React.Node {
  if (!isShown) {
    return null;
  }
  return (
    <div
      className="Centered Horizontal"
      style={MODAL_BACKGROUND_STYLE}
      onClick={onClose}
    >
      <div
        style={{ ...MODAL_FOREGROUND_STYLE, height, width }}
        onClick={(event) => event.stopPropagation()}
      >
        <div
          style={{ width: "100%", justifyContent: "flex-end" }}
          className="Horizontal"
        >
          <div style={{ cursor: "pointer" }} onClick={onClose}>
            <Icon icon="faTimes" />
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}

Modal.defaultProps = {
  width: "80vw",
  height: "80vh",
};

export default Modal;
