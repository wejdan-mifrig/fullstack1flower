import React, { useContext, useEffect, useRef, useState } from "react";
import {
  Box,
  Typography,
  CircularProgress,
  Button,
  Container,
  Dialog,
  DialogContent,
  IconButton,
  Snackbar,
  Alert,
} from "@mui/material";
import { keyframes } from "@emotion/react";
import CloseIcon from "@mui/icons-material/Close";
import Footer from "../../Components/Footer/Footer.jsx";
import NavbarUser from "../../Components/NavUserAdmin/Navuser.jsx";
import { categoriesContext } from "../../Context/CategoriesContext.jsx";
import { menuContext } from "../../Context/MenuContext.jsx";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useCart } from "../../Context/CartContext.jsx";

import whiteTulip from "../../assets/images/white-tulip.jpg";
import whiteRoseBouquet from "../../assets/images/white-rose-bouquet.jpg";
import whiteLily from "../../assets/images/white-lily.jpg";
import whiteOrchid from "../../assets/images/white-orchid.jpg";
import whiteMix from "../../assets/images/white-mix.jpg";
import whiteGarden from "../../assets/images/white-garden.jpg";
import redRose from "../../assets/images/red-rose.jpg";
import redTulip from "../../assets/images/red-tulip.jpg";
import redMix from "../../assets/images/red-mix.jpg";
import luxRedRose from "../../assets/images/lux-red-rose.jpg";
import redLove from "../../assets/images/red-love.jpg";
import redGarden from "../../assets/images/red-garden.jpg";
import pinkRose from "../../assets/images/pink-rose.jpg";
import pinkTulip from "../../assets/images/pink-tulip.jpg";
import pinkLily from "../../assets/images/pink-lily.jpg";
import pinkMix from "../../assets/images/pink-mix.jpg";
import pinkRomantic from "../../assets/images/pink-romantic.jpg";
import pinkGarden from "../../assets/images/pink-garden.jpg";
import sunflower from "../../assets/images/sunflower.jpg";
import yellowRose from "../../assets/images/yellow-rose.jpg";
import yellowTulip from "../../assets/images/yellow-tulip.jpg";
import yellowMix from "../../assets/images/yellow-mix.jpg";
import golden from "../../assets/images/golden.jpg";
import yellowGarden from "../../assets/images/yellow-garden.jpg";
import purpleOrchid from "../../assets/images/purple-orchid.jpg";
import purpleRose from "../../assets/images/purple-rose.jpg";
import purpleTulip from "../../assets/images/purple-tulip.jpg";
import purpleMix from "../../assets/images/purple-mix.jpg";
import royalPurple from "../../assets/images/royal-purple.jpg";
import purpleGarden from "../../assets/images/purple-garden.jpg";
import springMix from "../../assets/images/spring-mix.jpg";
import rainbow from "../../assets/images/rainbow.jpg";
import luxMix from "../../assets/images/lux-mix.jpg";
import seasonal from "../../assets/images/seasonal.jpg";
import elegantMix from "../../assets/images/elegant-mix.jpg";
import classicRose from "../../assets/images/classic-rose.jpg";
import luxRose from "../../assets/images/lux-rose.jpg";
import romanticRose from "../../assets/images/romantic-rose.jpg";
import whiteRedRose from "../../assets/images/white-red-rose.jpg";
import pinkLuxRose from "../../assets/images/pink-lux-rose.jpg";
import royalRose from "../../assets/images/royal-rose.jpg";
import weddingWhite from "../../assets/images/wedding-white.jpg";
import bridalRose from "../../assets/images/bridal-rose.jpg";
import centerpiece from "../../assets/images/centerpiece.jpg";
import weddingSet from "../../assets/images/wedding-set.jpg";
import arch from "../../assets/images/arch.jpg";
import bridePremium from "../../assets/images/bride-premium.jpg";
import birthdaySurprise from "../../assets/images/birthday-surprise.jpg";
import birthdayRoses from "../../assets/images/birthday-roses.jpg";
import birthdayMix from "../../assets/images/birthday-mix.jpg";
import balloonSet from "../../assets/images/balloon-set.jpg";
import birthdayLux from "../../assets/images/birthday-lux.jpg";
import celebration from "../../assets/images/celebration.jpg";
import chocoBox from "../../assets/images/choco-box.jpg";
import teddyBox from "../../assets/images/teddy-box.jpg";
import luxBox from "../../assets/images/lux-box.jpg";
import romanticBox from "../../assets/images/romantic-box.jpg";
import birthdayBox from "../../assets/images/birthday-box.jpg";
import specialBox from "../../assets/images/special-box.jpg";

import storeVideo from "../../assets/video/store22.mp4";
import whiteVideo from "../../assets/video/white.mp4";
import redVideo from "../../assets/video/Hero4.mp4";
import pinkVideo from "../../assets/video/pink.mp4";
import yellowVideo from "../../assets/video/yellow.mp4";
import purpleVideo from "../../assets/video/purp.mp4";
import mixedVideo from "../../assets/video/mix.mp4";
import roseBouquetVideo from "../../assets/video/admin.mp4";
import weddingVideo from "../../assets/video/wedding.mp4";
import birthdayVideo from "../../assets/video/birthday.mp4";
import giftBoxVideo from "../../assets/video/gift.mp4";

const placeholder =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%233e4a3a'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='20' fill='%23f4f1ea' text-anchor='middle' dy='.3em'%3ENo Image%3C/text%3E%3C/svg%3E";

const colors = {
  primaryGreen: "#3e4a3a",
  primaryGreenLight: "#5c7052",
  primaryGreenDark: "#232b20",
  background: "#f4f1ea",
  textPrimary: "#f4f1ea",
  textDark: "#1c1b18",
  textSecondary: "#d6d1c4",
  gold: "#d4a843",
  goldHover: "#c49a2f",
  goldSoft: "rgba(212, 168, 67, 0.35)",
  beige: "#f5f0e8",
};

const API_BASE_URL = "http://localhost:3000";

const imagesMap = {
  "white-tulip.jpg": whiteTulip,
  "white-rose-bouquet.jpg": whiteRoseBouquet,
  "white-lily.jpg": whiteLily,
  "white-orchid.jpg": whiteOrchid,
  "white-mix.jpg": whiteMix,
  "white-garden.jpg": whiteGarden,
  "red-rose.jpg": redRose,
  "red-tulip.jpg": redTulip,
  "red-mix.jpg": redMix,
  "lux-red-rose.jpg": luxRedRose,
  "red-love.jpg": redLove,
  "red-garden.jpg": redGarden,
  "pink-rose.jpg": pinkRose,
  "pink-tulip.jpg": pinkTulip,
  "pink-lily.jpg": pinkLily,
  "pink-mix.jpg": pinkMix,
  "pink-romantic.jpg": pinkRomantic,
  "pink-garden.jpg": pinkGarden,
  "sunflower.jpg": sunflower,
  "yellow-rose.jpg": yellowRose,
  "yellow-tulip.jpg": yellowTulip,
  "yellow-mix.jpg": yellowMix,
  "golden.jpg": golden,
  "yellow-garden.jpg": yellowGarden,
  "purple-orchid.jpg": purpleOrchid,
  "purple-rose.jpg": purpleRose,
  "purple-tulip.jpg": purpleTulip,
  "purple-mix.jpg": purpleMix,
  "royal-purple.jpg": royalPurple,
  "purple-garden.jpg": purpleGarden,
  "spring-mix.jpg": springMix,
  "rainbow.jpg": rainbow,
  "lux-mix.jpg": luxMix,
  "seasonal.jpg": seasonal,
  "elegant-mix.jpg": elegantMix,
  "classic-rose.jpg": classicRose,
  "lux-rose.jpg": luxRose,
  "romantic-rose.jpg": romanticRose,
  "white-red-rose.jpg": whiteRedRose,
  "pink-lux-rose.jpg": pinkLuxRose,
  "royal-rose.jpg": royalRose,
  "wedding-white.jpg": weddingWhite,
  "bridal-rose.jpg": bridalRose,
  "centerpiece.jpg": centerpiece,
  "wedding-set.jpg": weddingSet,
  "arch.jpg": arch,
  "bride-premium.jpg": bridePremium,
  "birthday-surprise.jpg": birthdaySurprise,
  "birthday-roses.jpg": birthdayRoses,
  "birthday-mix.jpg": birthdayMix,
  "balloon-set.jpg": balloonSet,
  "birthday-lux.jpg": birthdayLux,
  "celebration.jpg": celebration,
  "choco-box.jpg": chocoBox,
  "teddy-box.jpg": teddyBox,
  "lux-box.jpg": luxBox,
  "romantic-box.jpg": romanticBox,
  "birthday-box.jpg": birthdayBox,
  "special-box.jpg": specialBox,
};

const videosMap = {
  white: whiteVideo,
  red: redVideo,
  pink: pinkVideo,
  yellow: yellowVideo,
  purple: purpleVideo,
  mixed: mixedVideo,
  mix: mixedVideo,
  rose: roseBouquetVideo,
  bouquet: roseBouquetVideo,
  wedding: weddingVideo,
  bridal: weddingVideo,
  birthday: birthdayVideo,
  gift: giftBoxVideo,
  box: giftBoxVideo,
};

const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(40px); }
  to { opacity: 1; transform: translateY(0); }
`;
const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;
const scaleIn = keyframes`
  from { opacity: 0; transform: scale(0.85); }
  to { opacity: 1; transform: scale(1); }
`;
const floatSlow = keyframes`
  0%, 100% { transform: translate(0, 0) scale(1); }
  50% { transform: translate(15px, -25px) scale(1.05); }
`;
const floatSlowReverse = keyframes`
  0%, 100% { transform: translate(0, 0) scale(1); }
  50% { transform: translate(-20px, 20px) scale(1.08); }
`;
const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;
const underlineGrow = keyframes`
  from { width: 0; }
  to { width: 80px; }
`;

const useInView = (options = { threshold: 0.15 }) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(node);
      }
    }, options);
    observer.observe(node);
    return () => observer.disconnect();
  }, [options]);

  return [ref, isVisible];
};

const ProductCard = ({ product, image, onSelect, delay }) => {
  const [ref, isVisible] = useInView({ threshold: 0.1 });
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Box
      ref={ref}
      sx={{
        width: "100%",
        maxWidth: 400,
        justifySelf: "center",
        opacity: isVisible ? 1 : 0,
        animation: isVisible ? `${fadeInUp} 0.7s ease forwards` : "none",
        animationDelay: `${delay}ms`,
      }}
    >
      <Box
        sx={{
          position: "relative",
          borderRadius: "22px",
          overflow: "hidden",
          background: "rgba(255,255,255,0.06)",
          backdropFilter: "blur(4px)",
          border: "1px solid rgba(255,255,255,0.1)",
          boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
          transition:
            "transform 0.45s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.45s ease",
          cursor: "pointer",
          "&:hover": {
            transform: "translateY(-10px) scale(1.02)",
            boxShadow: `0 20px 50px rgba(0,0,0,0.3), 0 0 0 1px ${colors.goldSoft}`,
          },
          "&:hover .product-image": { transform: "scale(1.12) rotate(0.5deg)" },
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Box sx={{ position: "relative", height: 350, overflow: "hidden" }}>
          <Box
            component="img"
            className="product-image"
            src={image}
            alt={product.name || "Product"}
            onError={(e) => {
              e.target.src = placeholder;
            }}
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
              transition: "transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)",
            }}
          />
          <Box
            sx={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "45%",
              background: "linear-gradient(transparent, rgba(0,0,0,0.75))",
              pointerEvents: "none",
            }}
          />
          <Box
            sx={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              padding: "24px 20px 20px 20px",
              zIndex: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: 1,
            }}
          >
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: "1.2rem",
                color: "#fff",
                textAlign: "left",
                textShadow: "0 2px 10px rgba(0,0,0,0.6)",
                letterSpacing: "0.5px",
                width: "100%",
              }}
            >
              {product.name}
            </Typography>
            <Button
              variant="contained"
              onClick={(e) => {
                e.stopPropagation();
                onSelect(product);
              }}
              sx={{
                backgroundColor: colors.gold,
                color: "#fff",
                fontWeight: 600,
                padding: "8px 28px",
                borderRadius: "25px",
                textTransform: "none",
                fontSize: "0.9rem",
                letterSpacing: "0.5px",
                boxShadow: "0 4px 15px rgba(212,168,67,0.4)",
                transition: "all 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
                opacity: isHovered ? 1 : 0,
                transform: isHovered ? "translateY(0)" : "translateY(15px)",
                "&:hover": {
                  backgroundColor: colors.goldHover,
                  transform: "scale(1.05)",
                  boxShadow: "0 8px 25px rgba(212,168,67,0.5)",
                },
              }}
            >
              More About It
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

const CategorySection = ({
  category,
  products,
  getImage,
  getVideo,
  onSelectProduct,
  bgColor,
}) => {
  const [headerRef, headerVisible] = useInView({ threshold: 0.2 });
  const [videoRef, videoVisible] = useInView({ threshold: 0.15 });

  return (
    <Box
      sx={{
        width: "100%",
        py: { xs: 8, md: 12 },
        px: { xs: 3, md: 6 },
        bgcolor: bgColor,
      }}
    >
      <Box
        sx={{
          maxWidth: 1300,
          mx: "auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Box
          ref={headerRef}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            opacity: headerVisible ? 1 : 0,
            animation: headerVisible
              ? `${fadeInUp} 0.8s ease forwards`
              : "none",
          }}
        >
          <Typography
            sx={{
              fontSize: "0.8rem",
              letterSpacing: "4px",
              color: colors.gold,
              fontWeight: 700,
              mb: 1.5,
              textTransform: "uppercase",
            }}
          >
            Collection
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: "2rem", md: "2.6rem" },
              fontWeight: 800,
              color:
                bgColor === colors.primaryGreen
                  ? colors.textPrimary
                  : colors.textDark,
              textAlign: "center",
            }}
          >
            {category.name}
          </Typography>
          <Box
            sx={{
              height: "3px",
              width: headerVisible ? "80px" : "0px",
              background: `linear-gradient(90deg, ${colors.gold}, ${colors.goldHover})`,
              borderRadius: "3px",
              my: 2,
              animation: headerVisible
                ? `${underlineGrow} 0.8s ease forwards 0.3s`
                : "none",
            }}
          />
          <Typography
            sx={{
              color:
                bgColor === colors.primaryGreen
                  ? colors.textSecondary
                  : "#7a7a7a",
              maxWidth: 700,
              mb: 5,
              textAlign: "center",
              lineHeight: 1.8,
            }}
          >
            {category.description ||
              "High-quality curated items made with care and attention."}
          </Typography>
        </Box>
        <Box
          ref={videoRef}
          sx={{
            width: "100%",
            maxWidth: 1100,
            mb: 3,
            display: "flex",
            justifyContent: "center",
            opacity: videoVisible ? 1 : 0,
            animation: videoVisible ? `${scaleIn} 0.9s ease forwards` : "none",
            borderRadius: "20px",
            overflow: "hidden",
          }}
        >
          <video
            width="100%"
            height="auto"
            autoPlay
            loop
            muted
            playsInline
            style={{ display: "block", maxWidth: "1200px" }}
          >
            <source
              src={category.video_url || getVideo(category)}
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </Box>
        <Typography
          sx={{
            color:
              bgColor === colors.primaryGreen
                ? colors.textSecondary
                : "#7a7a7a",
            mb: 6,
            fontStyle: "italic",
          }}
        >
          {category.video_title || "Explore our collection"}
        </Typography>
        <Box
          sx={{
            width: "100%",
            maxWidth: 1300,
            display: "grid",
            gridTemplateColumns: {
              xs: "repeat(auto-fit, minmax(220px, 1fr))",
              sm: "repeat(auto-fit, minmax(260px, 1fr))",
              md: "repeat(3, minmax(280px, 400px))",
            },
            justifyContent: "center",
            justifyItems: "center",
            gap: { xs: 3, md: 4 },
          }}
        >
          {products.map((product, i) => (
            <ProductCard
              key={product.id}
              product={product}
              image={getImage(product.image)}
              onSelect={onSelectProduct}
              delay={(i % 3) * 120}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

const dividerTexts = [
  {
    title: '"Where Every Petal Tells a Story"',
    desc: "From our garden to your heart, each bloom is carefully selected and thoughtfully arranged to bring beauty and joy to every moment.",
  },
  {
    title: '"Nature\'s Poetry in Full Bloom"',
    desc: "Every flower carries a silent whisper of nature's love. Let our arrangements speak the words your heart longs to say.",
  },
  {
    title: '"The Art of Floral Expression"',
    desc: "More than just flowers, we create moments. Each petal, each stem, each arrangement tells a unique story of beauty and grace.",
  },
  {
    title: '"Timeless Elegance, Freshly Picked"',
    desc: "From sunrise to sunset, our flowers capture the essence of nature's finest moments. Bringing freshness and joy to your everyday life.",
  },
];

const DividerSection = ({ bgColor, index }) => {
  const [ref, isVisible] = useInView({ threshold: 0.3 });
  const text = dividerTexts[index % dividerTexts.length];

  return (
    <Box
      ref={ref}
      sx={{
        width: "100%",
        py: { xs: 6, md: 10 },
        px: { xs: 2, md: 0 },
        bgcolor: bgColor,
        textAlign: "center",
        opacity: isVisible ? 1 : 0,
        animation: isVisible ? `${fadeInUp} 0.8s ease forwards` : "none",
      }}
    >
      <Box sx={{ maxWidth: 800, mx: "auto" }}>
        <Typography
          sx={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: { xs: "1.8rem", md: "2.8rem" },
            color:
              bgColor === colors.primaryGreen
                ? colors.textPrimary
                : colors.textDark,
            mb: 2,
            fontWeight: 600,
          }}
        >
          {text.title}
        </Typography>
        <Typography
          sx={{
            color:
              bgColor === colors.primaryGreen
                ? colors.textSecondary
                : "#7a7a7a",
            fontSize: { xs: "1rem", md: "1.1rem" },
            lineHeight: 2,
            maxWidth: 600,
            mx: "auto",
          }}
        >
          {text.desc}
        </Typography>
        <Box
          sx={{
            width: 60,
            height: "2px",
            background: `linear-gradient(90deg, transparent, ${colors.gold}, transparent)`,
            mx: "auto",
            mt: 3,
          }}
        />
      </Box>
    </Box>
  );
};

const Shopuser = () => {
  const { categories, loadCategories } = useContext(categoriesContext);
  const { menu, loadMenu } = useContext(menuContext);
  const { addToCart } = useCart();

  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([loadCategories(), loadMenu()]);
      setLoading(false);
    };
    fetchData();
  }, []);

  const getImage = (imageName) => {
    if (
      !imageName ||
      imageName === "" ||
      imageName === "null" ||
      imageName === "undefined"
    )
      return placeholder;
    if (
      imageName.startsWith("http://") ||
      imageName.startsWith("https://") ||
      imageName.startsWith("data:")
    )
      return imageName;
    if (imageName.startsWith("/uploads")) return `${API_BASE_URL}${imageName}`;
    if (!imagesMap[imageName]) return `${API_BASE_URL}/uploads/${imageName}`;
    return imagesMap[imageName] || placeholder;
  };

  const getVideo = (category) => {
    const name = (category?.name || "").toLowerCase();
    const matchKey = Object.keys(videosMap).find((key) => name.includes(key));
    return matchKey ? videosMap[matchKey] : whiteVideo;
  };

  if (loading) {
    return (
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          bgcolor: colors.primaryGreen,
        }}
      >
        <CircularProgress sx={{ color: colors.gold }} />
      </Box>
    );
  }

  const getBgColor = (index) => {
    return index % 2 === 0 ? colors.primaryGreen : colors.background;
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
        bgcolor: colors.primaryGreen,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: "5%",
          left: "-5%",
          width: 300,
          height: 300,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(212,168,67,0.06) 0%, transparent 70%)",
          filter: "blur(10px)",
          animation: `${floatSlow} 12s ease-in-out infinite`,
          pointerEvents: "none",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: "10%",
          right: "-8%",
          width: 400,
          height: 400,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(92,112,82,0.06) 0%, transparent 70%)",
          filter: "blur(14px)",
          animation: `${floatSlowReverse} 16s ease-in-out infinite`,
          pointerEvents: "none",
        }}
      />

      <NavbarUser />

      <Container
        maxWidth="lg"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          position: "relative",
          zIndex: 1,
          px: { xs: 0, md: 2 },
        }}
      >
        <Box
          sx={{
            width: "100vw",
            height: "100vh",
            position: "relative",
            overflow: "hidden",
            marginLeft: "calc(-50vw + 50%)",
            marginRight: "calc(-50vw + 50%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            component="video"
            src={storeVideo}
            autoPlay
            loop
            muted
            playsInline
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              zIndex: 0,
            }}
          />
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "rgba(0,0,0,0.08)",
              zIndex: 1,
            }}
          />
          <Box
            sx={{ position: "relative", zIndex: 2, textAlign: "center", px: 3 }}
          >
            <Typography
              sx={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: { xs: "1.5rem", sm: "2rem", md: "2.8rem" },
                fontWeight: 600,
                color: "#fff",
                textShadow: "0 2px 20px rgba(0,0,0,0.4)",
                letterSpacing: "1px",
              }}
            >
              Blossoms &amp; Elegance
            </Typography>
            <Box
              sx={{
                width: 50,
                height: "2px",
                background: `linear-gradient(90deg, transparent, ${colors.gold}, transparent)`,
                mx: "auto",
                mt: 1.5,
              }}
            />
          </Box>
        </Box>

        {categories.map((category, index) => {
          const categoryProducts = menu.filter(
            (item) => item.category_name === category.name,
          );
          const bgColor = getBgColor(index);
          return (
            <React.Fragment key={category.id}>
              <CategorySection
                category={category}
                products={categoryProducts}
                getImage={getImage}
                getVideo={getVideo}
                onSelectProduct={setSelectedProduct}
                bgColor={bgColor}
              />
              {index < categories.length - 1 && (
                <DividerSection bgColor={getBgColor(index + 1)} index={index} />
              )}
            </React.Fragment>
          );
        })}
        <Box sx={{ height: { xs: 60, md: 80 } }} />
      </Container>

      <Dialog
        open={Boolean(selectedProduct)}
        onClose={() => setSelectedProduct(null)}
        fullWidth
        maxWidth="sm"
        PaperProps={{
          sx: {
            borderRadius: "20px",
            overflow: "hidden",
            animation: `${scaleIn} 0.35s ease`,
            bgcolor: colors.primaryGreen,
          },
        }}
      >
        {selectedProduct && (
          <Box sx={{ bgcolor: colors.primaryGreen }}>
            <Box display="flex" justifyContent="flex-end" p={1}>
              <IconButton
                onClick={() => setSelectedProduct(null)}
                sx={{ color: colors.beige }}
              >
                <CloseIcon />
              </IconButton>
            </Box>
            <DialogContent sx={{ textAlign: "center", pt: 0 }}>
              <Box
                component="img"
                src={getImage(selectedProduct.image)}
                alt={selectedProduct.name || "Product"}
                onError={(e) => {
                  e.target.src = placeholder;
                }}
                sx={{
                  width: "100%",
                  maxHeight: "400px",
                  objectFit: "cover",
                  borderRadius: "16px",
                  mb: 2,
                  animation: `${fadeIn} 0.5s ease`,
                }}
              />
              <Typography
                sx={{
                  fontSize: "1.8rem",
                  fontWeight: "bold",
                  color: colors.beige,
                  mb: 1,
                }}
              >
                {selectedProduct.name}
              </Typography>
              <Typography
                sx={{
                  color: "rgba(245,240,232,0.7)",
                  mb: 2,
                  fontSize: "1rem",
                  lineHeight: 1.6,
                }}
              >
                {selectedProduct.description || "No description available"}
              </Typography>
              <Typography
                sx={{
                  fontSize: "1.8rem",
                  fontWeight: "bold",
                  color: colors.gold,
                  mb: 3,
                }}
              >
                $
                {selectedProduct.price
                  ? Number(selectedProduct.price).toFixed(2)
                  : "0.00"}
              </Typography>
              <Button
                fullWidth
                variant="contained"
                sx={{
                  position: "relative",
                  overflow: "hidden",
                  backgroundColor: colors.gold,
                  color: "#fff",
                  fontWeight: "bold",
                  padding: "12px",
                  borderRadius: "30px",
                  fontSize: "1.1rem",
                  textTransform: "none",
                  backgroundImage: `linear-gradient(90deg, ${colors.gold} 0%, ${colors.goldHover} 25%, ${colors.gold} 50%, ${colors.goldHover} 75%, ${colors.gold} 100%)`,
                  backgroundSize: "200% 100%",
                  transition: "all 0.35s ease",
                  "&:hover": {
                    transform: "scale(1.02)",
                    animation: `${shimmer} 1.6s linear infinite`,
                  },
                }}
                onClick={() => {
                  addToCart(selectedProduct);
                  setSelectedProduct(null);
                  setSnackbar({
                    open: true,
                    message: `"${selectedProduct.name}" added to cart!`,
                    severity: "success",
                  });
                }}
              >
                Add to Cart
              </Button>
            </DialogContent>
          </Box>
        )}
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{
            width: "100%",
            borderRadius: "12px",
            fontWeight: "bold",
            fontSize: "1rem",
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>

      <Footer />
    </Box>
  );
};

export default Shopuser;
