import { useCartStore } from "../store/cartStore.js";


const Cart = () => {

    const cart = useCartStore((state) => state.cartItems);
    console.log(cart);

    const addToCart = useCartStore((state) => state.addToCart);
    const removeFromCart = useCartStore((state) => state.removeFromCart);
    const increaseQuantity = (item) => {
        addToCart({ ...item, quantity: (item.quantity || 1) + 1 });
    };
    const getTotalPrice = useCartStore((state) => state.getTotalPrice);


    return(
        <div className="cart-wrapper">
            <h1>Din varukorg</h1>
            <p>Här kan du se dina valda produkter.</p>
            {cart.length === 0 ? (
                <p>Din varukorg är tom.</p>
            ) : (
                <ul className="cart-list">
                    {cart.map((item) => (
                        <li key={item.id} className="cart-item">
                            <h2>{item.name}</h2>
                            <p>Price: {item.price} kr</p>
                            <button onClick={() => increaseQuantity(item)}>+</button>
                            {item.quantity || 1}
                            <button onClick={() => removeFromCart(item)}>-</button>
                            <p>Totalt pris: {getTotalPrice}</p>
                        </li>
                    ))}
                </ul>
            )}
            
        </div>
    )
}

export default Cart;