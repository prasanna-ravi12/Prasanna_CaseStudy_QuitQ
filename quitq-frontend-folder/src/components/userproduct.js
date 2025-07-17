
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import UserNavbar from "./user_navbar";
import { Player } from "@lottiefiles/react-lottie-player";
import shoppingCartLoader from "../animations/Shopping Cart Loader.json";


const UserProduct = () => {
  const { categoryName } = useParams();
  const navigate = useNavigate();
  const [selectedProduct, setSelectedProduct] = useState(null);
const [productReviews, setProductReviews] = useState([]);
const [showModal, setShowModal] = useState(false);
const [isCartLoading, setIsCartLoading] = useState(false);


  

  const [products, setProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [discounts, setDiscounts] = useState([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10000);
  const [filters, setFilters] = useState({
    brand: [],
    discount: [],
    delivery: false,
    gender: [],
    size: [],
    priceRange: [0, 10000]
  });

  const isFashion = categoryName.toLowerCase() === "fashion";
  const [wishlist, setWishlist] = useState([]);

useEffect(() => {
  loadWishlist();
}, []);

const loadWishlist = async () => {
  try {
    const res = await axiosInstance.get(`/api/wishlist/${localStorage.getItem("email")}`);
    setWishlist(res.data.map(item => item.productId));
  } catch (err) {
    console.error("Failed to load wishlist", err);
  }
};

const handleViewDetails = async (productId) => {
  try {
    const productRes = await axiosInstance.get(`/api/products/${productId}`);
    setSelectedProduct(productRes.data);

    const reviewRes = await axiosInstance.get(`/api/reviews/product/${productId}`);
    setProductReviews(reviewRes.data);

    setShowModal(true);
  } catch (err) {
    console.error("Error fetching product details or reviews", err);
  }
};


const toggleWishlist = async (prod) => {
  const email = localStorage.getItem("email");
  const isWished = wishlist.includes(prod.productId);

  try {
    if (isWished) {
      await axiosInstance.delete(`/api/wishlist/${email}/${prod.productId}`);
      setWishlist(prev => prev.filter(id => id !== prod.productId));
    } else {
      // await axiosInstance.post("/api/wishlist", {
      //   customerEmail: email,
      //   productId: prod.productId,
      //   productName: prod.productName,
      //   brand: prod.brand,
      //   price: prod.price,
      //   imageUrl: prod.imageUrl,
      //   sellerEmail: prod.sellerEmail,
      //   discount: prod.discount
      // });
      await axiosInstance.post("/api/wishlist", {
  customerEmail: email,
  productId: prod.productId,
  productName: prod.productName,
  brand: prod.brand,
  price: prod.price,
  imageUrl: prod.imageUrl,
  sellerEmail: prod.sellerEmail,
  discount: parseFloat(prod.discount?.toString().replace('%', '')) || 0
});

      setWishlist(prev => [...prev, prod.productId]);
    }
  } catch (err) {
    console.error("Failed to update wishlist", err);
  }
};


  // Load data on mount or category change
  useEffect(() => {
    fetchInitialProducts();
    loadFilterValues();
  }, [categoryName]);

  const fetchInitialProducts = async () => {
    try {
      const res = await axiosInstance.get(`/api/products/category/${categoryName}`);
      setProducts(res.data);
    } catch (err) {
      console.error("Failed to fetch initial products", err);
    }
  };

  const loadFilterValues = async () => {
    try {
      const res = await axiosInstance.get(`/api/products/filter-values/${categoryName}`);
      setBrands(res.data.brands || []);
      setDiscounts(res.data.discounts || []);
      setMinPrice(res.data.minPrice || 0);
      setMaxPrice(res.data.maxPrice || 10000);
      setFilters(prev => ({
        ...prev,
        priceRange: [res.data.minPrice || 0, res.data.maxPrice || 10000]
      }));
    } catch (err) {
      console.error("Failed to load filter values", err);
    }
  };

  const applyFilters = async () => {
    try {
      const query = {
        category: categoryName,
        brand: filters.brand,
        discount: filters.discount,
        delivery: filters.delivery,
        priceMin: filters.priceRange[0],
        priceMax: filters.priceRange[1],
        ...(isFashion && {
          gender: filters.gender,
          size: filters.size
        })
      };
      const res = await axiosInstance.post("/api/products/filter", query);
      setProducts(res.data);
    } catch (err) {
      console.error("Failed to load products with filters", err);
    }
  };

  const clearFilters = () => {
    setFilters({
      brand: [],
      discount: [],
      delivery: false,
      gender: [],
      size: [],
      priceRange: [minPrice, maxPrice]
    });
    fetchInitialProducts(); // ← Fetch all again
  };

  const toggleValue = (e, key) => {
    const { value, checked } = e.target;
    setFilters(prev => {
      const setVal = new Set(prev[key]);
      checked ? setVal.add(value) : setVal.delete(value);
      return { ...prev, [key]: [...setVal] };
    });
  };

  const toggleDelivery = () =>
    setFilters(prev => ({ ...prev, delivery: !prev.delivery }));

  const changePrice = (i, val) => {
    setFilters(prev => {
      const pr = [...prev.priceRange];
      pr[i] = Number(val);
      return { ...prev, priceRange: pr };
    });
  };

  const addToCart = async (prod, qty) => {
      setIsCartLoading(true); // Start animation

    try {
      await axiosInstance.post("/api/cart", {
        customerEmail: localStorage.getItem("email"),
        productId: prod.productId,
        productName: prod.productName,
        brand: prod.brand,
        price: prod.price,
        quantity: Number(qty),
        imageUrl: prod.imageUrl,
        discount: prod.discount,               // ✅ include discount if available
      sellerEmail: prod.sellerEmail
      });
      // navigate("/cart");
      setTimeout(() => {
      setIsCartLoading(false);
      navigate("/cart");
    }, 2500);
    } catch (err) {
      console.error("Error adding to cart", err);
          setIsCartLoading(false); // stop animation on error

    }
  };

  return (
    <div style={{ paddingTop: '80px' }}>

      <UserNavbar />
      <div style={styles.body}>
        <div style={styles.filterContainer}>
          {/* Filter Sidebar */}
          {/* <div style={styles.sidebar}> */}
          {/* <div style={styles.sidebar} className="filter-hover"> */}
          <div style={styles.sidebar} className="filter-hover sidebar-animate">


            <h5>Filters</h5>

            {/* Price Filter */}
            <div style={styles.filterSection}>
              <label>Price</label>
              <div style={{ display: "flex", gap: "5px" }}>
                <input
                  type="number"
                  style={styles.priceInput}
                  min={minPrice}
                  max={filters.priceRange[1]}
                  value={filters.priceRange[0]}
                  onChange={e => changePrice(0, e.target.value)}
                />
                {/* <span>to</span> */}
                <span className="price-to-text">to</span>

                <input
                  type="number"
                  style={styles.priceInput}
                  min={filters.priceRange[0]}
                  max={maxPrice}
                  value={filters.priceRange[1]}
                  onChange={e => changePrice(1, e.target.value)}
                />
              </div>
            </div>

            {/* Delivery */}
            <div style={styles.filterSection}>
              <label>
                <input
                  type="checkbox"
                  checked={filters.delivery}
                  onChange={toggleDelivery}
                />{" "}
                Delivery in 1 Day
              </label>
            </div>

            {/* Brand Filter */}
            <div style={styles.filterSection}>
              <label><strong>Brand</strong></label>
              {brands.map((b, i) => (
                <label key={i} style={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    value={b}
                    checked={filters.brand.includes(b)}
                    onChange={e => toggleValue(e, "brand")}
                  />{" "}
                  {b}
                </label>
              ))}
            </div>

            {/* Discount Filter */}
            <div style={styles.filterSection}>
              <label><strong>Discount</strong></label>
              {discounts.map((d, i) => (
                <label key={i} style={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    value={d}
                    checked={filters.discount.includes(d)}
                    onChange={e => toggleValue(e, "discount")}
                  />{" "}
                  {d}% or more
                </label>
              ))}
            </div>

            {/* Fashion-specific Filters */}
            {isFashion && (
              <>
                <div style={styles.filterSection}>
                  <label><strong>Gender</strong></label>
                  {["Male", "Female"].map(g => (
                    <label key={g} style={styles.checkboxLabel}>
                      <input
                        type="checkbox"
                        value={g}
                        checked={filters.gender.includes(g)}
                        onChange={e => toggleValue(e, "gender")}
                      />{" "}
                      {g}
                    </label>
                  ))}
                </div>

                <div style={styles.filterSection}>
                  <label><strong>Size</strong></label>
                  {["XS", "S", "M", "L", "XL", "2XL", "3XL"].map(sz => (
                    <label key={sz} style={styles.checkboxLabel}>
                      <input
                        type="checkbox"
                        value={sz}
                        checked={filters.size.includes(sz)}
                        onChange={e => toggleValue(e, "size")}
                      />{" "}
                      {sz}
                    </label>
                  ))}
                </div>
              </>
            )}

            {/* Buttons */}
            <div style={styles.buttonGroup}>
              <button className="btn btn-primary" onClick={applyFilters}>Apply</button>
              <button className="btn btn-secondary" onClick={clearFilters}>Clear</button>
            </div>
          </div>

          {/* Product List */}
          <div style={styles.productList}>
            <h3 style={styles.heading}>
              Products in <span style={styles.categoryText}>{categoryName}</span>
            </h3>
            <div style={styles.row}>
              {products.length > 0 ? (
                products.map(prod => (
                  // <div key={prod.productId} style={styles.col}>
                  //   <div style={styles.card}>
                  //     <img src={prod.imageUrl} alt={prod.productName} style={styles.image} />
                  //     <div style={styles.cardBody}>
                  //       <h5 style={styles.cardTitle}>{prod.productName}</h5>
                  //       <p style={styles.cardText}>Brand: {prod.brand}</p>
                  //       <p style={styles.cardText}>₹{prod.price}</p>
                  //       <div>
                  //         <input
                  //           id={`qty-${prod.productId}`}
                  //           type="number"
                  //           min="1"
                  //           max={prod.stock}
                  //           defaultValue="1"
                  //           style={styles.input}
                  //         />
                  //         <button
                  //           className="btn btn-sm btn-success"
                  //           style={{ marginLeft: '10px' }}
                  //           onClick={() =>
                  //             addToCart(
                  //               prod,
                  //               document.getElementById(`qty-${prod.productId}`).value
                  //             )
                  //           }
                  //         >
                  //           Add to Cart
                  //         </button>
                  //       </div>
                  //     </div>
                  //   </div>
                  // </div>
  //                 <div key={prod.productId} style={styles.col}>
  // <div style={styles.card}>
  <div key={prod.productId} style={styles.col}>
  <div className="product-zoom" style={styles.card}>

    <div style={{ position: "relative" }}>
      <img src={prod.imageUrl} alt={prod.productName} style={styles.image} />
      <span
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          fontSize: "1.6rem",
          cursor: "pointer",
          color: wishlist.includes(prod.productId) ? "red" : "#ccc"
        }}
        onClick={() => toggleWishlist(prod)}
        title="Add to Wishlist"
      >
        {wishlist.includes(prod.productId) ? "❤️" : "🤍"}
      </span>
    </div>
    <div style={styles.cardBody}>
      <h5 style={styles.cardTitle}>{prod.productName}</h5>
      {/* <p style={styles.cardText}>Brand: {prod.brand}</p> */}
      <p style={styles.cardText}>₹{prod.price}</p>
      <div>
        <input
          id={`qty-${prod.productId}`}
          type="number"
          min="1"
          max={prod.stock}
          defaultValue="1"
          style={styles.input}
        />
        <button
          className="btn btn-sm btn-success"
          style={{ marginLeft: '10px' }}
          onClick={() =>
            addToCart(
              prod,
              document.getElementById(`qty-${prod.productId}`).value
            )
          }
        >
          Add to Cart
        </button>

       <button
  className="view-details-btn mt-2 w-100"
  onClick={() => handleViewDetails(prod.productId)}
>
  View Details
</button>


      </div>
    </div>
  </div>
</div>

                ))
              ) : (
                <p style={styles.noProduct}>No products found under these filters.</p>
              )}
            </div>
          </div>
        </div>
        {/* <style>{`@keyframes gradientBG {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }`}</style> */}
        <style>{`
  @keyframes gradientBG {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
// @keyframes zoomIn {
//   0% {
//     transform: scale(0.8);
//     opacity: 0;
//   }
//   100% {
//     transform: scale(1);
//     opacity: 1;
//   }
// }
/* Product zoom-in animation */
@keyframes zoomInCard {
  0% {
    transform: scale(0.85);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

/* Apply zoom-in animation to product cards */
.product-zoom {
  animation: zoomInCard 0.4s ease forwards;
  opacity: 0; /* ensures animation triggers */
}

.zoom-in-modal {
  animation: zoomIn 0.4s ease forwards;
}
  /* 💗 Hover effect for filter sidebar */
  .filter-hover:hover {
    background-color: #ffd6e7;
    transform: translateY(-2px);
  }
    .view-details-btn {
    background-color: transparent;
    color: #c2185b;
    border: 2px solid #c2185b;
    padding: 8px 16px;
    border-radius: 8px;
    font-weight: 600;
    transition: all 0.3s ease;
  }

  .view-details-btn:hover {
    background-color: #f06292;
    color: white;
    border-color: #f06292;
  }

  @keyframes slideInLeft {
  0% {
    transform: translateX(-30px);
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
}
.sidebar-animate {
  animation: slideInLeft 0.5s ease-out forwards;
}
  /* Pink checkboxes */
.filter-hover input[type="checkbox"] {
  accent-color: #ec407a; /* material pink */
  width: 16px;
  height: 16px;
  margin-right: 8px;
}

/* Stylish pill-like filters (optional) */
.active-filter-pill {
  display: inline-block;
  background-color: #f06292;
  color: white;
  border-radius: 20px;
  padding: 6px 12px;
  font-weight: 500;
  margin-right: 8px;
  margin-bottom: 6px;
}

/* Save Query button style */
.save-query {
  background-color: transparent;
  color: #d81b60;
  font-weight: bold;
  border: none;
  cursor: pointer;
  margin-top: 12px;
  display: inline-block;
}
.save-query:hover {
  color: #c2185b;
  text-decoration: underline;
}
.filter-hover .btn-primary {
  background-color: #ec407a;
  border-color: #ec407a;
  font-weight: bold;
}
.filter-hover .btn-primary:hover {
  background-color: #d81b60;
  border-color: #d81b60;
}

.filter-hover .btn-secondary {
  background-color: #fff;
  color: #ec407a;
  border: 2px solid #ec407a;
  font-weight: bold;
}
.filter-hover .btn-secondary:hover {
  background-color: #fce4ec;
}
  .filter-hover label {
  color: #c2185b;
  font-weight: 500;
}
  /* Make all sidebar text bigger and bold */
.filter-hover {
  font-size: 16px;
  font-weight: 600;
  color: #f8bbd0; /* soft pink for all text */
}

/* Make section labels bold and pink */
.filter-hover h5,
.filter-hover label,
.filter-hover strong {
  color: #f06292;
  font-size: 16px;
  font-weight: 700;
}

/* Make "to" in price range pink and bold */
.price-to-text {
  color: #f06292;
  font-weight: 700;
  margin: 0 6px;
  font-size: 16px;
}



`}</style>

      </div>

      {/* {showModal && selectedProduct && (
  <div style={modalStyles.overlay}>
    <div style={modalStyles.modal}>
      <button style={modalStyles.closeBtn} onClick={() => setShowModal(false)}>← Back</button>
      <h3 style={{ color: "#d63384" }}>{selectedProduct.productName}</h3>
      <img src={selectedProduct.imageUrl} alt="product" style={{ width: "100%", maxHeight: "220px", objectFit: "contain" }} />
      <p><strong>Brand:</strong> {selectedProduct.brand}</p>
      <p><strong>Price:</strong> ₹{selectedProduct.price}</p>
      {selectedProduct.discount && selectedProduct.discount !== "No" && (
        <p><strong>Discount:</strong> {selectedProduct.discount}</p>
      )}
      <p><strong>Delivery:</strong> Delivery in 1 day</p>
      {categoryName.toLowerCase() === "fashion" && selectedProduct.size && (
        <p><strong>Size:</strong> {selectedProduct.size}</p>
      )}

      <hr />
      <h5>Customer Reviews</h5>
      {productReviews.length > 0 ? (
        productReviews.map((rev, idx) => (
          <div key={idx} style={{ background: "#f8f9fa", padding: "10px", borderRadius: "6px", marginBottom: "8px" }}>
            <p><strong>{rev.customerEmail}</strong></p>
            <p>{rev.reviewText}</p>
          </div>
        ))
      ) : (
        <p>No reviews yet for this product.</p>
      )}
    </div>
  </div>
)} */}
{showModal && selectedProduct && (
  <div style={modalStyles.overlay}>
    <div style={modalStyles.modal} className="zoom-in-modal">
      <button
        style={modalStyles.backBtn}
        onClick={() => setShowModal(false)}
        title="Back"
      >
        ←
      </button>

      <h3 className="text-center text-primary">{selectedProduct.productName}</h3>
      <img
        src={selectedProduct.imageUrl}
        alt="product"
        style={modalStyles.image}
      />
      <p><strong>Brand:</strong> {selectedProduct.brand}</p>
      <p><strong>Price:</strong> ₹{selectedProduct.price}</p>
      {selectedProduct.discount && selectedProduct.discount !== "No" && (
        <p><strong>Discount:</strong> {selectedProduct.discount}</p>
      )}
      <p><strong>Delivery In One Day:</strong> {selectedProduct.deliveryInOneDay}</p>

      {categoryName.toLowerCase() === "fashion" && selectedProduct.size && (
        <p><strong>Size:</strong> {selectedProduct.size}</p>
      )}

      <hr />
      <h5 className="text-secondary">Customer Reviews</h5>
      {productReviews.length > 0 ? (
        productReviews.map((rev, idx) => (
          <div key={idx} style={modalStyles.reviewCard}>
            <p style={{ marginBottom: 4, fontWeight: 500 }}>{rev.customerEmail}</p>
            <div style={{ marginBottom: 4 }}>
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  style={{
                    color: i < rev.rating ? "#ffc107" : "#ccc",
                    fontSize: "1.2rem"
                  }}
                >
                  ★
                </span>
              ))}
            </div>
            <p style={{ marginBottom: 0 }}>{rev.reviewText}</p>
          </div>
        ))
      ) : (
        <p className="text-muted">No reviews yet.</p>
      )}
    </div>
  </div>
)}

{isCartLoading && (
  <div style={overlayStyles.container}>
    <Player
      autoplay
      loop
      src={shoppingCartLoader}
      style={{ height: "500px", width: "500px" }}
    />
    <h5 style={{ color: "#fff", marginTop: "20px" }}>Adding to Cart...</h5>
  </div>
)}

    </div>
  );
};



const styles = {
  body: {
    background: "linear-gradient(270deg, #fce4ec, #f8bbd0, #f48fb1, #f06292)",
    backgroundSize: "800% 800%",
    animation: "gradientBG 20s ease infinite",
    fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
    minHeight: "100vh",
    padding: "30px"
  },
  filterContainer: { display: "flex", gap: "20px" },
  // sidebar: {
  //   width: "260px",
  //   padding: "20px",
  //   background: "#fff",
  //   borderRadius: "12px",
  //   boxShadow: "0 3px 10px rgba(38, 34, 34, 0.1)"
  // },
  sidebar: {
  width: "260px",
  padding: "20px",
  background: "#1b2a49", // light pink
  borderRadius: "12px",
  boxShadow: "0 3px 10px rgba(0,0,0,0.1)",
  transition: "background-color 0.3s ease, transform 0.3s ease", // smooth hover
},

filterSection: {
  marginBottom: "20px",
  borderBottom: "1px solid #f8bbd0",
  paddingBottom: "10px"
},

  filterSection: { marginBottom: "15px" },
  priceInput: {
    width: "80px",
    padding: "5px",
    borderRadius: "6px",
    border: "1px solid #ccc"
  },
  checkboxLabel: { display: "block", margin: "4px 0" },
  buttonGroup: { display: "flex", gap: "10px" },
  productList: { flex: 1 },
  heading: {
    color: "#6a1b9a",
    fontWeight: 700,
    textAlign: "center",
    marginBottom: "30px",
    fontSize: "1.8rem"
  },
  categoryText: { color: "#0d6efd", fontWeight: "bold" },
  row: { display: "flex", flexWrap: "wrap", gap: "25px", justifyContent: "center" },
  col: { flex: "0 0 300px", maxWidth: "300px" },
  card: {
  backgroundColor: "white",
  borderRadius: "15px",
  boxShadow: "0 5px 25px rgba(0,0,0,0.15)",
  overflow: "hidden",
  height: "450px", // ✅ fix the card height
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between"
}
,
  image: { width: "100%", height: "220px", objectFit: "cover" },
  cardBody: { padding: "15px" },
  cardTitle: { fontWeight: 600, color: "#c2185b", marginBottom: "8px" },
  // cardText: { color: "#555", marginBottom: "5px" },
  cardTitle: {
  fontWeight: 600,
  color: "#c2185b",
  marginBottom: "8px",
  minHeight: "48px", // ✅ fix height to prevent resizing
  overflow: "hidden",
  textOverflow: "ellipsis",
  display: "-webkit-box",
  WebkitLineClamp: 2,
  WebkitBoxOrient: "vertical"
}
,
  input: {
    width: "60px",
    borderRadius: "6px",
    padding: "6px",
    border: "1px solid #ccc"
  },
  noProduct: { textAlign: "center", marginTop: "40px", color: "#777" }
  
};

// const modalStyles = {
//   overlay: {
//     position: "fixed",
//     top: 0, left: 0, right: 0, bottom: 0,
//     backgroundColor: "rgba(0,0,0,0.5)",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     zIndex: 1000,
//     overflowY: "auto",
//     padding: "20px"
//   },
//   modal: {
//     background: "white",
//     padding: "30px",
//     borderRadius: "12px",
//     width: "90%",
//     maxWidth: "500px",
//     maxHeight: "90vh",
//     overflowY: "auto",
//     boxShadow: "0 10px 30px rgba(0,0,0,0.3)"
//   },
//   closeBtn: {
//     position: "absolute",
//     top: "10px",
//     left: "20px",
//     background: "transparent",
//     border: "none",
//     fontSize: "1.5rem",
//     cursor: "pointer"
//   }
// };

const modalStyles = {
  overlay: {
    position: "fixed",
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: "rgba(0,0,0,0.6)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
    padding: "20px",
    overflowY: "auto"
  },
  modal: {
    background: "white",
    padding: "30px",
    borderRadius: "16px",
    maxWidth: "500px",
    width: "100%",
    position: "relative",
    animation: "zoomIn 0.3s ease-in-out"
  },
  image: {
    width: "100%",
    height: "220px",
    objectFit: "contain",
    borderRadius: "10px",
    marginBottom: "15px"
  },
  backBtn: {
    position: "absolute",
    top: "15px",
    left: "20px",
    fontSize: "1.5rem",
    background: "none",
    border: "none",
    color: "#333",
    cursor: "pointer"
  },
  reviewCard: {
    background: "#f8f9fa",
    padding: "12px",
    borderRadius: "8px",
    marginBottom: "10px",
    border: "1px solid #ddd"
  }
};
const overlayStyles = {
  container: {
    position: "fixed",
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: "rgba(0,0,0,0.6)",  // semi-transparent dark overlay
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    zIndex: 9999
  }
};



export default UserProduct;
