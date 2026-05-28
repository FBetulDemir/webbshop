import "../styles/About.css";
import useReveal from "../hooks/useReveal.js";

const values = [
    {
        icon: "🌊",
        title: "Sommarlek",
        text: "Vi lever och andas sommar. Varje produkt är utvald för att passa perfekt i solen, vid stranden eller i trädgården.",
    },
    {
        icon: "⭐",
        title: "Hög kvalitet",
        text: "Vi väljer enbart leksaker som uppfyller höga krav på hållbarhet och glädje – inga kompromisser.",
    },
    {
        icon: "🛡️",
        title: "Säkerhet",
        text: "Alla våra produkter är CE-märkta och godkända för barn. Trygg handel är vår högsta prioritet.",
    },
    {
        icon: "😊",
        title: "Glädje",
        text: "Vi tror att lek är livsviktigt. Vår mission är att sprida glädje och skapa minnen som varar livet ut.",
    },
];

const About = () => {
    const [storyTextRef, storyTextVisible]   = useReveal();
    const [storyBadgeRef, storyBadgeVisible] = useReveal();
    const [valuesRef, valuesVisible]         = useReveal();
    const [statsRef, statsVisible]           = useReveal();
    const [contactRef, contactVisible]       = useReveal();

    return (
        <div className="about-page">

            <section className="about-hero">
                <div className="about-hero-content">
                    <span className="about-hero-tag">Om oss</span>
                    <h1>Vi är ToyLandia</h1>
                    <p>Din sommarbutik för roliga, säkra och färgglada leksaker – för barn i alla åldrar.</p>
                </div>
            </section>

            <section className="about-story">
                <div className="about-story-inner">
                    <div
                        ref={storyTextRef}
                        className={`about-story-text sr-left ${storyTextVisible ? 'sr--in' : ''}`}
                    >
                        <h2>Vår historia</h2>
                        <p>
                            Välkommen till <strong>ToyLandia</strong> – din sommarbutik online!
                            Vi älskar sol, skratt och lek. Därför har vi skapat en plats där du hittar
                            färgglada, roliga och säkra leksaker som gör sommaren extra minnesvärd för
                            barn i alla åldrar.
                        </p>
                        <p>
                            Vi strävar efter att erbjuda ett handplockat sortiment med hög kvalitet och
                            bra priser. Oavsett om det är vattenlek, strandäventyr eller trädgårdslek –
                            hos oss finns något för alla!
                        </p>
                        <p>
                            Tack för att du väljer oss. Tillsammans skapar vi sommarminnen!
                        </p>
                    </div>
                    <div
                        ref={storyBadgeRef}
                        className={`about-story-badge sr-right ${storyBadgeVisible ? 'sr--in' : ''}`}
                    >
                        <span className="badge-emoji">🏖️</span>
                        <span className="badge-text">Sommarens<br />favoriter</span>
                    </div>
                </div>
            </section>

            <section className="about-values">
                <h2>Det vi tror på</h2>
                <p className="about-values-sub">Fyra principer som styr allt vi gör</p>
                <div ref={valuesRef} className="values-grid">
                    {values.map((v, i) => (
                        <div
                            key={v.title}
                            className={`value-card sr ${valuesVisible ? 'sr--in' : ''}`}
                            style={{ transitionDelay: `${i * 110}ms` }}
                        >
                            <span className="value-icon">{v.icon}</span>
                            <h3>{v.title}</h3>
                            <p>{v.text}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section
                ref={statsRef}
                className={`about-stats sr ${statsVisible ? 'sr--in' : ''}`}
            >
                <div className="stat-item">
                    <span className="stat-number">100+</span>
                    <span className="stat-label">Produkter</span>
                </div>
                <div className="stat-divider" />
                <div className="stat-item">
                    <span className="stat-number">Fri</span>
                    <span className="stat-label">Frakt över 300 kr</span>
                </div>
                <div className="stat-divider" />
                <div className="stat-item">
                    <span className="stat-number">100%</span>
                    <span className="stat-label">CE-godkända produkter</span>
                </div>
            </section>

            <section
                ref={contactRef}
                className={`about-contact sr ${contactVisible ? 'sr--in' : ''}`}
            >
                <h2>Kontakta oss</h2>
                <p className="about-contact-sub">Vi finns här för dig under våra öppettider</p>
                <div className="contact-grid">
                    <div className="contact-item">
                        <span className="contact-icon">✉️</span>
                        <div>
                            <h3>E-post</h3>
                            <p>support@toylandia.se</p>
                        </div>
                    </div>
                    <div className="contact-item">
                        <span className="contact-icon">🕐</span>
                        <div>
                            <h3>Öppettider</h3>
                            <p>Måndag–Fredag, 09.00–17.00</p>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default About;
