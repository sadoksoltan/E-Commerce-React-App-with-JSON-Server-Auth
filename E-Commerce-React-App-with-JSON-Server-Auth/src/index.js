// index.js:
import React, { useState, useEffect, useContext } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Navbar, Footer } from './components/layout';
import { AppProvider } from './AppContext';
import { Home } from './pages/Home';
import { Register } from './pages/auth/Register';
import { Login } from './pages/auth/Login';
import { ShoppingCart,OrderSummary } from './pages/ShoppingCart';
import { ProductList } from './pages/admin/products/ProductList';
import { CreateProduct } from './pages/admin/products/CreateProduct';
import { NotFound } from './pages/NotFound';
import { ContactForm } from './pages/ContactForm';
import { ContactList } from './pages/admin/contacts/ContactList';
import AppContext from './AppContext';
export const getStoredUserCredentials = () => {
  const storedCredentials = localStorage.getItem('credentials');
  return storedCredentials ? JSON.parse(storedCredentials) : null;
};

const ProtectedRoute = ({ element: Element, adminRequired, ...rest }) => {
  const { userCredentials } = useContext(AppContext);

  if (adminRequired && (!userCredentials || !userCredentials.user || userCredentials.user.role !== 'admin')) {
    return <Navigate to="" />;
  }

  return <Element {...rest} />;
};


function App() {
  const [userCredentials, setUserCredentials] = useState(() => getStoredUserCredentials());
  useEffect(() => {
    localStorage.setItem('credentials', JSON.stringify(userCredentials));
  }, [userCredentials]);

  return (
    <AppProvider value={{ userCredentials, setUserCredentials }}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<ContactForm />} />
          <Route path="/cart" element={<ShoppingCart />} />
          <Route path="/admin/products" element={<ProductList />} />
          <Route path="/admin/products/create" element={<CreateProduct />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          {/* <Route path="/r" element={<OrderSummary />} /> */}
          <Route
            path="/admin/contacts"
            element={<ProtectedRoute element={ContactList} adminRequired={true} />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </AppProvider>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);