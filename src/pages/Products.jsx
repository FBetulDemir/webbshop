import React, { useState, useEffect } from 'react';
import { db } from '../data/database.js';

// Import necessary Firestore functions
import { collection, getDocs } from 'firebase/firestore';

const Products = () => {
  // 1. State to hold the products data
  const [products, setProducts] = useState([]);
  // 2. State to handle loading status
  const [loading, setLoading] = useState(true);
  // 3. State to handle potential errors
  const [error, setError] = useState(null);

  // 4. useEffect hook to fetch data when the component mounts
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Set loading to true before fetching
        setLoading(true);

        // Get a reference to the 'products' collection (replace 'products' with your actual collection name)
        const productsCollectionRef = collection(db, 'products'); // <-- IMPORTANT: Use your collection name!

        // Fetch the documents from the collection
        const querySnapshot = await getDocs(productsCollectionRef);

        // Process the data from the snapshot
        const productsList = querySnapshot.docs.map(doc => ({
          id: doc.id, // Get the document ID
          ...doc.data() // Get the document data
        }));

        // Update the state with the fetched products
        setProducts(productsList);
        setError(null); // Clear any previous errors

      } catch (err) {
        // Handle any errors during fetching
        console.error("Error fetching products: ", err);
        setError("Failed to load products."); // Set an error message
      } finally {
        // Set loading to false after fetching is complete (whether success or error)
        setLoading(false);
      }
    };

    fetchProducts(); // Call the async function

  }, []); // The empty dependency array [] means this effect runs only once when the component mounts

  // 5. Render logic based on state
  if (loading) {
    return <div>Loading products...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (products.length === 0) {
    return <div>No products available.</div>;
  }

  // If data is loaded and no error, display the products
  return (
    <div>
      <h1>Our Products</h1>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            {/* Display product details */}
            <h2>{product.name}</h2> {/* Assuming your documents have a 'name' field */}
            <p>{product.description}</p> {/* Assuming your documents have a 'description' field */}
            <p>Price: ${product.price}</p> {/* Assuming your documents have a 'price' field */}
            {/* Add more fields as needed */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Products;
