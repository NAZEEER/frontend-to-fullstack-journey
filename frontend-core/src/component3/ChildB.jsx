import React from 'react'

const ChildB = ({value,onDecrease}) => {
  return (
    <div>
        <button onClick={onDecrease}>ChildB for decrease</button>
    </div>
  )
}

export default ChildB