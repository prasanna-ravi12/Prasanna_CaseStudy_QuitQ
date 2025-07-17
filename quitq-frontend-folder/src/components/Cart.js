// import React, { useEffect, useState } from 'react';
// import axiosInstance from '../utils/axiosInstance';
// import { useNavigate } from 'react-router-dom';
// import UserNavbar from './user_navbar'; // adjust path as needed

// export default function Cart() {
//   const [cartItems, setCartItems] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchCartItems();
//   }, []);

//   const fetchCartItems = async () => {
//     try {
//       const res = await axiosInstance.get("/api/cart");
//       setCartItems(res.data);
//     } catch (err) {
//       console.error("Error fetching cart:", err);
//     }
//   };

// const handleUpdate = async (cartId, quantity) => {
//   try {
//     const item = cartItems.find(c => c.cartId === cartId);

//     const updatedCart = {
//       cartId: item.cartId,
//       customerEmail: item.customerEmail,
//       productName: item.productName,
//       brand: item.brand,
//       price: item.price,
//       quantity: quantity,
//     };

//     await axiosInstance.put(`/api/cart/${cartId}`, updatedCart);
//     fetchCartItems();
//   } catch (err) {
//     console.error("Error updating quantity:", err);
//   }
// };



// const handleDelete = async (cartId) => {
//   try {
//     await axiosInstance.delete(`/api/cart/${cartId}`);
//     fetchCartItems();
//   } catch (err) {
//     console.error("Error deleting item:", err);
//   }
// };


//   // const handlePlaceOrder = async () => {
//   //   try {
//   //     await axios.post("http://localhost:8080/api/orders/placeOrder");
//   //     navigate("/orderconfirmation");
//   //   } catch (err) {
//   //     console.error("Error placing order:", err);
//   //   }
//   // };
// const handlePlaceOrder = async () => {
//   try {
//     const email = localStorage.getItem("email"); // ✅ get user's email from localStorage

//     const res = await axiosInstance.get(
//       `/api/orders/placeOrder?email=${email}`
//     );

//     if (res.status === 200) {
//       sessionStorage.setItem("placedOrders", JSON.stringify(res.data)); // ✅ Save orders for OrderConfirmation page
//       navigate("/orderconfirmation"); // ✅ Redirect after placing order
//     }
//   } catch (err) {
//     console.error("Error placing order:", err);
//     alert("Failed to place order. Please login again or try later.");
//   }
// };




//   return (
//     <>
//             <UserNavbar />
//             <style>
//     {`
//       @keyframes gradientMove {
//         0% { background-position: 0% 50%; }
//         50% { background-position: 100% 50%; }
//         100% { background-position: 0% 50%; }
//       }
//     `}
//   </style>
//     <div style={styles.body}>
//       <div style={styles.container}>
//         <h2 style={styles.heading}>Your Shopping Cart</h2>
//         <table className="table table-bordered mt-4" style={styles.table}>
//           <thead>
//             <tr>
//               <th>Product</th>
//               <th>Brand</th>
//               <th>Price</th>
//               <th>Quantity</th>
//               <th>Update</th>
//               <th>Delete</th>
//             </tr>
//           </thead>
//           <tbody>
//             {cartItems.map((item) => (
//               <tr key={item.cartId}>
//                 <td>{item.productName}</td>
//                 <td>{item.brand}</td>
//                 <td>₹{item.price}</td>
//                 <td>
//                   <input
//                     type="number"
//                     className="form-control w-75"
//                     value={item.quantity}
//                     min="1"
//                     onChange={(e) => {
//                       const newQuantity = parseInt(e.target.value);
//                       setCartItems((prev) =>
//                         prev.map((c) =>
//                           c.cartId === item.cartId ? { ...c, quantity: newQuantity } : c
//                         )
//                       );
//                     }}
//                   />
//                 </td>
//                 <td>
//                   <button
//                     className="btn btn-warning btn-sm"
//                     onClick={() => handleUpdate(item.cartId, item.quantity)}
//                   >
//                     Update
//                   </button>
//                 </td>
//                 <td>
//                   <button
//                     className="btn btn-danger btn-sm"
//                     onClick={() => handleDelete(item.cartId)}
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>

//         <div className="text-center mt-3">
//           <button className="btn btn-success" onClick={handlePlaceOrder}>
//             Place Order
//           </button>
//         </div>
//       </div>
//     </div>
//     </>
//   );
// }


// const styles = {
//   body: {
//     margin: 0,
//     padding: "50px 20px",
//     background: "linear-gradient(-45deg, #ffb6c1, #ffc0cb, #ff69b4, #ff85a2)",
//     backgroundSize: "400% 400%",
//     animation: "gradientMove 20s ease infinite",
//     fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
//     minHeight: "100vh",
//   },
//   container: {
//     position: "relative",
//     zIndex: 2,
//     maxWidth: "1000px",
//     margin: "0 auto",
//     padding: "40px",
//     background: "rgba(255, 255, 255, 0.9)",
//     borderRadius: "20px",
//     boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
//   },
//   heading: {
//     color: "#c2185b",
//     fontWeight: "700",
//     textAlign: "center",
//     marginBottom: "30px",
//     fontSize: "2rem",
//   },
//   table: {
//     backgroundColor: "white",
//     borderRadius: "15px",
//     overflow: "hidden",
//     boxShadow: "0 5px 20px rgba(0,0,0,0.1)",
//     width: "100%",
//     fontSize: "1rem",
//   },
// };
import React, { useEffect, useState } from 'react';
import axiosInstance from '../utils/axiosInstance';
import { useNavigate } from 'react-router-dom';
import UserNavbar from './user_navbar';

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [user, setUser] = useState({});
  const [productImages, setProductImages] = useState({});
  const navigate = useNavigate();

  const email = localStorage.getItem("email");

  useEffect(() => {
    fetchCartItems();
    fetchUserInfo();
  }, []);

  const fetchUserInfo = async () => {
    try {
      const res = await axiosInstance.get(`/api/users/${email}`);
      setUser(res.data);
    } catch (err) {
      console.error("Failed to fetch user info", err);
    }
  };

  const fetchCartItems = async () => {
    try {
      const res = await axiosInstance.get("/api/cart");
      setCartItems(res.data);
      await fetchProductImages(res.data);
    } catch (err) {
      console.error("Error fetching cart:", err);
    }
  };

  // const fetchProductImages = async (items) => {
  //   const images = {};
  //   for (const item of items) {
  //     try {
  //       const res = await axiosInstance.get(`/api/products/category/${item.brand}`);
  //       const match = res.data.find(p => p.productName === item.productName);
  //       if (match) images[item.cartId] = match.imageUrl;
  //     } catch (err) {
  //       console.warn(`Could not find product image for ${item.productName}`);
  //     }
  //   }
  //   setProductImages(images);
  // };
  const fetchProductImages = (items) => {
  const images = {};
  for (const item of items) {
    images[item.cartId] = item.imageUrl; // fetch directly from cart
  }
  setProductImages(images);
};

  const handleUpdate = async (cartId, quantity) => {
    try {
      const item = cartItems.find(c => c.cartId === cartId);
      const updatedCart = { ...item, quantity };
      await axiosInstance.put(`/api/cart/${cartId}`, updatedCart);
      fetchCartItems();
    } catch (err) {
      console.error("Error updating quantity:", err);
    }
  };

  const handleDelete = async (cartId) => {
    try {
      await axiosInstance.delete(`/api/cart/${cartId}`);
      fetchCartItems();
    } catch (err) {
      console.error("Error deleting item:", err);
    }
  };

  // const handlePlaceOrder = async () => {
  //   try {
  //     const res = await axiosInstance.get(`/api/orders/placeOrder?email=${email}`);
  //     if (res.status === 200) {
  //       sessionStorage.setItem("placedOrders", JSON.stringify(res.data));
  //       navigate("/orderconfirmation");
  //     }
  //   } catch (err) {
  //     console.error("Order failed", err);
  //     alert("Order failed. Try again.");
  //   }
  // };

  const handlePlaceOrder = () => {
  navigate("/orderconfirmation"); // ✅ Just navigate, don't place or delete anything
};


  // const calculateTotal = () => {
  //   let price = 0;
  //   let discount = 0;
  //   cartItems.forEach(item => {
  //     price += item.price * item.quantity;
  //     discount += (item.price * item.quantity * 0.05); // Assuming 10% discount
  //   });
  //   const platformFee = 50;
  //   const total = price - discount + platformFee;
  //   return { price, discount, platformFee, total };
  // };
  const calculateTotal = () => {
  let price = 0;
  let discount = 0;

  cartItems.forEach(item => {
    price += item.price * item.quantity;

    let productDiscount = 0;
    if (item.discount && item.discount !== "No") {
      const numericDiscount = parseInt(item.discount.replace('%', ''));
      productDiscount = (item.price * numericDiscount) / 100;
    }

    discount += productDiscount * item.quantity;
  });

  const platformFee = 50;
  const total = price - discount + platformFee;
  return { price, discount, platformFee, total };
};


  const deliveryDate = () => {
    const date = new Date();
    date.setDate(date.getDate() + 5);
    return date.toDateString();
  };

  const { price, discount, platformFee, total } = calculateTotal();

  return (
    <div style={{ paddingTop: '80px' }}>

      <UserNavbar />
      <div style={styles.body}>
        <div style={styles.container}>
          {/* LEFT: Cart Items */}
          <div style={styles.left}>
            <h3 style={styles.sectionTitle}>My Cart ({cartItems.length} items)</h3>
            <div style={styles.addressBox}>
              <strong>Delivery Address:</strong> {user.name}, {user.address}, {user.city}, {user.state}, {user.pincode}
            </div>

            {cartItems.map(item => (
              <div key={item.cartId} style={styles.card}>
                <img src={productImages[item.cartId]} alt="Product" style={styles.image} />
                <div style={styles.details}>
                  <h5>{item.productName}</h5>
                  <p><strong>Brand:</strong> {item.brand}</p>
                  <p><strong>Price:</strong> ₹{item.price}</p>
                  <p><strong>Delivery by:</strong> {deliveryDate()}</p>
                  <div style={styles.qtyRow}>
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) =>
                        setCartItems(prev => prev.map(c =>
                          c.cartId === item.cartId ? { ...c, quantity: parseInt(e.target.value) } : c
                        ))
                      }
                      style={styles.qtyInput}
                    />
                    <button onClick={() => handleUpdate(item.cartId, item.quantity)} className="btn btn-warning btn-sm ms-2">Update</button>
                    <button onClick={() => handleDelete(item.cartId)} className="btn btn-danger btn-sm ms-2">Remove</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT: Price Details */}
          <div style={styles.right}>
            <h4 style={styles.sectionTitle}>PRICE DETAILS</h4>
            <hr />
            <p>Price ({cartItems.length} items): ₹{price}</p>
            <p>Discount: -₹{discount.toFixed(2)}</p>
            <p>Platform Fee: ₹{platformFee}</p>
            <hr />
            <h5>Total Amount: ₹{total.toFixed(2)}</h5>
            <p style={{ color: 'green' }}>You will save ₹{discount.toFixed(2)} on this order</p>
            <button className="btn btn-success mt-3 w-100" onClick={handlePlaceOrder}>PLACE ORDER</button>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  body: {
    background: "linear-gradient(135deg, #ffe0ec, #ffc0cb)",
    padding: "40px",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    minHeight: "100vh"
  },
  container: {
    display: "flex",
    gap: "30px",
    maxWidth: "1200px",
    margin: "0 auto"
  },
  left: {
    flex: 3
  },
  right: {
    flex: 1,
    background: "#fff0f6",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 3px 15px rgba(0,0,0,0.1)",
    height: "fit-content"
  },
  card: {
    display: "flex",
    background: "#fff",
    borderRadius: "12px",
    padding: "15px",
    marginBottom: "20px",
    boxShadow: "0 3px 10px rgba(0,0,0,0.1)"
  },
  image: {
    width: "150px",
    height: "150px",
    objectFit: "cover",
    borderRadius: "12px"
  },
  details: {
    flex: 1,
    marginLeft: "20px"
  },
  qtyRow: {
    display: "flex",
    alignItems: "center",
    marginTop: "10px"
  },
  qtyInput: {
    width: "60px",
    padding: "5px",
    borderRadius: "6px",
    border: "1px solid #ccc"
  },
  sectionTitle: {
    color: "#c2185b",
    fontWeight: "bold",
    marginBottom: "15px"
  },
  addressBox: {
    background: "#ffe6f0",
    padding: "10px",
    borderRadius: "10px",
    marginBottom: "20px"
  }
};
