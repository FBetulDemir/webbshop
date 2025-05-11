import React, { useState } from 'react';
import { collection, doc, getDocs, addDoc, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from "../data/database.js";
import productSchema from '../validation/productValidation.js';




const AddNewProduct = () => {
    const [productName, setProductName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    async function handleAddProduct() {
        try {
            const productsCollection = collection(db, 'products'); 
    

            const productObject = {
                name: productName, 
                description: description, 
                price: Number(price),
                imageUrl: imageUrl,
                isBestseller: false,
            }

            const { error } = productSchema.validate(productObject, { abortEarly: false });

            if (error) {
                const message = error.details.map((err) => err.message).join('\n');
                console.log(`Formuläret innehåller fel:\n${message}`);
                setError(message)
                return;
            }


            const newProductRef = await addDoc(productsCollection, productObject);
            const generatedId = newProductRef.id;
            console.log('Product added with ID:', generatedId);
            return newProductRef; 
    
        } catch (error) {
            console.error('Fel vid att lägga ny produkt : ', error);
            throw error; 
        }
    }

    return(
        <div className="add-product">
            <h2>Lägg till ny produkt</h2>
            <form action="">
                <label htmlFor="name">Produkt Namn</label>
                <input 
                    type="text" 
                    id='name'
                    value={productName}
                    onChange={(e)=> setProductName(e.target.value)}
                />
                <label htmlFor="description">Beskrivning</label>
                <input 
                    type="text" 
                    id='description' 
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <label htmlFor="price" >Pris</label>
                <input 
                    type="number" 
                    id='price' 
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />
                <label htmlFor="imageUrl">Image länk</label>
                <input 
                    type="text" 
                    id='imageUrl'
                    value={imageUrl}
                    onChange={(e)=> setImageUrl(e.target.value)}
                />
                <button className="blue-btn" onClick={handleAddProduct}>Lägg till produkt</button>
            </form>
            {error && <p style={{color: "red"}}>Formuläret innehåller fel: {error}</p>}
            {success && <p style={{color: "green"}}>Produkten har lagts till!</p>}

        </div>
    )
}

export default AddNewProduct;