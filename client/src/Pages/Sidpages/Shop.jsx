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

// White Flowers
import whiteTulip from "../../assets/images/white-tulip.jpg";
import whiteRoseBouquet from "../../assets/images/white-rose-bouquet.jpg";
import whiteLily from "../../assets/images/white-lily.jpg";
import whiteOrchid from "../../assets/images/white-orchid.jpg";
import whiteMix from "../../assets/images/white-mix.jpg";
import whiteGarden from "../../assets/images/white-garden.jpg";

// Red Flowers
import redRose from "../../assets/images/red-rose.jpg";
import redTulip from "../../assets/images/red-tulip.jpg";
import redMix from "../../assets/images/red-mix.jpg";
import luxRedRose from "../../assets/images/lux-red-rose.jpg";
import redLove from "../../assets/images/red-love.jpg";
import redGarden from "../../assets/images/red-garden.jpg";

// Pink Flowers
import pinkRose from "../../assets/images/pink-rose.jpg";
import pinkTulip from "../../assets/images/pink-tulip.jpg";
import pinkLily from "../../assets/images/pink-lily.jpg";
import pinkMix from "../../assets/images/pink-mix.jpg";
import pinkRomantic from "../../assets/images/pink-romantic.jpg";
import pinkGarden from "../../assets/images/pink-garden.jpg";

// Yellow Flowers
import sunflower from "../../assets/images/sunflower.jpg";
import yellowRose from "../../assets/images/yellow-rose.jpg";
import yellowTulip from "../../assets/images/yellow-tulip.jpg";
import yellowMix from "../../assets/images/yellow-mix.jpg";
import golden from "../../assets/images/golden.jpg";
import yellowGarden from "../../assets/images/yellow-garden.jpg";

// Purple Flowers
import purpleOrchid from "../../assets/images/purple-orchid.jpg";
import purpleRose from "../../assets/images/purple-rose.jpg";
import purpleTulip from "../../assets/images/purple-tulip.jpg";
import purpleMix from "../../assets/images/purple-mix.jpg";
import royalPurple from "../../assets/images/royal-purple.jpg";
import purpleGarden from "../../assets/images/purple-garden.jpg";

// Mixed Flowers
import springMix from "../../assets/images/spring-mix.jpg";
import rainbow from "../../assets/images/rainbow.jpg";
import luxMix from "../../assets/images/lux-mix.jpg";
import seasonal from "../../assets/images/seasonal.jpg";
import elegantMix from "../../assets/images/elegant-mix.jpg";

// Rose Bouquets
import classicRose from "../../assets/images/classic-rose.jpg";
import luxRose from "../../assets/images/lux-rose.jpg";
import romanticRose from "../../assets/images/romantic-rose.jpg";
import whiteRedRose from "../../assets/images/white-red-rose.jpg";
import pinkLuxRose from "../../assets/images/pink-lux-rose.jpg";
import royalRose from "../../assets/images/royal-rose.jpg";

// Wedding Flowers
import weddingWhite from "../../assets/images/wedding-white.jpg";
import bridalRose from "../../assets/images/bridal-rose.jpg";
import centerpiece from "../../assets/images/centerpiece.jpg";
import weddingSet from "../../assets/images/wedding-set.jpg";
import arch from "../../assets/images/arch.jpg";
import bridePremium from "../../assets/images/bride-premium.jpg";

// Birthday Flowers
import birthdaySurprise from "../../assets/images/birthday-surprise.jpg";
import birthdayRoses from "../../assets/images/birthday-roses.jpg";
import birthdayMix from "../../assets/images/birthday-mix.jpg";
import balloonSet from "../../assets/images/balloon-set.jpg";
import birthdayLux from "../../assets/images/birthday-lux.jpg";
import celebration from "../../assets/images/celebration.jpg";

// Gift Boxes
import chocoBox from "../../assets/images/choco-box.jpg";
import teddyBox from "../../assets/images/teddy-box.jpg";
import luxBox from "../../assets/images/lux-box.jpg";
import romanticBox from "../../assets/images/romantic-box.jpg";
import birthdayBox from "../../assets/images/birthday-box.jpg";
import specialBox from "../../assets/images/special-box.jpg";

const placeholder =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%233e4a3a'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='20' fill='%23f4f1ea' text-anchor='middle' dy='.3em'%3ENo Image%3C/text%3E%3C/svg%3E";

const colors = {
  primaryGreen: "#3e4a3a",
  background: "#f4f1ea",
  textPrimary: "#f4f1ea",
  textDark: "#1c1b18",
  textSecondary: "#d6d1c4",
  gold: "#d4a843",
  goldHover: "#c49a2f",
};

// ✅ رابط Backend الأساسي للصور المرفوعة من الأدمن
const API_BASE_URL = "http://localhost:3000";

const imagesMap = {
  // White Flowers
  "white-tulip.jpg": whiteTulip,
  "white-rose-bouquet.jpg": whiteRoseBouquet,
  "white-lily.jpg": whiteLily,
  "white-orchid.jpg": whiteOrchid,
  "white-mix.jpg": whiteMix,
  "white-garden.jpg": whiteGarden,

  // Red Flowers
  "red-rose.jpg": redRose,
  "red-tulip.jpg": redTulip,
  "red-mix.jpg": redMix,
  "lux-red-rose.jpg": luxRedRose,
  "red-love.jpg": redLove,
  "red-garden.jpg": redGarden,

  // Pink Flowers
  "pink-rose.jpg": pinkRose,
  "pink-tulip.jpg": pinkTulip,
  "pink-lily.jpg": pinkLily,
  "pink-mix.jpg": pinkMix,
  "pink-romantic.jpg": pinkRomantic,
  "pink-garden.jpg": pinkGarden,

  // Yellow Flowers
  "sunflower.jpg": sunflower,
  "yellow-rose.jpg": yellowRose,
  "yellow-tulip.jpg": yellowTulip,
  "yellow-mix.jpg": yellowMix,
  "golden.jpg": golden,
  "yellow-garden.jpg": yellowGarden,

  // Purple Flowers
  "purple-orchid.jpg": purpleOrchid,
  "purple-rose.jpg": purpleRose,
  "purple-tulip.jpg": purpleTulip,
  "purple-mix.jpg": purpleMix,
  "royal-purple.jpg": royalPurple,
  "purple-garden.jpg": purpleGarden,

  // Mixed Flowers
  "spring-mix.jpg": springMix,
  "rainbow.jpg": rainbow,
  "lux-mix.jpg": luxMix,
  "seasonal.jpg": seasonal,
  "elegant-mix.jpg": elegantMix,

  // Rose Bouquets
  "classic-rose.jpg": classicRose,
  "lux-rose.jpg": luxRose,
  "romantic-rose.jpg": romanticRose,
  "white-red-rose.jpg": whiteRedRose,
  "pink-lux-rose.jpg": pinkLuxRose,
  "royal-rose.jpg": royalRose,

  // Wedding Flowers
  "wedding-white.jpg": weddingWhite,
  "bridal-rose.jpg": bridalRose,
  "centerpiece.jpg": centerpiece,
  "wedding-set.jpg": weddingSet,
  "arch.jpg": arch,
  "bride-premium.jpg": bridePremium,

  // Birthday Flowers
  "birthday-surprise.jpg": birthdaySurprise,
  "birthday-roses.jpg": birthdayRoses,
  "birthday-mix.jpg": birthdayMix,
  "balloon-set.jpg": balloonSet,
  "birthday-lux.jpg": birthdayLux,
  "celebration.jpg": celebration,

  // Gift Boxes
  "choco-box.jpg": chocoBox,
  "teddy-box.jpg": teddyBox,
  "lux-box.jpg": luxBox,
  "romantic-box.jpg": romanticBox,
  "birthday-box.jpg": birthdayBox,
  "special-box.jpg": specialBox,
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

  // ✅ دالة الصورة المحدثة لربط الصور المرفوعة برابط السيرفر المباشر
  const getImage = (imageName) => {
    if (!imageName || imageName === "" || imageName === "null" || imageName === "undefined") {
      return placeholder;
    }

    // إذا كانت الصورة رابط كامل مباشر (مثل رابط أونلاين أو Base64)
    if (imageName.startsWith("http://") || imageName.startsWith("https://") || imageName.startsWith("data:")) {
      return imageName;
    }

    // إذا كانت المسار يبدأ بـ /uploads
    if (imageName.startsWith("/uploads")) {
      return `${API_BASE_URL}${imageName}`;
    }

    // إذا كانت الصورة مرفوعة حديثاً من الأدمن وليست ضمن الصور الثابتة
    if (!imagesMap[imageName]) {
      return `${API_BASE_URL}/uploads/${imageName}`;
    }

    // إذا كانت اسم صورة ثابتة موجودة في الخريطة المحلية
    return imagesMap[imageName] || placeholder;
  };

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
                        height="300"
                        image={getImage(product.image)}
                        alt={product.name || "Product"}
                        onError={(e) => {
                          e.target.src = placeholder;
                        }}
                      />
                      <Box p={2} sx={{ display: "flex", justifyContent: "center" }}>
                        <Button
                          variant="contained"
                          sx={{
                            backgroundColor: colors.gold,
                            color: "#fff",
                            fontWeight: "bold",
                            padding: "8px 30px",
                            borderRadius: "25px",
                            "&:hover": {
                              backgroundColor: colors.goldHover,
                              transform: "scale(1.05)",
                            },
                            transition: "all 0.3s",
                          }}
                          onClick={() => setSelectedProduct(product)}
                        >
                          More About IT
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

      {/* Product Dialog */}
      <Dialog
        open={Boolean(selectedProduct)}
        onClose={() => setSelectedProduct(null)}
        fullWidth
        maxWidth="sm"
        PaperProps={{
          sx: {
            borderRadius: "16px",
            overflow: "hidden",
          },
        }}
      >
        {selectedProduct && (
          <Box sx={{ backgroundColor: colors.background }}>
            <Box display="flex" justifyContent="flex-end" p={1}>
              <IconButton onClick={() => setSelectedProduct(null)}>
                <CloseIcon />
              </IconButton>
            </Box>

            <DialogContent sx={{ textAlign: "center", pt: 0 }}>
              <img
                src={getImage(selectedProduct.image)}
                alt={selectedProduct.name || "Product"}
                style={{
                  width: "100%",
                  maxHeight: "400px",
                  objectFit: "cover",
                  borderRadius: 12,
                  marginBottom: 15,
                }}
                onError={(e) => {
                  e.target.src = placeholder;
                }}
              />

              <Typography
                sx={{
                  fontSize: "1.8rem",
                  fontWeight: "bold",
                  color: colors.textDark,
                  mb: 1,
                }}
              >
                {selectedProduct.name}
              </Typography>

              <Typography
                sx={{
                  color: "#666",
                  mb: 2,
                  fontSize: "1rem",
                  lineHeight: 1.6,
                }}
              >
                {selectedProduct.description || "No description available"}
              </Typography>

              {/* عرض السعر بوضوح داخل الـ Dialog */}
              <Typography
                sx={{
                  fontSize: "1.8rem",
                  fontWeight: "bold",
                  color: colors.gold,
                  mb: 3,
                }}
              >
                ${selectedProduct.price ? Number(selectedProduct.price).toFixed(2) : "0.00"}
              </Typography>

              <Button
                fullWidth
                variant="contained"
                sx={{
                  backgroundColor: colors.gold,
                  color: "#fff",
                  fontWeight: "bold",
                  padding: "12px",
                  borderRadius: "25px",
                  fontSize: "1.1rem",
                  "&:hover": {
                    backgroundColor: colors.goldHover,
                    transform: "scale(1.02)",
                  },
                  transition: "all 0.3s",
                }}
                onClick={() => {
                  const token = localStorage.getItem("token");

                  if (!token) {
                    navigate("/login");
                  } else {
                    console.log("added to cart", selectedProduct);
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