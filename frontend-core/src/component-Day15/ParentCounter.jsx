import React, { useState } from "react";
import ChildCounter from "./ChildCounter";

const ParentCounter = () => {
  const [count, setCount] = useState(0);
  const increament = () => {
    setCount((preCount) => preCount + 1);
  };
  const decrement = () => {
    setCount((preCount) => preCount - 1);
  };

  return (
    <div>
      <h1>Counter App {count}</h1>
      <ChildCounter increament={increament} decrement={decrement}/>
    </div>
  );
};

export default ParentCounter;
