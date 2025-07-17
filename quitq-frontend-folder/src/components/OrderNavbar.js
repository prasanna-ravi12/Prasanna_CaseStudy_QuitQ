// // src/components/OrderNavbar.js
// import React from "react";
// import { useNavigate } from "react-router-dom";

// export default function OrderNavbar({ email }) {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     // ✅ Clear sessionStorage/localStorage if needed
//     // sessionStorage.clear();
//     navigate("/login");
//   };

//   const handleMyOrders = () => {
//     navigate("/finalorder");
//   };

//    const handleOrderConfirmation = () => {
//     navigate("/orderconfirmation");
//   };
//   return (
//     <>
//       {/* <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
//         <a className="navbar-brand" href="#">
//           Customer Order Page
//         </a> */}
//        <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
//         <button
//           onClick={handleOrderConfirmation}
//           className="navbar-brand btn btn-link text-white text-decoration-none"
//           style={{ fontWeight: "bold", fontSize: "22px", cursor: "pointer" }}
//         >
//           Customer Order Page
//         </button>



//         <div className="ml-auto d-flex align-items-center text-white">
//           <span className="mr-3">
//             <strong>Welcome,</strong> {email}
//           </span>
//           {/* <button onClick={handleMyOrders} className="btn btn-outline-warning btn-sm mx-2">
//             My Orders
//           </button> */}
//           <button onClick={handleLogout} className="btn btn-outline-light btn-sm">
//             Logout
//           </button>
//         </div>
//       </nav>

//       <style>{`
//         .navbar {
//           background: linear-gradient(90deg, #1e3c72, #2a5298);
//           box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
//           border-bottom: 2px solid #ffffff33;
//         }

//         .navbar-brand {
//           font-weight: bold;
//           font-size: 22px;
//           color: #ffffff !important;
//           letter-spacing: 1px;
//         }

//         .ml-auto {
//           margin-left: auto !important;
//         }

//         .mr-3 {
//           margin-right: 15px;
//           font-size: 14px;
//           color: #f1f1f1;
//           white-space: nowrap;
//         }

//         .btn {
//           border-radius: 20px;
//           padding: 5px 15px;
//           font-size: 13px;
//           transition: all 0.3s ease;
//         }

//         .btn:hover {
//           background-color: #ffffff !important;
//           color: #2a5298 !important;
//           border-color: #ffffff !important;
//         }
//       `}</style>
//     </>
//   );
// }
import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

export default function OrderNavbar({ email }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login", { replace: true });
    toast.success("Logout successful!");
  };

  const handleMyOrders = () => {
    navigate("/finalorder");
  };

  

  const handleBackToHome = () => {
    navigate("/usercategory"); // Change this if your home path is different
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top px-4">
        <button
          className="navbar-brand btn btn-link text-white text-decoration-none"
          style={{ fontWeight: "bold", fontSize: "22px", cursor: "pointer" }}
        >
          Customer Order Details
        </button>

        <div className="ml-auto d-flex align-items-center text-white">
          <span className="mr-3">
            <strong>Welcome,</strong> {email}
          </span>

          <button
            onClick={handleBackToHome}
            className="btn btn-outline-info btn-sm mx-2"
          >
            Back to Home
          </button>

          <button
            onClick={handleLogout}
            className="btn btn-outline-light btn-sm"
          >
            Logout
          </button>
        </div>
      </nav>

      <style>{`
        .navbar {
          background: linear-gradient(90deg, #1e3c72, #2a5298);
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
          border-bottom: 2px solid #ffffff33;
        }

        .navbar-brand {
          font-weight: bold;
          font-size: 22px;
          color: #ffffff !important;
          letter-spacing: 1px;
        }

        .ml-auto {
          margin-left: auto !important;
        }

        .mr-3 {
          margin-right: 15px;
          font-size: 14px;
          color: #f1f1f1;
          white-space: nowrap;
        }

        .btn {
          border-radius: 20px;
          padding: 5px 15px;
          font-size: 13px;
          transition: all 0.3s ease;
        }

        .btn:hover {
          background-color: #ffffff !important;
          color: #2a5298 !important;
          border-color: #ffffff !important;
        }
      `}</style>
    </>
  );
}
