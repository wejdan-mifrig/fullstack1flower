import toast from "react-hot-toast";
import api from "../api.js";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export const useAuth = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({});

  const login = async (userData) => {
    try {
   

      const res = await api.post("/auth/login", userData);

      setUser(res.data.user);

      toast.success(res.data.message || "Logged in successfully!", {
        style: {
          border: "1px solid #713200",
          padding: "16px",
          color: "text.primary",
        },
        iconTheme: {
          primary: "success.main",
          secondary: "#FFFAEE",
        },
      });

      localStorage.setItem("user", JSON.stringify(res.data.user));
      localStorage.setItem("token", res.data.accessToken);

      const role = res.data.user.role;

      if (role === "admin") {
        navigate("/admin");
      } else {
        navigate("/user");
      }
    } catch (error) {
      const data = error?.response?.data;
      console.log(error);

      toast.error(
        data?.errors?.[0] || data?.message || "Something went wrong",
        {
          style: {
            border: "1px solid #713200",
            padding: "16px",
            color: "error.main",
          },
          iconTheme: {
            primary: "error.main",
            secondary: "#FFFAEE",
          },
        },
      );
    }
  };

  const register = async (userData) => {
    try {
      const res = await api.post("/auth/register", userData);

      toast.success(res.data.message || "Registered Successfully", {
        style: {
          border: "1px solid #713200",
          padding: "16px",
          color: "text.primary",
        },
        iconTheme: {
          primary: "success.main",
          secondary: "#FFFAEE",
        },
      });

      navigate("/login");
    } catch (error) {
      const data = error?.response?.data;

      toast.error(
        data?.errors?.[0] || data?.message || "Something went wrong",
        {
          style: {
            border: "1px solid #713200",
            padding: "16px",
            color: "error.main",
          },
          iconTheme: {
            primary: "error.main",
            secondary: "#FFFAEE",
          },
        },
      );
    }
  };

  const authorizedUser = async () => {
    try {
      const res = await api.get("/auth/me");
      setUser(res.data.user);
    } catch (error) {
    }
  };

  return {
    login,
    register,
    user,
    authorizedUser,
  };
};
