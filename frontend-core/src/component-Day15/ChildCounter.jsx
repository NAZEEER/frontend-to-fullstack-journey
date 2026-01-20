import React from "react";

const ChildCounter = ({ increament,decrement }) => {


  return (
    <div>
      {/* <h1>value{count} </h1> */}
      <button onClick={increament}>increament</button>
      <button onClick={decrement}>decrement</button>
    </div>
  );
};

export default ChildCounter;
