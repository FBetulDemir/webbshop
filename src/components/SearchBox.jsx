import { useState } from "react"

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
            <input 
                type="text" 
                onChange={handleSearch}
                value={searchTerm}
                placeholder="Sök efter produkter"
                className="search-input"
            />
        </section>
    )
}

export default SearchBox;