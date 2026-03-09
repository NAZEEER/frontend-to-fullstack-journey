import React from "react";

const SkeletonCards = () => {
  return (
    <div className="skeletonCard">
      {Array(8)
        .fill()
        .map((_, index) => (
          <div className="cards" key={index}>
            <div className="skeleton-img"></div>
            <div className="skeleton-title"></div>
            <div className="skeleton-price"></div>
          </div>
        ))}
    </div>
  );
};

export default SkeletonCards;
