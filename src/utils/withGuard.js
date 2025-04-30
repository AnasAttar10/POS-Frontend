import React, { useState } from "react";
import { useDispatch } from "react-redux";

const withGuard = (Component) => {
  return (props) => {
    const [isUpdateForm, setIsUpdateForm] = useState(false);
    const [updatedItemId, setUpdatedItemId] = useState("");
    const [showModal, setShowModal] = useState(false);
    const dispatch = useDispatch();
    const closeModal = () => {
      setShowModal(false);
    };
    return (
      <Component
        isUpdateForm={isUpdateForm}
        setIsUpdateForm={setIsUpdateForm}
        updatedItemId={updatedItemId}
        setUpdatedItemId={setUpdatedItemId}
        showModal={showModal}
        setShowModal={setShowModal}
        dispatch={dispatch}
        closeModal={closeModal}
      />
    );
  };
};

export default withGuard;
