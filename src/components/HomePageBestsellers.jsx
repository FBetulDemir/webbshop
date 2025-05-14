import React, { useState, useEffect } from 'react';
import { db } from '../data/database.js';
import { collection, query, where, limit, getDocs } from 'firebase/firestore';
import '../styles/HomePageBestseller.css';
import { useCartStore } from "../store/cartStore.js";

const HomePageBestsellers = () => {
 
  const [bestsellers, setBestsellers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const addToCart = useCartStore((state) => state.addToCart);

  useEffect(() => {
    const fetchBestsellers = async () => {
      try {
        setLoading(true);

        const productsCollectionRef = collection(db, 'products');

        const bestsellersQuery = query(
          productsCollectionRef,
          where('isBestseller', '==', true), 
          limit(3) 
        );

        const querySnapshot = await getDocs(bestsellersQuery);

        const bestsellerList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        setBestsellers(bestsellerList);
        setError(null);

      } catch (err) {
        console.error("Error fetching bestsellers: ", err);
        setError("Failed to load bestsellers.");
      } finally {
        setLoading(false);
      }
    };

    fetchBestsellers(); 

  }, []);


  if (loading) {
    return <div>Loading bestsellers...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (bestsellers.length === 0) {
    return <div>No bestsellers available at the moment.</div>;
  }


  return (
    <section className='bestsellers-section'>
      <h2>Bestsellers</h2>
      <ul>
        {bestsellers.map(product => (
          <li key={product.id} className='product-item'>
            {product.imageUrl && (
              <img src={product.imageUrl} alt={product.name} className='product-image'/>
            )}
            <h3>{product.name}</h3>
            <p>Price: {product.price} SEK</p>
            <button onClick={() => addToCart(product)} className='blue-btn'>Lägg till i varukorg</button>

          </li>
        ))}
      </ul>
    </section>
  );
};

export default HomePageBestsellers;
