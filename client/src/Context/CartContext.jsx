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
  // GET CART
  // =====================================================

  const getCart = useCallback(async () => {
    if (!user) {
      setCart([]);
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
  }, [user]);

  // =====================================================
  // LOAD CART AFTER AUTH
  // =====================================================

  useEffect(() => {
    if (authLoading) return;

    if (user) {
      getCart();
    } else {
      setCart([]);
    }
  }, [user, authLoading, getCart]);

  // =====================================================
  // ADD TO CART
  // =====================================================

  const addToCart = async (product) => {
    if (!user) {
      toast.error("Please login first");
      return;
    }

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