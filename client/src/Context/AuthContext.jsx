import {
  createContext,
  useEffect,
  useState,
  useRef,
} from "react";

import { useNavigate } from "react-router-dom";

import api, {
  setAccessToken,
  clearAccessToken,
} from "../api";

import toast from "react-hot-toast";

export const UserContext = createContext(null);

export default function AuthProvider({ children }) {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);

  const [loading, setLoading] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);

  // يمنع تكرار فحص تسجيل الدخول
  const authChecked = useRef(false);

  // يمنع تشغيل أكثر من refresh request بنفس الوقت
  const refreshPromise = useRef(null);

  // ============================================================
  // LOGIN
  // ============================================================

  const login = async (userData) => {
    try {
      setLoading(true);

      const res = await api.post(
        "/auth/login",
        userData
      );

      const {
        accessToken,
        user,
      } = res.data;

      // حفظ Access Token في الذاكرة فقط
      setAccessToken(accessToken);

      // حفظ بيانات المستخدم
      setUser(user);

      toast.success(
        res.data.message ||
          "Logged in successfully!",
        {
          duration: 3000,

          style: {
            border: "1px solid #713200",
            padding: "16px",
          },

          iconTheme: {
            primary: "#3e4a3a",
            secondary: "#FFFAEE",
          },
        }
      );

      setTimeout(() => {
        if (user.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/user");
        }
      }, 500);

      return res.data;

    } catch (error) {
      const data =
        error?.response?.data;

      console.log(
        "LOGIN ERROR:",
        error
      );

      toast.error(
        data?.errors?.[0] ||
          data?.message ||
          "Something went wrong",
        {
          style: {
            border: "1px solid #713200",
            padding: "16px",
          },

          iconTheme: {
            primary: "#b00020",
            secondary: "#FFFAEE",
          },
        }
      );

      throw error;

    } finally {
      setLoading(false);
    }
  };

  // ============================================================
  // REGISTER
  // ============================================================

  const register = async (userData) => {
    try {
      setLoading(true);

      const res = await api.post(
        "/auth/register",
        userData
      );

      toast.success(
        res.data.message ||
          "Registered Successfully",
        {
          duration: 3000,

          style: {
            border: "1px solid #713200",
            padding: "16px",
          },

          iconTheme: {
            primary: "#3e4a3a",
            secondary: "#FFFAEE",
          },
        }
      );

      setTimeout(() => {
        navigate("/login");
      }, 500);

      return res.data;

    } catch (error) {
      const data =
        error?.response?.data;

      toast.error(
        data?.errors?.[0] ||
          data?.message ||
          "Something went wrong",
        {
          style: {
            border: "1px solid #713200",
            padding: "16px",
          },

          iconTheme: {
            primary: "#b00020",
            secondary: "#FFFAEE",
          },
        }
      );

      throw error;

    } finally {
      setLoading(false);
    }
  };

  // ============================================================
  // CHECK AUTHORIZED USER
  // ============================================================

  const authorizedUser = async () => {
    // منع تكرار الفحص
    if (authChecked.current) {
      return;
    }

    // إذا كان هناك طلب Refresh شغال
    if (refreshPromise.current) {
      return refreshPromise.current;
    }

    authChecked.current = true;

    refreshPromise.current = (async () => {
      try {
        setAuthLoading(true);

        /*
          Refresh Token موجود داخل HttpOnly Cookie
          ويتم إرساله تلقائيًا بسبب withCredentials: true
        */

        const refreshResponse =
          await api.post(
            "/auth/refresh"
          );

        const newAccessToken =
          refreshResponse.data.accessToken;

        if (!newAccessToken) {
          throw new Error(
            "No access token received"
          );
        }

        // حفظ Access Token في الذاكرة
        setAccessToken(
          newAccessToken
        );

        // جلب بيانات المستخدم
        const res =
          await api.get(
            "/auth/me"
          );

        setUser(
          res.data.user
        );

      } catch (error) {
        console.log(
          "User is not authenticated"
        );

        setUser(null);

        clearAccessToken();

      } finally {
        setAuthLoading(false);

        refreshPromise.current = null;
      }
    })();

    return refreshPromise.current;
  };

  // ============================================================
  // LOGOUT
  // ============================================================

  const logout = async () => {
    try {
      // محاولة حذف Refresh Token من السيرفر
      try {
        await api.post(
          "/auth/logout"
        );
      } catch (error) {
        console.log(
          "Logout endpoint not available"
        );
      }

      // حذف Access Token من الذاكرة
      clearAccessToken();

      // حذف المستخدم من React State
      setUser(null);

      // السماح بفحص جديد بعد تسجيل الدخول
      authChecked.current = false;

      navigate("/login");

    } catch (error) {
      console.log(
        "LOGOUT ERROR:",
        error
      );
    }
  };

  // ============================================================
  // GET ALL USERS
  // ============================================================

  const allUsers = async () => {
    try {
      setLoading(true);

      const res =
        await api.get(
          "/all-users"
        );

      setUsers(
        res.data.users
      );

    } catch (error) {
      console.log(error);

      toast.error(
        "Failed to load users"
      );

      setUsers([]);

    } finally {
      setLoading(false);
    }
  };

  // ============================================================
  // DELETE USER
  // ============================================================

  const deleteUser = async (id) => {
    try {
      await api.delete(
        `/user/delete/${id}`
      );

      toast.success(
        "User deleted successfully"
      );

      await allUsers();

    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message ||
          "Delete failed"
      );
    }
  };

  // ============================================================
  // UPDATE USER
  // ============================================================

  const updateUser = async (
    id,
    data
  ) => {
    try {
      await api.put(
        `/user/update/${id}`,
        data
      );

      toast.success(
        "User updated successfully"
      );

      await allUsers();

    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message ||
          "Update failed"
      );
    }
  };

  // ============================================================
  // CHECK USER WHEN APP STARTS
  // ============================================================

  useEffect(() => {
    authorizedUser();
  }, []);

  // ============================================================
  // CONTEXT PROVIDER
  // ============================================================

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
      }}
    >
      {children}
    </UserContext.Provider>
  );
}