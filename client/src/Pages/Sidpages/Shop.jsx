import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Grid,
  Card,
  CardMedia,
  Typography,
  CircularProgress,
  Button,
  Container,
  Dialog,
  DialogContent,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Footer from "../../Components/Footer/Footer.jsx";
import Navbar from "../../Components/Navhero/Nav.jsx";
import { categoriesContext } from "../../Context/CategoriesContext.jsx";
import { menuContext } from "../../Context/MenuContext.jsx";
import { useNavigate } from "react-router-dom";

const colors = {
  primaryGreen: "#3e4a3a",
  background: "#f4f1ea",
  textPrimary: "#f4f1ea",
  textDark: "#1c1b18",
  textSecondary: "#d6d1c4",
};

const Shop = () => {
  const { categories, loadCategories } = useContext(categoriesContext);
  const { menu, loadMenu } = useContext(menuContext);

  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([loadCategories(), loadMenu()]);
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: colors.primaryGreen,
        }}
      >
        <CircularProgress sx={{ color: colors.textPrimary }} />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: colors.primaryGreen,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Navbar />

      <Container
        maxWidth="lg"
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        {categories.map((category) => {
          const categoryProducts = menu.filter(
            (item) => item.category_name === category.name
          );

          return (
            <Box
              key={category.id}
              sx={{
                mb: 10,
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
           
              <Typography
                sx={{
                  mt: 20,
                  mb: 2,
                  fontSize: "2.5rem",
                  fontWeight: "bold",
                  color: colors.textPrimary,
                  textAlign: "center",
                }}
              >
                {category.name}
              </Typography>

         
              <Typography
                sx={{
                  color: colors.textSecondary,
                  maxWidth: 700,
                  mb: 4,
                  textAlign: "center",
                }}
              >
                {category.description ||
                  "High-quality curated items made with care and attention."}
              </Typography>

         
              <Box
                sx={{
                  width: "100%",
                  mb: 6,
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <video
                  width="100%"
                  height="auto"
                  controls
                  style={{ borderRadius: "8px", maxWidth: "1200px" }}
                >
                  <source src={category.video_url} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </Box>

              <Typography
                sx={{
                  color: colors.textSecondary,
                  mb: 4,
                  fontStyle: "italic",
                }}
              >
                {category.video_title || "Explore our collection"}
              </Typography>

              <Grid container spacing={4} justifyContent="center">
                {categoryProducts.map((product) => (
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={4}
                    key={product.id}
                    sx={{ display: "flex", justifyContent: "center" }}
                  >
                    <Card
                      sx={{
                        width: 360,
                        borderRadius: 3,
                        overflow: "hidden",
                        backgroundColor: colors.background,
                        boxShadow: 5,
                        transition: "0.3s",
                        "&:hover": { transform: "translateY(-8px)" },
                      }}
                    >
                      <CardMedia
                        component="img"
                        height="270"
                        image={product.image}
                        alt={product.name}
                      />
                      <Box p={2}>
                        <Button
                          fullWidth
                          variant="contained"
                          sx={{ backgroundColor: colors.primaryGreen }}
                          onClick={() => setSelectedProduct(product)}
                        >
                          More About Me
                        </Button>
                      </Box>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
          );
        })}
      </Container>

     
      <Dialog
        open={Boolean(selectedProduct)}
        onClose={() => setSelectedProduct(null)}
        fullWidth
        maxWidth="sm"
      >
        {selectedProduct && (
          <Box sx={{ backgroundColor: colors.background }}>
            <Box display="flex" justifyContent="flex-end" p={1}>
              <IconButton onClick={() => setSelectedProduct(null)}>
                <CloseIcon />
              </IconButton>
            </Box>

            <DialogContent sx={{ textAlign: "center" }}>
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                style={{
                  width: "100%",
                  borderRadius: 12,
                  marginBottom: 15,
                }}
              />

              <Typography
                sx={{
                  fontSize: "1.8rem",
                  fontWeight: "bold",
                  color: colors.textDark,
                }}
              >
                {selectedProduct.name}
              </Typography>

              <Typography sx={{ color: "#666", mb: 2 }}>
                {selectedProduct.description}
              </Typography>

              <Button
                fullWidth
                variant="contained"
                sx={{ backgroundColor: colors.primaryGreen }}
                onClick={() => {
                  const token = localStorage.getItem("token");

                  if (!token) {
                    navigate("/login");
                  } else {
                    console.log("added to cart");
                  }
                }}
              >
                Add to Cart
              </Button>
            </DialogContent>
          </Box>
        )}
      </Dialog>

      <Footer />
    </Box>
  );
};

export default Shop;