import { createContext, useState } from "react";
import api from "../api.js";
import toast from "react-hot-toast";

export const categoriesContext = createContext(null);

export default function CategoriesProvider({ children }) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadCategories = async () => {
    try {
      setLoading(true);
      const res = await api.get("/all-categories");
      setCategories(res.data.categories);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load categories");
    } finally {
      setLoading(false);
    }
  };

  const addCategory = async (data) => {
    try {
      const res = await api.post("/category", data);

      setCategories((prev) => [...prev, res.data.category]);

      toast.success("Category added");
    } catch (error) {
      toast.error(error.response?.data?.message || "Add failed");
    }
  };

  const updateCategory = async (id, data) => {
    try {
      const res = await api.put(`/category/${id}`, data);

      setCategories((prev) =>
        prev.map((cat) =>
          cat.id === id ? res.data.category : cat
        )
      );

      toast.success("Category updated");
    } catch (error) {
      toast.error(error.response?.data?.message || "Update failed");
    }
  };

  const deleteCategory = async (id) => {
    try {
      await api.delete(`/category/${id}`);

      setCategories((prev) =>
        prev.filter((cat) => cat.id !== id)
      );

      toast.success("Category deleted");
    } catch (error) {
      toast.error(error.response?.data?.message || "Delete failed");
    }
  };

  return (
    <categoriesContext.Provider
      value={{
        loadCategories,
        categories,
        loading,
        addCategory,
        updateCategory,
        deleteCategory,
      }}
    >
      {children}
    </categoriesContext.Provider>
  );
}