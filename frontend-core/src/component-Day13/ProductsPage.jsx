import React, { useState } from "react";
import useFetchProducts from "./useFetchProducts";

const ProductsPage = () => {
  const [category, setCategory] = useState("all");
  const { product, loading, error } = useFetchProducts(category);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  return (
    <div>
      <select
        value={category}
        onChange={(e) => {
          setCategory(e.target.value);
        }}
      >
        <option value="all">All</option>
        <option value="beauty">Beauty</option>
        <option value="fragrance">Fragrance</option>
      </select>
      {product.map((e) => (
        <div key={e.id}>
          <h3>{e.title}</h3>
          <p>{e.price}</p>
        </div>
      ))}
    </div>
  );
};

export default ProductsPage;
