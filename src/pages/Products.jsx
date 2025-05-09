import React, { useState, useEffect } from 'react';
import { db } from '../data/database.js';
import { collection, getDocs } from 'firebase/firestore';

const Products = () => {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


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
    <div>
      <h1>Our Products</h1>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            {product.imageUrl && (
              <img src={product.imageUrl} alt={product.name} style={{ width: '80px', height: 'auto' }} />
            )}
            <h2>{product.name}</h2> 
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Products;
