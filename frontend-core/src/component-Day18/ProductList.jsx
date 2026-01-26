import React, { useEffect, useState } from "react";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("https://dummyjson.com/products/category/mens-watches")
      .then(res => res.json())
      .then(data => setProducts(data.products));
  }, []);

  const filteredProducts = products.filter(p =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="controls">
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search watches"
        />
      </div>

      <div className="product">
        {filteredProducts.map(item => (
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

export default ProductList;
