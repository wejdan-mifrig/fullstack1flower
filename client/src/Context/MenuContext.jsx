import { createContext, useState } from "react";
import api from "../api.js";
import toast from "react-hot-toast";

export const menuContext = createContext(null);

export default function MenuProvider({ children }) {
  const [menu, setMenu] = useState([]);

  const loadMenu = async () => {
    try {
      const res = await api.get("/all-menu");
      
 
      setMenu(res.data.menuItem || res.data || []);
      
      console.log("Menu data loaded:", res.data.menuItem);

    } catch (error) {
      console.error(error);

      toast.error(
        error?.response?.data?.message || "Something went wrong",
        {
          style: {
            border: "1px solid #713200",
            padding: "16px",
          },
        }
      );
    }
  };

  return (
    <menuContext.Provider value={{ menu, loadMenu, setMenu }}>
      {children}
    </menuContext.Provider>
  );
}