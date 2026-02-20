import React, { useEffect, useState } from "react";

const WatchList = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://dummyjson.com/products/category/mens-watches")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch watches");
        }
        return res.json();
      })

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

  return (
    <div className="page">
      <div className="controls">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search watches"
        />
      </div>
      <main className="main">
        {loading && (
          <div>
            <p>Loading...</p>
          </div>
        )}
        {!loading && error && (
          <div>
            <p>Error:{error}</p>
          </div>
        )}
        {!loading && !error && filteredProducts.length === 0 && (
          <div className="state">
            <p>Item not found</p>
          </div>
        )}
        {!loading && !error && filteredProducts.length > 0 && (
          <>
            <div className="product">
              {filteredProducts.map((item) => (
                <div className="card" key={item.id}>
                  <img src={item.thumbnail} alt={item.title} />
                  <h4>{item.title}</h4>
                  <p>₹ {item.price}</p>
                </div>
              ))}
              <p>-That's all for now-</p>
            </div>
          </>
        )}
      </main>
    </div>
  );
};
export default WatchList;
