import imageRight from '../assets/discount-images/baby.jpg';
import imageLeft from '../assets/discount-images/children.jpg';
import '../styles/Discount.css';

const Discount = () => {
    return (
        <section className="discounts-section">
            <h2>Aktuella Kampanjer</h2>
            <div className="discount-grid">
                <div className="discount-card">
                    <img src={imageLeft} alt="Vattenlek" />
                    <div className="discount-overlay left">
                        <h3>15% rabatt på<br />vattenlek<br />med koden SPLASH15</h3>
                        <p>Gäller alla vattenleksaker<br />fram till 30 juni!</p>
                    </div>
                </div>
                <div className="discount-card">
                    <img src={imageRight} alt="Sommarleksaker" />
                    <div className="discount-overlay right">
                        <h3>10% rabatt<br />med koden SOMMAR10</h3>
                        <p>Gäller alla sommarleksaker<br />fram till 15 juni!</p>
                    </div>
                </div>
            </div>
      </section>
    )
}

export default Discount;