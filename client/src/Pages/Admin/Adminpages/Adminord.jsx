import React from "react";
import { Box, Typography, Container } from "@mui/material";
import AdminNavbar from "../../../Components/NavUserAdmin/Navadmin.jsx";

const AdminOrders = () => {
  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f5f5f5" }}>
      <AdminNavbar />
      
      <Container maxWidth="xl" sx={{ pt: 12, pb: 4 }}>
        <Typography variant="h4" fontWeight="bold" sx={{ color: "#1a1a1a" }}>
          Hello, Orders Page! 👋
        </Typography>
        
        <Typography variant="body1" sx={{ color: "#777", mt: 2 }}>
          This is the orders management page.
        </Typography>
      </Container>
      

    </Box>
  );
};

export default AdminOrders;