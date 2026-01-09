import React, { useEffect, useState } from "react";

const FetchUsers = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((response) => {
        if (!response.ok) {
          throw new Error("failed to fetch");
        }
        return response.json();
      })

      .then((data) => {
        setData(data.products);
        setLoading(false);
      })

      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
      // console.log("FetchUsers mounted");
  }, []);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;


  return (
    <div>
      <h2>Products</h2>
      {data.map((products) => {
        return(
        <div key={products.id}>
          <h3>{products.title}</h3>
          <p>{products.price}</p>
        </div>)
      })}
    </div>
  );
};

export default FetchUsers;
