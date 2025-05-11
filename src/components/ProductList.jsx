// ProductList.jsx
import React, { useEffect, useState } from "react";
import { fetchProducts, deleteProduct } from "../data/crud.js";

const ProductList = ({ onSelectProduct }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const productsList = await fetchProducts();
        setProducts(productsList);
        setError(null);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load products.");
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  if (loading) return <div>Loading products...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="product-list-wrapper">
      <h4>Välj en produkt att redigera:</h4>
      <ul>
        {products.map((product) => (
          <li key={product.id} className="product-item">
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>Pris: {product.price} SEK</p>
            <button className="blue-btn" onClick={() => onSelectProduct(product)}>
              Redigera
            </button>
            <button className="blue-btn" onClick={() => deleteProduct(product.id, setProducts)}>
              Ta bort
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
