import { NavLink } from "react-router";
import '../styles/Header.css';
import cartImage from '../assets/cart.png';

const Header = () => {
  return (
    <header className="header-wrapper">
        <div className="logo-container">
          <NavLink to="/" className="logo">
            LekSol
          </NavLink>
        </div>
        <nav className="nav-wrapper">
            <ul className="nav-list">
                <li className="nav-item">
                    <NavLink to="/pages/products/:productId?" className="nav-link">Produkter</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/" className="nav-link">Om oss</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/" className="nav-link">Kontakta oss</NavLink>
                </li>
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
        </div>
    </header>
    )
}

export default Header;