import React from 'react'
import Header from './Components/Header'
import Card from './Components/Card'
import Button from './Components/Button'

function App() {
  return (
    <div>
      <Header name="Nazeer" />

      <Card
        title="Frontend Journey"
        description="Learning React the right way"
      />

      <Button text="Click Me" />
    </div>
  )
}

export default App
