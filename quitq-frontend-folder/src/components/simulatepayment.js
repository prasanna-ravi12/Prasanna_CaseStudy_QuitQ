import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import qrImage from "../assets/qrrr.jpg";

export default function SimulatePayment() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [email, setEmail] = useState("");

  useEffect(() => {
    // ✅ Get email from sessionStorage (or use localStorage if applicable)
    const userEmail = sessionStorage.getItem("loggedInUserEmail") || localStorage.getItem("email");
    setEmail(userEmail);

    // ✅ Fetch orders for the logged-in user
    fetch(`http://localhost:8080/api/orders?email=${userEmail}`)
      .then((res) => res.json())
      .then((data) => setOrders(data))
      .catch((err) => console.error("Error fetching orders:", err));
  }, []);

  const handleConfirmPayment = async () => {
    try {
      for (let order of orders) {
        const finalOrder = {
          customerEmail: email,
          productName: order.productName,
          brand: order.brand,
          price: order.price,
          quantity: order.quantity,
          totalAmount: order.totalAmount,
          paymentStatus: "PAID",
        };

        await fetch("http://localhost:8080/api/finalorders", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(finalOrder),
        });
      }

      // ✅ Navigate to confirmation page after storing orders
      navigate("/orderconfirmation");
    } catch (error) {
      console.error("Error confirming payment:", error);
      alert("Something went wrong while processing your payment.");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.box}>
        <h2>Scan to Pay</h2>
        <p>Scan the QR code using your UPI app to proceed.</p>
        <img src={qrImage} alt="QR Code" style={styles.qr} />
        <br />
        <button onClick={handleConfirmPayment} style={styles.button}>
          I Have Paid
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "90vh",
    background: "#f7f7f7",
  },
  box: {
    width: "400px",
    padding: "30px",
    textAlign: "center",
    background: "white",
    borderRadius: "10px",
    boxShadow: "0 0 10px gray",
  },
  qr: {
    width: "250px",
    height: "auto",
  },
  button: {
    marginTop: "20px",
    padding: "10px 20px",
    backgroundColor: "green",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};
