import React, { createContext, useState, useEffect } from 'react';
import { auth, db } from './Firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useUser } from './UserContext'; // ✅ Correct import

export const ProductCountContext = createContext();

export const ProductCountProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const user = useUser(); // ✅ Use custom hook

  // Load cart from Firestore on login
  useEffect(() => {
    const fetchCart = async () => {
      if (user?.uid) {
        try {
          const ref = doc(db, 'Carts', user.uid);
          const snap = await getDoc(ref);
          if (snap.exists()) {
            const data = snap.data();
            setCartItems(Object.values(data));
          } else {
            setCartItems([]);
          }
        } catch (err) {
          console.error("Error loading cart:", err);
        }
      } else {
        setCartItems([]);
      }
    };

    fetchCart();
  }, [user]);

  // Save to Firestore
  const saveCart = async (newCart) => {
    if (!user?.uid) return;
    const ref = doc(db, 'Carts', user.uid);
    const cartData = Object.fromEntries(newCart.map(item => [item.id, item]));
    try {
      await setDoc(ref, cartData);
    } catch (err) {
      console.error("Error saving cart:", err);
    }
  };

  const updateCart = (updater) => {
    setCartItems(prev => {
      const updated = updater(prev);
      saveCart(updated); // Persist to Firestore
      return updated;
    });
  };

  const addToCart = (product) => updateCart(prev => {
    const existing = prev.find(item => item.id === product.id);
    if (existing) {
      return prev.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
    }
    return [...prev, { ...product, quantity: 1 }];
  });

  const increaseQuantity = (productId) => updateCart(prev =>
    prev.map(item =>
      item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
    )
  );

  const decreaseQuantity = (productId) => updateCart(prev =>
    prev
      .map(item =>
        item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
      )
      .filter(item => item.quantity > 0)
  );

  const removeFromCart = (productId) =>
    updateCart(prev => prev.filter(item => item.id !== productId));

  const productCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <ProductCountContext.Provider
      value={{
        cartItems,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        productCount,
      }}
    >
      {children}
    </ProductCountContext.Provider>
  );
};
