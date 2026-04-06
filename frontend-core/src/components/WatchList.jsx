import React, { useCallback, useEffect, useMemo, useState } from "react";
import Card from "./Card";
import SkeletonCards from "./SkeletonCards";

const WatchList = () => {
  const [products, setProducts] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openCardId, setOpenCardId] = useState(null);
  const [visibleCount, setVisibleCount] = useState(4);

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
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchInput);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchInput]);

  useEffect(() => {
    setVisibleCount(4);
  }, [debouncedSearch]);

  const handleToggle = useCallback((id) => {
    setOpenCardId((prev) => (prev === id ? null : id));
  }, []);
  const increase = () => {
    setVisibleCount((prev) => prev + 4);
  };

  const filteredProducts = useMemo(() => {
    products.filter((product) => {
      const title = product.title.toLowerCase();
      const query = debouncedSearch.toLowerCase();
      return title.includes(query);
    });
  }, [products, debouncedSearch]);

  const visibleProducts = useCallback(() => {
    filteredProducts.slice(0, visibleCount);
  }, [filteredProducts, visibleCount]);

  return (
    <div className="page">
      <div className="controls">
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
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
              {visibleProducts.map((item) => (
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
            {visibleCount < filteredProducts.length && (
              <div>
                <button onClick={increase}>Load More</button>
              </div>
            )}
            {filteredProducts.length > 0 &&
              visibleCount >= filteredProducts.length && (
                <div>
                  <p>-That's all for now-</p>
                </div>
              )}
          </>
        )}
      </main>
    </div>
  );
};
export default WatchList;
