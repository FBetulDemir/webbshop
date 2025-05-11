import { collection, doc, getDocs, addDoc, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from "./database.js";



const fetchProducts = async () => {
    try {
      const productsCollectionRef = collection(db, 'products');
      const ProdcutsSnapshot = await getDocs(productsCollectionRef);
      const productsList = ProdcutsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      
      return productsList
    } catch (err) {
      console.error('Error fetching products:', err);
      throw new Error('Failed to fetch products');
    }
};

const deleteProduct = async(productId, setProducts) => {
  const productRef = doc(db, "products", productId); // Referens till dokumentet

  try {
    await deleteDoc(productRef) // Ta bort produktdokumentet
    console.log("Dokument borttaget!")
  } catch (e) {
    console.error("Fel vid borttagning av dokument: ", e)
  }
  fetchProducts(setProducts)
    
}

const addProduct = async () => {

}

const editProduct = async (productId, updatedProduct, setProducts) => {
  const productRef = doc(db, "products", productId); // Referens till dokumentet
  
  try{
    await updateDoc(productRef, {product: updatedProduct})
    console.log("Dokument uppdaterat!")
    setProducts(updatedProduct)
  } catch (e) {
    console.error("Fel vid uppdatering av dokument: ", e)
  }
}




export {fetchProducts, addProduct, editProduct, deleteProduct}