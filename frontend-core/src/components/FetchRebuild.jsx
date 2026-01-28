import React, { useEffect, useState } from "react";

const FetchRebuild = () => {
  const [product, setProduct] = useState([]);
  const [category, setCategory] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    setLoading(true);
    const url =
      category === "all"
        ? "https://dummyjson.com/products"
        : `https://dummyjson.com/products/category/${category}`;

    fetch(url, { signal })
      .then((res) => {
        if (!res.ok) throw new Error("failed to fetch");

        return res.json();
      })
      .then((data) => {
        setProduct(data.products);
        setLoading(false);
      })
      .catch((err) => {
        if (err.name === "AbortError") return;
        setError(err.message);
        setLoading(false);
      });

    return () => {
      controller.abort();
    };
  }, [category]);

  if (loading) return <p>loading</p>;
  if (error) return <p>Error</p>;

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
      {product.map((item) => (
        <div key={item.id}>
          <h2>{item.title}</h2>
          <p>{item.price}</p>
        </div>
      ))}
    </div>
  );
};

export default FetchRebuild;
