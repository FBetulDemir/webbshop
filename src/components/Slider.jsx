import { useState } from "react";
import FirstImg from "../assets/slider-images/slider1.jpg";
import SecondImg from "../assets/slider-images/slider2.jpg";
import ThirdImg from "../assets/slider-images/slider3.jpg";
import FourthImg from "../assets/slider-images/slider4.jpg";
import "../styles/Slider.css";
import { NavLink } from "react-router";

const Slider = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const SliderImages = [
        {
            label: "Image 1",
            imgPath: FirstImg,
            text: "Vattenlek för hela familjen",
            subtext: "Upptäck våra populäraste sommarleksaker!",
        },
        {
            label: "Image 2",
            imgPath: SecondImg,
            text: "Trädgårdslek för små trädgårdsmästare",
            subtext: "Plantera, vattna och lek. Upptäck våra roliga trädgårdsleksaker!"
        },
        {
            label: "Image 3",
            imgPath: ThirdImg,
            text: "Strandlek med fantasi och sand",
            subtext: "Bygg sandslott, gräv tunnlar och ha kul i solen med våra strandfavoriter!"
        },
        {
            label: "Image 4",
            imgPath: FourthImg,
            text: "Redo... sikta... skjut!",
            subtext: "Håll dig sval i sommar med våra actionfyllda vattenpistoler!"
        },
    ]

    const prev = () => {
        setCurrentIndex((currentIndex - 1 + SliderImages.length) % SliderImages.length)
    }
    
    const next = () => {
        setCurrentIndex((currentIndex + 1) % SliderImages.length)
    }

    return (
        <div className="slider-wrapper">
            <button className="arrow left" onClick={prev}>←</button>
            {SliderImages.map((image, index) => (
                <div 
                    key={index} 
                    className={`slider-image ${index === currentIndex ? "active" : "hidden"}`}
                >
                    <img src={image.imgPath} alt={image.label} className="slider-img" />
                    <div className="slider-text">
                        <h2>{image.text}</h2>
                        <p>{image.subtext}</p>
                        <NavLink to="/pages/products/:productId?" className="slider-button blue-btn">Se hela utbudet</NavLink>
                    </div>
                </div>

            ))}
                
            <button className="arrow right" onClick={next}>→</button>

        </div>
    )
}

export default Slider;