import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
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
  const [positions, setPositions] = useState([]);
  const heightRef = useRef({});

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
      p.title.toLowerCase().includes(debouncedSearch.toLowerCase()),
    );
  }, [products, debouncedSearch]);

  // SCROLL
  const handleScroll = (e) => {
    setScrollTop(e.target.scrollTop);
  };

  // useEffect(() => {
  //   setPositions([]);

  //   setScrollTop(0);
  // }, [debouncedSearch]);

  // virtualizaion + binary search

  function findStartIndex(scrollTop, positions) {
    let low = 0;
    let high = positions.length - 1;
    while (low <= high) {
      const mid = Math.floor((low + high) / 2);
      const current = positions[mid];
      const next = positions[mid + 1] || Infinity;
      if (current <= scrollTop && next >= scrollTop) return mid;
      if (current > scrollTop) {
        high = mid - 1;
      } else {
        low = mid + 1;
      }
    }
    return 0;
  }
  const startIndex = findStartIndex(scrollTop, positions);

  const containerHeight = window.innerHeight;
  const viewportEnd = scrollTop + containerHeight;
  let endIndex = startIndex;
  while (endIndex < positions.length && positions[endIndex] < viewportEnd) {
    endIndex++;
  }

  const visibleItems =
    positions.length === 0
      ? filteredProducts
      : filteredProducts.slice(startIndex, endIndex);

  function handleMeasure(id, height) {
    heightRef.current[id] = height;
    let total = 0;
    const newpositions = [];
    for (let i = 0; i < filteredProducts.length; i++) {
      const item = filteredProducts[i];
      newpositions.push(total);

      const currentHeight = heightRef.current[item.id] || 0;

      total += currentHeight;
      
    }

    setPositions(newpositions);
  }
  const estimatedHeight = 180;
  const lastIndex = filteredProducts.length - 1;
  const lastItem =
    filteredProducts.length > 0 ? filteredProducts[lastIndex] : { id: 0 };
  const lastHeight = heightRef.current[lastItem.id] || 0;
  const totalHeight =
    positions.length > 0
      ? positions[lastIndex] + lastHeight
      : filteredProducts.length * estimatedHeight;
  // console.log(filteredProducts.length - 1);
  // console.log(
  //   "filtered",
  //   filteredProducts.length,
  //   "position",
  //   positions.length,
  // );
  // console.log({
  //   scrollTop,
  //   startIndex,
  //   endIndex,
  //   visible: visibleItems.length,
  // });

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

        {!loading && !error && filteredProducts.length === 0 && (
          <div className="state">
            <p>Item not found</p>
          </div>
        )}

        {!loading && !error && filteredProducts.length > 0 && (
          <div
            className="listContainer"
            onScroll={handleScroll}
            style={{ height: "100vh", overflow: "auto" }}
          >
            <div style={{ height: totalHeight, position: "relative" }}>
              {visibleItems.map((item, index) => {
                const actualIndex = startIndex + index;
                return (
                  <div
                    key={item.id}
                    style={{
                      position: "absolute",
                      top: positions[actualIndex] || 0,
                      width: "100%",
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
                      handleMeasure={handleMeasure}
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
