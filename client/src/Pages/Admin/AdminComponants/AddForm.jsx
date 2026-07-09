import { Box, Button, Paper, TextField, Container } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { UserContext } from "../../../Context/AuthContext.jsx";
import Title from "./Title";
import toast from "react-hot-toast";
import api from "../../../api";
import AdminNavbar from "../../../Components/NavUserAdmin/Navadmin.jsx";

export default function AddForm() {
  const { type } = useParams();
  const navigate = useNavigate();
  const { allUsers } = useContext(UserContext);

  const [formData, setFormData] = useState({});

  const forms = {
    user: [
      { name: "name", label: "Name" },
      { name: "email", label: "Email", type: "email" },
      { name: "password", label: "Password", type: "password" },
      {
        name: "confirmPassword",
        label: "Confirm Password",
        type: "password",
      },
    ],

    category: [{ name: "name", label: "Category Name" }],

    menu: [
      { name: "name", label: "Name" },
      { name: "description", label: "Description" },
      { name: "image", label: "Image URL" },
      { name: "catId", label: "Category ID", type: "number" },
    ],
  };

  const fields = forms[type] || [];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      switch (type) {
        case "user":
          if (formData.password !== formData.confirmPassword) {
            return toast.error("Passwords do not match");
          }

          await api.post("/user/create", {
            name: formData.name,
            email: formData.email,
            password: formData.password,
          });

          toast.success("User created successfully");
          allUsers();
          navigate("/admin/users");
          break;

        case "category":
          toast("Category not implemented yet");
          break;

        case "menu":
          toast("Menu not implemented yet");
          break;

        default:
          toast.error("Unknown type");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <>
      <AdminNavbar />

      <Box
        sx={{
          minHeight: "100vh",
          background: "#6f8a67",
          pt: 12,
          pb: 6,
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          px: 2,
        }}
      >
        <Container maxWidth="sm">
         
         {/* FORM */}
<Paper
  elevation={0}
  sx={{
    p: 4,
    borderRadius: 4,
    background: "#fcfcfb",
    border: "1px solid #e3e8e0",
    boxShadow: "0 18px 45px rgba(0,0,0,.15)",
  }}
>
  <Box sx={{ mb: 4 }}>
    <Title
      variant="h4"
      label={`Add ${type.charAt(0).toUpperCase() + type.slice(1)}`}
      sx={{
        color: "#6f8a67",
        fontWeight: "bold",
      }}
    />
  </Box>

  <Box
    component="form"
    onSubmit={handleSubmit}
    sx={{
      display: "flex",
      flexDirection: "column",
      gap: 2.5,
    }}
  >
    {fields.map((field) => (
      <TextField
        key={field.name}
        name={field.name}
        label={field.label}
        type={field.type || "text"}
        value={formData[field.name] || ""}
        onChange={handleChange}
        fullWidth
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: 2,
            backgroundColor: "#f9faf8",
          },
        }}
      />
    ))}

    <Button
      type="submit"
      variant="contained"
      sx={{
        mt: 1,
        py: 1.4,
        borderRadius: 3,
        backgroundColor: "#6f8a67",
        fontWeight: "bold",
        fontSize: "1rem",
        textTransform: "none",
        "&:hover": {
          backgroundColor: "#5d7556",
        },
      }}
    >
      Add {type}
    </Button>
  </Box>
</Paper>
        </Container>
      </Box>
    </>
  );
}