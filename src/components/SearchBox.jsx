import { useState } from "react";
import "../styles/SearchBox.css";

const SearchBox = ({products, filtered, setFiltered}) => {
    const [searchTerm, setSearchTerm] = useState("");


    const handleSearch = (event) =>{
        const value = event.target.value.toLowerCase();
        setSearchTerm(value)
        console.log(searchTerm)

        const filteredProducts = products.filter(product => {
            return product.name.toLowerCase().includes(value)
        })
        setFiltered(filteredProducts)
        console.log(filtered)
    }

    return (
        <section className="search-box">
            <div className="search-box-intro">
                <p>Här hittar du alla våra produkter. Sök efter din favorit!</p>
            </div>
            <div className="search-content">
                <input 
                    type="text" 
                    onChange={handleSearch}
                    value={searchTerm}
                    placeholder="Sök efter produkter"
                    className="search-input"
                />
                <div className="search-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="16" viewBox="0 0 14 16" fill="none">
                        <path fillRule="evenodd" clipRule="evenodd" d="M9.50131 11.7216C8.50723 12.4925 7.26746 12.95 5.92308 12.95C2.65185 12.95 0 10.2413 0 6.90001C0 3.55868 2.65185 0.850006 5.92308 0.850006C9.1943 0.850006 11.8462 3.55868 11.8462 6.90001C11.8462 8.2732 11.3983 9.53953 10.6436 10.5549L13.7634 13.7416C14.0789 14.0638 14.0789 14.5862 13.7634 14.9084C13.448 15.2306 12.9366 15.2306 12.6212 14.9084L9.50131 11.7216ZM10.2308 6.90001C10.2308 9.33006 8.30215 11.3 5.92308 11.3C3.544 11.3 1.61538 9.33006 1.61538 6.90001C1.61538 4.46995 3.544 2.50001 5.92308 2.50001C8.30215 2.50001 10.2308 4.46995 10.2308 6.90001Z" fill="#F2F2F2"/>
                    </svg>
                </div>
            </div>

        </section>
    )
}

export default SearchBox;