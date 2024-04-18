import { randomUUID } from 'expo-crypto';
import { createContext, useState } from 'react';

const CartContext = createContext({
  items: [],
  total: 0,
  addItem: () => {},
  updateQuantity: () => {},
});

const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]);

  const addItem = (product, size) => {
    const existingItem = items.find(
      i => i.product === product && i.size === size,
    );

    if (existingItem) {
      updateQuantity(existingItem.id, 1);
      return;
    }

    const newCartItem = {
      id: 1,
      product,
      product_id: product.id,
      size,
      quantity: 1,
    };

    setItems([newCartItem, ...items]);
  };

  const updateQuantity = (itemId, amount) => {
    const updatedItems = items
      .map(i => {
        if (i.id === itemId) {
          return { ...i, quantity: i.quantity + amount };
        } else {
          return i;
        }
      })
      .filter(i => i.quantity > 0);
    setItems(updatedItems);
  };

  const total = items.reduce(
    (sum, item) => (sum += item.product.price * item.quantity),
    0,
  );

  return (
    <CartContext.Provider value={{ items, total, addItem, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;

export const useCart = () => useContext(CartContext);
