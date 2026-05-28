import { NavLink } from "react-router";
import "../styles/CTABanner.css";
import useReveal from "../hooks/useReveal.js";

const CTABanner = () => {
    const [ref, visible] = useReveal();

    return (
        <section
            ref={ref}
            className={`cta-banner sr ${visible ? "sr--in" : ""}`}
        >
            <div className="cta-inner">
                <h2>Redo för sommarens bästa lek?</h2>
                <p>Utforska hela vårt sortiment av noggrant utvalda sommarleksaker – för barn i alla åldrar.</p>
                <NavLink to="/pages/products/" className="blue-btn cta-link">
                    Se alla produkter →
                </NavLink>
            </div>
        </section>
    );
};

export default CTABanner;
