import React, { useState, useEffect } from 'react';

function App() {
  const [products, setProducts] = useState([]);
  const [sortType, setSortType] = useState('price');

  useEffect(() => {
    fetchProducts();
  }, [sortType]);

  const fetchProducts = async () => {
    try {
      const response = await fetch(`http://localhost/strategy-pattern/api/strategy.php?sortType=${sortType}`);
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  return (
    <div className="App">
      <h1>Product List</h1>
      <label htmlFor="sort">Sort By:</label>
      <select id="sort" value={sortType} onChange={(e) => setSortType(e.target.value)}>
        <option value="price">Price</option>
        <option value="rating">Rating</option>
        <option value="date">Date Added</option>
      </select>

      <ul>
        {products.map((product, index) => (
          <li key={index}>
            <strong>{product.name}</strong> - ${product.price} - {product.rating} Stars - Added on {product.date_added}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
