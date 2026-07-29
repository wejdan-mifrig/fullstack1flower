import { createContext, useState, useContext } from 'react';
import api from '../api.js';
import toast from 'react-hot-toast';

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const createOrder = async (orderData) => {
    try {
      setLoading(true);
      const res = await api.post('/orders', orderData);
      toast.success('Order placed successfully!');
      return res.data.order;
    } catch (error) {
      console.error('Create order error:', error);
      toast.error(error.response?.data?.message || 'Failed to place order');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const getMyOrders = async () => {
    try {
      setLoading(true);
      const res = await api.get('/my-orders');
      setOrders(res.data.orders || []);
      return res.data.orders;
    } catch (error) {
      console.error('Get my orders error:', error);
      toast.error('Failed to load orders');
      setOrders([]);
      return [];
    } finally {
      setLoading(false);
    }
  };

  const getAllOrders = async () => {
    try {
      setLoading(true);
      const res = await api.get('/orders');
      setOrders(res.data.orders || []);
      return res.data.orders;
    } catch (error) {
      console.error('Get all orders error:', error);
      toast.error('Failed to load orders');
      setOrders([]);
      return [];
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId, status, rejectionReason = '') => {
    try {
      setLoading(true);
      let res;
      if (status === 'accepted') {
        res = await api.put(`/orders/${orderId}/accept`);
      } else if (status === 'rejected') {
        res = await api.put(`/orders/${orderId}/reject`, { message: rejectionReason });
      }
      toast.success(`Order ${status === 'accepted' ? 'accepted' : 'rejected'} successfully`);
      return res.data.order;
    }catch (error) {
  console.log("ORDER ERROR RESPONSE:", error.response?.data);
  console.log("ORDER ERROR STATUS:", error.response?.status);
  console.log("ORDER ERROR:", error);

  toast.error(
    error.response?.data?.message || 
    "Failed to place order"
  );

  throw error;
}
  };

  const value = {
    orders,
    loading,
    createOrder,
    getMyOrders,
    getAllOrders,
    updateOrderStatus,
  };

  return (
    <OrderContext.Provider value={value}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
};

export default OrderContext;