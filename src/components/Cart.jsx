import { useCartStore } from "../store/cartStore.js";
import "../styles/Cart.css";


const Cart = () => {

    const cart = useCartStore((state) => state.cartItems);
    console.log(cart);

    const addToCart = useCartStore((state) => state.addToCart);
    const removeFromCart = useCartStore((state) => state.removeFromCart);
    const increaseQuantity = (item) => {
        addToCart({ ...item, quantity: (item.quantity || 1) + 1 });
    };
    const getTotalPrice = useCartStore((state) => state.getTotalPrice);
    const calculateMoms = getTotalPrice() * 0.25;

    let delivery = 0;
    let totalWithDelivery = 0;

    if (getTotalPrice()>300) {
        delivery = 0;
        totalWithDelivery = getTotalPrice() + delivery;
    } else {
        delivery = 49;
        totalWithDelivery = getTotalPrice() + delivery;
    }

    return(
        <div className="cart-wrapper">
            <h1>Din varukorg</h1>
            {cart.length === 0 ? (
                <p>Din varukorg är tom.</p>
            ) : (
                <ul className="cart-list">
                    {cart.map((item) => (
                        <li key={item.id} className="cart-item" >
                            <img src={item.imageUrl} alt="" style={{width:"90px", height:"auto"}}/>
                            <div className="quantity-btn">
                                <button className="plus" onClick={() => removeFromCart(item)}>-</button>
                                <p>{item.quantity || 1}</p>
                                
                                <button className="minus" onClick={() => increaseQuantity(item)}>+</button>
                            </div>
                            <div className="product-details">
                                <h2>{item.name}</h2>
                                <p>Pris: {item.price} Sek</p>
                                <p>Totalt pris: {(item.quantity)*(item.price)} Sek</p>                                
                            </div>

                        </li>
                    ))}
                    <div className="checkout">
                        <h2>Totalt pris att betala: {getTotalPrice()} Sek</h2>
                        <p>Varav moms: {calculateMoms} Sek</p>
                        
                        <div className="checkout-details">
                            <div className="subtotal">
                                <p>Frakt (fri vid köp över 300kr):</p>
                                <p>{delivery} Sek</p>
                            </div>
                            <div className="subtotal">
                                <p>Totalsumma:</p>
                                <p>{totalWithDelivery} Sek</p>
                            </div>
                        </div>
                        <button className="blue-btn checkout-btn" style={{alignSelf:"center"}}>Betala</button>
                    </div>
                </ul>
                
            )}
        </div>
    )
}

export default Cart;