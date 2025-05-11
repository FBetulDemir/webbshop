import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../data/database";
import ProductList from "./ProductList";
import { editProduct, fetchProducts } from "../data/crud.js";

const EditProduct = ({products, productId, productName}) => {

    const [selectedProduct, setSelectedProduct] = useState(null);
    const [productUpdatedName, setProductUpdatedName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [imageUrl, setImageUrl] = useState("");
  
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
    
        await editProduct(selectedProduct.id, updated, () => {});
        setSelectedProduct(null);
        fetchProducts();
    };
    
  

    return (
        <div className="edit-product-wrapper">
          <h2>Redigera Produkt</h2>
          <ProductList onSelectProduct={setSelectedProduct} />
      
          {selectedProduct && (
            <form onSubmit={handleSave}>
              <label htmlFor="name">Produktnamn</label>
              <input
                type="text"
                id="name"
                value={productUpdatedName}
                onChange={(e) => setProductUpdatedName(e.target.value)}
              />
              <label htmlFor="description">Beskrivning</label>
              <input
                type="text"
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <label htmlFor="price">Pris</label>
              <input
                type="number"
                id="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
              <label htmlFor="imageUrl">Bildlänk</label>
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
        </div>
);
      
};

export default EditProduct;