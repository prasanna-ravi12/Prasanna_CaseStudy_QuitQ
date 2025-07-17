// // // src/components/OrderConfirmation.js
// // import React, { useEffect, useState } from "react";
// // // import UserNavbar from "./user_navbar";
// // import { useNavigate } from 'react-router-dom';
// // import OrderNavbar from "./OrderNavbar";

// // export default function OrderConfirmation() {
// //   const [orders, setOrders] = useState([]);
// //   const navigate = useNavigate();

// //   useEffect(() => {
// //     const storedOrders = sessionStorage.getItem("placedOrders");
// //     if (storedOrders) {
// //       setOrders(JSON.parse(storedOrders));
// //     }
// //   }, []);

// //   const email = localStorage.getItem("email"); // from login.js
// //   const address = "123, Your Street, Your City"; // replace this with real user address if available

// //   return (
// //     <>
// //       <OrderNavbar email={email} />

// //       <style>{`
// //         body {
// //           margin: 0;
// //           padding: 0;
// //           font-family: 'Segoe UI', sans-serif;
// //           background: linear-gradient(120deg, #d0e7ff, #b3ecff, #a3cfff);
// //           background-size: 300% 300%;
// //           animation: animatedBG 20s ease infinite;
// //         }
// //         @keyframes animatedBG {
// //           0% { background-position: 0% 50%; }
// //           50% { background-position: 100% 50%; }
// //           100% { background-position: 0% 50%; }
// //         }
// //         .container {
// //           background-color: rgba(255, 255, 255, 0.9);
// //           border-radius: 15px;
// //           padding: 30px;
// //           margin: 50px auto;
// //           max-width: 900px;
// //           box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
// //         }
// //         h2 {
// //           color: #1565c0;
// //           font-weight: 600;
// //         }
// //         .alert-info {
// //           background-color: #e3f2fd;
// //           color: #0d47a1;
// //           border-left: 5px solid #42a5f5;
// //         }
// //         table {
// //           background-color: #f0f8ff;
// //           border-radius: 10px;
// //           overflow: hidden;
// //         }
// //         thead {
// //           background-color: #90caf9;
// //           color: #0d47a1;
// //         }
// //         th, td {
// //           text-align: center;
// //           vertical-align: middle;
// //         }
// //         .btn-success {
// //           background-color: #1e88e5;
// //           border: none;
// //           color: white;
// //           margin-top: 20px;
// //         }
// //         .btn-success:hover {
// //           background-color: #1565c0;
// //         }
// //       `}</style>

// //       <div className="container">
// //         <h2 className="text-center mb-4">Order Confirmation</h2>

// //         <h5>Customer Email: <strong>{email}</strong></h5>
// //         <h5>Delivery Address:</h5>
// //         <p>{address}</p>

// //         <div className="alert alert-info mt-3">
// //           <strong>Your order will be delivered to this address within 5 days.</strong>
// //         </div>

// //         <h4 className="mt-4">Ordered Products:</h4>
// //         <table className="table table-bordered">
// //           <thead>
// //             <tr>
// //               <th>Product</th>
// //               <th>Brand</th>
// //               <th>Price</th>
// //               <th>Quantity</th>
// //               <th>Total</th>
// //             </tr>
// //           </thead>
// //           <tbody>
// //             {orders.map((order, index) => (
// //               <tr key={index}>
// //                 <td>{order.productName}</td>
// //                 <td>{order.brand}</td>
// //                 <td>₹{order.price}</td>
// //                 <td>{order.quantity}</td>
// //                 <td>₹{order.totalAmount}</td>
// //               </tr>
// //             ))}
// //           </tbody>
// //         </table>

// //         {/* Simulated Payment Button */}
// //         <div className="text-center">
// //           {/* <button className="btn btn-success">Pay Now</button> */}
// //           <button className="btn btn-warning" onClick={() => navigate("/simulatepayment")}>
// //   Pay Now
// // </button>
// // <button className="btn btn-warning" onClick={() => navigate("/usercategory")}>
// //     Finish Payment
// //   </button>

// //         </div>
// //       </div>
// //     </>
// //   );
// // }
// // src/components/OrderConfirmation.js
// import React, { useEffect, useState } from "react";
// import axiosInstance from "../utils/axiosInstance";
// import { useNavigate } from 'react-router-dom';
// import OrderNavbar from "./OrderNavbar";

// export default function OrderConfirmation() {
//   const [cartItems, setCartItems] = useState([]);
//   const [user, setUser] = useState({});
//   const navigate = useNavigate();
//   const email = localStorage.getItem("email");

//   useEffect(() => {
//     fetchUserInfo();
//     fetchCartItems();
//   }, []);

//   const fetchUserInfo = async () => {
//     try {
//       const res = await axiosInstance.get(`/api/users/${email}`);
//       setUser(res.data);
//     } catch (err) {
//       console.error("Error fetching user data:", err);
//     }
//   };

//   const fetchCartItems = async () => {
//     try {
//       const res = await axiosInstance.get("/api/cart");
//       const filtered = res.data.filter(item => item.customerEmail === email);
//       setCartItems(filtered);
//     } catch (err) {
//       console.error("Error fetching cart data:", err);
//     }
//   };

//   const calculateTotal = () => {
//     let price = 0, discount = 0;

//     cartItems.forEach(item => {
//       price += item.price * item.quantity;

//       let discountPercent = 0;
//       if (item.discount && item.discount !== "No") {
//         discountPercent = parseInt(item.discount.replace('%', '')) || 0;
//         discount += ((item.price * discountPercent) / 100) * item.quantity;
//       }
//     });

//     const platformFee = 50;
//     const total = price - discount + platformFee;
//     return { price, discount, platformFee, total };
//   };

//   const { price, discount, platformFee, total } = calculateTotal();

//   return (
//     <>
//       <OrderNavbar email={email} />
//       <div style={styles.body}>
//         <div style={styles.container}>
//           <h2 style={styles.heading}>Order Confirmation</h2>

//           <p><strong>Email:</strong> {email}</p>
//           <p><strong>Delivery Address:</strong> {user.name}, {user.address}, {user.city}, {user.state}, {user.pincode}</p>

//           <div style={styles.alert}>
//             📦 Your order will be delivered within 5 days. A confirmation email has been sent.
//           </div>

//           <div style={styles.row}>
//             {/* Left - Ordered Items */}
//             <div style={styles.left}>
//               <h4 style={styles.sectionTitle}>Order Summary</h4>
//               <table className="table table-bordered table-striped" style={styles.table}>
//                 <thead>
//                   <tr style={styles.thead}>
//                     <th>Product</th>
//                     <th>Brand</th>
//                     <th>Price</th>
//                     <th>Qty</th>
//                     <th>Total</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {cartItems.map((item, idx) => (
//                     <tr key={idx}>
//                       <td>{item.productName}</td>
//                       <td>{item.brand}</td>
//                       <td>₹{item.price}</td>
//                       <td>{item.quantity}</td>
//                       <td>₹{(item.price * item.quantity).toFixed(2)}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>

//             {/* Right - Price Details */}
//             <div style={styles.right}>
//               <h4>Price Details</h4>
//               <hr />
//               <p>Price ({cartItems.length} items): ₹{price.toFixed(2)}</p>
//               <p>Discount: -₹{discount.toFixed(2)}</p>
//               <p>Platform Fee: ₹{platformFee}</p>
//               <hr />
//               <h5>Total: ₹{total.toFixed(2)}</h5>
//               <p style={{ color: 'green' }}>You saved ₹{discount.toFixed(2)} on this order</p>
//               <button className="btn btn-primary w-100 mt-3" onClick={() => navigate("/simulatepayment")}>
//                 Proceed to Payment
//               </button>
//               <button className="btn btn-outline-secondary w-100 mt-2" onClick={() => navigate("/usercategory")}>
//                 Back to Shopping
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// const styles = {
//   body: {
//     background: "linear-gradient(120deg, #d0e7ff, #b3ecff, #a3cfff)",
//     minHeight: "100vh",
//     padding: "40px",
//     fontFamily: "'Segoe UI', sans-serif"
//   },
//   container: {
//     background: "rgba(255, 255, 255, 0.95)",
//     borderRadius: "20px",
//     padding: "30px",
//     maxWidth: "1200px",
//     margin: "0 auto",
//     boxShadow: "0 0 25px rgba(0, 0, 0, 0.1)"
//   },
//   heading: {
//     color: "#1565c0",
//     textAlign: "center",
//     marginBottom: "30px"
//   },
//   alert: {
//     backgroundColor: "#e3f2fd",
//     padding: "15px",
//     borderLeft: "6px solid #42a5f5",
//     borderRadius: "10px",
//     marginBottom: "30px",
//     color: "#0d47a1"
//   },
//   row: {
//     display: "flex",
//     gap: "30px"
//   },
//   left: {
//     flex: 2
//   },
//   right: {
//     flex: 1,
//     backgroundColor: "#e1f5fe",
//     padding: "20px",
//     borderRadius: "12px",
//     boxShadow: "0 3px 12px rgba(0,0,0,0.1)"
//   },
//   sectionTitle: {
//     marginBottom: "15px",
//     fontWeight: "bold",
//     color: "#0d47a1"
//   },
//   table: {
//     background: "#f0f8ff",
//     borderRadius: "10px",
//     overflow: "hidden"
//   },
//   thead: {
//     backgroundColor: "#90caf9",
//     color: "#0d47a1"
//   }
// };
import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { useNavigate } from 'react-router-dom';
import OrderNavbar from "./OrderNavbar";
import ReactModal from 'react-modal';


export default function OrderConfirmation() {
  const [cartItems, setCartItems] = useState([]);
  const [user, setUser] = useState({});
  const [confirmationEmail, setConfirmationEmail] = useState("");
  const navigate = useNavigate();
  const email = localStorage.getItem("email");
  const [isModalOpen, setIsModalOpen] = useState(false);
const [formData, setFormData] = useState({
  name: "",
  address: "",
  city: "",
  state: "",
  pincode: ""
});


  useEffect(() => {
    fetchUserInfo();
    fetchCartItems();
  }, []);

  const fetchUserInfo = async () => {
    try {
      const res = await axiosInstance.get(`/api/users/${email}`);
      setUser(res.data);
      setFormData({
  name: res.data.name,
  address: res.data.address,
  city: "",
  state: "",
  pincode: ""
});



    } catch (err) {
      console.error("Error fetching user data:", err);
    }
  };

//   const handleChangeAddressSubmit = async (e) => {
//   e.preventDefault();
//   try {
//     const updatedUser = { ...user, ...formData };
//     await axiosInstance.put(`/api/users/${email}`, updatedUser);
//     setUser(updatedUser);
//     setIsModalOpen(false);
//   } catch (err) {
//     console.error("Error updating address:", err);
//   }
// };
const handleChangeAddressSubmit = async (e) => {
  e.preventDefault();
  try {
    const fullAddress = `${formData.address}, ${formData.city}, ${formData.state}, ${formData.pincode}`;
    const updatedUser = {
      ...user,
      name: formData.name,
      address: fullAddress, // Store full combined address in one field
    };
    await axiosInstance.put(`/api/users/${email}`, updatedUser);
    setUser(updatedUser);
    setIsModalOpen(false);
  } catch (err) {
    console.error("Error updating address:", err);
  }
};


  const fetchCartItems = async () => {
    try {
      const res = await axiosInstance.get("/api/cart");
      const filtered = res.data.filter(item => item.customerEmail === email);
      setCartItems(filtered);
    } catch (err) {
      console.error("Error fetching cart data:", err);
    }
  };

  const calculateTotal = () => {
    let price = 0, discount = 0;

    cartItems.forEach(item => {
      price += item.price * item.quantity;

      let discountPercent = 0;
      if (item.discount && item.discount !== "No") {
        discountPercent = parseInt(item.discount.replace('%', '')) || 0;
        discount += ((item.price * discountPercent) / 100) * item.quantity;
      }
    });

    const platformFee = 50;
    const total = price - discount + platformFee;
    return { price, discount, platformFee, total };
  };

  const { price, discount, platformFee, total } = calculateTotal();

  return (
    <div style={{ paddingTop: '60px' }}>

      <OrderNavbar email={email} />
      <div style={styles.body}>
        <div style={styles.container}>
          <div style={styles.leftSection}>
            {/* LOGIN */}
            <div style={styles.box}>
              <h5 style={styles.sectionTitle}>1 LOGIN</h5>
              <div style={styles.subBox}>
                {email}
                {/* <button className="btn btn-link float-end">CHANGE</button> */}
              </div>
            </div>

            {/* DELIVERY ADDRESS */}
            <div style={styles.box}>
              <h5 style={styles.sectionTitle}>2 DELIVERY ADDRESS</h5>
              <div style={styles.subBox}>
                {user.name}, {user.address}, {user.city}, {user.state}, {user.pincode}
                {/* <button className="btn btn-link float-end">CHANGE</button> */}
                <button
  className="btn btn-link float-end"
  onClick={() => setIsModalOpen(true)}
>
  CHANGE
</button>

              </div>
            </div>

            {/* ORDER SUMMARY */}
            <div style={styles.box}>
              <h5 style={styles.sectionTitle}>3 ORDER SUMMARY</h5>
              <div style={styles.subBox}>
                {cartItems.map(item => (
                  <div key={item.cartId} style={styles.itemCard}>
                    <img src={item.imageUrl} alt="product" style={styles.image} />
                    <div style={styles.itemDetails}>
                      <p style={{ fontWeight: "bold" }}>{item.productName}</p>
                      <p>Seller: {item.brand}</p>
                      <p>Price: ₹{item.price} × {item.quantity}</p>
                      <p>Total: ₹{item.price * item.quantity}</p>
                      <p>Delivery by: <strong>{new Date(Date.now() + 5 * 86400000).toDateString()}</strong></p>
                    </div>
                  </div>
                ))}

                {/* Email entry */}
                {/* <div className="mt-4">
                  <label style={{ fontWeight: 500 }}>
                    Order confirmation email will be sent to
                  </label>
                  <input
                    type="email"
                    placeholder="Enter your email ID"
                    className="form-control mt-2"
                    value={confirmationEmail}
                    onChange={(e) => setConfirmationEmail(e.target.value)}
                  />
                  <button className="btn btn-warning mt-3 w-100">CONTINUE</button>
                </div> */}
              </div>
            </div>
          </div>

          {/* Price Details */}
          <div style={styles.priceDetails}>
            <h5>PRICE DETAILS</h5>
            <hr />
            <p>Price ({cartItems.length} items): ₹{price.toFixed(2)}</p>
            <p>Platform Fee: ₹{platformFee}</p>
            <p><strong>Total Payable: ₹{total.toFixed(2)}</strong></p>
            <p style={{ color: "lightgreen" }}>
              Your Total Savings on this order ₹{discount.toFixed(2)}
            </p>
            <hr />
            <p>✅ Safer and Secure Payments</p>
            <p>✅ Easy returns. 100% Authentic products</p>
            <button
              className="btn btn-primary w-100 mt-3"
              onClick={() => navigate("/payment")}
            >
              Proceed to Payment
            </button>
            <button
              className="btn btn-outline-light w-100 mt-2"
              onClick={() => navigate("/usercategory")}
            >
              Back to Shopping
            </button>
          </div>
        </div>
      </div>

      <ReactModal
      
  isOpen={isModalOpen}
  onRequestClose={() => setIsModalOpen(false)}
  style={{
    content: {
      top: "0",
      left: "0",
      right: "auto",
      bottom: "0",
      width: "400px",
      height: "100%",
      backgroundColor: "#002b5c",
  padding: "80px 20px 20px 20px", // ✅ Top padding increased to avoid navbar overlap
      transition: "transform 0.3s ease-in-out",
      transform: isModalOpen ? "translateX(0)" : "translateX(-100%)"
    },
    overlay: {
      backgroundColor: "rgba(0,0,0,0.5)"
    }
  }}
  ariaHideApp={false}
>
  <h4 style={{ color: "white" }}>Edit Delivery Address</h4>
  <form onSubmit={handleChangeAddressSubmit}>
    <input
      type="text"
      className="form-control my-2"
      placeholder="Name"
      value={formData.name}
      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
    />
    <input
      type="text"
      className="form-control my-2"
      placeholder="Address"
      value={formData.address}
      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
    />
    <input
      type="text"
      className="form-control my-2"
      placeholder="City"
      value={formData.city}
      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
    />
    <input
      type="text"
      className="form-control my-2"
      placeholder="State"
      value={formData.state}
      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
    />
    <input
      type="text"
      className="form-control my-2"
      placeholder="Pincode"
      value={formData.pincode}
      onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
    />
    <button type="submit" className="btn btn-success w-100 mt-3">Save Address</button>
    <button className="btn btn-outline-light w-100 mt-2" onClick={() => setIsModalOpen(false)}>Cancel</button>
  </form>
</ReactModal>

    </div>
  );
}
const styles = {
  body: {
    background: "linear-gradient(to bottom, #003366, #0055aa)",
    minHeight: "100vh",
    padding: "30px",
    fontFamily: "'Segoe UI', sans-serif",
    color: "white",
  },
  container: {
    display: "flex",
    gap: "30px",
    maxWidth: "1200px",
    margin: "0 auto",
  },
  leftSection: {
    flex: 2,
  },
  priceDetails: {
    flex: 1,
    backgroundColor: "#002b5c",
    padding: "20px",
    borderRadius: "12px",
    color: "white",
    boxShadow: "0 3px 10px rgba(0,0,0,0.2)",
  },
  box: {
    marginBottom: "25px",
  },
  sectionTitle: {
    color: "#90caf9",
    marginBottom: "10px",
  },
  subBox: {
    background: "#1565c0",
    padding: "15px",
    borderRadius: "10px",
    color: "#fff",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },
  itemCard: {
    display: "flex",
    background: "#ffffff",
    color: "black",
    borderRadius: "10px",
    marginBottom: "15px",
    padding: "15px",
    gap: "15px",
    alignItems: "center",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },
  image: {
    width: "100px",
    height: "100px",
    objectFit: "cover",
    borderRadius: "8px",
    border: "1px solid #ccc",
  },
  itemDetails: {
    flex: 1,
  },
};
