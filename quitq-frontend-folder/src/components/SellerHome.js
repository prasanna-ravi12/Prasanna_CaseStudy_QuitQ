
// SellerHome.js
import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { Bar, Pie } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

const SellerHome = () => {
  const [view, setView] = useState("dashboard");
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [reviews, setReviews] = useState([]);
  
  
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    gender: "",
    phone: "",
    address: "",
  });
const [orderFilter, setOrderFilter] = useState("All");

const [reviewFilter, setReviewFilter] = useState("All");

const [selectedProduct, setSelectedProduct] = useState(null);
const [showModal, setShowModal] = useState(false);




  const email = localStorage.getItem("email");
  const navigate = useNavigate();

  const fetchProducts = async () => {
    const res = await axiosInstance.get("/api/products");
    const sellerProducts = res.data.filter(p => p.sellerEmail === email);
    setProducts(sellerProducts);
  };

  const fetchOrders = async () => {
    const res = await axiosInstance.get("/api/finalorders");
    const sellerOrders = res.data.filter(o => o.sellerEmail === email);
    setOrders(sellerOrders);
  };

  const fetchReviews = async () => {
    const res = await axiosInstance.get("/api/reviews");
    const sellerReviews = res.data.filter(r => r.sellerEmail === email);
    setReviews(sellerReviews);
  };

  const fetchUserDetails = async () => {
    const res = await axiosInstance.get(`/api/users/${email}`);
    setUserDetails(res.data);
  };

  useEffect(() => {
    fetchProducts();
    fetchOrders();
    fetchReviews();
    fetchUserDetails();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    // navigate("/login");
    navigate("/login", { replace: true });
    toast.success("Logout successful!");
  };

  const renderDashboard = () => {
    const productOrderMap = {};
    orders.forEach((order) => {
      productOrderMap[order.productName] = (productOrderMap[order.productName] || 0) + order.quantity;
    });

    const orderChartData = {
      labels: Object.keys(productOrderMap),
      datasets: [
        {
          label: "Orders",
          data: Object.values(productOrderMap),
          backgroundColor: "#42a5f5",
        },
      ],
    };

    const positiveReviews = reviews.filter(r => r.rating >= 3).length;
    const negativeReviews = reviews.filter(r => r.rating <= 2).length;

    const feedbackChartData = {
      labels: ["Positive", "Negative"],
      datasets: [
        {
          data: [positiveReviews, negativeReviews],
          backgroundColor: ["#66bb6a", "#ef5350"],
        },
      ],
    };

    return (
      <>
        <h2 className="text-center mb-4">Seller Dashboard</h2>
        <div className="row mb-4">
          <div className="col-md-3">
            <div className="stat-box blue">
              <h4>Total Products</h4>
              <h2>{products.length}</h2>
            </div>
          </div>
          <div className="col-md-3">
            <div className="stat-box purple">
              <h4>Total Orders</h4>
              <h2>{orders.length}</h2>
            </div>
          </div>
          <div className="col-md-3">
            <div className="stat-box green">
              <h4>Positive Feedback</h4>
              <h2>{positiveReviews}</h2>
            </div>
          </div>
          <div className="col-md-3">
            <div className="stat-box red">
              <h4>Negative Feedback</h4>
              <h2>{negativeReviews}</h2>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6 mb-4">
            <div className="chart-box">
              <h5 className="text-center mb-2">Orders Per Product</h5>
              <Bar data={orderChartData} />
            </div>
          </div>
          <div className="col-md-6 mb-4">
            <div className="chart-box">
              <h5 className="text-center mb-2">Review Summary</h5>
              <Pie data={feedbackChartData} />
            </div>
          </div>
        </div>
      </>
    );
  };

  
const renderPersonalDetailForm = () => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axiosInstance.put(`/api/users/${userDetails.email}`, userDetails);
    toast.success("Profile Updated Successfully!");
  };

  return (
    <div className="form-section">
      {/* ✅ Avatar and Name block */}
      <div className="text-center mb-4">
        <img
          src={
            userDetails.gender?.toLowerCase() === "female"
              ? "https://cdn-icons-png.flaticon.com/512/2922/2922561.png"
              : "https://cdn-icons-png.flaticon.com/512/147/147144.png"
          }
          alt="profile-avatar"
          className="profile-avatar"
        />
        <h3 className="user-name">{userDetails.name}</h3>
      </div>
      <h4 className="mb-4">Personal Information</h4>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6 mb-3 slide-in-left" style={{ animationDelay: "0.1s" }}>
            <label>Name</label>
            <input
              className="form-control"
              name="name"
              value={userDetails.name}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6 mb-3 slide-in-left" style={{ animationDelay: "0.2s" }}>
            <label>Email</label>
            <input
              className="form-control"
              name="email"
              value={userDetails.email}
              disabled
            />
          </div>
          <div className="col-md-6 mb-3 slide-in-left" style={{ animationDelay: "0.3s" }}>
            <label>Phone</label>
            <input
              className="form-control"
              name="phone"
              value={userDetails.phone}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6 mb-3 slide-in-left" style={{ animationDelay: "0.4s" }}>
            <label>Gender</label>
            <div className="form-check">
              {/* <input
                type="radio"
                name="gender"
                className="form-check-input"
                value="Male"
                checked={userDetails.gender === "Male"}
                onChange={handleChange}
              />
              <label className="form-check-label">Male</label> */}
              <input
  type="radio"
  className="form-check-input"
  name="gender"
  value="Male"
  checked={userDetails.gender?.toLowerCase() === "male"}
  onChange={handleChange}
/>
<label className="form-check-label">Male</label>
            </div>
            <div className="form-check">
              {/* <input
                type="radio"
                name="gender"
                className="form-check-input"
                value="Female"
                checked={userDetails.gender === "Female"}
                onChange={handleChange}
              />
              <label className="form-check-label">Female</label> */}
              <input
  type="radio"
  className="form-check-input"
  name="gender"
  value="Female"
  checked={userDetails.gender?.toLowerCase() === "female"}
  onChange={handleChange}
/>
<label className="form-check-label">Female</label>
            </div>
          </div>
          <div className="col-12 mb-3 slide-in-left" style={{ animationDelay: "0.5s" }}>
            <label>Address</label>
            <textarea
              className="form-control"
              name="address"
              value={userDetails.address}
              onChange={handleChange}
            ></textarea>
          </div>
          <div className="col-12 slide-in-left" style={{ animationDelay: "0.6s" }}>
            <button className="btn btn-success me-2" type="submit">
              Save
            </button>
            <button
              className="btn btn-secondary"
              type="button"
              onClick={fetchUserDetails}
            >
              Reset
            </button>
          </div>
        </div>
      </form>

      {/* Animation CSS */}
      <style>{`
        .slide-in-left {
          opacity: 0;
          animation: slideLeftFade 0.6s forwards;
        }

        @keyframes slideLeftFade {
          0% {
            transform: translateX(-30px);
            opacity: 0;
          }
          100% {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};



const renderMyProducts = () => {
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      await axiosInstance.delete(`/api/products/${id}`);
      fetchProducts();
    }
  };

  const openModal = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedProduct(null);
  };

  return (
    <>
      <div className="row g-4 animate-products">
        {products.map((product, index) => (
          <div key={product.productId} className="col-md-4">
            <div className="product-card slide-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <img
                src={product.imageUrl}
                className="card-img-top"
                alt={product.productName}
                style={{ height: "200px", objectFit: "cover", borderTopLeftRadius: "12px", borderTopRightRadius: "12px" }}
              />
              <div className="card-body text-center">
                <h5 className="product-title">{product.productName}</h5>
                {/* <div className="d-flex justify-content-center gap-3 mt-3">
                  <button className="btn btn-outline-primary btn-sm" onClick={() => openModal(product)}>View Details</button>
                  <i
                    className="fa fa-trash text-danger"
                    style={{ cursor: "pointer", fontSize: "20px" }}
                    title="Delete Product"
                    onClick={() => handleDelete(product.productId)}
                  ></i>
                </div> */}
                <div className="d-flex justify-content-center align-items-center gap-3 mt-3">
  <button className="btn btn-outline-primary btn-sm" onClick={() => openModal(product)}>View Details</button>
  <button
    className="btn p-0 border-0 bg-transparent align-middle"
    title="Delete Product"
    onClick={() => handleDelete(product.productId)}
    style={{ lineHeight: "1" }}
  >
    <i className="fa fa-trash text-danger" style={{ fontSize: "20px" }}></i>
  </button>
</div>

              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ✅ Modal Popup */}
      {showModal && selectedProduct && (
        <div className="product-modal-overlay" onClick={closeModal}>
          <div className="product-modal zoom-in" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h5 className="modal-title">{selectedProduct.productName}</h5>
              <button className="close-btn" onClick={closeModal}>
                &times;
              </button>
            </div>
            <img
              src={selectedProduct.imageUrl}
              className="modal-img"
              alt={selectedProduct.productName}
            />
            <div className="modal-details">
              <p><strong>Brand:</strong> {selectedProduct.brand}</p>
              <p><strong>Price:</strong> ₹{selectedProduct.price}</p>
              <p><strong>Stock:</strong> {selectedProduct.stock}</p>
              <p><strong>Category:</strong> {selectedProduct.category}</p>
              <p><strong>Discount:</strong> {selectedProduct.discount || "None"}</p>
              <p><strong>Delivery In One Day:</strong> {selectedProduct.deliveryInOneDay || "No"}</p>
              {selectedProduct.category === "Fashion" && (
                <>
                  <p><strong>Gender:</strong> {selectedProduct.gender}</p>
                  <p><strong>Size:</strong> {selectedProduct.size}</p>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ✅ Modal & Animation CSS */}
      <style>{`
        .product-modal-overlay {
          position: fixed;
          top: 0; left: 0;
          width: 100%; height: 100%;
          background-color: rgba(0,0,0,0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }

        .product-modal {
          background: white;
          width: 90%;
          max-width: 500px;
          border-radius: 15px;
          padding: 20px;
          box-shadow: 0 8px 30px rgba(0,0,0,0.2);
          animation: zoomIn 0.4s ease forwards;
          position: relative;
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 15px;
        }

        .modal-title {
          font-size: 1.5rem;
          font-weight: bold;
          color: #2a5298;
        }

        .close-btn {
          background: none;
          border: none;
          font-size: 28px;
          color: #999;
          cursor: pointer;
        }

        .modal-img {
          width: 100%;
          height: 250px;
          object-fit: cover;
          border-radius: 10px;
          margin-bottom: 15px;
        }

        .modal-details p {
          font-size: 15px;
          margin-bottom: 10px;
          font-family: 'Segoe UI', sans-serif;
        }

        @keyframes zoomIn {
          from {
            transform: scale(0.85);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </>
  );
};


const renderOrdersReceived = () => {
  const filteredOrders = orders.filter(order => {
    if (orderFilter === "All") return true;
    if (orderFilter === "Pending") return order.deliveryStatus === "Pending";
    if (orderFilter === "Delivered") return order.deliveryStatus === "Delivered";
    return false;
  });

  return (
    <div>
      <h4 className="mb-3">Orders Received</h4>
      <select
        value={orderFilter}
        onChange={(e) => setOrderFilter(e.target.value)}
        className="form-select mb-4"
        style={{ maxWidth: "250px" }}
      >
        <option>All</option>
        <option>Pending</option>
        <option>Delivered</option>
      </select>

      <div className="order-list">
        {filteredOrders.length === 0 && <p>No orders found.</p>}
        {filteredOrders.map((order, idx) => (
          <div
            key={order.orderId}
            className="order-box zoom-in"
            style={{ animationDelay: `${idx * 0.1}s` }}
          >
            <img
              src={order.imageUrl}
              alt={order.productName}
              className="order-img"
            />
            <div className="order-details">
              <h5>{order.productName}</h5>
              <p className="mb-1">
                <strong>Price:</strong> ₹{order.price} &nbsp;
                <strong>Qty:</strong> {order.quantity}
              </p>
              <p className="mb-1">
  <strong>Status:</strong>{" "}
  <span
    style={{
      color: order.deliveryStatus === "Delivered" ? "green" : "red",
      fontWeight: "bold"
    }}
  >
    {order.deliveryStatus}
    {order.deliveryStatus === "Delivered" && order.deliveryDate && (
      <>
        {" "}
        on {new Date(order.deliveryDate).toLocaleDateString()}
      </>
    )}
  </span>
</p>

              <p className="mb-1">
                <strong>Payment:</strong>{" "}
                <span
                  style={{
                    color: order.deliveryStatus === "Paid" ? "red" : "green",
                    fontWeight: "bold"
                  }}
                >
                  {order.paymentStatus}
                </span>
              </p>
              <p className="mb-0"><strong>Ordered At:</strong> {order.orderDate}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};



const renderReviews = () => {
  const filtered = reviews.filter(r => {
    if (reviewFilter === "All") return true;
    if (reviewFilter === "Positive") return r.rating >= 3;
    if (reviewFilter === "Negative") return r.rating <= 2;
    return true;
  });

  return (
    <div>
      <h4 className="mb-3">Customer Reviews</h4>

      <select
        value={reviewFilter}
        onChange={(e) => setReviewFilter(e.target.value)}
        className="form-select mb-4"
        style={{ maxWidth: "250px" }}
      >
        <option>All</option>
        <option>Positive</option>
        <option>Negative</option>
      </select>

      <div className="review-list">
        {filtered.length === 0 && <p>No reviews found.</p>}
        {filtered.map((r, idx) => (
          <div
            key={r.id}
            className="review-card zoom-in"
            style={{ animationDelay: `${idx * 0.1}s` }}
          >
            <img
              src={r.imageUrl}
              alt={r.productName}
              className="review-img"
            />
            <div className="review-details">
              <h5>{r.productName}</h5>
              <p className="mb-1">
                <strong>Brand:</strong> {r.brand} &nbsp;
                <strong>Price:</strong> ₹{r.price}
              </p>
              <p className="mb-1">
                <strong>Rating:</strong>{" "}
                <span
                  style={{
                    color: r.rating >= 3 ? "#4caf50" : "#e53935",
                    fontWeight: "bold",
                  }}
                >
                  {r.rating} ★ ({r.meaning})
                </span>
              </p>
              <p className="mb-1">
                <strong>Reviewed By:</strong> {r.customerEmail}
              </p>
              <p className="mb-0">
                <strong>Review Date:</strong>{" "}
                {new Date(r.reviewDate).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};


  const renderView = () => {
    if (view === "dashboard") return renderDashboard();
    if (view === "personal") return renderPersonalDetailForm();
      if (view === "products") return renderMyProducts(); // ✅ ADD THIS
if (view === "orders") return renderOrdersReceived(); // ✅ add this
if (view === "reviews") return renderReviews();


    return <div className="text-center p-5"><h4>Coming Soon...</h4></div>;
  };

  return (
    <div className="admin-wrapper">
      <div className="sidebar">
        <div className="admin-info">
  <i className="fa fa-user-circle fa-3x mb-2"></i>
  <div>
    Hello,<br />
    <strong>{userDetails.name || "Seller"}</strong>
  </div>
</div>

        
        <div className="nav-buttons">
  <div className="slide-sidebar" style={{ animationDelay: `0.1s` }}>
    <button className="nav-btn w-100" onClick={() => setView("personal")}>
      <i className="fa fa-user me-2"></i> Personal Detail
    </button>
  </div>
  <div className="slide-sidebar" style={{ animationDelay: `0.2s` }}>
    <button className="nav-btn w-100" onClick={() => setView("dashboard")}>
      <i className="fa fa-tachometer-alt me-2"></i> Dashboard
    </button>
  </div>
  <div className="slide-sidebar" style={{ animationDelay: `0.3s` }}>
    <button className="nav-btn w-100" onClick={() => setView("products")}>
      <i className="fa fa-box-open me-2"></i> My Products
    </button>
  </div>
  <div className="slide-sidebar" style={{ animationDelay: `0.4s` }}>
    <button className="nav-btn w-100" onClick={() => setView("orders")}>
      <i className="fa fa-shopping-cart me-2"></i> Orders Received
    </button>
  </div>
  <div className="slide-sidebar" style={{ animationDelay: `0.5s` }}>
    <button className="nav-btn w-100" onClick={() => setView("reviews")}>
      <i className="fa fa-star me-2"></i> Reviews
    </button>
  </div>
  <div className="slide-sidebar" style={{ animationDelay: `0.6s` }}>
    <button className="nav-btn w-100" onClick={() => navigate("/add-product")}>
      <i className="fa fa-plus-circle me-2"></i> Add Product
    </button>
  </div>
</div>

<button className="logout-btn w-100 mt-3" onClick={handleLogout}>
  <i className="fa fa-sign-out-alt me-2"></i> Logout
</button>

      </div>
      <div className="main-content p-4">{renderView()}</div>

      <style>{`
        .admin-wrapper {
          display: flex;
          min-height: 100vh;
          font-family: 'Segoe UI', sans-serif;
          background: #f3f9fd;
        }
          /* ✅ Product card hover and animation */
.product-card {
  background: white;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 4px 14px rgba(0,0,0,0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  position: relative;
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 20px rgba(0,0,0,0.2);
}

/* ✅ Slide in animation */
@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-40px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.slide-in {
  animation: slideInLeft 0.6s ease forwards;
}

/* ✅ Bubbles background */
.bubble-container {
  position: fixed;
  top: 0; left: 0;
  width: 100%; height: 100%;
  z-index: -1;
  pointer-events: none;
  overflow: hidden;
}
  /* Sidebar Button Animation */
@keyframes slideSidebarFade {
  0% {
    transform: translateX(-30px);
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
}
.nav-btn {
  background: white;
  color: #1e3c72;
  border: none;
  padding: 10px 15px;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  text-align: left;
  width: 100%;
  display: block;
}

.logout-btn {
  background: #e74c3c;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  width: 100%;
  text-align: left;
}


// .slide-sidebar {
//   animation: slideSidebarFade 0.5s ease forwards;
//   opacity: 0;
// }
.slide-sidebar {
  animation: slideSidebarFade 0.5s ease forwards;
  opacity: 0;
  width: 100%;
}



.bubble {
  position: absolute;
  bottom: -100px;
  background-color: rgba(33, 150, 243, 0.2);
  border-radius: 50%;
  backdrop-filter: blur(3px);
  animation: rise 15s infinite ease-in;
}

.bubble:nth-child(1) { width: 40px; height: 40px; left: 5%; animation-duration: 16s; }
.bubble:nth-child(2) { width: 30px; height: 30px; left: 20%; animation-duration: 12s; }
.bubble:nth-child(3) { width: 50px; height: 50px; left: 40%; animation-duration: 18s; }
.bubble:nth-child(4) { width: 25px; height: 25px; left: 60%; animation-duration: 10s; }
.bubble:nth-child(5) { width: 35px; height: 35px; left: 80%; animation-duration: 20s; }
.bubble:nth-child(6) { width: 45px; height: 45px; left: 90%; animation-duration: 14s; }

@keyframes rise {
  0% { transform: translateY(0) scale(1); opacity: 0.5; }
  50% { transform: translateY(-50vh) scale(1.2); opacity: 0.3; }
  100% { transform: translateY(-100vh) scale(1); opacity: 0; }
}
  .order-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.order-box {
  display: flex;
  background: white;
  border-radius: 12px;
  padding: 15px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
  align-items: center;
  animation: zoomIn 0.5s ease forwards;
  opacity: 0;
}

.order-img {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 8px;
  margin-right: 20px;
}

.order-details {
  flex: 1;
}

/* Zoom-in Animation */
@keyframes zoomIn {
  from {
    transform: scale(0.95);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

.zoom-in {
  animation: zoomIn 0.5s ease forwards;
}
  .review-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.review-card {
  display: flex;
  background: white;
  border-radius: 12px;
  padding: 15px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
  align-items: center;
  animation: zoomIn 0.5s ease forwards;
  opacity: 0;
}

.review-img {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 8px;
  margin-right: 20px;
}

.review-details {
  flex: 1;
}



        .sidebar {
          width: 250px;
          background: linear-gradient(to bottom, #1e3c72, #2a5298);
          color: white;
          padding: 20px;
          display: flex;
          flex-direction: column;
        }
        .admin-info {
          text-align: center;
          margin-bottom: 30px;
        }
        .nav-buttons {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .nav-btn {
          background: white;
          color: #1e3c72;
          border: none;
          padding: 10px;
          border-radius: 8px;
          font-weight: bold;
          cursor: pointer;
        }
        .nav-btn:hover {
          background: #d6e4ff;
        }
        .logout-btn {
          background: #e74c3c;
          color: white;
          padding: 10px;
          border: none;
          border-radius: 8px;
        }
        .main-content {
          flex: 1;
        }
        .stat-box {
          background: white;
          padding: 20px;
          border-radius: 12px;
          text-align: center;
          box-shadow: 0 0 10px rgba(0,0,0,0.1);
        }
        .blue { border-left: 6px solid #42a5f5; }
        .purple { border-left: 6px solid #ab47bc; }
        .green { border-left: 6px solid #66bb6a; }
        .red { border-left: 6px solid #ef5350; }
        .chart-box, .form-section {
          background: white;
          padding: 20px;
          border-radius: 15px;
          box-shadow: 0 8px 20px rgba(0,0,0,0.1);
        }
          .profile-avatar {
  width: 160px;
  height: 160px;
  object-fit: cover;
  border-radius: 50%;
  border: 6px solid #3498db;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease;
  background: white;
}

.user-name {
  margin-top: 15px;
  color: #1e3c72;
  font-weight: bold;
  font-size: 24px;
}

/* Make product card height fixed and layout consistent */
.product-card {
  height: 450px; /* You can adjust this */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

/* Limit height of product-details and allow scrolling or cut-off */
.product-details {
  overflow-y: auto;
  max-height: 220px;
  padding-right: 4px;
}

.product-details p {
  margin: 0 0 6px 0;
  font-size: 16px;
  line-height: 1.3;
}

/* Optional: hide scrollbar on Webkit */
.product-details::-webkit-scrollbar {
  width: 4px;
}
.product-details::-webkit-scrollbar-thumb {
  background-color: #ccc;
  border-radius: 2px;
}
  .card-body {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}

.card-body h5 {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 8px;
}

.product-details {
  overflow-y: auto;
  max-height: 200px;
  flex-grow: 1;
}

.text-end {
  margin-top: 12px;
}
  .product-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}

.card-body {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  padding: 12px;
}

.product-details {
  flex-grow: 1;
  overflow-y: auto;
}

.card-footer {
  margin-top: auto;
  padding-top: 10px;
}

.product-info {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}

.product-title {
  font-size: 40px;
  font-weight: 600;
  margin-bottom: 10px;
  color: #1e3c72;
  font-family: 'Cinzel', sans-serif;
}


.product-details .detail-line {
  margin-bottom: 6px;
  font-size: 25px;
}

.product-details .label {
  color: #3d4bb6ff;
  font-weight: bold;
  margin-right: 5px;
  font-family: 'Cinzel', sans-serif;
}
.product-details {
  border: 2px solid navy;
  border-radius: 10px;
  padding: 12px 16px;
  background-color: #fdfdff;
  margin-bottom: 10px;
}



      `}</style>
    </div>
  );
};

export default SellerHome;
