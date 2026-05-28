import "../styles/USPBar.css";

const ITEMS = [
    { icon: "🚚", label: "Fri frakt",          sub: "vid köp över 300 kr"   },
    { icon: "⭐", label: "Utvalda produkter",   sub: "hög kvalitet & glädje" },
    { icon: "🛡️", label: "CE-godkänt",          sub: "säkert för barn"        },
    { icon: "💬", label: "Kundservice",         sub: "mån–fre  09.00–17.00"  },
];

const USPBar = () => (
    <div className="usp-bar">
        {ITEMS.map((item) => (
            <div key={item.label} className="usp-item">
                <span className="usp-icon">{item.icon}</span>
                <div>
                    <p className="usp-label">{item.label}</p>
                    <p className="usp-sub">{item.sub}</p>
                </div>
            </div>
        ))}
    </div>
);

export default USPBar;
