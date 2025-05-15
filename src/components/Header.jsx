import { NavLink } from "react-router";
import '../styles/Header.css';
import cartImage from '../assets/cart.png';
import { useCartStore } from "../store/cartStore.js";
import logo from "../assets/logo.png";

const Header = () => {
    const cart = useCartStore((state) => state.cartItems);
    // const totalItems = cart.length;
    const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);


  return (
    <header className="header-wrapper">
        <div className="logo-container">
          <NavLink to="/" className="logo">
            <img src={logo} alt="" style={{}} />
          </NavLink>
        </div>
        <nav className="nav-wrapper">
            <ul className="nav-list">
                <li className="nav-item">
                    <NavLink to="/pages/products/:productId?" className="nav-link">Produkter</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/pages/about/" className="nav-link">Om oss</NavLink>
                </li>
                {/* <li className="nav-item">
                    <NavLink to="/" className="nav-link">Kontakta oss</NavLink>
                </li> */}
            </ul>
            {/* <ul className="shopping-cart">
                <li className="cart-icon-wrapper">
                    <NavLink to="components/cart/:cartId?" className="navlink cart-icon">
                            <img src={cartImage} alt="Shopping cart icon" />
                    </NavLink>
                </li>
            </ul> */}
        </nav>
        <div className="shopping-cart">
            <NavLink to="/components/cart/:cartId?" className="navlink cart-icon">
                <img src={cartImage} alt="Shopping cart icon" />
            </NavLink>
            <span className="cart-count">{totalItems}</span>
        </div>
    </header>
    )
}

export default Header;