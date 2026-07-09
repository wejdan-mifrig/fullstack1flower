import { createContext, useEffect, useState } from "react";
import api from "../api";
import toast from "react-hot-toast";

export const UserContext = createContext(null);

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const authorizedUser = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setUser(null);
      return;
    }

    try {
      const res = await api.get("/auth/me");
      setUser(res.data.user);
    } catch (err) {
      console.log(err);
      setUser(null);

      localStorage.removeItem("token");
    }
  };

  const allUsers = async () => {
    try {
      setLoading(true);

      const res = await api.get("/all-users");
      setUsers(res.data.users);

    } catch (err) {
      console.log(err);
      toast.error("Failed to load users");
      setUsers([]);

    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (id) => {
    try {
      await api.delete(`/user/delete/${id}`);

      toast.success("User deleted successfully");

      // refresh table
      allUsers();

    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message || "Delete failed");
    }
  };

  const updateUser = async (id, data) => {
    try {
      await api.put(`/user/update/${id}`, data);

      toast.success("User updated successfully");

      allUsers();

    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message || "Update failed");
    }
  };

  useEffect(() => {
    authorizedUser();
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        users,
        setUsers,
        loading,
        authorizedUser,
        allUsers,
        deleteUser,
        updateUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}