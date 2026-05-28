import React, { useState, useEffect } from 'react';
import '../styles/Products.css';
import SearchBox from '../components/SearchBox.jsx';
import { fetchProducts } from '../data/crud.js';
import { useCartStore } from "../store/cartStore.js";
import SortingProducts from '../components/SortingProducts.jsx';

const Products = () => {
  const addToCart = useCartStore((state) => state.addToCart);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const productsList = await fetchProducts();
        setProducts(productsList);
        setFiltered(productsList);
        setError(null);
      } catch (err) {
        console.error("Error fetching products: ", err);
        setError("Failed to load products.");
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  if (loading) return (
    <div style={{ padding: "4em", textAlign: "center", color: "#64748B" }}>
      Laddar produkter...
    </div>
  );

  if (error) return (
    <div style={{ padding: "4em", textAlign: "center", color: "#64748B" }}>
      Något gick fel. Försök igen.
    </div>
  );

  if (products.length === 0) return (
    <div style={{ padding: "4em", textAlign: "center", color: "#64748B" }}>
      Inga produkter tillgängliga.
    </div>
  );

  return (
    <div className='products-wrapper'>
      <h1>Sommarleksaker</h1>
      <p>Välkommen till ToyLandia – din sommarbutik online! Här hittar du ett brett utbud av roliga, färgglada leksaker för både små och stora barn.</p>
      <SortingProducts products={filtered} setProducts={setFiltered} />
      <SearchBox products={products} setFiltered={setFiltered} filtered={filtered} />
      <ul className='products-list'>
        {(filtered.length > 0 ? filtered : products).map(product => (
          <li key={product.id} className='product-item'>
            {product.imageUrl && (
              <img src={product.imageUrl} alt={product.name} className="product-image" />
            )}
            <div className="product-info">
              <h2>{product.name}</h2>
              <p className="product-desc">{product.description}</p>
              <p className="product-price">{product.price} SEK</p>
              <button className='blue-btn' onClick={() => addToCart(product)}>Lägg i varukorg</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Products;
