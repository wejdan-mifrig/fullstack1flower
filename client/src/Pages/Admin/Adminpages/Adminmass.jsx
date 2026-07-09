import { useEffect, useState, useMemo } from "react";
import api from "../../../api.js";

import {
  Box,
  Typography,
  Paper,
  IconButton,
  Stack,
  Divider,
  CircularProgress,
  Chip,
  Button,
  Container,
  TextField,
  InputAdornment,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import DeleteIcon from "@mui/icons-material/Delete";
import DraftsIcon from "@mui/icons-material/Drafts";
import MarkEmailReadIcon from "@mui/icons-material/MarkEmailRead";

import AdminNavbar from "../../../Components/NavUserAdmin/Navadmin.jsx";

export default function Adminmass() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchMessages = async () => {
    try {
      const res = await api.get("/messages");
      setMessages(res.data);
    } catch (err) {
      console.log("GET ERROR:", err);
    } finally {
      setLoading(false);
    }
  };

  const deleteMessage = async (id) => {
    try {
      await api.delete(`/messages/${id}`);
      setMessages((prev) => prev.filter((m) => m.id !== id));
    } catch (err) {
      console.log("DELETE ERROR:", err);
    }
  };

  const markAsRead = async (id) => {
    try {
      await api.patch(`/messages/${id}/read`);

      setMessages((prev) =>
        prev.map((m) =>
          m.id === id ? { ...m, is_read: true } : m
        )
      );
    } catch (err) {
      console.log("MARK READ ERROR:", err);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const filteredMessages = useMemo(() => {
    return messages.filter((msg) => {
      const keyword = search.toLowerCase();

      return (
        msg?.name?.toLowerCase().includes(keyword) ||
        msg?.email?.toLowerCase().includes(keyword) ||
        msg?.message?.toLowerCase().includes(keyword)
      );
    });
  }, [messages, search]);

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

          <Box sx={{ mb: 4, textAlign: "center",mt:3 }}>
            <Typography
              variant="h4"
              sx={{
                fontWeight: "bold",
                color: "#1f3d2b",
              }}
            >
              Messages Dashboard
            </Typography>

            <Typography sx={{ color: "#e9efe6", mt: 1 }}>
              Manage user messages (read / unread / delete)
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mb: 3,
            }}
          >
            <TextField
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search messages..."
              size="small"
              sx={{
                width: { xs: "100%", sm: 420 },
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

          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Box sx={{ width: "100%", maxWidth: "650px" }}>

              {loading ? (
                <Box sx={{ display: "flex", justifyContent: "center", mt: 8 }}>
                  <CircularProgress sx={{ color: "#1f3d2b" }} />
                </Box>
              ) : (
                <Stack spacing={2}>

                  {filteredMessages.length === 0 ? (
                    <Paper sx={{ p: 3, textAlign: "center" }}>
                      <Typography sx={{ color: "#777" }}>
                        No messages found
                      </Typography>
                    </Paper>
                  ) : (
                    filteredMessages.map((msg) => (
                      <Paper
                        key={msg.id}
                        elevation={0}
                        sx={{
                          p: 3,
                          borderRadius: 4,
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "flex-start",
                          backgroundColor: "#fff",
                          boxShadow: "0 10px 30px rgba(0,0,0,.12)",
                          borderLeft: msg.is_read
                            ? "4px solid #cfcfcf"
                            : "4px solid #6f8a67",
                          transition: "0.25s",
                          "&:hover": {
                            transform: "translateY(-3px)",
                            boxShadow: "0 15px 40px rgba(0,0,0,.18)",
                          },
                        }}
                      >
                        <Box sx={{ width: "100%" }}>

                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                            }}
                          >
                            <Typography
                              sx={{
                                fontWeight: "bold",
                                color: "#1f3d2b",
                              }}
                            >
                              {msg.name}
                            </Typography>

                            <Chip
                              label={msg.is_read ? "Read" : "Unread"}
                              size="small"
                              icon={
                                msg.is_read ? (
                                  <DraftsIcon />
                                ) : (
                                  <MarkEmailReadIcon />
                                )
                              }
                              sx={{
                                bgcolor: msg.is_read ? "#e0e0e0" : "#c8e6c9",
                                color: "#1f3d2b",
                                fontWeight: "bold",
                              }}
                            />
                          </Box>

                          <Typography sx={{ color: "#666", fontSize: 14 }}>
                            {msg.email}
                          </Typography>

                          <Divider sx={{ my: 1.5 }} />

                          <Typography sx={{ color: "#333" }}>
                            {msg.message}
                          </Typography>

                          <Typography
                            sx={{
                              mt: 2,
                              fontSize: 12,
                              color: "#888",
                            }}
                          >
                            {msg.created_at}
                          </Typography>

                          {!msg.is_read && (
                            <Button
                              onClick={() => markAsRead(msg.id)}
                              size="small"
                              sx={{
                                mt: 2,
                                color: "#6f8a67",
                                border: "1px solid #6f8a67",
                                borderRadius: 2,
                                "&:hover": {
                                  backgroundColor: "#6f8a67",
                                  color: "#fff",
                                },
                              }}
                            >
                              Mark as read
                            </Button>
                          )}
                        </Box>

                        <IconButton
                          onClick={() => deleteMessage(msg.id)}
                          sx={{ color: "#c62828", ml: 2 }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Paper>
                    ))
                  )}

                </Stack>
              )}

            </Box>
          </Box>

        </Container>
      </Box>
    </>
  );
}