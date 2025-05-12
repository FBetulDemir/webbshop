import React, { useState, useEffect } from 'react';
import '../styles/Products.css';
import SearchBox from '../components/SearchBox.jsx';
import { fetchProducts} from '../data/crud.js'
import cartImage from '../assets/cart.png';
import { useCartStore } from "../store/cartStore.js";

const Products = () => {
  const cart = useCartStore((state) => state.cartItems);
  const addToCart = useCartStore((state) => state.addToCart);
  const getTotalItems = useCartStore((state) => state.getTotalItems);



  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filtered, setFiltered] = useState([]);

  console.log(cart);
  console.log(cart[0]);
  console.log(getTotalItems)

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
    }
    loadProducts()
  }, []);


  if (loading) {
    return <div>Loading products...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (products.length === 0) {
    return <div>No products available.</div>;
  }


  return (
    <div className='products-wrapper'>
      <h1>Sommarleksaker</h1>
      <p>Välkommen till LekSol – din sommarbutik online! Här hittar du ett brett utbud av roliga, färgglada leksaker för både små och stora barn. Perfekt för soliga dagar, strandbus och vattenlek!</p>
      <SearchBox 
        products= {products}
        setFiltered={setFiltered}
        filtered={filtered}
      />
      <ul className='products-list'>
        {(filtered.length > 0 ? filtered : products).map(product => (
          <li key={product.id} className='product-item'>
            {product.imageUrl && (
              <img src={product.imageUrl} alt={product.name} className="product-image" />
            )}
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>Price: {product.price} SEK</p>
            <button className='blue-btn' onClick={() => addToCart(product)}>Lägg till <img src={cartImage} alt="cart icon" style={{width:"1.4em"}} /> </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Products;
