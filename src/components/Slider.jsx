import { useState, useEffect, useRef } from "react";
import FirstImg from "../assets/slider-images/slider1.jpg";
import SecondImg from "../assets/slider-images/slider2.jpg";
import ThirdImg from "../assets/slider-images/slider3.jpg";
import FourthImg from "../assets/slider-images/slider4.jpg";
import "../styles/Slider.css";
import { NavLink } from "react-router";

const SLIDES = [
    {
        imgPath: FirstImg,
        text: "Vattenlek för hela familjen",
        subtext: "Upptäck våra populäraste sommarleksaker!",
    },
    {
        imgPath: SecondImg,
        text: "Trädgårdslek för små trädgårdsmästare",
        subtext: "Plantera, vattna och lek. Roliga trädgårdsleksaker för alla åldrar!",
    },
    {
        imgPath: ThirdImg,
        text: "Strandlek med fantasi och sand",
        subtext: "Bygg sandslott, gräv tunnlar och ha kul i solen!",
    },
    {
        imgPath: FourthImg,
        text: "Redo... sikta... skjut!",
        subtext: "Håll dig sval i sommar med våra actionfyllda vattenpistoler!",
    },
];

const Slider = () => {
    const [current, setCurrent] = useState(0);
    const [autoKey, setAutoKey] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % SLIDES.length);
        }, 4500);
        return () => clearInterval(interval);
    }, [autoKey]);

    const goTo = (index) => {
        setCurrent(index);
        setAutoKey((k) => k + 1);
    };

    const prev = () => goTo((current - 1 + SLIDES.length) % SLIDES.length);
    const next = () => goTo((current + 1) % SLIDES.length);

    return (
        <div className="slider-wrapper">
            {SLIDES.map((slide, i) => (
                <div
                    key={i}
                    className={`slider-image ${i === current ? "active" : ""}`}
                    style={{
                        backgroundImage: `url(${slide.imgPath})`,
                        backgroundPosition: "center",
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                    }}
                >
                    <button className="arrow left" onClick={prev} aria-label="Föregående">‹</button>
                    <div className="slider-text">
                        <h2>{slide.text}</h2>
                        <p>{slide.subtext}</p>
                        <NavLink to="/pages/products/" className="slider-button blue-btn">
                            Se hela utbudet
                        </NavLink>
                    </div>
                    <button className="arrow right" onClick={next} aria-label="Nästa">›</button>
                </div>
            ))}

            <div className="slider-dots">
                {SLIDES.map((_, i) => (
                    <button
                        key={i}
                        className={`slider-dot ${i === current ? "active" : ""}`}
                        onClick={() => goTo(i)}
                        aria-label={`Bild ${i + 1}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default Slider;
