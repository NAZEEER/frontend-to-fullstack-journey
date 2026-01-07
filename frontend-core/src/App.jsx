import React from "react";
import Header from "./Components/Header";
import Card from "./Components/Card";
import Button from "./Components/Button";
import Counter from "./Components/Counter";
import InputForm from "./Components/InputForm";
import ToDoList from "./components2/To-Do-List";
import ToggleMessage from "./components2/ToggleMessage";

function App() {
  return (
    <div>
      <Header name="Nazeer" />

      <Card
        title="Frontend Journey"
        description="Learning React the right way"
      />

      <InputForm />
      <Counter />

      <Button text="Click Me" />
      <ToDoList/>
      <ToggleMessage/>
    </div>
  );
}

export default App;
