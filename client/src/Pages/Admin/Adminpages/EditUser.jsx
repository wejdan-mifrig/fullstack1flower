import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, TextField, Button, Paper, Typography } from "@mui/material";
import api from "../../../api";
import { UserContext } from "../../../Context/AuthContext";
import toast from "react-hot-toast";

export default function EditUser() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { updateUser } = useContext(UserContext);

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "",
    password: "",
  });

  const getUser = async () => {
    try {
      const res = await api.get(`/user-id/${id}`);

      setForm({
        name: res.data.user.name || "",
        email: res.data.user.email || "",
        role: res.data.user.role || "",
        password: "",
      });
    } catch (err) {
      console.log(err);
      toast.error("Failed to load user");
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const payload = {
        name: form.name,
        email: form.email,
        role: form.role,
      };

      if (form.password && form.password.trim() !== "") {
        payload.password = form.password;
      }

      await updateUser(id, payload);

      toast.success("User updated successfully");

      navigate("/admin/users");
    } catch (err) {
      console.log(err);
      toast.error("Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 500, mx: "auto", mt: 5 }}>
      <Paper
        sx={{
          p: 3,
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Typography variant="h5" fontWeight="bold">
          Edit User
        </Typography>

        <TextField
          name="name"
          label="Name"
          value={form.name}
          onChange={handleChange}
          fullWidth
        />

        <TextField
          name="email"
          label="Email"
          value={form.email}
          onChange={handleChange}
          fullWidth
        />

        <TextField
          name="role"
          label="Role"
          value={form.role}
          onChange={handleChange}
          fullWidth
        />

        <TextField
          name="password"
          label="New Password"
          type="password"
          value={form.password}
          onChange={handleChange}
          fullWidth
        />

        <Button variant="contained" onClick={handleSubmit} disabled={loading}>
          {loading ? "Saving..." : "Save Changes"}
        </Button>

        <Button color="error" onClick={() => navigate("/admin/users")}>
          Cancel
        </Button>
      </Paper>
    </Box>
  );
}
