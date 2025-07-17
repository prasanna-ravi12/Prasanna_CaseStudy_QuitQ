
import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { Bar, Pie } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { Modal, Button } from "react-bootstrap";



const AdminHome = () => {
  const [view, setView] = useState("dashboard");
  const [allProducts, setAllProducts] = useState([]);
const [allOrders, setAllOrders] = useState([]);
const [selectedCustomer, setSelectedCustomer] = useState("");
const [selectedSeller, setSelectedSeller] = useState("");
const [selectedOrderDetail, setSelectedOrderDetail] = useState(null);
const [showModal, setShowModal] = useState(false);


  // Dashboard States
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  // Category Management
  const [catInputs, setCatInputs] = useState({ categoryId: "", categoryName: "" });
  const [editMode, setEditMode] = useState(false);

  // User Management
  const [users, setUsers] = useState([]);

  // Personal Info
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    gender: "",
    phone: "",
    address: "",
  });
 const [reviews, setReviews] = useState([]);
const fetchAllReviews = async () => {
  const res = await axiosInstance.get("/api/reviews");
  setReviews(res.data);
};

  
  const navigate = useNavigate();

const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("email");
  // Clear any other data if needed
  // navigate("/login");
  navigate("/login", { replace: true });
  toast.success("Logout successful!");
};

  useEffect(() => {
  if (view === "dashboard") {
    fetchCategories();
    fetchProducts();
    fetchOrders();
  } else if (view === "categories") {
    fetchCategories();
  } else if (view === "users") {
    fetchUsers();
  } else if (view === "personal") {
    fetchUserDetails();
  } else if (view === "orders") {
    fetchAllOrders();
  } else if (view === "productdetails") {
    fetchAllProducts();
  }else if (view === "reviews") {
  fetchAllReviews();


    
  }
}, [view]);
const fetchAllOrders = async () => {
  const res = await axiosInstance.get("/api/finalorders");
  setAllOrders(res.data);
};

const fetchAllProducts = async () => {
  const res = await axiosInstance.get("/api/products");
  setAllProducts(res.data);
};

  const fetchCategories = async () => {
    const res = await axiosInstance.get("/api/categories");
    setCategories(res.data);
  };

  const fetchProducts = async () => {
    const res = await axiosInstance.get("/api/products");
    setProducts(res.data);
  };

  const fetchOrders = async () => {
    const res = await axiosInstance.get("/api/finalorders");
    setOrders(res.data);
  };

  const fetchUsers = async () => {
    const res = await axiosInstance.get("/api/users");
    setUsers(res.data);
  };

  const fetchUserDetails = async () => {
    // const res = await axiosInstance.get("/api/users/me"); // use token to get logged-in admin
    const email = localStorage.getItem("email");
  
    const res = await axiosInstance.get(`/api/users/${email}`);

    setUserDetails(res.data);
  };

  const handleOrderDelete = async (id) => {
  if (window.confirm("Delete this order?")) {
    await axiosInstance.delete(`/api/finalorders/${id}`);
    fetchOrders();
  }
};

const handleProductDelete = async (id) => {
  if (window.confirm("Delete this product?")) {
    await axiosInstance.delete(`/api/products/${id}`);
    fetchProducts();
  }
};

  const handleUserDetailChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleReviewDelete = async (id) => {
  if (window.confirm("Delete this review?")) {
    await axiosInstance.delete(`/api/reviews/${id}`);
    fetchAllReviews();
  }
};



 
  const handleUserDetailSubmit = async (e) => {
  e.preventDefault();
  const email = userDetails.email;
  try {
    await axiosInstance.put(`/api/users/${email}`, userDetails); // ✅ corrected path
    toast.success("Profile updated successfully!");
  } catch (err) {
    alert("Error updating profile: " + err.message);
  }
};


  const orderSellerMap = () => {
    const counts = {};
    orders.forEach((order) => {
      const seller = order.sellerEmail || "Unknown";
      counts[seller] = (counts[seller] || 0) + 1;
    });
    return {
      labels: Object.keys(counts),
      datasets: [{ label: "Orders", data: Object.values(counts), backgroundColor: "#6f42c1" }],
    };
  };

  const sellerOrderStats = () => {
  const counts = {};
  orders.forEach((order) => {
    const seller = order.sellerEmail || "Unknown";
    counts[seller] = (counts[seller] || 0) + 1;
  });

  const colors = Object.keys(counts).map(() =>
    "#" + Math.floor(Math.random() * 16777215).toString(16)
  );

  return {
    labels: Object.keys(counts),
    datasets: [
      {
        label: "Orders by Seller",
        data: Object.values(counts),
        backgroundColor: colors,
      },
    ],
  };
};


  const categoryPieMap = () => {
    const labels = categories.map((cat) => cat.categoryName);
    const data = categories.map(() => Math.floor(Math.random() * 10 + 1));
    return {
      labels,
      datasets: [{ data, backgroundColor: ["#3498db", "#1abc9c", "#e67e22", "#9b59b6", "#e74c3c"] }],
    };
  };

  const handleCatChange = (e) => {
    const { name, value } = e.target;
    setCatInputs((prev) => ({ ...prev, [name]: value }));
  };

  const handleCatSubmit = async (e) => {
    e.preventDefault();
    if (editMode) {
      await axiosInstance.put(`/api/categories/${catInputs.categoryId}`, catInputs);
      setEditMode(false);
    } else {
      await axiosInstance.post("/api/categories", catInputs);
    }
    setCatInputs({ categoryId: "", categoryName: "" });
    fetchCategories();
  };

  const handleCatEdit = (cat) => {
    setCatInputs(cat);
    setEditMode(true);
  };

  const handleCatDelete = async (id) => {
    if (window.confirm("Delete this category?")) {
      await axiosInstance.delete(`/api/categories/${id}`);
      fetchCategories();
    }
  };

  const handleUserDelete = async (email) => {
    if (window.confirm("Delete user?")) {
      await axiosInstance.delete(`/api/users/${email}`);
      fetchUsers();
    }
  };

  const renderView = () => {
    if (view === "dashboard") {
      return (
        <>
          <h2 className="text-center mb-4">Admin Dashboard</h2>
          <div className="row mb-4">
            <div className="col-md-4"><div className="stat-box blue"><h4>Total Categories</h4><h2>{categories.length}</h2></div></div>
            <div className="col-md-4"><div className="stat-box purple"><h4>Total Products</h4><h2>{products.length}</h2></div></div>
            <div className="col-md-4"><div className="stat-box green"><h4>Total Orders</h4><h2>{orders.length}</h2></div></div>
          </div>
          <div className="row">
            <div className="col-md-6"><div className="chart-box"><h5 className="text-center mb-2">Orders per Seller</h5><Bar data={orderSellerMap()} /></div></div>
            <div className="col-md-6"><div className="chart-box"><h5 className="text-center mb-2">Category Distribution</h5><Pie data={categoryPieMap()} /></div></div>
          </div>
        </>
      );
    
 } else if (view === "categories") {
  return (
    <div className="row">
      <div className="col-md-4">
        <div className="form-section slide-left">
          <h4>{editMode ? "Edit" : "Add"} Category</h4>
          <form onSubmit={handleCatSubmit}>
            <input
              className="form-control mb-2"
              name="categoryName"
              value={catInputs.categoryName}
              onChange={handleCatChange}
              placeholder="Category Name"
              required
            />
            <button className="btn btn-primary">Save</button>
            <button
              type="button"
              className="btn btn-secondary ms-2"
              onClick={() => {
                setEditMode(false);
                setCatInputs({ categoryId: "", categoryName: "" });
              }}
            >
              Reset
            </button>
          </form>
        </div>
      </div>

      <div className="col-md-8">
        <div className="table-section slide-right">
          <h4>Category List</h4>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((cat) => (
                <tr key={cat.categoryId}>
                  <td>{cat.categoryId}</td>
                  <td>{cat.categoryName}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-info me-2"
                      onClick={() => handleCatEdit(cat)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleCatDelete(cat.categoryId)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );


    } else if (view === "users") {
      return (
        <div className="table-section zoom-in">
          <h4 className="text-center mb-3">All Registered Users</h4>
          <table className="table table-bordered table-hover table-striped">
            <thead>
              <tr><th>Email</th><th>Name</th><th>Gender</th><th>Role</th><th>Phone</th><th>Action</th></tr>
            </thead>
            <tbody>
              {users
              .filter((u) => u.role !== "ADMIN") 
              .map((u) => (
                <tr key={u.email}>
                  <td>{u.email}</td>
                  <td>{u.name}</td>
                  <td>{u.gender}</td>
                  <td>{u.role}</td>
                  <td>{u.phone}</td>
                  <td><button className="btn btn-danger btn-sm" onClick={() => handleUserDelete(u.email)}>Delete</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    } else if (view === "personal") {
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
          <h4>Personal Information</h4>
         
          <form onSubmit={handleUserDetailSubmit}>
  <div className="row">
    <div className="col-md-6 mb-3 slide-input" style={{ animationDelay: "0.1s" }}>
      <label>Name</label>
      <input className="form-control" name="name" value={userDetails.name} onChange={handleUserDetailChange} />
    </div>
    <div className="col-md-6 mb-3 slide-input" style={{ animationDelay: "0.2s" }}>
      <label>Email</label>
      <input className="form-control" name="email" value={userDetails.email} disabled />
    </div>
    <div className="col-md-6 mb-3 slide-input" style={{ animationDelay: "0.3s" }}>
      <label>Phone</label>
      <input className="form-control" name="phone" value={userDetails.phone} onChange={handleUserDetailChange} />
    </div>
    <div className="col-md-6 mb-3 slide-input" style={{ animationDelay: "0.4s" }}>
      <label>Gender</label><br />
      <div className="form-check form-check-inline">
        <input
          type="radio"
          className="form-check-input"
          name="gender"
          value="Male"
          checked={userDetails.gender?.toLowerCase() === "male"}
          onChange={handleUserDetailChange}
        />
        <label className="form-check-label">Male</label>
      </div>
      <div className="form-check form-check-inline">
        <input
          type="radio"
          className="form-check-input"
          name="gender"
          value="Female"
          checked={userDetails.gender?.toLowerCase() === "female"}
          onChange={handleUserDetailChange}
        />
        <label className="form-check-label">Female</label>
      </div>
    </div>
    <div className="col-12 mb-3 slide-input" style={{ animationDelay: "0.5s" }}>
      <label>Address</label>
      <textarea className="form-control" name="address" value={userDetails.address} onChange={handleUserDetailChange}></textarea>
    </div>
    <div className="col-12 slide-input" style={{ animationDelay: "0.6s" }}>
      <button className="btn btn-success me-2" type="submit">Save</button>
      <button className="btn btn-secondary" type="button" onClick={fetchUserDetails}>Reset</button>
    </div>
  </div>
</form>

        </div>
      );
  
  } else if (view === "orderdetails") {
  return (
   
    <div className="order-card-section">
    <h4 className="text-center mb-3">All Final Orders</h4>
    <select
      className="form-select mb-4"
      onChange={(e) => setSelectedCustomer(e.target.value)}
    >
      <option value="">All Customers</option>
      {Array.from(new Set(orders.map((o) => o.customerEmail))).map((email) => (
        <option key={email} value={email}>{email}</option>
      ))}
    </select>

    {orders
      .filter((o) => !selectedCustomer || o.customerEmail === selectedCustomer)
      .map((order, idx) => {
        const orderDate = order.orderDate ? new Date(order.orderDate).toLocaleString() : "N/A";
        const expectedDelivery = order.expectedDelivery
          ? new Date(order.expectedDelivery).toLocaleDateString()
          : "N/A";
        const deliveredOn = order.deliveryDate
          ? new Date(order.deliveryDate).toLocaleDateString()
          : "Not Delivered";

        return (
          <div
            className="card mb-3 shadow-sm p-3 d-flex flex-column flex-md-row align-items-start order-card"
            key={idx}
            style={{ animationDelay: `${idx * 0.1}s` }}
          >
            <img
              src={order.imageUrl || "https://via.placeholder.com/100"}
              alt="product"
              className="img-thumbnail me-3"
              style={{ width: "100px", height: "100px", objectFit: "cover" }}
            />

            <div className="flex-grow-1">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <h5 className="mb-0">{order.productName}</h5>
                <span className="badge bg-info text-dark">ID: {order.id}</span>
              </div>

              <p className="mb-1"><strong>Brand:</strong> {order.brand}</p>
              <p className="mb-1"><strong>Customer:</strong> {order.customerEmail}</p>
              <p className="mb-1"><strong>Seller:</strong> {order.sellerEmail}</p>

              <button
                className="btn btn-sm btn-outline-danger mt-2"
                onClick={() => setSelectedOrderDetail(order)}
              >
                View Details
              </button>
              <button
                className="btn btn-sm btn-outline-secondary mt-2 ms-2"
                onClick={() => handleOrderDelete(order.id)}
              >
                Delete Order
              </button>
            </div>
          </div>
        );
      })}

    {/* Slide-In Overlay Card */}
    {selectedOrderDetail && (
      <div className="order-overlay">
        <div className="order-detail-card">
          <button className="back-btn" onClick={() => setSelectedOrderDetail(null)}>❮</button>
          <h4 className="mb-3">{selectedOrderDetail.productName}</h4>
          <img
            src={selectedOrderDetail.imageUrl || "https://via.placeholder.com/200"}
            alt="product"
            className="img-fluid mb-3"
            style={{ borderRadius: "10px", maxHeight: "200px", objectFit: "cover" }}
          />

          <p><strong>Brand:</strong> {selectedOrderDetail.brand}</p>
          <p><strong>Customer Email:</strong> {selectedOrderDetail.customerEmail}</p>
          <p><strong>Seller Email:</strong> {selectedOrderDetail.sellerEmail}</p>
          <p><strong>Quantity:</strong> {selectedOrderDetail.quantity}</p>
          <p><strong>Price:</strong> ₹{selectedOrderDetail.price}</p>
          <p><strong>Total Amount:</strong> ₹{selectedOrderDetail.totalAmount}</p>
          <p><strong>Order Date:</strong> {new Date(selectedOrderDetail.orderDate).toLocaleString()}</p>
          <p><strong>Expected Delivery:</strong> {new Date(selectedOrderDetail.expectedDelivery).toLocaleDateString()}</p>
          <p><strong>Delivery Status:</strong> {selectedOrderDetail.deliveryStatus}</p>
          <p><strong>Delivered On:</strong> {selectedOrderDetail.deliveryDate ? new Date(selectedOrderDetail.deliveryDate).toLocaleDateString() : "Not Delivered"}</p>
          <p><strong>Payment:</strong> {selectedOrderDetail.paymentMethod} ({selectedOrderDetail.paymentStatus})</p>
        </div>
      </div>
    )}
  </div>
  );



} else if (view === "productdetails") {
  return (
    <div className="table-section">
      <h4 className="mb-3 text-center">All Product Details</h4>
      <select className="form-select mb-3" onChange={(e) => setSelectedSeller(e.target.value)}>
        <option value="">All Sellers</option>
        {Array.from(new Set(allProducts.map((p) => p.sellerEmail))).map((email) => (
          <option key={email} value={email}>{email}</option>
        ))}
      </select>
      {allProducts.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div className="row">
          {allProducts
            .filter((p) => !selectedSeller || p.sellerEmail === selectedSeller)
            .map((product, idx) => (
              <div className="col-md-6 mb-4" key={idx}>
<div
  className="card p-3 shadow-sm d-flex align-items-center flip-card"
  style={{ animationDelay: `${idx * 0.1}s` }}
>                  <div className="d-flex align-items-center">
                    <img
                      src={product.imageUrl}
                      alt="product"
                      style={{
                        width: "140px",
                        height: "140px",
                        objectFit: "cover",
                        marginRight: "20px",
                        borderRadius: "10px"
                      }}
                    />
                    <div>
                      <h5>{product.productName}</h5>
                      <p className="mb-1">₹{product.price}</p>
                      <p className="mb-1"><strong>Seller:</strong> {product.sellerEmail}</p>
                      <p className="mb-1"><strong>Category:</strong> {product.category}</p>
                      <p className="mb-1"><strong>Quantity:</strong> {product.stock}</p>
                      <button
                        className="btn btn-outline-primary btn-sm mt-2"
                        onClick={() => handleProductDelete(product.productId)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
} else if (view === "sellerstats") {
  return (
    <div className="chart-box">
      <h4 className="text-center mb-4">Order Statistics by Seller</h4>
      <Bar data={sellerOrderStats()} />
    </div>
  );
}else if (view === "reviews") {
  return (
    <div className="review-section">
      <h4 className="text-center mb-4">Customer Reviews</h4>
      <div className="row">
        {reviews.map((review, idx) => (
          <div
            className="col-md-6 mb-4 review-card slide-up"
            key={review.reviewId}
            style={{ animationDelay: `${idx * 0.1}s` }}
          >
            <div className="card p-3 shadow-sm colorful-border d-flex flex-row align-items-start">
              <img
                src={review.imageUrl || "https://via.placeholder.com/100"}
                alt="product"
                className="img-thumbnail me-3"
                style={{
                  width: "100px",
                  height: "100px",
                  objectFit: "cover",
                  borderRadius: "10px",
                }}
              />

              <div className="flex-grow-1">
                <h5 className="text-primary">{review.productName}</h5>
                <p className="mb-1"><strong>Brand:</strong> {review.brand}</p>
                <p className="mb-1"><strong>Customer:</strong> {review.customerEmail}</p>
                {/* <p className="mb-2">
                  <strong>Rating:</strong>{" "}
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <i className="fa fa-star text-warning" key={i}></i>
                  ))}
                  {Array.from({ length: 5 - review.rating }).map((_, i) => (
                    <i className="fa fa-star text-secondary" key={i}></i>
                  ))}
                </p> */}
                <p className="mb-2">
  <strong>Rating:</strong>{" "}
  {Array.from({ length: review.rating }).map((_, i) => (
    <i className="fa fa-star text-warning" key={`filled-${review.reviewId}-${i}`}></i>
  ))}
  {Array.from({ length: 5 - review.rating }).map((_, i) => (
    <i className="fa fa-star text-secondary" key={`empty-${review.reviewId}-${i}`}></i>
  ))}
</p>

                <button
                  className="btn btn-outline-danger btn-sm mt-1"
                  onClick={() => handleReviewDelete(review.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}





  };

  return (
    <div className="admin-wrapper">
      <div className="sidebar">
        <div className="admin-info"><i className="fa fa-user-circle fa-3x mb-2"></i><div>Hello,<br /><strong>Admin</strong></div></div>
     
        <div className="nav-buttons">
  <div className="slide-sidebar" style={{ animationDelay: "0.1s" }}>
    <button className="nav-btn" onClick={() => setView("personal")}>
      <i className="fa fa-user me-2"></i> My Profile
    </button>
  </div>
  <div className="slide-sidebar" style={{ animationDelay: "0.2s" }}>
    <button className="nav-btn" onClick={() => setView("dashboard")}>
      <i className="fa fa-chart-bar me-2"></i> Dashboard
    </button>
  </div>
  <div className="slide-sidebar" style={{ animationDelay: "0.3s" }}>
    <button className="nav-btn" onClick={() => setView("categories")}>
      <i className="fa fa-list me-2"></i> Categories
    </button>
  </div>
  <div className="slide-sidebar" style={{ animationDelay: "0.4s" }}>
    <button className="nav-btn" onClick={() => setView("users")}>
      <i className="fa fa-users me-2"></i> Manage Users
    </button>
  </div>
  <div className="slide-sidebar" style={{ animationDelay: "0.5s" }}>
    <button className="nav-btn" onClick={() => setView("orderdetails")}>
      <i className="fa fa-shopping-cart me-2"></i> Order Details
    </button>
  </div>
  <div className="slide-sidebar" style={{ animationDelay: "0.6s" }}>
    <button className="nav-btn" onClick={() => setView("productdetails")}>
      <i className="fa fa-box-open me-2"></i> Product Details
    </button>
  </div>
  <div className="slide-sidebar" style={{ animationDelay: "0.7s" }}>
  <button className="nav-btn" onClick={() => setView("sellerstats")}>
    <i className="fa fa-chart-line me-2"></i> Seller Insights
  </button>
</div>
<div className="slide-sidebar" style={{ animationDelay: "0.8s" }}>
  <button className="nav-btn" onClick={() => setView("reviews")}>
    <i className="fa fa-star me-2"></i> Customer Reviews
  </button>
</div>


</div>

<div className="slide-sidebar" style={{ animationDelay: "0.7s" }}>
  <button className="logout-btn" onClick={handleLogout}>
    <i className="fa fa-sign-out-alt me-2"></i> Logout
  </button>
</div>


      </div>
      
      <div className="main-content p-4">{renderView()}</div>

      <style>{`
        .admin-wrapper {
          display: flex;
          min-height: 100vh;
          font-family: 'Segoe UI', sans-serif;
          background: #eef4f8;
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
          .slide-sidebar {
  opacity: 0;
  animation: slideSidebar 0.5s ease forwards;
}

@keyframes slideSidebar {
  from {
    transform: translateX(-30px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}
  .flip-card {
  opacity: 0;
  transform: rotateY(-90deg);
  animation: flipIn 0.6s ease forwards;
}

@keyframes flipIn {
  to {
    opacity: 1;
    transform: rotateY(0deg);
  }
}


.nav-btn {
  width: 100%;
  text-align: left;
  padding: 10px 15px;
  background: white;
  color: #1e3c72;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
}

.nav-btn i {
  width: 20px;
  text-align: center;
}

.slide-input {
  opacity: 0;
  animation: slideInput 0.5s ease forwards;
}
  .review-card {
  animation: slideUp 0.6s ease forwards;
  opacity: 0;
  transform: translateY(20px);
}

.colorful-border {
  border-left: 6px solid #ff6f61;
  border-radius: 10px;
  background: linear-gradient(45deg, #f8f9fa, #e3f2fd);
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);

}


@keyframes slideInput {
  from {
    transform: translateX(-20px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}
.order-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(20, 20, 20, 0.5);
  z-index: 1000;
  display: flex;
  justify-content: flex-end;
}

.order-detail-card {
  background: white;
  width: 400px;
  height: 100%;
  padding: 25px;
  overflow-y: auto;
  box-shadow: -4px 0 20px rgba(0, 0, 0, 0.2);
  animation: slideIn 0.4s ease forwards;
  position: relative;
  z-index: 1001;
  border-top-left-radius: 12px;
  border-bottom-left-radius: 12px;
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
}

.back-btn {
  position: absolute;
  top: 15px;
  right: 15px; /* ✅ instead of left */
  background: transparent;
  border: none;
  font-size: 24px;
  font-weight: bold;
  color: #333;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.back-btn:hover {
  transform: scale(1.1);
  color: #e53935;
}



.logout-btn {
  width: 100%;
  padding: 10px 15px;
  background: #e74c3c;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  display: flex;
  align-items: center;
}
  /* Slide from left */
.slide-left {
  animation: slideLeft 0.6s ease-out forwards;
  opacity: 0;
}

@keyframes slideLeft {
  0% {
    transform: translateX(-30px);
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
}

/* Slide from right */
.slide-right {
  animation: slideRight 0.6s ease-out forwards;
  opacity: 0;
}
.order-card {
  opacity: 0;
  transform: translateY(20px);
  animation: slideUp 0.5s ease forwards;
}

@keyframes slideUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideRight {
  0% {
    transform: translateX(30px);
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
}
  .chart-box {
  padding: 20px;
  background: white;
  border-radius: 15px;
  box-shadow: 0 8px 20px rgba(0,0,0,0.1);
}



        .stat-box {
          background: white;
          padding: 20px;
          border-radius: 12px;
          text-align: center;
          box-shadow: 0 0 10px rgba(0,0,0,0.1);
        }
        .blue { border-left: 6px solid #3498db; }
        .purple { border-left: 6px solid #9b59b6; }
        .green { border-left: 6px solid #2ecc71; }
        .chart-box, .form-section, .table-section {
          background: white;
          padding: 20px;
          border-radius: 15px;
          box-shadow: 0 8px 20px rgba(0,0,0,0.1);
        }
          .zoom-in {
  animation: zoomIn 0.6s ease forwards;
  opacity: 0;
  transform: scale(0.9);
}

@keyframes zoomIn {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }

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


      `}</style>
    </div>
  );
};

export default AdminHome;
