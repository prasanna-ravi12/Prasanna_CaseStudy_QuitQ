// import React, { useEffect, useState } from "react";
// import axiosInstance from "../utils/axiosInstance";
// import UserNavbar from "./user_navbar";
// import { FaTrash } from "react-icons/fa";

// const WishlistPage = () => {
//   const [wishlistItems, setWishlistItems] = useState([]);

//   const email = localStorage.getItem("email");

//   useEffect(() => {
//     fetchWishlist();
//   }, []);

//   const fetchWishlist = async () => {
//     try {
//       const res = await axiosInstance.get(`/api/wishlist/${email}`);
//       setWishlistItems(res.data);
//     } catch (err) {
//       console.error("Error fetching wishlist", err);
//     }
//   };

//   const deleteFromWishlist = async (id) => {
//     try {
//       await axiosInstance.delete(`/api/wishlist/${id}`);
//       setWishlistItems(prev => prev.filter(item => item.id !== id));
//     } catch (err) {
//       console.error("Error deleting wishlist item", err);
//     }
//   };

//   return (
//     <>
//       <UserNavbar />
//       <div style={styles.body}>
//         <h2 style={styles.heading}>My Wishlist</h2>
//         <div style={styles.grid}>
//           {wishlistItems.length > 0 ? (
//             wishlistItems.map(item => (
//               <div key={item.id} style={styles.card}>
//                 <img src={item.imageUrl} alt={item.productName} style={styles.image} />
//                 <div style={styles.content}>
//                   <h5 style={styles.title}>{item.productName}</h5>
//                   <p style={styles.text}>Brand: {item.brand}</p>
//                   <p style={styles.text}>Price: ₹{item.price}</p>
//                   {item.discount && <p style={styles.discount}>Discount: {item.discount}%</p>}
//                   <button
//                     onClick={() => deleteFromWishlist(item.id)}
//                     style={styles.deleteBtn}
//                   >
//                     <FaTrash />
//                   </button>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <p style={styles.noItems}>No items in wishlist.</p>
//           )}
//         </div>
//       </div>
//     </>
//   );
// };

// const styles = {
//   body: {
//     padding: "40px",
//     background: "linear-gradient(270deg, #ffe6f0, #f8bbd0, #f48fb1)",
//     minHeight: "100vh"
//   },
//   heading: {
//     textAlign: "center",
//     color: "#880e4f",
//     fontSize: "2rem",
//     marginBottom: "30px"
//   },
//   grid: {
//     display: "flex",
//     flexWrap: "wrap",
//     gap: "25px",
//     justifyContent: "center"
//   },
//   card: {
//     width: "260px",
//     backgroundColor: "#fff0f5",
//     borderRadius: "15px",
//     boxShadow: "0 5px 20px rgba(0,0,0,0.1)",
//     overflow: "hidden",
//     position: "relative"
//   },
//   image: {
//     width: "100%",
//     height: "220px",
//     objectFit: "cover"
//   },
//   content: {
//     padding: "15px"
//   },
//   title: {
//     color: "#c2185b",
//     fontSize: "1.1rem",
//     marginBottom: "8px"
//   },
//   text: {
//     fontSize: "0.95rem",
//     color: "#555",
//     marginBottom: "6px"
//   },
//   discount: {
//     fontSize: "0.9rem",
//     color: "green",
//     marginBottom: "6px"
//   },
//   deleteBtn: {
//     background: "none",
//     border: "none",
//     color: "#d32f2f",
//     fontSize: "1.1rem",
//     cursor: "pointer",
//     position: "absolute",
//     top: "10px",
//     right: "10px"
//   },
//   noItems: {
//     color: "#777",
//     fontSize: "1.2rem"
//   }
// };

// export default WishlistPage;
import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import UserNavbar from "./user_navbar";
import { FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";


const WishlistPage = () => {
  const [wishlistItems, setWishlistItems] = useState([]);

  const email = localStorage.getItem("email");

  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    try {
      const res = await axiosInstance.get(`/api/wishlist/${email}`);
      setWishlistItems(res.data);
    } catch (err) {
      console.error("Error fetching wishlist", err);
    }
  };

  const deleteFromWishlist = async (id) => {
    try {
      await axiosInstance.delete(`/api/wishlist/${id}`);
      setWishlistItems(prev => prev.filter(item => item.id !== id));
    } catch (err) {
      console.error("Error deleting wishlist item", err);
    }
  };
  const navigate = useNavigate();

const handleNavigateToCategory = (category) => {
  navigate(`/userproducts/${category}`);
  
};


  return (
    <div style={{ paddingTop: '80px' }}>

      <UserNavbar />
      <div style={styles.body}>
        {/* <h2 style={styles.heading}>My Wishlist</h2> */}
        <h2 style={styles.heading}>
  <span style={styles.heart}>❤️</span> My Wishlist
</h2>

        <div style={styles.grid}>
          {wishlistItems.length > 0 ? (
            wishlistItems.map(item => (
                
            //   <div key={item.id} style={styles.card} className="zoom-card">
            <div
  key={item.id}
  style={styles.card}
  className="zoom-card"
  onClick={() => handleNavigateToCategory(item.category)}
>

                <img src={item.imageUrl} alt={item.productName} style={styles.image} />
                <div style={styles.content}>
                  <h5 style={styles.title}>{item.productName}</h5>
                  <p style={styles.text}>Brand: {item.brand}</p>
                  <p style={styles.text}>Price: ₹{item.price}</p>
                  <p style={styles.discount}>
                    {item.discount && item.discount > 0 ? `Discount: ${item.discount}%` : "No Discount"}
                  </p>
                  <button
                  
                    // onClick={() => deleteFromWishlist(item.id)}
                    onClick={(e) => {
    e.stopPropagation(); // prevent triggering the card's onClick
    deleteFromWishlist(item.id);
  }}
                    style={styles.deleteBtn}
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p style={styles.noItems}>No items in wishlist.</p>
          )}
        </div>
        <style>{`
          @keyframes gradientBG {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }

          @keyframes zoomIn {
            from { transform: scale(0.8); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
          }

          .zoom-card {
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            animation: zoomIn 0.5s ease;
          }

          .zoom-card:hover {
            transform: scale(1.03);
            box-shadow: 0 8px 24px rgba(0,0,0,0.2);
          }
        `}</style>
      </div>
    </div>
  );
};

const styles = {
  body: {
    padding: "40px",
    background: "linear-gradient(270deg, #ffe6f0, #f8bbd0, #f48fb1)",
    backgroundSize: "800% 800%",
    animation: "gradientBG 20s ease infinite",
    minHeight: "100vh"
  },
  heading: {
    textAlign: "center",
    color: "#880e4f",
    fontSize: "2rem",
    marginBottom: "30px"
  },
  grid: {
    display: "flex",
    flexWrap: "wrap",
    gap: "25px",
    justifyContent: "center"
  },
  card: {
    width: "260px",
    backgroundColor: "#fff0f5",
    borderRadius: "15px",
    boxShadow: "0 5px 20px rgba(0,0,0,0.1)",
    overflow: "hidden",
    position: "relative"
  },
  image: {
    width: "100%",
    height: "220px",
    objectFit: "cover"
  },
  content: {
    padding: "15px"
  },
  title: {
    color: "#c2185b",
    fontSize: "1.1rem",
    marginBottom: "8px"
  },
  text: {
    fontSize: "0.95rem",
    color: "#555",
    marginBottom: "6px"
  },
  discount: {
    fontSize: "0.9rem",
    color: "#4caf50",
    marginBottom: "6px"
  },
  deleteBtn: {
    background: "none",
    border: "none",
    color: "#d32f2f",
    fontSize: "1.1rem",
    cursor: "pointer",
    position: "absolute",
    top: "10px",
    right: "10px"
  },
  noItems: {
    color: "#777",
    fontSize: "1.2rem"
  },
  heading: {
  textAlign: "center",
  color: "#880e4f",
  fontSize: "2.3rem",
  marginBottom: "40px",
  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  textShadow: "1px 1px 3px rgba(0,0,0,0.2)",
  position: "relative"
},
heart: {
  fontSize: "1.5rem",
  marginRight: "10px",
  verticalAlign: "middle"
}

};

export default WishlistPage;
