// CartContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import ProductList from './ProductList.json';

const CartContext = createContext();

export const useCartContext = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartQuantity, setCartQuantity] = useState(0);
  const [itemQuantity, setItemQuantity] = useState({});
  const [cart, setCart] = useState([]);
  const [cardData, setCardData] = useState([]);
  const [discountedPrice, setDiscountedPrice] = useState([]);
  const [hiddenDescriptions, setHiddenDescriptions] = useState({});

  useEffect(() => {
    setCardData(ProductList.products);
  }, []);

  useEffect(() => {
    const newDiscountedPrices = ProductList.products.map(product => {
      const discountedPrice = product.price * (1 - product.discountPercentage / 100);
      return parseFloat(discountedPrice.toFixed(2));
    });
    setDiscountedPrice(newDiscountedPrices);
  }, []);

  useEffect(() => {
    const initialQuantityState = {};
    cardData.forEach((product) => {
      initialQuantityState[product.id] = 1;
    });
    setItemQuantity(initialQuantityState);
  }, [cardData]);

  const updateCart = (id, action) => {
    const updatedItemQuantity = { ...itemQuantity };

    if (action === 'add') {
      setCart([...cart, id]);
      updatedItemQuantity[id] = 1;
    } else if (action === 'increase') {
      updatedItemQuantity[id]++;
    } else if (action === 'decrease') {
      updatedItemQuantity[id]--;
      if (updatedItemQuantity[id] === 0) {
        setCart(cart.filter(itemId => itemId !== id));
      }
    }

    setItemQuantity(updatedItemQuantity);
  };

  const toggleDescription = (id) => {
    setHiddenDescriptions(prevHiddenDescriptions => ({
      ...prevHiddenDescriptions,
      [id]: !prevHiddenDescriptions[id]
    }));
  };

  const removeFromCart = (id) => {
    const updatedCart = cart.filter(itemId => itemId !== id);
    setCart(updatedCart);
  };

  const increaseQuantity = (id) => {
    const updatedItemQuantity = { ...itemQuantity };
    updatedItemQuantity[id]++;
    setItemQuantity(updatedItemQuantity);
}

const decreaseQuantity = (id) => {
    const updatedItemQuantity = { ...itemQuantity };
    if (updatedItemQuantity[id] > 1) {
        updatedItemQuantity[id]--;
        setItemQuantity(updatedItemQuantity);
    }
    else if (updatedItemQuantity[id] === 1) {
        removeFromCart(id)
    }
}

const cartItems = cardData.filter(item => cart.includes(item.id));

  return (
    <CartContext.Provider value={{ cartQuantity, setCartQuantity, itemQuantity, setItemQuantity, cart, setCart, cardData, setCardData, hiddenDescriptions, setHiddenDescriptions, discountedPrice, setDiscountedPrice, updateCart, toggleDescription, removeFromCart, increaseQuantity, decreaseQuantity, cartItems }}>
      {children}
    </CartContext.Provider>
  );
};