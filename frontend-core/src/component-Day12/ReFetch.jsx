import React, { useEffect, useState } from "react";

const ReFetch = () => {
  const [product, setProduct] = useState([]);
  const [category, setCategory] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const url =
      category === "all"
        ? "https://dummyjson.com/products"
        : `https://dummyjson.com/products/category/${category}`;
    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error("failed to fetch");
        return res.json();
      })
      .then((data) => {
        setProduct(data.products);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [category]);

  if (loading) return <p>loading</p>;
  if (error) return <p>Error:{error}</p>;
  return (
    <div>
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="all">All</option>
        <option value="beauty">Beauty</option>
        <option value="fragrances">Fragrance</option>
      </select>
      {product.map((item) => (
        <div key={item.id}>
          <h3>{item.title}</h3>
          <p>{item.price}</p>
        </div>
      ))}
    </div>
  );
};

export default ReFetch;
