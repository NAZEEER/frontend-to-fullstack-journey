import React, { useState } from "react";

const ToDoList = () => {
  let [list, setList] = useState([
    { id: 1, text: "Learn React" },
    { id: 2, text: "Build Projects" },
    { id: 3, text: "Become Front End Developer" },
    { id: 4, text: "complete one month goal" },
  ]);
  return (
    <div>
      <ul>
        {list.map((item) => (
          <li key={item.id}>{item.text}</li>
        ))}
      </ul>
    </div>
  );
};

export default ToDoList;
