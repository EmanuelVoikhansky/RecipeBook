import * as React from "react";
import "../App.css";

type Props = {
  isShown: boolean,
  onClose: () => void,
  children: React.ReactNode,
  width: string,
  height: string,
};

// Pico styles <dialog> as a themed overlay and <article> inside it as the card.
function Modal({
  isShown,
  onClose,
  children,
  height,
  width,
}: Props): JSX.Element | null {
  if (!isShown) {
    return null;
  }
  return (
    <dialog
      open
      onClick={(event) => {
        // clicks on the overlay close the modal, clicks inside the card don't
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <article className="Modal" style={{ maxWidth: width, height }}>
        <button className="close" aria-label="Close" onClick={onClose} />
        <div className="ModalBody">{children}</div>
      </article>
    </dialog>
  );
}

Modal.defaultProps = {
  width: "80vw",
  height: "80vh",
};

export default Modal;
