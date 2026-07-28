import {
  createContext,
  useContext,
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


// ============================================================
// CONTEXT
// ============================================================

export const UserContext = createContext(null);


// Hook لاستخدام الـ Context داخل الصفحات
export const useAuth = () => {
  return useContext(UserContext);
};


// ============================================================
// PROVIDER
// ============================================================

export default function AuthProvider({ children }) {

  const navigate = useNavigate();


  const [user, setUser] = useState(null);

  const [users, setUsers] = useState([]);

  const [loading, setLoading] = useState(false);

  const [authLoading, setAuthLoading] = useState(true);


  // يمنع تكرار فحص المستخدم
  const authChecked = useRef(false);


  // يمنع تشغيل أكثر من refresh
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



      // حفظ التوكن بالذاكرة فقط
      setAccessToken(accessToken);


      // حفظ بيانات المستخدم
      setUser(user);



      toast.success(
        res.data.message ||
        "Logged in successfully"
      );



      setTimeout(() => {

        if(user.role === "admin"){

          navigate("/admin");

        }else{

          navigate("/user");

        }

      },500);



      return res.data;



    } catch(error){


      const data =
        error?.response?.data;



      toast.error(
        data?.errors?.[0] ||
        data?.message ||
        "Login failed"
      );


      throw error;



    } finally {

      setLoading(false);

    }

  };





  // ============================================================
  // REGISTER
  // ============================================================

  const register = async(userData)=>{


    try{


      setLoading(true);


      const res = await api.post(
        "/auth/register",
        userData
      );



      toast.success(
        res.data.message ||
        "Registered successfully"
      );



      setTimeout(()=>{

        navigate("/login");

      },500);



      return res.data;



    }catch(error){


      const data =
        error?.response?.data;



      toast.error(
        data?.errors?.[0] ||
        data?.message ||
        "Register failed"
      );


      throw error;



    }finally{

      setLoading(false);

    }

  };





  // ============================================================
  // CHECK USER
  // ============================================================

  const authorizedUser = async()=>{


    if(authChecked.current){

      return;

    }



    if(refreshPromise.current){

      return refreshPromise.current;

    }



    authChecked.current = true;



    refreshPromise.current = (async()=>{


      try{


        setAuthLoading(true);



        // جلب access token جديد
        const refreshResponse =
          await api.post(
            "/auth/refresh"
          );



        const newAccessToken =
          refreshResponse.data.accessToken;



        if(!newAccessToken){

          throw new Error(
            "No access token"
          );

        }



        setAccessToken(
          newAccessToken
        );



        // جلب المستخدم
        const res =
          await api.get(
            "/auth/me"
          );



        setUser(
          res.data.user
        );



      }catch(error){


        console.log(
          "Not authenticated"
        );


        setUser(null);

        clearAccessToken();



      }finally{


        setAuthLoading(false);

        refreshPromise.current=null;


      }



    })();



    return refreshPromise.current;


  };





  // ============================================================
  // LOGOUT
  // ============================================================

  const logout = async()=>{


    try{


      try{

        await api.post(
          "/auth/logout"
        );

      }catch(error){

        console.log(
          "Logout API unavailable"
        );

      }




      clearAccessToken();


      setUser(null);



      authChecked.current=false;



      navigate("/login");



    }catch(error){


      console.log(
        "LOGOUT ERROR",
        error
      );

    }


  };






  // ============================================================
  // GET ALL USERS
  // ============================================================

  const allUsers = async()=>{


    try{


      setLoading(true);



      const res =
        await api.get(
          "/all-users"
        );



      setUsers(
        res.data.users
      );



    }catch(error){


      toast.error(
        "Failed to load users"
      );


      setUsers([]);



    }finally{


      setLoading(false);

    }


  };





  // ============================================================
  // DELETE USER
  // ============================================================

  const deleteUser = async(id)=>{


    try{


      await api.delete(
        `/user/delete/${id}`
      );



      toast.success(
        "User deleted successfully"
      );



      await allUsers();



    }catch(error){


      toast.error(
        error.response?.data?.message ||
        "Delete failed"
      );


    }


  };






  // ============================================================
  // UPDATE USER
  // ============================================================

  const updateUser = async(id,data)=>{


    try{


      await api.put(
        `/user/update/${id}`,
        data
      );



      toast.success(
        "User updated successfully"
      );



      await allUsers();



    }catch(error){


      toast.error(
        error.response?.data?.message ||
        "Update failed"
      );


    }


  };





  // ============================================================
  // START AUTH CHECK
  // ============================================================

  useEffect(()=>{

    authorizedUser();

  },[]);






  // ============================================================
  // PROVIDER
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