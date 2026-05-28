import { useState, useEffect } from 'react';
import { db } from '../data/database.js';
import { collection, query, where, limit, getDocs } from 'firebase/firestore';
import '../styles/HomePageBestseller.css';
import { useCartStore } from "../store/cartStore.js";
import ProductModal from './ProductModal.jsx';
import useReveal from '../hooks/useReveal.js';

const HomePageBestsellers = () => {
  const [bestsellers, setBestsellers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [justAdded, setJustAdded] = useState(new Set());
  const addToCart = useCartStore((state) => state.addToCart);

  const [sectionRef, sectionVisible] = useReveal();

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

  const handleAddToCart = (product, e) => {
    e.stopPropagation();
    addToCart(product);
    setJustAdded((prev) => new Set(prev).add(product.id));
    setTimeout(() => {
      setJustAdded((prev) => {
        const next = new Set(prev);
        next.delete(product.id);
        return next;
      });
    }, 1500);
  };

  if (loading) return null;
  if (error) return null;
  if (bestsellers.length === 0) return null;

  return (
    <section
      ref={sectionRef}
      className={`bestsellers-section sr ${sectionVisible ? 'sr--in' : ''}`}
    >
      <h2>Bästsäljare</h2>
      <ul>
        {bestsellers.map((product, i) => (
          <li
            key={product.id}
            className={`product-item sr ${sectionVisible ? 'sr--in' : ''}`}
            style={{ transitionDelay: `${i * 100}ms` }}
            onClick={() => setSelectedProduct(product)}
          >
            {product.imageUrl && (
              <img src={product.imageUrl} alt={product.name} className='product-image' />
            )}
            <div className="product-info">
              <h3>{product.name}</h3>
              <p className="product-price">{product.price} SEK</p>
              <button
                className={`blue-btn ${justAdded.has(product.id) ? 'btn-added' : ''}`}
                onClick={(e) => handleAddToCart(product, e)}
              >
                {justAdded.has(product.id) ? '✓ Tillagd!' : 'Lägg i varukorg'}
              </button>
            </div>
          </li>
        ))}
      </ul>

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </section>
  );
};

export default HomePageBestsellers;
