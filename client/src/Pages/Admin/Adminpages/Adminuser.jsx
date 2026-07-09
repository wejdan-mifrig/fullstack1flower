import { useContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Container,
  LinearProgress,
  Box,
  Paper,
  TextField,
  InputAdornment,
  Button,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";

import { UserContext } from "../../../Context/AuthContext.jsx";

import AdminNavbar from "../../../Components/NavUserAdmin/Navadmin.jsx";
import Title from "../AdminComponants/Title.jsx";
import TableData from "../AdminComponants/TableData.jsx";

export default function AdminUser() {
  const { users, allUsers, loading, deleteUser } =
    useContext(UserContext);

  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  useEffect(() => {
    allUsers();
  }, []);

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const keyword = search.toLowerCase();

      return (
        user?.name?.toLowerCase().includes(keyword) ||
        user?.email?.toLowerCase().includes(keyword) ||
        user?.role?.toLowerCase().includes(keyword)
      );
    });
  }, [users, search]);

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
              p: 3,
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
              <Box>
                <Title
                  label="Users Management"
                  variant="h4"
                  caption="Manage all system users"
                />
              </Box>

              <Button
                onClick={() => navigate("/admin/add/user")}
                startIcon={<AddIcon />}
                sx={{
                  backgroundColor: "#6f8a67",
                  color: "#fff",
                  px: 4,
                  py: 1.5,
                  borderRadius: 3,
                  fontWeight: "bold",
                  fontSize: "0.9rem",
                  boxShadow: "0 10px 25px rgba(111,138,103,.35)",
                  transition: "0.3s",

                  "&:hover": {
                    backgroundColor: "#5f6f5a",
                    transform: "translateY(-2px)",
                    boxShadow: "0 15px 30px rgba(111,138,103,.45)",
                  },
                }}
              >
                Add User
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
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search users..."
                size="small"
                sx={{
                  width: {
                    xs: "100%",
                    sm: 320,
                  },

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

            {loading && (
              <LinearProgress
                sx={{
                  mb: 3,
                  height: 6,
                  borderRadius: 5,
                  backgroundColor: "#d8dfd4",
                  "& .MuiLinearProgress-bar": {
                    backgroundColor: "#6f8a67",
                  },
                }}
              />
            )}

            <TableData
              data={filteredUsers}
              onDelete={deleteUser}
            />
          </Paper>

        </Container>
      </Box>
    </>
  );
}