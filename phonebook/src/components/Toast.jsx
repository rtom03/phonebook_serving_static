import React from "react";

const Toast = ({ message }) => {
  if (!message) {
    return null;
  }
  return (
    <div
      style={{
        backgroundColor: "white",
        padding: 20,
        border: 2,
      }}
    >
      <p style={{ color: "black" }}>{message}</p>
      {message}
    </div>
  );
};

export default Toast;
