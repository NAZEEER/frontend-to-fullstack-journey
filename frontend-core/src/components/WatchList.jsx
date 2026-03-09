import React, { useEffect, useState } from "react";
import Card from "./Card";
import SkeletonCards from "./SkeletonCards";

const WatchList = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openCardId, setOpenCardId] = useState(null);

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
  const handleToggle = (id) => {
    setOpenCardId((prev) => (prev === id ? null : id));
  };

  const filteredProducts = products.filter((product) => {
    const title = product.title.toLowerCase();
    const query = search.toLowerCase();
    return title.includes(query);
  });

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
        {loading && <SkeletonCards />}
        {!loading && error && (
          <div className="state">
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
                <Card
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  price={item.price}
                  stock={item.stock}
                  image={item.thumbnail}
                  isOpen={openCardId === item.id}
                  handleToggle={handleToggle}
                  
                />
              ))}
            </div>
            <p>-That's all for now-</p>
          </>
        )}
      </main>
    </div>
  );
};
export default WatchList;
