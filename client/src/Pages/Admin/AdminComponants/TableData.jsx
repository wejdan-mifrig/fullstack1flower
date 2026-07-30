import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Tooltip,
  Chip,
  Avatar,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function TableData({ data, onDelete }) {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  if (!data || data.length === 0) {
    return <Typography sx={{ mt: 2 }}>No data available</Typography>;
  }

  const headers = ["id", "name", "email", "role", "created_at"];

  const handleOpenDelete = (id) => {
    setSelectedId(id);
    setOpen(true);
  };

  const handleConfirmDelete = () => {
    if (onDelete && selectedId) {
      onDelete(selectedId);
    }
    setOpen(false);
    setSelectedId(null);
  };

  return (
    <>
      <TableContainer component={Paper} sx={{ mt: 2, borderRadius: 2 }}>
        <Table>

          <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
            <TableRow>
              {headers.map((header) => (
                <TableCell key={header} sx={{ fontWeight: "bold" }}>
                  {header.toUpperCase()}
                </TableCell>
              ))}
              <TableCell sx={{ fontWeight: "bold" }}>
                ACTIONS
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {data.map((row) => (
              <TableRow key={row.id} hover>

                {headers.map((header) => (
                  <TableCell key={header}>

                    {/* NAME with avatar */}
                    {header === "name" ? (
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <Avatar sx={{ width: 30, height: 30 }}>
                          {row.name?.charAt(0)}
                        </Avatar>
                        {row.name}
                      </Box>
                    ) : header === "role" ? (

                      <Chip
                        label={row.role}
                        size="small"
                        color={row.role === "admin" ? "error" : "primary"}
                      />

                    ) : (
                      row[header]
                    )}

                  </TableCell>
                ))}

                <TableCell>
                  <Box sx={{ display: "flex", gap: 1 }}>

                    <Tooltip title="Edit User">
                      <IconButton
                        color="primary"
                        onClick={() => navigate(`/edit/user/${row.id}`)}
                      >
                        <EditIcon />
                      </IconButton>
                    </Tooltip>

                    <Tooltip title="Delete User">
                      <IconButton
                        color="error"
                        onClick={() => handleOpenDelete(row.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>

                  </Box>
                </TableCell>

              </TableRow>
            ))}
          </TableBody>

        </Table>
      </TableContainer>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Delete User</DialogTitle>

        <DialogContent>
          Are you sure you want to delete this user?
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpen(false)}>
            Cancel
          </Button>

          <Button
            variant="contained"
            color="error"
            onClick={handleConfirmDelete}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}