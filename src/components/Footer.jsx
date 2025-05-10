import { NavLink } from "react-router";

const Footer = () => {
    return (
        <footer>
            <div className="footer-content">
                <div className="footer-left">
                    <NavLink to="/" className="logo">
                        LekSol
                    </NavLink>
                </div>
                <div className="footer-middle">
                    <h4>Kundtjänst</h4>
                    <p>E-post: support@leksol.se</p>
                    <p>Öppettider: Måndag–Fredag, 09.00–17.00</p>

                </div>
                <div className="footer-right">
                    <h4>Snabblänkar</h4>
                    <ul>
                        <li><NavLink to="/">Hem</NavLink></li>
                        <li><NavLink to="/pages/products/:productId?">Produkter</NavLink></li>
                        <li><NavLink to="/">Om oss</NavLink></li>
                        <li><NavLink to="/components/adminStartPage/">Admin Login</NavLink></li>
                    </ul>
                </div>
            </div>
        </footer>
    )
}

export default Footer;