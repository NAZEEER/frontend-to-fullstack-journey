import React from 'react'

const ChildA = ({value,onIncrease}) => {
  return (
    <div>
        <button onClick={onIncrease}>ChildA for increase</button>
    </div>
  )
}

export default ChildA