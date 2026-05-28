import { useState, useEffect } from "react";
import { useCartStore } from "../store/cartStore";
import "../styles/ProductModal.css";

const ProductModal = ({ product, onClose }) => {
    const [quantity, setQuantity] = useState(1);
    const addToCartWithQuantity = useCartStore((state) => state.addToCartWithQuantity);
    const toggleFavorite = useCartStore((state) => state.toggleFavorite);
    const favorites = useCartStore((state) => state.favorites);
    const isFavorite = favorites.includes(product.id);

    useEffect(() => {
        // Lock scroll while preserving scroll position
        const scrollY = window.scrollY;
        document.body.style.position = "fixed";
        document.body.style.top = `-${scrollY}px`;
        document.body.style.width = "100%";
        document.body.style.overflow = "hidden";

        const handleKeyDown = (e) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", handleKeyDown);

        return () => {
            document.body.style.position = "";
            document.body.style.top = "";
            document.body.style.width = "";
            document.body.style.overflow = "";
            window.scrollTo(0, scrollY);
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [onClose]);

    const handleAdd = () => {
        addToCartWithQuantity(product, quantity);
        onClose();
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-card" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close-btn" onClick={onClose} aria-label="Stäng">
                    ×
                </button>

                {product.imageUrl && (
                    <img src={product.imageUrl} alt={product.name} className="modal-image" />
                )}

                <div className="modal-body">
                    <h2 className="modal-title">{product.name}</h2>
                    <p className="modal-desc">{product.description}</p>
                    <p className="modal-price">{product.price} SEK</p>

                    <div className="modal-actions-row">
                        <div className="modal-quantity">
                            <button
                                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                                disabled={quantity === 1}
                            >
                                −
                            </button>
                            <span>{quantity}</span>
                            <button onClick={() => setQuantity((q) => q + 1)}>+</button>
                        </div>

                        <button
                            className={`favorite-btn ${isFavorite ? "active" : ""}`}
                            onClick={() => toggleFavorite(product.id)}
                            aria-label={isFavorite ? "Ta bort från favoriter" : "Lägg till i favoriter"}
                            title={isFavorite ? "Ta bort från favoriter" : "Lägg till i favoriter"}
                        >
                            {isFavorite ? "♥" : "♡"}
                        </button>
                    </div>

                    <button className="blue-btn modal-add-btn" onClick={handleAdd}>
                        Lägg i varukorg
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductModal;
