import React from "react";

const Card = ({ id, title, price, stock, image, isOpen, handleToggle }) => {
  return (
    <div className={`card ${isOpen ? "isOpen" : ""}`}>
      <img src={image} alt={title} />
      <h4>{title}</h4>
      <p>₹ {price}</p>

      <button onClick={() => handleToggle(id)}>
        {isOpen ? "Hide info" : "More info"}
      </button>

      {isOpen && <p>Stock: {stock}</p>}
    </div>
  );
};

export default Card;
