import React from "react";

const Child = ({value,onIncreas}) => {
  return (
    <div>
      <p>child See:{value}</p>
      <button onClick={onIncreas}>Increase from child</button>
    </div>
  );
};

export default Child;
