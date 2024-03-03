import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { CreateProduct } from './CreateProduct';


export function ProductList() {
  // État initial avec une liste vide de produits
  const [products, setProducts] = useState([]);

  // État pour afficher le formulaire de création de produit
  const [showCreateProduct, setShowCreateProduct] = useState(false);

  // État pour suivre l'ID du prochain produit à ajouter
  const [nextProductId, setNextProductId] = useState(0);  

  // Fonction pour ajouter un produit à la liste
  const addProduct = (newProduct) => {
    setProducts([...products, newProduct]);
    setNextProductId(nextProductId => nextProductId + 1); // Utilisez une fonction de mise à jour pour garantir la dernière valeur
    setShowCreateProduct(false);
  };

  // Gérer le clic sur le bouton "Créer un produit"
  const handleCreateProductClick = () => {
    setShowCreateProduct(true);
  };

  // Gérer la fermeture du formulaire de création
  const handleHideCreateProduct = () => {
    setShowCreateProduct(false);
  };
  

  const handleDeleteProduct= async (productId) => {
    try {
      const response = await fetch(`http://localhost:3005/products/`+ productId, {
        method: 'DELETE',
      });

      if (response.ok) {
        setProducts(products.filter((product) => product.id !== productId));
      } else {
        const data = await response.json();
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('An error occurred while deleting the product.');
    }
  };

  // Fonction asynchrone pour récupérer les produits depuis le JSON Server
  const getProducts = async () => {
    try {
      const response = await fetch('http://localhost:3005/products'); // Replace with the actual JSON Server endpoint
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  // Utiliser useEffect pour exécuter getProducts une seule fois lors du rendu initial
  useEffect(() => {
    getProducts();
  }, []); // Le tableau vide indique que cette dépendance est vide, donc useEffect s'exécute une seule fois au montage

  return (
    <div className="container">
      <h1>Product List</h1>
      <button className="btn btn-primary mt-3" onClick={handleCreateProductClick}>
        Create Product
      </button>
      {showCreateProduct && (
        <CreateProduct addProduct={addProduct} hideCreateProduct={handleHideCreateProduct} nextProductId={nextProductId} />
      )}
      <table className="table">
        <thead>
          <tr>
            {Object.keys(products[0] || {}).map((key) => (
              <th key={key}>{key}</th>
            ))}
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              {Object.keys(product).map((key) => (
                <td key={key}>{product[key]}</td>
              ))}
              <td>
                <button className="btn btn-danger" onClick={() => handleDeleteProduct(product.id)}>
                  Delete
                </button>
              </td>
              <td>
                <button className="btn btn-primary">Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
