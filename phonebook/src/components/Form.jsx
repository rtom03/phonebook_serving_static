import React from "react";

const Form = ({
  value,
  handleChange,
  handleSubmit,
  numValue,
  handleNumChange,
}) => {
  return (
    <div>
      <form onSubmit={handleSubmit}>
        name
        <input type="text" value={value} onChange={handleChange} />
        <br />
        number:
        <input type="text" value={numValue} onChange={handleNumChange} />
        <button>Add</button>
      </form>
    </div>
  );
};

export default Form;
