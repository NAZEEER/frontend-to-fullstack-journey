import React, { useState } from "react";

const ToggleMessage = () => {
  let [show, setShow] = useState(true);


  return (
    <div>
        <button onClick={()=>setShow(!show)}>
            {show ? "Hide":"show"}
          
            
        </button>
        {show && <p>the goal will be completed soon</p>}
        {!show && <p>the message was hidden</p>}
        
       
    </div>
  );
};

export default ToggleMessage;
