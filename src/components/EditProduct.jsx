import React, { useState, useEffect } from "react";
import ProductList from "./ProductList";
import { editProduct, fetchProducts } from "../data/crud.js";
import '../styles/EditProduct.css';
import productSchema from '../validation/productValidation.js';

const EditProduct = () => {

    const [selectedProduct, setSelectedProduct] = useState(null);
    const [productUpdatedName, setProductUpdatedName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [visible, setVisible] = useState("block");
    const [error, setError] = useState("");
    const [reload, setReload] = useState(false);
  
    useEffect(() => {
      if (selectedProduct) {
        setProductUpdatedName(selectedProduct.name);
        setDescription(selectedProduct.description);
        setPrice(selectedProduct.price);
        setImageUrl(selectedProduct.imageUrl);
      }
    }, [selectedProduct]);

    const handleSave = async (e) => {
        e.preventDefault();
    
        const updated = {
          name: productUpdatedName,
          description,
          price: Number(price),
          imageUrl,
          isBestseller: false,
        };
    

        const { error } = productSchema.validate(updated, { abortEarly: false });
        if (error) {
          const message = error.details.map((err) => err.message).join('\n');
          console.log(`Formuläret innehåller fel:\n${message}`);
          setError(message);
          return;
        }
        await editProduct(selectedProduct.id, updated, () => {});
        setSelectedProduct(null);
        setReload(true);
        setVisible("block")
        setError("");
    };
    
  

    return (
        <div className="edit-product-wrapper">
          
          <ProductList 
            setSelectedProduct={setSelectedProduct}
            setVisible={setVisible}
            visible={visible}
            reload={reload} 
          />
      
          {selectedProduct && (
            
            <form onSubmit={handleSave} className="edit-product-form">
              <h2>Redigera Produkt</h2>
              <label htmlFor="name">Produktnamn:</label>
              <input
                type="text"
                id="name"
                value={productUpdatedName}
                onChange={(e) => setProductUpdatedName(e.target.value)}
              />
              <label htmlFor="description">Beskrivning:</label>
              <input
                type="text"
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <label htmlFor="price">Pris:</label>
              <input
                type="number"
                id="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
              <label htmlFor="imageUrl">Bildlänk:</label>
              <input
                type="text"
                id="imageUrl"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
              />
              <button type="submit" className="blue-btn">
                Spara
              </button>

            </form>
            
          )}
          {error && <p style={{color: "red"}}>Formuläret innehåller fel: {error}</p>}
        </div>
);
      
};

export default EditProduct;