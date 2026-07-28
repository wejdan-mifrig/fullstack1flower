import { createContext, useState, useContext, useEffect, useCallback } from 'react';
import api from '../api.js';
import toast from 'react-hot-toast';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [cartLoading, setCartLoading] = useState(false);
  const [cartError, setCartError] = useState(null);

  // دالة لجلب السلة من الخادم
  const getCart = useCallback(async () => {
    try {
      setCartLoading(true);
      setCartError(null);
      const res = await api.get('/cart');
      setCart(res.data.cart || []);
    } catch (error) {
      console.error('GET CART ERROR:', error);
      setCartError(error);
      setCart([]);
    } finally {
      setCartLoading(false);
    }
  }, []);

  // جلب السلة عند تحميل المكون
  useEffect(() => {
    getCart();
  }, [getCart]);

  // إضافة منتج إلى السلة
  const addToCart = async (product) => {
    try {
      await api.post('/cart', {
        product_id: product.id,
        quantity: 1
      });
      toast.success(`${product.name} added to cart`);
      // إعادة جلب السلة لتحديثها
      await getCart();
    } catch (error) {
      console.error('ADD TO CART ERROR:', error);
      toast.error(error.response?.data?.message || 'Please login first');
    }
  };

  // تحديث كمية منتج
  const updateQuantity = async (id, quantity) => {
    try {
      await api.put(`/cart/${id}`, { quantity });
      await getCart();
    } catch (error) {
      console.error('UPDATE QUANTITY ERROR:', error);
      toast.error('Failed to update quantity');
    }
  };

  // حذف منتج من السلة
  const removeFromCart = async (id) => {
    try {
      await api.delete(`/cart/${id}`);
      toast.success('Removed from cart');
      await getCart();
    } catch (error) {
      console.error('REMOVE FROM CART ERROR:', error);
      toast.error('Failed to remove item');
    }
  };

  // تفريغ السلة بالكامل
  const clearCart = async () => {
    try {
      await api.delete('/cart');
      setCart([]); // تحديث محلي فوري
      toast.success('Cart cleared');
    } catch (error) {
      console.error('CLEAR CART ERROR:', error);
      toast.error('Failed to clear cart');
    }
  };

  // دالة لإعادة تحميل السلة (للاستخدام الخارجي)
  const refreshCart = getCart;

  const value = {
    cart,
    setCart, // للاستخدام الداخلي في حالات نادرة
    cartLoading,
    cartError,
    getCart,
    refreshCart,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export default CartProvider;