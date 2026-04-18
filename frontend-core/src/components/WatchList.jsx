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
  const [scrollTop, setScrollTop] = useState(0);

  // FETCH
  useEffect(() => {
    fetch("https://dummyjson.com/products?limit=100")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
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

  // DEBOUNCE
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchInput);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchInput]);

  // TOGGLE
  const handleToggle = useCallback((id) => {
    setOpenCardId((prev) => (prev === id ? null : id));
  }, []);

  // FILTER
  const filteredProducts = useMemo(() => {
    return products.filter((p) =>
      p.title.toLowerCase().includes(debouncedSearch.toLowerCase())
    );
  }, [products, debouncedSearch]);

  // SCROLL
  const handleScroll = (e) => {
    setScrollTop(e.target.scrollTop);
  };

  // VIRTUALIZATION CORE
  const itemHeight = 250;
  const containerHeight = 500;
  const buffer = 3;

  const startIndex = Math.floor(scrollTop / itemHeight);
  const visibleCount =
    Math.ceil(containerHeight / itemHeight) + buffer;
  const endIndex = startIndex + visibleCount;

  const visibleItems = filteredProducts.slice(startIndex, endIndex);
  const totalItems = filteredProducts.length;

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
            <p>Error: {error}</p>
          </div>
        )}

        {!loading &&
          !error &&
          filteredProducts.length === 0 && (
            <div className="state">
              <p>Item not found</p>
            </div>
          )}

        {!loading &&
          !error &&
          filteredProducts.length > 0 && (
            <div
              className="listContainer"
              onScroll={handleScroll}
            >
              <div
                style={{
                  height: totalItems * itemHeight,
                  position: "relative",
                }}
              >
                {visibleItems.map((item, index) => {
                  const actualIndex = startIndex + index;

                  return (
                    <div
                      key={item.id}
                      style={{
                        position: "absolute",
                        top: actualIndex * itemHeight,
                        left: 0,
                        right: 0,
                      }}
                    >
                      <Card
                        id={item.id}
                        title={item.title}
                        price={item.price}
                        stock={item.stock}
                        image={item.thumbnail}
                        isOpen={openCardId === item.id}
                        handleToggle={handleToggle}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          )}
      </main>
    </div>
    
  );
};

export default WatchList;