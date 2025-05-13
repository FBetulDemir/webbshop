import React, { useEffect, useState } from "react";
import { fetchProducts, deleteProduct } from "../data/crud.js";
import '../styles/ProductList.css';

const ProductList = ({ setSelectedProduct, setVisible, visible, reload}) => {
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
  }, [reload]);

  const handleEditclick = (product) => {
    setSelectedProduct(product);
    setVisible("none");

  };

  if (loading) return <div>Loading products...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="product-list-wrapper" style={{ display: visible }}>
      <h4>Välj en produkt att redigera</h4>
      <ul>
        {products.map((product) => (
          <li key={product.id} className="product-item-list">
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>Pris: {product.price} SEK</p>
            <div className="edit-delete-btn">
              <button className="edit-btn" onClick={() => handleEditclick(product)}>
                Redigera
              </button>
              <button className="edit-btn" onClick={() => deleteProduct(product.id, setProducts)}>
                Ta bort
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
