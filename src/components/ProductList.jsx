import React, { useEffect, useState } from "react";
import { fetchProducts, editProduct, deleteProduct } from "../data/crud.js";
import { useNavigate } from "react-router";
import EditProduct from "./EditProduct.jsx";

const ProductList = ({updatedProduct}) => {
  const [products, setProducts] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const loadProducts = async () => {
      try {
        const productsList = await fetchProducts(setProducts);
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

  if (loading) {
    return <div>Loading products...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="product-list-wrapper">
      <h2>Valj en product att redigera:</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id} className="product-item">
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>Price: {product.price} SEK</p>
            <button
              className="blue-btn"
              onClick={() => editProduct(product.id, updatedProduct)}
            >
              Redigera
            </button>
            <button
              className="blue-btn"
              onClick={() => deleteProduct(product.id)}
            >
              Ta bort
            </button>
          </li>
        ))}
      </ul>
      {/* <EditProduct products={products} productId={products.id} productName={products.name} /> */}
    </div>
  );
};

export default ProductList;