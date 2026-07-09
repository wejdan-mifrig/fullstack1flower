import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import adminVideo from "../../../assets/video/admin.mp4";

import { UserContext } from "../../../Context/AuthContext.jsx";
import Title from "../../Admin/AdminComponants/Title.jsx";
import ReportCard from "../../Admin/AdminComponants/ReportCard.jsx";
import { categoriesContext } from "../../../Context/CategoriesContext.jsx";
import { menuContext } from "../../../Context/MenuContext.jsx";

import { Grid, Box, Typography } from "@mui/material";
import AdminNavbar from "../../../Components/NavUserAdmin/Navadmin.jsx";

export default function Admin() {
  const navigate = useNavigate();

  const { user, users, allUsers, authorizedUser } = useContext(UserContext);
  const { loadCategories, categories } = useContext(categoriesContext);
  const { loadMenu, menu } = useContext(menuContext);

  useEffect(() => {
    authorizedUser();
    allUsers();
    loadCategories();
    loadMenu();
  }, []);

  return (
    <Box sx={{ minHeight: "100vh", position: "relative" }}>

      {/* VIDEO BACKGROUND */}
      <Box sx={{ position: "fixed", inset: 0, zIndex: 0 }}>
        <video
          src={adminVideo}
          autoPlay
          muted
          loop
          playsInline
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </Box>

      {/* CONTENT */}
      <Box sx={{ position: "relative", zIndex: 1 }}>

        <AdminNavbar />
        <Box sx={{ pt: "64px" }} />

        {/* HERO */}
        <Box
          sx={{
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            color: "#fff",
          }}
        >
          <Box>

            <Typography
              sx={{
                color: "#fff",
                fontSize: { xs: "3rem", md: "5rem" },
                fontWeight: 900,
                letterSpacing: "6px",
                fontFamily: "'Poppins', 'Arial', sans-serif",
                textTransform: "uppercase",
                textShadow: "0 10px 30px rgba(0,0,0,0.5)",
              }}
            >
              Hello {user?.name || "Admin"}
            </Typography>

            <Typography
              sx={{
                mt: 2,
                color: "#fff",
                fontSize: "1.4rem",
                opacity: 0.9,
                letterSpacing: "2px",
              }}
            >
              Welcome back to ADMIN dashboard
            </Typography>

            <Typography
              sx={{
                mt: 4,
                color: "#fff",
                fontSize: "1rem",
                opacity: 0.7,
              }}
            >
              Scroll down to explore
            </Typography>

          </Box>
        </Box>

        {/* DASHBOARD */}
        <Box sx={{ py: 8, display: "flex", justifyContent: "center" }}>
          <Box sx={{ width: "90%", maxWidth: "1200px" }}>

            {/* TITLE */}
            <Box sx={{ textAlign: "center", mb: 6 }}>

              <Typography
                sx={{
                  color: "#fff",
                  fontSize: "2.6rem",
                  fontWeight: "800",
                  letterSpacing: 2,
                }}
              >
                Dashboard Overview
              </Typography>

              <Typography
                sx={{
                  color: "rgba(255,255,255,0.8)",
                  mt: 1,
                  fontSize: "1.1rem",
                }}
              >
                Reports & analytics
              </Typography>

            </Box>

            {/* CARDS */}
            <Grid container spacing={4}>

              {[
                {
                  name: "Users",
                  number: users?.length || 0,
                  path: "/admin/users",
                },
                {
                  name: "Menu",
                  number: menu?.length || 0,
                  path: "/admin/products",
                },
                {
                  name: "Categories",
                  number: categories?.length || 0,
                  path: "/admin/categories",
                },
              ].map((item) => (
                <Grid key={item.name} size={{ xs: 12, sm: 6, md: 4 }}>
                  <Box
                    onClick={() => navigate(item.path)}
                    sx={{
                      cursor: "pointer",
                      borderRadius: 4,
                      p: 3,
                      backdropFilter: "blur(16px)",
                      backgroundColor: "rgba(255,255,255,0.06)",
                      transition: "0.3s",

                      "&:hover": {
                        transform: "translateY(-6px)",
                        backgroundColor: "rgba(255,255,255,0.1)",
                      },
                    }}
                  >
                    <Typography
                      sx={{
                        color: "#727b6f",
                        fontSize: "1.1rem",
                        fontWeight: "600",
                      }}
                    >
                      {item.name}
                    </Typography>

                    <Typography
                      sx={{
                        color: "#727b6f",
                        fontSize: "2.2rem",
                        fontWeight: "bold",
                        mt: 1,
                      }}
                    >
                      {item.number}
                    </Typography>

                    <Typography
                      sx={{
                        color: "rgba(255,255,255,0.7)",
                        fontSize: "0.9rem",
                        mt: 1,
                      }}
                    >
                      Click to view details
                    </Typography>
                  </Box>
                </Grid>
              ))}

            </Grid>

            {/* SPACE */}
            <Box sx={{ height: 80 }} />

            {/* ABOUT SECTION */}
            <Box sx={{ textAlign: "center", p: 4 }}>
              <Typography
                sx={{
                  color: "#fff",
                  fontSize: "1.6rem",
                  fontWeight: "600",
                  opacity: 0.9,
                }}
              >
                Our platform helps you manage users, products, and categories
                in a simple, fast, and modern way.
              </Typography>
            </Box>

          </Box>
        </Box>

      </Box>
    </Box>
  );
}