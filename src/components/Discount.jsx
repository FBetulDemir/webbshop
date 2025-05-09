import imageRight from '../assets/discount-images/baby.jpg';
import imageLeft from '../assets/discount-images/children.jpg';
import '../styles/Discount.css';

const Discount = () => {
    return (
        <div className="discount-wrapper">
            <div className="left-content">
                <img src={imageLeft} alt="" />
                <div className="discount-text left">
                    <h2>15% rabatt på vattenlek med koden SPLASH15</h2>
                    <p>Gäller alla vattenleksaker fram till 30 juni!</p>
                </div>
            </div>
            <div className="right-content">
                <img src={imageRight} alt="" />
                <div className="discount-text right" >
                    <h2>10% rabatt med koden SOMMAR10</h2>
                    <p>Gäller alla sommarleksaker fram till 15 juni!</p>
                </div>
            </div>
        </div>
    )
}

export default Discount;