import {
  Container,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  InputAdornment,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { useContext, useEffect, useState, useMemo } from "react";
import { categoriesContext } from "../../../Context/CategoriesContext.jsx";

import AdminNavbar from "../../../Components/NavUserAdmin/Navadmin.jsx";

export default function ManageCategory() {
  const {
    loadCategories,
    categories,
    addCategory,
    updateCategory,
    deleteCategory,
  } = useContext(categoriesContext);

  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [name, setName] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadCategories();
  }, []);

  const filteredCategories = useMemo(() => {
    return categories?.filter((cat) =>
      cat?.name?.toLowerCase().includes(search.toLowerCase())
    );
  }, [categories, search]);

  const handleAddOpen = () => {
    setEditMode(false);
    setName("");
    setOpen(true);
  };

  const handleEditOpen = (cat) => {
    setEditMode(true);
    setSelectedId(cat.id);
    setName(cat.name);
    setOpen(true);
  };

  const handleSave = async () => {
    if (editMode) {
      await updateCategory(selectedId, { name });
    } else {
      await addCategory({ name });
    }

    setOpen(false);
    setName("");
  };

  const handleDelete = async (id) => {
    await deleteCategory(id);
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
              <Typography
                variant="h4"
                sx={{
                  fontWeight: "bold",
                  color: "#1f3d2b",
                }}
              >
                Categories Management
              </Typography>

              <Button
                variant="contained"
                onClick={handleAddOpen}
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
                + Add Category
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
                display: "flex",
                justifyContent: "flex-end",
                mb: 3,
              }}
            >
              <TextField
                size="small"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search categories..."
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
                    <TableCell>ID</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {filteredCategories?.map((cat) => (
                    <TableRow key={cat.id}>
                      <TableCell>{cat.id}</TableCell>
                      <TableCell>{cat.name}</TableCell>

                      <TableCell align="right">
                        <IconButton
                          onClick={() => handleEditOpen(cat)}
                          sx={{ color: "#6f8a67" }}
                        >
                          <EditIcon />
                        </IconButton>

                        <IconButton
                          onClick={() => handleDelete(cat.id)}
                          sx={{ color: "#c62828" }}
                        >
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

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">

        <DialogTitle sx={{ fontWeight: "bold", color: "#1f3d2b" }}>
          {editMode ? "Edit Category" : "Add Category"}
        </DialogTitle>

        <DialogContent>
          <TextField
            fullWidth
            label="Category Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            sx={{
              mt: 1,
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
              },
            }}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>

          <Button
            variant="contained"
            onClick={handleSave}
            sx={{
              backgroundColor: "#6f8a67",
              "&:hover": {
                backgroundColor: "#5f6f5a",
              },
            }}
          >
            Save
          </Button>
        </DialogActions>

      </Dialog>
    </>
  );
}