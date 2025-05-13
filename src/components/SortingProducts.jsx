const SortingProducts = ({ products, setProducts }) => {
    const sortByName = () => {
        const sorted = [...products].sort((a, b) => a.name.localeCompare(b.name, 'sv'));
        setProducts(sorted);
    };
    
    const sortByPriceIncreasing = () => {
        const sorted = [...products].sort((a, b) => a.price - b.price);
        setProducts(sorted);
    };
    
    const sortByPriceDecreasing = () => {
        const sorted = [...products].sort((a, b) => b.price - a.price);
        setProducts(sorted);
    };
    return (
        <section>
            <h4>Sortera produkter genom att klicka på knappar nedan</h4>
            <div className="sorting-buttons">
                <button className="blue-btn" onClick={sortByName}>Namn A-Ö</button>
                <button className="blue-btn" onClick={sortByPriceIncreasing}>Pris stigande</button>
                <button className="blue-btn" onClick={sortByPriceDecreasing}>Pris fallande</button>
            </div>
        </section>


    )
}

export default SortingProducts;