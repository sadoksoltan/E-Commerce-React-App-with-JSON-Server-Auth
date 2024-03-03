import React, { useState, useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Assurez-vous d'importer bootstrap.bundle.min.js ou bootstrap.min.js selon vos besoins

import AppContext from '../../../AppContext';
// import { v4 as uuidv4 } from 'uuid'; // Import uuid


export function CreateProduct({ addProduct, hideCreateProduct,nextProductId }) {
  const [name, setName] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('Other');
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState('');
  const [fileimg, setfileimg] = useState('entrer le lien de limage de votre article ');
  // const { setProducts } = useContext(AppContext);
  
  const handleSubmit = async (event) => {
    event.preventDefault();

    const newProduct = {
      id: nextProductId, 
      name,
      brand,
      category,
      price,
      description,
      createdAt: new Date().toISOString(),
      fileimg,
    };

    try {
      const response = await fetch('http://localhost:3005/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProduct),
      });

      if (response.ok) {
        addProduct(newProduct);
        // setProducts((prevProducts) => [...prevProducts, newProduct]);
        hideCreateProduct();
        window.location.href = '/admin/products'; // Redirect to "/admin/products" on success
      } else {
        const data = await response.json();
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error('Error creating product:', error);
      
    }
  };

  const handleCancelClick = () => {
    hideCreateProduct();
    window.location.href = '/admin/products'; // Redirect to "/admin/products" on cancel
  };

  return (
    <div className="container my-4">
      <div className="row">
        <div className="col-md-8 mx-auto rounded border p-4">
          <h2 className="text-center mb-5">Create Product</h2>
          <form onSubmit={handleSubmit}>
            <div className="row mb-3">
              <label className="col-sm-4 col-form-label">Name</label>
              <div className="col-sm-8">
                <input
                  className="form-control"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                />
              </div>
            </div>
            <div className="row mb-3">
              <label className="col-sm-4 col-form-label">Brand</label>
              <div className="col-sm-8">
                <input
                  className="form-control"
                  value={brand}
                  onChange={(event) => setBrand(event.target.value)}
                />
              </div>
            </div>
            <div className="row mb-3">
              <label className="col-sm-4 col-form-label">Category</label>
              <div className="col-sm-8">
                <select
                  className="form-control"
                  value={category}
                  onChange={(event) => setCategory(event.target.value)}
                >
                  <option value="Other">Other</option>
                  <option value="Phones">Phones</option>
                  <option value="Computers">Computers</option>
                  <option value="Accessories">Accessories</option>
                  <option value="Printers">Printers</option>
                </select>
              </div>
            </div>
            <div className="row mb-3">
              <label className="col-sm-4 col-form-label">Price </label>
              <div className="col-sm-8">
                <input
                  className="form-control"
                  type="number"
                  value={price}
                  onChange={(event) => setPrice(event.target.value)}
                />
              </div>
            </div>
            <div className="row mb-3">
              <label className="col-sm-4 col-form-label">Description</label>
              <div className="col-sm-8">
                <textarea
                  className="form-control"
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                ></textarea>
              </div>
            </div>
            <div className="row mb-3">
              <label className="col-sm-4 col-form-label">Article image</label>
              <div className="col-sm-8">
                <textarea
                  className="form-control"
                  value={fileimg}
                  onChange={(event) => setfileimg(event.target.value)}
                ></textarea>
              </div>
            </div>
            <div className="row">
              <div className="col text-center">
                <button type="submit" className="btn btn-primary me-3">
                  Create
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleCancelClick}
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
