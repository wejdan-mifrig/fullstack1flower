import toast from "react-hot-toast";
import {
  Container,
  Typography,
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  MenuItem,
  Stack,
  CircularProgress,
  InputAdornment,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { useContext, useEffect, useState, useMemo } from "react";
import { menuContext } from "../../../Context/MenuContext.jsx";
import { categoriesContext } from "../../../Context/CategoriesContext.jsx";

import api from "../../../api";

import AdminNavbar from "../../../Components/NavUserAdmin/Navadmin.jsx";

export default function AdminPro() {
  const { menu, loadMenu } = useContext(menuContext);
  const { categories, loadCategories } = useContext(categoriesContext);

  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  const [form, setForm] = useState({
    name: "",
    description: "",
    category_id: "",
  });

  useEffect(() => {
    loadMenu();
    loadCategories();
  }, []);

  const handleOpen = (item = null) => {
    if (item) {
      setEditId(item.id);
      setForm({
        name: item.name,
        description: item.description,
        category_id: item.category_id,
      });
    } else {
      setEditId(null);
      setForm({
        name: "",
        description: "",
        category_id: "",
      });
    }

    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditId(null);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      setLoading(true);

      if (editId) {
        const res = await api.put(`/menu/${editId}`, form);
        toast.success(res.data.message || "Updated successfully");
      } else {
        const res = await api.post(`/menu`, form);
        toast.success(res.data.message || "Created successfully");
      }

      handleClose();
      loadMenu();
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await api.delete(`/menu/${id}`);
      toast.success(res.data.message || "Deleted successfully");
      loadMenu();
    } catch (err) {
      toast.error(err.response?.data?.message || "Delete failed");
    }
  };

  const filteredMenu = useMemo(() => {
    return menu?.filter((item) => {
      const keyword = search.toLowerCase();

      return (
        item?.name?.toLowerCase().includes(keyword) ||
        item?.description?.toLowerCase().includes(keyword) ||
        item?.category_name?.toLowerCase().includes(keyword)
      );
    });
  }, [menu, search]);

  return (
    <>
      <AdminNavbar />

      <Box
        sx={{
          minHeight: "100vh",
          background: "#6f8a67",
          pt: 12,
          pb: 6,
        }}
      >
        <Container maxWidth="xl">

          <Paper
            elevation={0}
            sx={{
              p: 4,
              mb: 4,
              borderRadius: 4,
              backgroundColor: "#fff",
              boxShadow: "0 18px 45px rgba(0,0,0,.15)",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: 2,
              }}
            >
              <Typography variant="h4">
                Menu Management
              </Typography>

              <Button
                variant="contained"
                onClick={() => handleOpen()}
                sx={{
                  backgroundColor: "#6f8a67",
                  px: 3,
                  py: 1.2,
                  borderRadius: 3,
                  fontWeight: "bold",
                  "&:hover": {
                    backgroundColor: "#5f6f5a",
                  },
                }}
              >
                + Add Item
              </Button>
            </Box>
          </Paper>

          <Paper
            elevation={0}
            sx={{
              p: 4,
              borderRadius: 5,
              backgroundColor: "#fff",
              boxShadow: "0 15px 45px rgba(0,0,0,.15)",
            }}
          >

            <Box
              sx={{
                mb: 3,
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <TextField
                size="small"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search menu..."
                sx={{
                  width: { xs: "100%", sm: 320 },
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 3,
                    backgroundColor: "#f7f7f7",
                  },
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ color: "#6f8a67" }} />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>

            <TableContainer>
              <Table>

                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Category</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {filteredMenu?.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.description}</TableCell>
                      <TableCell>
                        {item.category_name || "No Category"}
                      </TableCell>

                      <TableCell align="right">
                        <IconButton onClick={() => handleOpen(item)}>
                          <EditIcon />
                        </IconButton>

                        <IconButton onClick={() => handleDelete(item.id)}>
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>

              </Table>
            </TableContainer>

          </Paper>

        </Container>
      </Box>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>
          {editId ? "Edit Item" : "Add Item"}
        </DialogTitle>

        <DialogContent>
          <Stack spacing={2} mt={1}>
            <TextField
              label="Name"
              name="name"
              value={form.name}
              onChange={handleChange}
              fullWidth
            />

            <TextField
              label="Description"
              name="description"
              value={form.description}
              onChange={handleChange}
              fullWidth
            />

            <TextField
              select
              label="Category"
              name="category_id"
              value={form.category_id}
              onChange={handleChange}
              fullWidth
            >
              {categories?.map((cat) => (
                <MenuItem key={cat.id} value={cat.id}>
                  {cat.name}
                </MenuItem>
              ))}
            </TextField>

            <Button
              variant="contained"
              onClick={handleSave}
              disabled={loading}
              sx={{
                backgroundColor: "#6f8a67",
                "&:hover": {
                  backgroundColor: "#5f6f5a",
                },
              }}
            >
              {loading ? (
                <CircularProgress size={20} />
              ) : (
                "Save"
              )}
            </Button>
          </Stack>
        </DialogContent>
      </Dialog>
    </>
  );
}