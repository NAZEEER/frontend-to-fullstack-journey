import React, { useEffect,useState } from "react";

const useFetchProducts = (category) => {
  const [product, setProduct] = useState([]);
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

  return( { product, loading, error })
};

export default useFetchProducts;
