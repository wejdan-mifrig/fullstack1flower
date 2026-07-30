import { createContext, useContext, useEffect, useState, useRef } from "react";

import { useNavigate } from "react-router-dom";

import api, { setAccessToken, clearAccessToken } from "../api";

import toast from "react-hot-toast";

export const UserContext = createContext(null);

export const useAuth = () => {
  return useContext(UserContext);
};

export default function AuthProvider({ children }) {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);

  const authChecked = useRef(false);

  const refreshPromise = useRef(null);

  const mergeCartAfterLogin = async () => {
    try {
      const localCart = localStorage.getItem("local_cart");

      if (!localCart) {
        return;
      }

      const cartItems = JSON.parse(localCart);

      if (!cartItems || cartItems.length === 0) {
        return;
      }

      console.log(" Merging local cart with server:", cartItems);

      for (const item of cartItems) {
        try {
          await api.post("/cart", {
            product_id: item.id || item.product_id,
            quantity: item.quantity || 1,
          });
        } catch (error) {
          console.error("Error adding item to server cart:", error);
        }
      }

      localStorage.removeItem("local_cart");

      toast.success("Your cart has been synchronized!");

      console.log(" Local cart merged successfully");
    } catch (error) {
      console.error("Error merging local cart:", error);
    }
  };

  const login = async (userData) => {
    try {
      setLoading(true);

      const res = await api.post("/auth/login", userData);

      const { accessToken, user } = res.data;

      setAccessToken(accessToken);

      setUser(user);

      toast.success(res.data.message || "Logged in successfully");

      await mergeCartAfterLogin();

      setTimeout(() => {
        if (user.role === "admin") {
          navigate("/admin");
        } else {
          const redirectUrl =
            localStorage.getItem("redirectAfterLogin") || "/user";
          localStorage.removeItem("redirectAfterLogin");
          navigate(redirectUrl);
        }
      }, 500);

      return res.data;
    } catch (error) {
      const data = error?.response?.data;
      toast.error(data?.errors?.[0] || data?.message || "Login failed");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    try {
      setLoading(true);

      const res = await api.post("/auth/register", userData);

      toast.success(res.data.message || "Registered successfully");

      setTimeout(async () => {
        try {
          const loginRes = await api.post("/auth/login", {
            email: userData.email,
            password: userData.password,
          });

          const { accessToken, user } = loginRes.data;
          setAccessToken(accessToken);
          setUser(user);

          await mergeCartAfterLogin();

          toast.success("Welcome! Your cart has been saved.");

          const redirectUrl =
            localStorage.getItem("redirectAfterLogin") || "/user";
          localStorage.removeItem("redirectAfterLogin");
          navigate(redirectUrl);
        } catch (error) {
          console.error("Auto-login after registration failed:", error);
          navigate("/login");
        }
      }, 500);

      return res.data;
    } catch (error) {
      const data = error?.response?.data;
      toast.error(data?.errors?.[0] || data?.message || "Register failed");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const authorizedUser = async () => {
    if (authChecked.current) {
      return;
    }

    if (refreshPromise.current) {
      return refreshPromise.current;
    }

    authChecked.current = true;

    refreshPromise.current = (async () => {
      try {
        setAuthLoading(true);

        const refreshResponse = await api.post("/auth/refresh");
        const newAccessToken = refreshResponse.data.accessToken;

        if (!newAccessToken) {
          throw new Error("No access token");
        }

        setAccessToken(newAccessToken);

        const res = await api.get("/auth/me");
        setUser(res.data.user);
      } catch (error) {
        console.log("Not authenticated");
        setUser(null);
        clearAccessToken();
      } finally {
        setAuthLoading(false);
        refreshPromise.current = null;
      }
    })();

    return refreshPromise.current;
  };

  const logout = async () => {
    try {
      try {
        await api.post("/auth/logout");
      } catch (error) {
        console.log("Logout API unavailable");
      }

      clearAccessToken();
      setUser(null);
      authChecked.current = false;

      navigate("/login");
    } catch (error) {
      console.log("LOGOUT ERROR", error);
    }
  };

  const allUsers = async () => {
    try {
      setLoading(true);
      const res = await api.get("/all-users");
      setUsers(res.data.users);
    } catch (error) {
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
      await allUsers();
    } catch (error) {
      toast.error(error.response?.data?.message || "Delete failed");
    }
  };

  const updateUser = async (id, data) => {
    try {
      await api.put(`/user/update/${id}`, data);
      toast.success("User updated successfully");
      await allUsers();
    } catch (error) {
      toast.error(error.response?.data?.message || "Update failed");
    }
  };

  const updateProfile = async (data) => {
    try {
      setLoading(true);
      const res = await api.put("/profile", data);
      setUser(res.data.user);
      toast.success(res.data.message || "Profile updated successfully");
      return res.data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Profile update failed");
      throw error;
    } finally {
      setLoading(false);
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
        authLoading,
        login,
        register,
        logout,
        authorizedUser,
        allUsers,
        deleteUser,
        updateUser,
        updateProfile,
        mergeCartAfterLogin,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
