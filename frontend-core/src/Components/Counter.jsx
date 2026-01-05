import React, { useState } from 'react'

const Counter = () => {
   
  let[count,setCount]=useState(0)

  let increase=()=>{
    setCount(count+1)
  }
  let decrease=()=>{
    setCount(count-1)
  }

  return (
    <div>
    <h1>Count:{count}</h1>
    <button onClick={increase}>Increase</button>
    <button onClick={decrease}>decrease</button>

    </div>
  )
}

export default Counter

