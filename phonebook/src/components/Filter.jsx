import React from "react";

const Filter = ({ filterData }) => {
  return (
    <div>
      {filterData.map((data) => (
        <li key={data.name}>
          {data.name} {data.number}
        </li>
      ))}
    </div>
  );
};

export default Filter;
