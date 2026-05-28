import { useState, useEffect } from "react";
import { useCartStore } from "../store/cartStore.js";
import "../styles/Cart.css";
import "../styles/ProductModal.css";

const TrashIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="15" viewBox="0 0 14 15" fill="none">
        <path d="M1 3.5H13M5 3.5V2.5C5 2.22386 5.22386 2 5.5 2H8.5C8.77614 2 9 2.22386 9 2.5V3.5M2 3.5L2.9 12.5C2.95523 13.0523 3.42 13.5 4 13.5H10C10.58 13.5 11.0448 13.0523 11.1 12.5L12 3.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const Cart = () => {
    const cart = useCartStore((state) => state.cartItems);
    const addToCart = useCartStore((state) => state.addToCart);
    const removeFromCart = useCartStore((state) => state.removeFromCart);
    const clearCart = useCartStore((state) => state.clearCart);
    const getTotalPrice = useCartStore((state) => state.getTotalPrice);
    const getTotalItems = useCartStore((state) => state.getTotalItems);
    const [showConfirmation, setShowConfirmation] = useState(false);

    const increaseQuantity = (item) => {
        addToCart({ ...item });
    };

    const calculateMoms = getTotalPrice() * 0.25;
    const delivery = getTotalPrice() > 300 ? 0 : 49;
    const totalWithDelivery = getTotalPrice() + delivery;

    const handleCheckout = () => {
        setShowConfirmation(true);
        document.body.style.overflow = "hidden";
    };

    const handleCloseConfirmation = () => {
        setShowConfirmation(false);
        document.body.style.overflow = "";
        clearCart();
    };

    useEffect(() => {
        return () => { document.body.style.overflow = ""; };
    }, []);

    return (
        <div className="cart-wrapper">
            <h1>Din varukorg</h1>
            {cart.length === 0 ? (
                <p>Din varukorg är tom.</p>
            ) : (
                <ul className="cart-list">
                    {cart.map((item) => (
                        <li key={item.id} className="cart-item">
                            <img src={item.imageUrl} alt={item.name} />
                            <div className="quantity-btn">
                                {(item.quantity || 1) > 1 ? (
                                    <button
                                        className="qty-minus"
                                        onClick={() => removeFromCart(item)}
                                        title="Minska antal"
                                    >
                                        −
                                    </button>
                                ) : (
                                    <button
                                        className="qty-remove"
                                        onClick={() => removeFromCart(item)}
                                        title="Ta bort produkt"
                                    >
                                        <TrashIcon />
                                    </button>
                                )}
                                <p>{item.quantity || 1}</p>
                                <button
                                    className="qty-plus"
                                    onClick={() => increaseQuantity(item)}
                                    title="Öka antal"
                                >
                                    +
                                </button>
                            </div>
                            <div className="product-details">
                                <h2>{item.name}</h2>
                                <p>{item.price} SEK / st</p>
                                <p>Totalt: {(item.quantity || 1) * item.price} SEK</p>
                            </div>
                        </li>
                    ))}

                    <div className="checkout">
                        <h2>Totalt att betala: {getTotalPrice()} SEK</h2>
                        <p>Varav moms (25%): {calculateMoms.toFixed(2)} SEK</p>
                        <div className="checkout-details">
                            <div className="subtotal">
                                <p>Frakt (fri över 300 kr)</p>
                                <p>{delivery} SEK</p>
                            </div>
                            <div className="subtotal">
                                <p>Totalsumma</p>
                                <p>{totalWithDelivery} SEK</p>
                            </div>
                        </div>
                        <div className="checkout-btn">
                            <button className="blue-btn" onClick={handleCheckout}>
                                Betala
                            </button>
                        </div>
                    </div>
                </ul>
            )}

            {showConfirmation && (
                <div className="modal-overlay" onClick={handleCloseConfirmation}>
                    <div className="confirmation-card" onClick={(e) => e.stopPropagation()}>
                        <div className="confirmation-icon">✓</div>
                        <h2>Tack för din beställning!</h2>
                        <p>Din order har mottagits och behandlas inom kort.</p>
                        <div className="confirmation-summary">
                            <div>
                                <span>Antal produkter</span>
                                <span>{getTotalItems()}</span>
                            </div>
                            <div>
                                <span>Frakt</span>
                                <span>{delivery} SEK</span>
                            </div>
                            <div>
                                <span>Totalt</span>
                                <span>{totalWithDelivery} SEK</span>
                            </div>
                        </div>
                        <button className="blue-btn" onClick={handleCloseConfirmation}>
                            Fortsätt handla
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;
