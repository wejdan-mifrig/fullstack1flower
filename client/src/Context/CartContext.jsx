import {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from "react";

import api from "../api.js";
import toast from "react-hot-toast";
import { useAuth } from "../Context/AuthContext.jsx";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user, authLoading } = useAuth();

  const [cart, setCart] = useState([]);
  const [cartLoading, setCartLoading] = useState(false);
  const [cartError, setCartError] = useState(null);

  // =====================================================
  // 🆕 تحميل السلة من localStorage للمستخدم غير المسجل
  // =====================================================
  const loadLocalCart = useCallback(() => {
    try {
      const savedCart = localStorage.getItem('local_cart');
      if (savedCart) {
        return JSON.parse(savedCart);
      }
    } catch (error) {
      console.error('Error loading local cart:', error);
    }
    return [];
  }, []);

  // =====================================================
  // 💾 حفظ السلة في localStorage للمستخدم غير المسجل
  // =====================================================
  const saveLocalCart = useCallback((cartData) => {
    try {
      localStorage.setItem('local_cart', JSON.stringify(cartData));
    } catch (error) {
      console.error('Error saving local cart:', error);
    }
  }, []);

  // =====================================================
  // GET CART
  // =====================================================
  const getCart = useCallback(async () => {
    if (!user) {
      // للمستخدم غير المسجل: نستخدم localStorage
      const localCart = loadLocalCart();
      setCart(localCart);
      setCartLoading(false);
      return;
    }

    try {
      setCartLoading(true);
      setCartError(null);

      const res = await api.get("/cart");
      setCart(res.data.cart || []);
    } catch (error) {
      console.error("GET CART ERROR:", error);
      setCartError(error);
      setCart([]);
    } finally {
      setCartLoading(false);
    }
  }, [user, loadLocalCart]);

  // =====================================================
  // LOAD CART AFTER AUTH
  // =====================================================
  useEffect(() => {
    if (authLoading) return;

    if (user) {
      getCart();
    } else {
      const localCart = loadLocalCart();
      setCart(localCart);
    }
  }, [user, authLoading, getCart, loadLocalCart]);

  // =====================================================
  // 🆕 دمج السلة المحلية مع سلة السيرفر بعد تسجيل الدخول
  // =====================================================
  const mergeLocalCartWithServer = useCallback(async () => {
    const localCart = loadLocalCart();
    
    if (!localCart || localCart.length === 0) {
      return;
    }

    try {
      // إرسال كل عنصر من السلة المحلية إلى السيرفر
      for (const item of localCart) {
        try {
          await api.post("/cart", {
            product_id: item.id || item.product_id,
            quantity: item.quantity || 1,
          });
        } catch (error) {
          console.error('Error adding item to server cart:', error);
        }
      }

      // حذف السلة المحلية بعد الدمج
      localStorage.removeItem('local_cart');
      
      // إعادة جلب السلة من السيرفر
      await getCart();
      
      toast.success('Your cart has been synchronized!');
    } catch (error) {
      console.error('Error merging local cart:', error);
      toast.error('Failed to sync your cart');
    }
  }, [loadLocalCart, getCart]);

  // =====================================================
  // ADD TO CART
  // =====================================================
  const addToCart = async (product) => {
    // ✅ إذا كان المستخدم غير مسجل، نضيف للسلة المحلية
    if (!user) {
      const localCart = loadLocalCart();
      const existingItem = localCart.find(item => (item.id || item.product_id) === product.id);
      
      let updatedCart;
      if (existingItem) {
        updatedCart = localCart.map(item =>
          (item.id || item.product_id) === product.id
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item
        );
      } else {
        updatedCart = [...localCart, { ...product, quantity: 1 }];
      }
      
      saveLocalCart(updatedCart);
      setCart(updatedCart);
      toast.success(`${product.name} added to cart!`);
      return;
    }

    // ✅ للمستخدم المسجل: نضيف للسيرفر
    try {
      await api.post("/cart", {
        product_id: product.id,
        quantity: 1,
      });

      toast.success(`${product.name} added to cart`);

      await getCart();
    } catch (error) {
      console.error("ADD TO CART ERROR:", error);
      toast.error(
        error.response?.data?.message ||
          "Failed to add product"
      );
    }
  };

  // =====================================================
  // UPDATE QUANTITY
  // =====================================================
  const updateQuantity = async (id, quantity) => {
    if (quantity < 1) {
      toast.error("Quantity cannot be less than 1");
      return;
    }

    // ✅ للمستخدم غير المسجل: نحدث السلة المحلية
    if (!user) {
      const localCart = loadLocalCart();
      const updatedCart = localCart.map(item =>
        (item.id || item.product_id || item.cart_id) === id
          ? { ...item, quantity }
          : item
      );
      saveLocalCart(updatedCart);
      setCart(updatedCart);
      return;
    }

    try {
      await api.put(`/cart/${id}`, {
        quantity,
      });

      await getCart();
      toast.success("Quantity updated");
    } catch (error) {
      console.error("UPDATE QUANTITY ERROR:", error);
      toast.error(
        error.response?.data?.message || "Failed to update quantity"
      );
    }
  };

  // =====================================================
  // REMOVE ITEM
  // =====================================================
  const removeFromCart = async (id) => {
    // ✅ للمستخدم غير المسجل: نحذف من السلة المحلية
    if (!user) {
      const localCart = loadLocalCart();
      const updatedCart = localCart.filter(item => 
        (item.id || item.product_id || item.cart_id) !== id
      );
      saveLocalCart(updatedCart);
      setCart(updatedCart);
      toast.success("Removed from cart");
      return;
    }

    try {
      await api.delete(`/cart/${id}`);
      toast.success("Removed from cart");
      await getCart();
    } catch (error) {
      console.error("REMOVE FROM CART ERROR:", error);
      toast.error("Failed to remove item");
    }
  };

  // =====================================================
  // CLEAR CART
  // =====================================================
  const clearCart = async () => {
    if (!user) {
      localStorage.removeItem('local_cart');
      setCart([]);
      toast.success("Cart cleared");
      return;
    }

    try {
      await api.delete("/cart");
      setCart([]);
      toast.success("Cart cleared");
    } catch (error) {
      console.error("CLEAR CART ERROR:", error);
      toast.error("Failed to clear cart");
    }
  };

  const refreshCart = getCart;

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        cartLoading,
        cartError,
        getCart,
        refreshCart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        mergeLocalCartWithServer,
        loadLocalCart,
        saveLocalCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error(
      "useCart must be used within a CartProvider"
    );
  }

  return context;
};

export default CartProvider;