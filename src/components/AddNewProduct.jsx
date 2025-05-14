import React, { useState } from 'react';
import productSchema from '../validation/productValidation.js';
import { addProduct, fetchProducts } from '../data/crud.js';
import '../styles/AddNewProduct.css';




const AddNewProduct = () => {
    const [productName, setProductName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [error, setError] = useState({});
    const [success, setSuccess] = useState('');

    async function handleAddProduct() {

        const productObject = {
            name: productName, 
            description: description, 
            price: Number(price),
            imageUrl: imageUrl,
            isBestseller: false,
        }

        const { error } = productSchema.validate(productObject, { abortEarly: false });

        if (error) {
            const fieldErrors = {};
            error.details.forEach(err => {
              const field = err.path[0];
              fieldErrors[field] = err.message;
            });
            setError(fieldErrors);
            setSuccess('');
            return;
        } else{
            addProduct(productObject)
        }

        fetchProducts()
        setProductName('');
        setDescription('');
        setPrice('');
        setImageUrl('');
        setError('');
        setSuccess('Produkten har lagts till!');
    }

    return(
        <div className="add-product">
            <h2>Lägg till ny produkt</h2>
            <form action="" onSubmit={(e) => e.preventDefault()}>
                <label htmlFor="name">Produkt Namn</label>
                <input 
                    type="text" 
                    id='name'
                    value={productName}
                    onChange={(e)=> setProductName(e.target.value)}
                />
                {error.name && <p style={{color: "red"}}>Formuläret innehåller fel: {error.name}</p>}
                
                <label htmlFor="description">Beskrivning</label>
                <input 
                    type="text" 
                    id='description' 
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                {error.description && <p style={{color: "red"}}>Formuläret innehåller fel: {error.description}</p>}
                
                <label htmlFor="price" >Pris</label>
                <input 
                    type="number" 
                    id='price' 
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />
                {error.price && <p style={{color: "red"}}>Formuläret innehåller fel: {error.price}</p>}
                
                <label htmlFor="imageUrl">Image länk</label>
                <input 
                    type="text" 
                    id='imageUrl'
                    value={imageUrl}
                    onChange={(e)=> setImageUrl(e.target.value)}
                />
                {error.imageUrl && <p style={{color: "red"}}>Formuläret innehåller fel: {error.imageUrl}</p>}
                
                <button className="blue-btn" onClick={handleAddProduct}>Lägg till produkt</button>
            </form>
            {success && <p style={{color: "green"}}>{success}</p>}
        </div>
    )
}

export default AddNewProduct;