
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import { FaArrowLeft } from "react-icons/fa"; // import arrow icon
import { Player } from "@lottiefiles/react-lottie-player";
import processingAnim from "../animations/cash payment.json";



export default function PaymentPage() {
  const [method, setMethod] = useState("UPI");
  const [details, setDetails] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();
  const email = localStorage.getItem("email");
  const [isProcessing, setIsProcessing] = useState(false);



useEffect(() => {
  axiosInstance.get("/api/cart").then(res => {
    const items = res.data.filter(i => i.customerEmail === email);
    // console.log("Fetched cart items:", items); // ✅ check sellerEmail here
    setCartItems(items);
  });
}, [email]);



const calculateSummary = () => {
  let totalPrice = 0;
  let totalDiscount = 0;

  cartItems.forEach(item => {
    const quantity = item.quantity || 1;
    const price = item.price * quantity;
    totalPrice += price;

    if (item.discount && item.discount !== "No") {
      const discountPercent = parseInt(item.discount.replace('%', '')) || 0;
      const discountAmount = (item.price * discountPercent / 100) * quantity;
      totalDiscount += discountAmount;
    }
  });

  const platformFee = 50;
  const finalPayable = totalPrice - totalDiscount + platformFee;

  return { totalPrice, totalDiscount, platformFee, finalPayable };
};

const { totalPrice, totalDiscount, platformFee, finalPayable } = calculateSummary();



// const handlePayment = async () => {
//   const now = new Date().toISOString(); // current date
//   const expected = new Date();
//   expected.setDate(expected.getDate() + 3); // 3 days delivery time

//   for (let item of cartItems) {
//     let discountPercent = 0;
//     if (item.discount && item.discount !== "No") {
//       discountPercent = parseInt(item.discount.replace('%', '')) || 0;
//     }

//     const discountedPrice = item.price - (item.price * discountPercent / 100);
//     const total = discountedPrice * item.quantity;

//     await axiosInstance.post("/api/finalorders", {
//       customerEmail: email,
//       productName: item.productName,
//       productId: item.productId, // ✅ Add this line
//       brand: item.brand,
//       price: discountedPrice,
//       quantity: item.quantity,
//       totalAmount: total,
//       // paymentStatus: "Paid",
//       paymentStatus: method === "COD" ? "Not Paid" : "Paid",
//       paymentMethod: method,
//       sellerEmail: item.sellerEmail,
//       orderDate: now,
//       imageUrl: item.imageUrl, // ✅ added
//       deliveryStatus: "Pending", // ✅ added
//       expectedDelivery: expected.toISOString() // ✅ estimated 3-day delivery
//     });

//     await axiosInstance.delete(`/api/cart/${item.cartId}`);
//   }

//   navigate("/paymentsuccess");
// };

const handlePayment = async () => {
  setIsProcessing(true); // Start animation

  setTimeout(async () => {
    const now = new Date().toISOString();
    const expected = new Date();
    expected.setDate(expected.getDate() + 3);

    for (let item of cartItems) {
      let discountPercent = 0;
      if (item.discount && item.discount !== "No") {
        discountPercent = parseInt(item.discount.replace('%', '')) || 0;
      }

      const discountedPrice = item.price - (item.price * discountPercent / 100);
      const total = discountedPrice * item.quantity;

      await axiosInstance.post("/api/finalorders", {
        customerEmail: email,
        productName: item.productName,
        productId: item.productId,
        brand: item.brand,
        price: discountedPrice,
        quantity: item.quantity,
        totalAmount: total,
        paymentStatus: method === "COD" ? "Not Paid" : "Paid",
        paymentMethod: method,
        sellerEmail: item.sellerEmail,
        orderDate: now,
        imageUrl: item.imageUrl,
        deliveryStatus: "Pending",
        expectedDelivery: expected.toISOString()
      });

      await axiosInstance.delete(`/api/cart/${item.cartId}`);
    }

    navigate("/paymentsuccess");
  }, 5000); // show animation for 2 seconds
};


return (
<>

{isProcessing && (
  <div style={{
    position: "fixed",
    top: 0, left: 0,
    width: "100%", height: "100vh",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    zIndex: 9999,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  }}>
    {/* <Player
      autoplay
      loop
      src={processingAnim}
      style={{ height: "200px", width: "200px" }}
    /> */}
    <Player
  autoplay
  loop
  src={processingAnim}
  style={{ height: "600px", width: "600px" }}
/>

    {/* <h3 style={{ marginTop: "20px", color: "#333" }}>Processing your payment...</h3> */}
  </div>
)}

  <div style={styles.wrapper}>
    
    <div style={styles.container}>

      <div style={styles.header}>
      <FaArrowLeft
        onClick={() => navigate("/orderconfirmation")}
        style={styles.backIcon}
      />
      <h4 style={styles.headerTitle}>Complete Payment</h4>
      <span style={styles.secureText}>🔒 100% Secure</span>
    </div>
      {/* Payment Method List */}
      <div style={styles.row}>
      <div style={styles.left}>
        <h4 style={styles.sectionTitle}>Payment Methods</h4>
        {["UPI", "Card", "NetBanking", "COD"].map(opt => (
          <div
            key={opt}
            style={{
              ...styles.option,
              borderLeft: method === opt ? "4px solid #2874f0" : "4px solid transparent",
              backgroundColor: method === opt ? "#e3f2fd" : "#fff",
            }}
            onClick={() => {
              setMethod(opt);
              setDetails("");
            }}
          >
            <strong>{opt === "Card" ? "Credit / Debit Card" : opt}</strong>
            <div style={{ fontSize: "12px", color: "#555" }}>
              {opt === "UPI" && "Pay via UPI apps"}
              {opt === "Card" && "Use debit/credit securely"}
              {opt === "NetBanking" && "Use your bank account"}
              {opt === "COD" && "Pay upon delivery"}
            </div>
          </div>
        ))}
      </div>

      {/* Input Form */}
      <div style={styles.center}>
        <h4 style={styles.sectionTitle}>Enter {method} Details</h4>
        {method !== "COD" && (
          <div className="slide-in-left" style={styles.inputGroup}>
            <label style={styles.inputLabel}>
              {method === "Card" ? "Card Number" : method === "UPI" ? "UPI ID" : "Bank Name"}
            </label>
            <input
              type={method === "Card" ? "number" : "text"}
              placeholder={`Enter ${method === "Card" ? "Card Number" : method === "UPI" ? "your UPI ID" : "your Bank Name"}`}
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              style={styles.input}
              required
            />
          </div>
        )}
        <button
          onClick={handlePayment}
          disabled={method !== "COD" && !details.trim()}
          style={{
            ...styles.payButton,
            backgroundColor: method !== "COD" && !details.trim() ? "#b0bec5" : "#2874f0",
            cursor: method !== "COD" && !details.trim() ? "not-allowed" : "pointer",
          }}
        >
          {method === "COD" ? "Place Order" : "Pay Now"}
        </button>
      </div>

      {/* Summary */}
      <div style={styles.right}>
        {/* <h4 style={styles.sectionTitle}>Order Summary</h4>
        <div style={styles.summaryBox}>
          <p>Total Items: {cartItems.length}</p>
          <p>Total Price: ₹{cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)}</p>
          <hr />
          <p style={{ color: "green" }}>5% Cashback with Axis Card</p>
        </div> */}
        <h4 style={styles.sectionTitle}>Order Summary</h4>
  <div style={styles.summaryBox}>
    <p>Items: {cartItems.length}</p>
    <p>Total Price: ₹{totalPrice.toFixed(2)}</p>
    <p>Discount: ₹{totalDiscount.toFixed(2)}</p>
    <p>Platform Fee: ₹{platformFee.toFixed(2)}</p>
    <hr />
    <p style={{ fontWeight: "bold" }}>
      Final Payable: ₹{finalPayable.toFixed(2)}
    </p>
    <p style={{ color: "green" }}>You saved ₹{totalDiscount.toFixed(2)} on this order 🎉</p>
  </div>
      </div>
      </div>
    </div>
  </div>
  </>
);

}

const styles = {
  wrapper: {
    background: "#4d8dcdff",
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "40px 0",
  },
  container: {
    display: "flex",
    width: "90%",
    maxWidth: "1100px",
    backgroundColor: "#001f3f",
    flexDirection: "column", // stack header on top
    borderRadius: "12px",
    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.1)",
    overflow: "hidden",
  },
  left: {
    flex: 1,
    padding: "25px",
    borderRight: "1px solid #ddd",
    backgroundColor: "#f5faff",
  },
  center: {
    flex: 1.5,
    padding: "30px",
    backgroundColor: "#fafafa",
  },
  right: {
    flex: 1,
    padding: "25px",
    backgroundColor: "#f5faff",
    borderLeft: "1px solid #ddd",
  },
  sectionTitle: {
    marginBottom: "15px",
    color: "#1a237e",
  },
  option: {
    padding: "15px",
    marginBottom: "10px",
    borderRadius: "6px",
    cursor: "pointer",
    transition: "all 0.3s ease",
    border: "1px solid #ccc",
  },
  inputGroup: {
    marginTop: "20px",
    animation: "slideInLeft 0.4s ease",
  },
  inputLabel: {
    fontSize: "14px",
    marginBottom: "6px",
    fontWeight: "bold",
  },
  input: {
    width: "100%",
    padding: "10px 12px",
    border: "1px solid #ccc",
    borderRadius: "6px",
    fontSize: "14px",
    outline: "none",
    transition: "all 0.3s ease",
  },
  payButton: {
    width: "100%",
    padding: "12px",
    color: "#fff",
    fontWeight: "bold",
    border: "none",
    borderRadius: "6px",
    marginTop: "25px",
    fontSize: "16px",
    transition: "0.3s",
  },
  summaryBox: {
    backgroundColor: "#ffffff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
  },
header: {
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "16px 24px",
  backgroundColor: "#002b5c", // dark blue
  color: "#fff",
  borderBottom: "1px solid #004080",
  borderTopLeftRadius: "12px",
  borderTopRightRadius: "12px",
},

backIcon: {
  fontSize: "20px",
  cursor: "pointer",
  color: "#90caf9",
  marginRight: "10px",
},

headerTitle: {
  fontSize: "18px",
  fontWeight: "bold",
  flex: 1,
},

secureText: {
  fontSize: "12px",
  backgroundColor: "#f1f1f1",
  color: "#333",
  padding: "4px 10px",
  borderRadius: "6px",
  fontWeight: "500",
},

row: {
  display: "flex",
}

};
