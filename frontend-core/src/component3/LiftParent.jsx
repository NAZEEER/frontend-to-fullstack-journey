import React, { useState } from 'react'
import ChildA from './ChildA';
import ChildB from './ChildB';

const LiftParent = () => {
    const[count,setCount]=useState(0)
    const increase=()=>{setCount(preCount=>preCount+1)}
    const decrease=()=>{setCount(preCount=>preCount-1)}
    
  return (
    <div>
        <h1>Parent value:{count}</h1>
        <ChildA value={count} onIncrease={increase}/>
        <ChildB value={count} onDecrease={decrease}/>
    </div>
  )
}

export default LiftParent