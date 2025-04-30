import React from "react";

const ErrorMessage = ({ isTouched, errors }) => {
  return (
    <div>
      {isTouched && errors ? (
        <div style={{ margin: "0 5px", color: "red" }}>{errors}</div>
      ) : null}
    </div>
  );
};

export default ErrorMessage;
