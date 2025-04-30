import React from "react";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import Style from "./Modal.module.css";
import { useTheme } from "@emotion/react";
const Modal = ({ children, showModal, closeModal, setItemToUpdate }) => {
  const theme = useTheme();
  if (!showModal) return null;

  return (
    <>
      <div className={Style.backDrop} onClick={closeModal}></div>
      <div
        className={Style.overlay}
        style={{
          backgroundColor: theme.palette.mode === "dark" && "black",
          border: "5px solid white",
        }}
      >
        {children}
      </div>
    </>
  );
};

export default Modal;
const modal = ReactDOM.createRoot(document.getElementById("modal"));
modal.render(
  <StrictMode>
    <Modal />
  </StrictMode>
);
