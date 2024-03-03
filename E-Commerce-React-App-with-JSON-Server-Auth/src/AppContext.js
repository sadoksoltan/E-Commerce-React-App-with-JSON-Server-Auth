// AppContext.js
import React, { createContext, useState, useContext } from 'react';

export const AppContext = createContext();

// export const useAppContext = () => {
//   const context = useContext(AppContext);
//   if (!context) {
//     throw new Error('useAppContext must be used within an AppProvider');
//   }
//   return context;
// };

// export const AppProvider = ({ children }) => {
//   const [userCredentials, setUserCredentials] = useState(null);
//   const [cart, setCart] = useState(() => {
//     const storedCart = localStorage.getItem('cart');
//     return storedCart ? JSON.parse(storedCart) : [];
//   });

//   return (
//     <AppContext.Provider value={{ userCredentials, setUserCredentials, cart, setCart }}>
//       {children}
//     </AppContext.Provider>
//   );
// };
export const AppProvider = ({ children }) => {
  const [userCredentials, setUserCredentials] = useState(null);
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem('cart');
    return storedCart ? JSON.parse(storedCart) : [];
  });

  const updateCart = (updatedCart) => {
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  return (
    <AppContext.Provider value={{ userCredentials, setUserCredentials, cart, updateCart }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
