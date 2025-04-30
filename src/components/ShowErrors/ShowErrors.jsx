import React from "react";

const ShowErrors = ({ error }) => {
  return (
    <p
      style={{
        p: 1,
        textAlign: "center",
        color: "red",
        border: "1px solid #8888",
        boxShadow: 3,
      }}
    >
      {error}
    </p>
  );
};

export default ShowErrors;
