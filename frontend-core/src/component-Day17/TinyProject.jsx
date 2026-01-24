import React, { useEffect, useState } from "react";

const TinyProject = () => {
  const [product, setProduct] = useState([]);
  const [category, setCategory] = useState("all");

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setProduct(data.products);
      });
  }, []);

  const FilteredProduct =
    category === "all"
      ? product
      : product.filter((e) => e.category === category);

  return (
    <div>
      <select
        value={category}
        onChange={(e) => {
          setCategory(e.target.value);
        }}
      >
        <option value="all">all</option>
        <option value="beauty">Beauty</option>
        <option value="perfumes">Perfumes</option>
      </select>
      {FilteredProduct.map((products) => (
        <div key={products.id}>
          <p>{products.title}</p>
          <p>{products.price}</p>
        </div>
      ))}
    </div>
  );
};

export default TinyProject;
