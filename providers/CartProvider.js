import { randomUUID } from 'expo-crypto';
import { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useToast } from 'react-native-toast-notifications';

const CartContext = createContext({
  items: [],
  total: 0,
  addItem: () => {},
  updateQuantity: () => {},
});

const CartProvider = ({ children }) => {
  const toast = useToast();
  const [items, setItems] = useState([]);

  useEffect(() => {
    const loadItems = async () => {
      const storedItems = await AsyncStorage.getItem('cartItems');
      if (storedItems) {
        setItems(JSON.parse(storedItems));
      }
    };

    loadItems();
  }, []);

  const addItem = async product => {
    const existingItem = items.find(i => i.product_id === product.id);

    if (existingItem) {
      updateQuantity(existingItem.id, 1);
      return;
    }

    const newCartItem = {
      id: randomUUID(),
      product,
      product_id: product.id,
      quantity: 1,
    };

    const newItems = [newCartItem, ...items];
    setItems(newItems);
    await AsyncStorage.setItem('cartItems', JSON.stringify(newItems));

    toast.show('Add to cart.', {
      type: 'success',
    });
  };

  const updateQuantity = async (itemId, amount) => {
    let isItemRemoved = false;

    const updatedItems = items
      .map(i => {
        if (i.id === itemId) {
          if (i.quantity + amount === 0) {
            isItemRemoved = true;
          }
          return { ...i, quantity: i.quantity + amount };
        } else {
          return i;
        }
      })
      .filter(i => i.quantity > 0);

    setItems(updatedItems);
    await AsyncStorage.setItem('cartItems', JSON.stringify(updatedItems));

    if (isItemRemoved) {
      toast.show('Item removed from cart.', {
        type: 'warning',
      });
    }
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
