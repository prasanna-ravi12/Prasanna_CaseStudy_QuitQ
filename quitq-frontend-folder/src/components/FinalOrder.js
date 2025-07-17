
import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import OrderNavbar from "./OrderNavbar";
import { FaStar } from "react-icons/fa";
import { toast } from 'react-toastify';

export default function FinalOrder() {
  const [orders, setOrders] = useState([]);
  const [ratings, setRatings] = useState({}); // track selected ratings per order
  const email = sessionStorage.getItem("loggedInUserEmail") || localStorage.getItem("email");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axiosInstance.get(`/api/finalorders/customer/${email}`);
        setOrders(res.data);
      } catch (err) {
        console.error("Error fetching orders:", err);
      }
    };
    if (email) fetchOrders();
  }, [email]);

  const getDeliveryStatus = (orderDateStr) => {
    if (!orderDateStr || typeof orderDateStr !== "string") {
      return { isDelivered: false, deliveryDateFormatted: "Unknown" };
    }

    try {
      const orderDate = new Date(orderDateStr);
      if (isNaN(orderDate.getTime())) return { isDelivered: false, deliveryDateFormatted: "Invalid" };

      const deliveryDate = new Date(orderDate);
      deliveryDate.setDate(deliveryDate.getDate() + 3);
      const isDelivered = new Date() >= deliveryDate;

      const deliveryDateFormatted = deliveryDate.toLocaleDateString("en-IN", {
        day: "2-digit", month: "short", year: "numeric"
      });

      return { isDelivered, deliveryDateFormatted };
    } catch {
      return { isDelivered: false, deliveryDateFormatted: "Invalid" };
    }
  };

  const starColorMap = {
    1: "#e74c3c",
    2: "#e67e22",
    3: "#f1c40f",
    4: "#2ecc71",
    5: "#3498db"
  };

  const starMeaningMap = {
    1: "Very Bad",
    2: "Bad",
    3: "Average",
    4: "Good",
    5: "Excellent"
  };

  const handleStarClick = (orderId, rating) => {
    setRatings((prev) => ({
      ...prev,
      [orderId]: rating
    }));
  };

  const handleSubmitReview = async (order) => {
    const rating = ratings[order.id];
    const meaning = starMeaningMap[rating];

    const review = {
      customerEmail: email,
      productId: order.productId,
      productName: order.productName,
      brand: order.brand,
      price: order.price,
      imageUrl: order.imageUrl,
      sellerEmail: order.sellerEmail,
      rating,
      meaning
    };

    try {
      await axiosInstance.post("/api/reviews", review);
      toast.success("Review submitted successfully!");
      setRatings((prev) => ({ ...prev, [order.id]: null }));
    } catch (err) {
      console.error("Error submitting review:", err);
      toast.error("Failed to submit review");
    }
  };

  return (
   

    <div style={{ backgroundColor: "#f1f3f6", minHeight: "100vh" , paddingTop: "70px"}}>
      <OrderNavbar email={email} />
      
      <div className="container mt-4">
        <h3 className="text-center mb-4">🛒 My Orders</h3>

        {orders.length === 0 && (
          <p className="text-center text-muted">You have not placed any orders yet.</p>
        )}

        {orders.map((order, index) => {
          const { isDelivered, deliveryDateFormatted } = getDeliveryStatus(order.orderDate);
          const orderDateFormatted = new Date(order.orderDate).toLocaleDateString("en-IN", {
            day: "2-digit", month: "short", year: "numeric"
          });

          const expectedDeliveryFormatted = order.expectedDelivery
            ? new Date(order.expectedDelivery).toLocaleDateString("en-IN", {
                day: "2-digit", month: "short", year: "numeric"
              })
            : "N/A";

          return (
            // <div
            //   key={order.id || index}
            //   className="bg-white rounded shadow-sm mb-3 p-3 d-flex flex-column flex-md-row justify-content-between align-items-start"
            // >
            <div
  key={order.id || index}
  className={`order-animate delay-${index} bg-white rounded shadow-sm mb-3 p-3 d-flex flex-column flex-md-row justify-content-between align-items-start`}
>

              <div className="d-flex">
                <img
                  src={order.imageUrl || "https://via.placeholder.com/100"}
                  alt={order.productName}
                  style={{ width: "100px", height: "100px", objectFit: "contain" }}
                  className="me-3"
                />
                <div>
                  <h5 className="mb-1">{order.productName}</h5>
                  <p className="mb-1 text-muted">Brand: {order.brand}</p>
                  <p className="mb-1">Quantity: {order.quantity}</p>
                  <p className="mb-1 fw-bold text-success">₹{order.totalAmount?.toFixed(2)}</p>
                  <p className="mb-1 text-muted">Ordered On: {orderDateFormatted}</p>
                  <p className="mb-1 text-muted">
                    Payment: {order.paymentMethod} ({order.paymentStatus})
                  </p>
                </div>
              </div>

              <div className="text-end mt-3 mt-md-0">
                {isDelivered || order.deliveryStatus === "Delivered" ? (
                  <>
                    <p className="mb-1">
                      <span className="text-success fw-bold">● Delivered</span>{" "}
                      on {order.deliveryDate || deliveryDateFormatted}
                    </p>
                    <p className="mb-1 text-muted">Status: Delivered</p>

                    <div className="d-flex justify-content-end align-items-center mt-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <FaStar
                          key={star}
                          onClick={() => handleStarClick(order.id, star)}
                          style={{
                            cursor: "pointer",
                            color:
                              ratings[order.id] && ratings[order.id] >= star
                                ? starColorMap[star]
                                : "#ccc",
                            fontSize: "20px",
                            marginRight: "4px"
                          }}
                        />
                      ))}
                    </div>

                    {ratings[order.id] && (
                      <button
                        className="btn btn-success btn-sm mt-2"
                        onClick={() => handleSubmitReview(order)}
                      >
                        Submit Review
                      </button>
                    )}
                  </>
                ) : (
                  <>
                    <p className="mb-1">
                      <span className="text-warning fw-bold">● Expected</span> by{" "}
                      {expectedDeliveryFormatted}
                    </p>
                    <p className="mb-1 text-muted">
                      Status: {order.deliveryStatus || "Pending"}
                    </p>
                    <style>{`
  @keyframes fadeInUp {
    0% {
      opacity: 0;
      transform: translateY(20px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .order-animate {
    opacity: 0;
    animation: fadeInUp 0.5s ease forwards;
  }

  .delay-0 { animation-delay: 0s; }
  .delay-1 { animation-delay: 0.2s; }
  .delay-2 { animation-delay: 0.4s; }
  .delay-3 { animation-delay: 0.6s; }
  .delay-4 { animation-delay: 0.8s; }
  .delay-5 { animation-delay: 0.10s; }
  .delay-6 { animation-delay: 0.12s; }
  .delay-7 { animation-delay: 0.14s; }
  .delay-8 { animation-delay: 0.16s; }
  .delay-9 { animation-delay: 0.16s; }
`}</style>

                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
