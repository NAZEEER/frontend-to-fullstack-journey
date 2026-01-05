import React from "react";
import Header from "./Components/Header";
import Card from "./Components/Card";
import Button from "./Components/Button";
import Counter from "./Components/Counter";
import InputForm from "./Components/Input";

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
    </div>
  );
}

export default App;
