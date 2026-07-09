import { useEffect, useState } from "react";
import api from "../api";
import toast from "react-hot-toast";

export const useMenu = () => {
  const [menuItem, setMenuItem] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAllMenuForCategory = async (catId) => {
    try {
      setLoading(true);
      const res = await api.get(`/category-menu/${catId}`);
      setMenuItem(res.data.result);
    } catch (error) {
      console.error(error.response?.data?.message);
      toast.error(error.response?.data?.message[0] || "something went wrong", {
        style: {
          border: '1px solid #713200',
          padding: '16px',
          color: 'error.main',
        },
        iconTheme: {
          primary: 'error.main',
          secondary: '#FFFAEE',
        },
      });
    } finally {
      setLoading(false);
    }
  };

  return { menuItem, fetchAllMenuForCategory, loading };
};