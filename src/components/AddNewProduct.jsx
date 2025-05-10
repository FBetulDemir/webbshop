import React, { useState } from 'react';
import { collection, doc, getDocs, addDoc, deleteDoc, updateDoc } from "firebase/firestore";
import { db, app } from "../data/database.js";



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
                price: price,
                imageUrl: imageUrl,
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

    // const handleAddProduct = async () => {
    //     if (!productName || !description || !price) {
    //       setError('Please fill in all required fields.');
    //       return;
    //     }
    
    //     try {
    //       const productsCollectionRef = collection(db, 'products');
    //       await addDoc(productsCollectionRef, {
    //         name: productName,
    //         description,
    //         price: parseFloat(price),
    //         imageUrl,
    //       });
    
    //       setSuccess('Product added successfully!');
    //       setError('');
    //       setProductName('');
    //       setDescription('');
    //       setPrice('');
    //       setImageUrl('');
    //     } catch (err) {
    //       console.error('Error adding product:', err);
    //       setError('Failed to add product. Please try again.');
    //     }
    //   };

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
                <input type="text" id='description' />
                <label htmlFor="price" >Pris</label>
                <input type="number" id='price' />
                <label htmlFor="imageUrl">Image länk</label>
                <input type="text" id='imageUrl'/>
                <button className="blue-btn" onClick={handleAddProduct}>Lägg till produkt</button>
            </form>

        </div>
    )
}

export default AddNewProduct;