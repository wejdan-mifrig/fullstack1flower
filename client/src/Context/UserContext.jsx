import { createContext, useState } from "react";
import api from "../api"; 
import toast from "react-hot-toast"; 

export const UserContext = createContext(null);

export default function UserProvider({ children }) {
    const [user, setUser] = useState(null);
    const [users, setUsers] = useState([]); 

    const currentUser = async () => {
        try {
            const res = await api.get("/auth/me");
            setUser(res.data.user);
        } catch (error) {
            console.error(error.response?.data?.message);
            toast.error(error.response?.data?.message || "something went wrong", {
                style: {
                    border: "1px solid #713200",
                    padding: "16px",
                    color: "error.main",
                },
                iconTheme: {
                    primary: "error.main",
                    secondary: "#FFFAEE",
                },
            });
        }
    };

    const allUsers = async () => {
        try {
            const res = await api.get("/all-users");
            setUsers(res.data.users);
        } catch (error) {
            console.error(error.response?.data?.message);
            toast.error(error.response?.data?.message || "something went wrong", {
                style: {
                    border: "1px solid #713200",
                    padding: "16px",
                    color: "error.main",
                },
                iconTheme: {
                    primary: "error.main",
                    secondary: "#FFFAEE",
                },
            });
        }
    };

    return (
        <UserContext.Provider value={{ currentUser, user, setUser, users, allUsers }}>
            {children}
        </UserContext.Provider>
    );
}