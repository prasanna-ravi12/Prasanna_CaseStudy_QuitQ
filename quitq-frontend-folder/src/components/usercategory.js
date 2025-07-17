
// export default UserCategory;
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import UserNavbar from "./user_navbar";

// Import carousel images
import banner1 from "../assets/banner1.jpg";
import banner2 from "../assets/banner2.jpg";
import banner3 from "../assets/banner3.jpg";

// Category images
const categoryImages = {
  grocery: require("../assets/categories/grocery.png"),
  mobiles: require("../assets/categories/mobiles.png"),
  fashion: require("../assets/categories/fashion.png"),
  electronics: require("../assets/categories/electronics.png"),
  appliances: require("../assets/categories/appliances.png"),
  homefurniture: require("../assets/categories/homefurniture.png"),
  beauty: require("../assets/categories/beauty.png"),
};

const UserCategory = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [currentBanner, setCurrentBanner] = useState(0);
  const navigate = useNavigate();

  const carouselImages = [banner1, banner2, banner3];

  useEffect(() => {
    axiosInstance
      .get("http://localhost:8080/api/categories")
      .then((res) => setCategories(res.data))
      .catch((err) => console.log(err));

    axiosInstance
      .get("http://localhost:8080/api/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
      
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % carouselImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleCategoryClick = (categoryName) => {
    navigate(`/userproducts/${categoryName}`);
  };

  return (
    
    <div style={{ paddingTop: '80px' }}>
      <UserNavbar />
      
      <div style={styles.pageContainer}>
        {/* Category Bar */}
        <div style={styles.categoryBar}>
          {categories.map((cat) => {
            const imageKey = cat.categoryName.toLowerCase();
            const imageSrc = categoryImages[imageKey] || "https://via.placeholder.com/80";

            return (
              <div
                key={cat.categoryId}
                style={styles.categoryItem}
                onClick={() => handleCategoryClick(cat.categoryName)}
                onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.08)"}
                onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
              >
                <img src={imageSrc} alt={cat.categoryName} style={styles.categoryImage} />
                <div style={styles.categoryName}>{cat.categoryName}</div>
              </div>
            );
          })}
        </div>

        {/* Carousel */}
        <div style={styles.carouselContainer}>
          <img
            src={carouselImages[currentBanner]}
            alt={`Slide ${currentBanner + 1}`}
            style={styles.carouselImage}
          />
        </div>

        {/* Product Grid */}
        <div style={{ textAlign: "center" }}>
  <h2 style={styles.sectionHeading}>All Products</h2>
</div>


        <div style={styles.productGrid}>
          {products.map((product) => (
            <div
              // key={product.productId}
              // style={styles.productCard}
              // onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.04)"}
              // onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
              key={product.productId}
  style={styles.productCard}
  onClick={() => handleCategoryClick(product.category)}
  onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.04)"}
  onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
            >
              <img
                src={product.imageUrl || "https://via.placeholder.com/150"}
                alt={product.productName}
                style={styles.productImage}
              />
              <h4 style={styles.productName}>{product.productName}</h4>
              <p style={styles.productPrice}>₹{product.price}</p>
            </div>
          ))}
        </div>
      </div>
      
    </div>
    
  );
};

const styles = {
  pageContainer: {
    background: "linear-gradient(135deg, #ffe6f0, #fff0f5)", // Light pink gradient
    minHeight: "100vh",
    paddingBottom: "50px",
  },

  categoryBar: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: "20px",
    padding: "30px 20px 20px",
  },

  categoryItem: {
    flex: "0 0 auto",
    padding: "15px",
    backgroundColor: "#fff",
    borderRadius: "12px",
    cursor: "pointer",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
    width: "130px",
    transition: "transform 0.3s ease",
  },

  categoryImage: {
    width: "100%",
    height: "90px",
    objectFit: "contain",
    marginBottom: "8px",
  },

  categoryName: {
    fontWeight: "bold",
    fontSize: "15px",
    color: "#e91e63",
  },

  carouselContainer: {
    marginTop: "20px",
    width: "100vw",
    overflow: "hidden",
    textAlign: "center",
    marginLeft: "calc(-50vw + 50%)",
  },

  carouselImage: {
    width: "100%",
    height: "280px",
    objectFit: "cover",
  },

  productGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
    gap: "30px",
    padding: "40px 60px",
  },

  productCard: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "14px",
    boxShadow: "0 4px 14px rgba(0, 0, 0, 0.12)",
    textAlign: "center",
    transition: "transform 0.3s ease",
  },

  productImage: {
    width: "100%",
    height: "190px",
    objectFit: "cover",
    borderRadius: "10px",
  },

  productName: {
    margin: "15px 0 8px",
    fontSize: "18px",
    fontWeight: "600",
    color: "#333",
  },

  productPrice: {
    fontSize: "16px",
    color: "#4CAF50",
    fontWeight: "bold",
  },

  sectionHeading: {
  textAlign: "center",
  marginTop: "50px",
  marginBottom: "30px",
  fontSize: "32px", // Increased size
  fontWeight: "bold",
  color: "#d81b60", // Vibrant pink
  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  letterSpacing: "1px",
  textShadow: "1px 1px 2px rgba(0, 0, 0, 0.1)",
  borderBottom: "3px solid #d81b60",
  display: "inline-block",
  paddingBottom: "10px",
}

};

export default UserCategory;
