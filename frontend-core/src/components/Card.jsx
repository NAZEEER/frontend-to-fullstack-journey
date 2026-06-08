import { useEffect, useRef } from "react";

const Card = ({ id, title, price, stock, image, isOpen, handleToggle,handleMeasure }) => {

const cardRef= useRef(null)

useEffect ( ()=>{
  const height = cardRef.current.clientHeight

  handleMeasure(id,height)
  
},[])

  return (
    <div
    ref={cardRef}
     className={`card ${isOpen ? "isOpen" : ""}`}>
      
      {/* IMAGE */}
      <div className="cardImage">
        <img src={image} alt={title} />
      </div>

      {/* BODY */}
      <div className="cardBody">
        <h4>{title}</h4>
        <p>₹ {price}</p>

        {isOpen && <p className="stock">Stock: {stock}</p>}
      </div>

      {/* FOOTER */}
      <div className="cardFooter">
        <button onClick={() => handleToggle(id)}>
          {isOpen ? "Hide info" : "More info"}
        </button>
      </div>

    </div>
  );
};

export default Card