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
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

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
    price: "",
    category_id: "",
  });
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    loadMenu();
    loadCategories();
  }, []);

  const handleOpen = (item = null) => {
    if (item) {
      setEditId(item.id);
      setForm({
        name: item.name || "",
        description: item.description || "",
        price: item.price !== undefined && item.price !== null ? item.price : "",
        category_id: item.category_id || "",
      });
    } else {
      setEditId(null);
      setForm({
        name: "",
        description: "",
        price: "",
        category_id: "",
      });
    }
    setImageFile(null);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditId(null);
    setImageFile(null);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSave = async () => {
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("description", form.description);
      formData.append("price", form.price);
      formData.append("category_id", form.category_id);

      if (imageFile) {
        formData.append("image", imageFile);
      }

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      if (editId) {
        const res = await api.put(`/menu/${editId}`, formData, config);
        toast.success(res.data.message || "Updated successfully");
      } else {
        const res = await api.post(`/menu`, formData, config);
        toast.success(res.data.message || "Created successfully");
      }

      handleClose();
      await loadMenu(); // ✅ جلب المنيو المحدثة من السيرفر فوراً
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;

    try {
      const res = await api.delete(`/menu/${id}`);
      toast.success(res.data.message || "Deleted successfully");
      await loadMenu();
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
              <Typography variant="h4">Menu Management</Typography>

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
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon sx={{ color: "#6f8a67" }} />
                      </InputAdornment>
                    ),
                  },
                }}
              />
            </Box>

            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell>Category</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {filteredMenu?.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.description}</TableCell>
                      
                      {/* ✅ عرض السعر مع التأكد من تحويل الرقم */}
                      <TableCell sx={{ fontWeight: "bold", color: "#6f8a67" }}>
                        ${item.price !== undefined && item.price !== null ? Number(item.price).toFixed(2) : "0.00"}
                      </TableCell>
                      
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

      {/* Dialog إضافة / تعديل منتج */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>{editId ? "Edit Item" : "Add Item"}</DialogTitle>

        <DialogContent>
          <Stack spacing={2} mt={1}>
            <TextField
              label="Name"
              name="name"
              value={form.name}
              onChange={handleChange}
              fullWidth
              required
            />

            <TextField
              label="Description"
              name="description"
              value={form.description}
              onChange={handleChange}
              fullWidth
              multiline
              rows={2}
            />

            {/* ✅ حقل السعر المحدث باستخدام slotProps للتخلص من تحذيرات MUI */}
            <TextField
              label="Price ($)"
              name="price"
              type="number"
              slotProps={{
                htmlInput: { step: "0.01" },
              }}
              value={form.price}
              onChange={handleChange}
              fullWidth
              required
            />

            <TextField
              select
              label="Category"
              name="category_id"
              value={form.category_id}
              onChange={handleChange}
              fullWidth
              required
            >
              {categories?.map((cat) => (
                <MenuItem key={cat.id} value={cat.id}>
                  {cat.name}
                </MenuItem>
              ))}
            </TextField>

            <Button
              variant="outlined"
              component="label"
              startIcon={<CloudUploadIcon />}
              sx={{
                borderColor: "#6f8a67",
                color: "#6f8a67",
                "&:hover": { borderColor: "#5f6f5a", color: "#5f6f5a" },
              }}
            >
              Upload Image
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handleImageChange}
              />
            </Button>

            {imageFile && (
              <Typography variant="caption" color="textSecondary">
                Selected file: {imageFile.name}
              </Typography>
            )}

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
              {loading ? <CircularProgress size={20} /> : "Save"}
            </Button>
          </Stack>
        </DialogContent>
      </Dialog>
    </>
  );
}