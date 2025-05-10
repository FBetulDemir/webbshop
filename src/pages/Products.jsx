import React, { useState, useEffect } from 'react';
import { db } from '../data/database.js';
import { collection, getDocs } from 'firebase/firestore';
import '../styles/Products.css';
import SearchBox from '../components/SearchBox.jsx';

const Products = () => {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filtered, setFiltered] = useState([]);


  useEffect(() => {
    const fetchProducts = async () => {
      try {

        setLoading(true);
        const productsCollectionRef = collection(db, 'products');
        const querySnapshot = await getDocs(productsCollectionRef);
        const productsList = querySnapshot.docs.map(doc => ({
          id: doc.id, 
          ...doc.data() 
        }));
        console.log(productsList)

        setProducts(productsList);
        setFiltered(productsList)
        setError(null);

      } catch (err) {

        console.error("Error fetching products: ", err);
        setError("Failed to load products."); 
      } finally {

        setLoading(false);
      }
    };

    fetchProducts();

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
      <ul>
        {(filtered.length > 0 ? filtered : products).map(product => (
          <li key={product.id} className='product-item'>
            {product.imageUrl && (
              <img src={product.imageUrl} alt={product.name} className="product-image" />
            )}
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>Price: {product.price} SEK</p>
            <button className='blue-btn'>Lägg till</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Products;
