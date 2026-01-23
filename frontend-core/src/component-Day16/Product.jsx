import React, { useEffect, useState } from "react";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("all");
  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setProducts(data.products);
      });
  }, []);
  const FilteredProducts =
    category === "all"
      ? products
      : products.filter((e) => e.category === category);
  return (
    <div>
      <select
        value={category}
        onChange={(e) => {
          setCategory(e.target.value);
        }}
      >
        <option value="all">All</option>
        <option value="fragrance">Fragrance</option>
        <option value="beauty">Beauty</option>
      </select>
      {FilteredProducts.map((product) => (
        <div key={product.id}>
          <h1>{product.title}</h1>
          <p>{product.price}</p>
        </div>
      ))}
    </div>
  );
};

export default Product;
