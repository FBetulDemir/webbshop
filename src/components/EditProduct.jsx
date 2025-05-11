import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../data/database";
import ProductList from "./ProductList";
import { editProduct, fetchProducts } from "../data/crud";

const EditProduct = ({products, productId, productName}) => {


    const [productUpdatedName, setProductUpdatedName] = useState();
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isEditing, setIsEditing] = useState(false);
    const [updatedProduct, setUpdatedProduct] = useState({});




 
  const handleSave = async (e) => {
    if (isEditing){
        console.log("updating now")
        editProduct(productId)
    }
  };


  return (
    <div className="edit-product-wrapper">
      <h2>Edit Product</h2>
      <ProductList updatedProduct={updatedProduct}/>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
      {isEditing ? (
        <form onSubmit={handleSave}>
        <label htmlFor="name">Product Name</label>
        <input
          type="text"
          id="name"
          value={productName}
          onChange={(e) => setProductUpdatedName(e.target.value)}
        />
        <label htmlFor="description">Description</label>
        <input
          type="text"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <label htmlFor="price">Price</label>
        <input
          type="number"
          id="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <label htmlFor="imageUrl">Image URL</label>
        <input
          type="text"
          id="imageUrl"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
        <button type="submit" className="blue-btn">
          Save
        </button>
      </form>
      ): (
        <button className="blue-btn" onClick={() => setIsEditing(true)}>
          Edit Product
        </button>
      )}
      
    </div>
  );
};

export default EditProduct;