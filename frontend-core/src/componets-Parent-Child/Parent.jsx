import React, { useState } from 'react'
import Child from './Child'

const Parent = () => {
    const [value,setValue]=useState(0)

    const increase=()=>{setValue(props=>props+1)}
    
  return (
    <div>
      <h1>Parent Value:{value}</h1>
      <Child value={value} onIncreas={increase}/>

    </div>
  )
}

export default Parent