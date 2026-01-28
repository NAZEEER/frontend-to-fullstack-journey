import React, { useEffect, useState } from "react";

const WatchList = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://dummyjson.com/products/category/mens-watches")
      .then((res) => res.json())

      .then((data) => {
        setProducts(data.products);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const filteredProducts = products.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase()),
  );

  
  if (loading) return <p>Loading...</p>;
  if (error) return <p> Error :{error} </p>;
  if (filteredProducts.length === 0) return <p>The Item Is Not Found</p>;

  return (
    <div>
      <div className="controls">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search watches"
        />
      </div>

      <div className="product">
        {filteredProducts.map((item) => (
          <div className="card" key={item.id}>
            <img src={item.thumbnail} alt={item.title} />
            <h4>{item.title}</h4>
            <p>₹ {item.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
export default WatchList;
