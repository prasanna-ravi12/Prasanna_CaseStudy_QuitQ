

// import React, { useState, useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// // import Navbar from "./Navbar";
// import loginBg from "../assets/loginbp.jpg";

// const Login = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   useEffect(() => {
//     if (location.state) {
//       setEmail(location.state.email || "");
//       setPassword(location.state.password || "");
//     }
//   }, [location.state]);

//   // const handleSubmit = async (e) => {
//   //   const userEmail = localStorage.getItem("email");

//   //   e.preventDefault();

//   //   try {
//   //     const response = await fetch(`http://localhost:8080/api/users/${email}`);
//   //     if (response.ok) {
//   //       const user = await response.json();
    

//   //       if (user.password === password) {

//   //         localStorage.setItem("email", user.email);  // ✅ Save email globally
//   //         sessionStorage.setItem("loggedInUserEmail", user.email);

//   //         alert("Logged in successfully!");

//   //         // Role-based navigation
//   //         if (user.role === "Admin") {
//   //           navigate("/adminhome", { state: { email: user.email } });
//   //         } else if (user.role === "Seller") {
//   //           navigate("/sellerhome", { state: { email: user.email } });
//   //         } else {
//   //           navigate("/usercategory", { state: { email: user.email } });
//   //         }
//   //       } else {
//   //         alert("Invalid password");
//   //       }
//   //     } else {
//   //       alert("User not found");
//   //     }
//   //   } catch (error) {
//   //     console.error("Login error:", error);
//   //     alert("Login failed");
//   //   }
//   // };
//   const handleSubmit = async (e) => {
//   e.preventDefault();

//   try {
//     const response = await fetch("http://localhost:8080/api/users/login", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify({ email, password })
//     });

//     if (response.ok) {
//       const data = await response.json();
//       const { token, role } = data;

//       // ✅ Store token and role
//       localStorage.setItem("token", token);
//       localStorage.setItem("email", email);
//       localStorage.setItem("role", role);

//       alert("Login successful");

//       // ✅ Role-based navigation
//       if (role === "ADMIN") {
//         navigate("/adminhome", { state: { email } });
//       } else if (role === "SELLER") {
//         navigate("/sellerhome", { state: { email } });
//       } else {
//         navigate("/usercategory", { state: { email } });
//       }
//     } else {
//       const errMsg = await response.text();
//       alert(errMsg || "Login failed");
//     }
//   } catch (error) {
//     console.error("Login error:", error);
//     alert("Error logging in");
//   }
// };


// //   return (
// //     <>
      
// //       <div className="container-fluid main-container" style={styles.background}>
// //         <div className="row w-100">
// //           <div className="col-md-6 d-flex justify-content-center align-items-center">
// //             <div className="form-box" style={styles.formBox}>
// //               <h3>Login</h3>
// //               <form onSubmit={handleSubmit}>
// //                 <div className="mb-3">
// //                   <input
// //                     type="email"
// //                     className="form-control"
// //                     placeholder="Email"
// //                     value={email}
// //                     onChange={(e) => setEmail(e.target.value)}
// //                     required
// //                   />
// //                 </div>
// //                 <div className="mb-3">
// //                   <input
// //                     type="password"
// //                     className="form-control"
// //                     placeholder="Password"
// //                     value={password}
// //                     onChange={(e) => setPassword(e.target.value)}
// //                     required
// //                   />
// //                 </div>
// //                 <div className="text-center mt-4">
// //               <button
// //                 type="button"
// //                 className="btn btn-outline-dark"
// //                 onClick={() => navigate("/register")}
// //               >
// //                 New User? Register
// //               </button>
// //             </div>
// //                 <div className="mb-3 text-center">
// //                   <button type="submit" className="btn btn-primary">SignIn</button>
// //                   <button type="reset" className="btn btn-danger ms-3">Reset</button>
// //                 </div>
// //               </form>
// //             </div>
// //           </div>
// //           <div className="col-md-6 d-none d-md-block"></div>
// //         </div>
// //       </div>
// //     </>
// //   );
// // };

// return (
//   <>
//     <div className="container-fluid main-container" style={styles.background}>
//       <div className="row w-100">
//         <div className="col-md-6 d-flex justify-content-center align-items-center">
//           <div className="form-box" style={styles.formBox}>
//             <h3 className="text-center mb-4">Welcome Back 👋</h3>
//             <div className="text-center mt-4 mb-4">
//   <a
//     href="http://localhost:8080/oauth2/authorization/google"
//     className="btn btn-danger btn-style"
//   >
//     <i className="fab fa-google me-2"></i> Sign in with Google
//   </a>
// </div>

//             <form onSubmit={handleSubmit}>
//               <div className="mb-3">
//                 <input
//                   type="email"
//                   className="form-control stylish-input"
//                   placeholder="Email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   required
//                 />
//               </div>
//               <div className="mb-3">
//                 <input
//                   type="password"
//                   className="form-control stylish-input"
//                   placeholder="Password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   required
//                 />
//               </div>

//               <div className="text-center my-4">
//                 <button
//                   type="button"
//                   className="btn btn-outline-dark btn-style"
//                   onClick={() => navigate("/register")}
//                 >
//                   New User Or Seller? Register
//                 </button>
//               </div>

//               {/* <div className="d-flex justify-content-center gap-3">
//                 <button type="submit" className="btn btn-primary btn-style">
//                   Sign In
//                 </button>
//                 <button type="reset" className="btn btn-danger btn-style">
//                   Reset
//                 </button>
//               </div> */}
//               <div className="d-flex justify-content-center gap-3">
//   <button type="submit" className="btn" style={styles.customBtn}>
//     Sign In
//   </button>
//   <button type="reset" className="btn" style={styles.customBtn}>
//     Reset
//   </button>
// </div>

//             </form>
//           </div>
//         </div>
//         <div className="col-md-6 d-none d-md-block"></div>
//       </div>
//     </div>
//   </>
// );
// };


// // const styles = {
// //   background: {
// //     backgroundImage: `url(${loginBg})`,
// //     backgroundRepeat: "no-repeat",
// //     backgroundPosition: "center center",
// //     backgroundAttachment: "fixed",
// //     backgroundSize: "cover",
// //     minHeight: "100vh",
// //     paddingTop: "60px",
// //     display: "flex",
// //     alignItems: "center",
// //     justifyContent: "center"
// //   },
// //   formBox: {
// //     backgroundColor: "rgba(255, 255, 255, 0.5)",
// //     padding: "30px",
// //     borderRadius: "15px",
// //     boxShadow: "0 0 15px rgba(0,0,0,0.2)",
// //     width: "100%",
// //     maxWidth: "500px"
// //   }
// // };
// const styles = {
//   background: {
//     backgroundImage: `url(${loginBg})`,
//     backgroundRepeat: "no-repeat",
//     backgroundPosition: "center center",
//     backgroundAttachment: "fixed",
//     backgroundSize: "cover",
//     minHeight: "100vh",
//     paddingTop: "60px",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center"
//   },
//   formBox: {
//     backgroundColor: "rgba(255, 255, 255, 0.6)",
//     padding: "40px",
//     borderRadius: "20px",
//     boxShadow: "0 8px 25px rgba(0,0,0,0.2)",
//     width: "100%",
//     maxWidth: "450px"
//   },
//   customBtn: {
//     backgroundColor: "transparent",
//     border: "2px solid #d63384", // Dark pinkish
//     color: "#d63384",
//     padding: "8px 16px",
//     borderRadius: "6px",
//     fontWeight: "500",
//     transition: "all 0.3s ease"
//   }
// };


// export default Login;
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import loginBg from "../assets/loginbp.jpg";
import { toast } from 'react-toastify';
import loginAnim from "../animations/Login.json";
import { Player } from "@lottiefiles/react-lottie-player";


const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showForgot, setShowForgot] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    if (location.state) {
      setEmail(location.state.email || "");
      setPassword(location.state.password || "");
    }
  }, [location.state]);

  const handleSubmit = async (e) => {
    e.preventDefault();
      setIsLoading(true); // Start animation

    try {
      const response = await fetch("http://localhost:8080/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      if (response.ok) {
        const data = await response.json();
        const { token, role } = data;

        localStorage.setItem("token", token);
        localStorage.setItem("email", email);
        localStorage.setItem("role", role);

        // alert("Login successful");
        toast.success("Login successful!");
        // if (role === "ADMIN") navigate("/adminhome", { state: { email } });
        // else if (role === "SELLER") navigate("/sellerhome", { state: { email } });
        // else navigate("/usercategory", { state: { email } });
        setTimeout(() => {
        if (role === "ADMIN") navigate("/adminhome", { state: { email } });
        else if (role === "SELLER") navigate("/sellerhome", { state: { email } });
        else navigate("/usercategory", { state: { email } });
      }, 3000);
      } else {
        const errMsg = await response.text();
        toast.error(errMsg || "Login failed");
              setIsLoading(false); // Stop animation on failure

      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Error logging in");
          setIsLoading(false); // Stop animation on error

    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/users/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, newPassword, confirmPassword })
      });

      if (response.ok) {
        alert("Password updated! Please login.");
        setShowForgot(false);
        setPassword(newPassword); // prefill new password
        setNewPassword("");
        setConfirmPassword("");
      } else {
        const errMsg = await response.text();
        alert(errMsg || "Password reset failed");
      }
    } catch (error) {
      console.error("Forgot password error:", error);
      alert("Error resetting password");
    }
  };
if (isLoading) {
  return (
    <div style={{
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "white"
    }}>
      <Player
        autoplay
        loop
        src={loginAnim}
        style={{ height: "500px", width: "500px" }}
      />
      {/* <h4 style={{ marginTop: "20px", color: "#555" }}>Logging you in...</h4> */}
    </div>
  );
}

  return (
<>
    <style>{`
      @keyframes zoomIn {
        from {
          transform: scale(0.9);
          opacity: 0;
        }
        to {
          transform: scale(1);
          opacity: 1;
        }
      }
    `}</style>
    <div className="container-fluid main-container" style={styles.background}>
      <div className="row w-100">
        <div className="col-md-6 d-flex justify-content-center align-items-center">
          <div className="form-box" style={styles.formBox}>
            <h3 className="text-center mb-4">
              {showForgot ? "Reset Password 🔐" : "Welcome Back 👋"}
            </h3>

            {!showForgot && (
              <div className="text-center mt-4 mb-4">
                {/* <a
                  href="http://localhost:8080/oauth2/authorization/google"
                  className="btn btn-danger btn-style"
                >
                  <i className="fab fa-google me-2"></i> Sign in with Google
                </a> */}
              </div>
            )}

            <form onSubmit={showForgot ? handleForgotPassword : handleSubmit}>
              <div className="mb-3">
                <input
                  type="email"
                  className="form-control stylish-input"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              {showForgot ? (
                <>
                  <div className="mb-3">
                    <input
                      type="password"
                      className="form-control stylish-input"
                      placeholder="New Password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="password"
                      className="form-control stylish-input"
                      placeholder="Confirm Password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </div>
                </>
              ) : (
                <div className="mb-3">
                  <input
                    type="password"
                    className="form-control stylish-input"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              )}

              <div className="text-center mb-3">
                <button
                  type="button"
                  className="btn btn-link p-0"
                  onClick={() => setShowForgot(!showForgot)}
                >
                  {showForgot ? "← Back to Login" : "Forgot Password?"}
                </button>
              </div>

              <div className="d-flex justify-content-center gap-3">
                <button type="submit" className="btn" style={styles.customBtn}>
                  {showForgot ? "Reset Password" : "Sign In"}
                </button>
                <button type="reset" className="btn" style={styles.customBtn}>
                  Reset
                </button>
              </div>

              {!showForgot && (
                <div className="text-center mt-4">
                  <button
                    type="button"
                    className="btn btn-outline-dark btn-style"
                    onClick={() => navigate("/register")}
                  >
                    New User Or Seller? Register
                  </button>

                  
                </div>
              )}
            </form>
          </div>
        </div>
        <div className="col-md-6 d-none d-md-block"></div>
      </div>
    </div>
    </>
  );
  
};

const styles = {
  background: {
    backgroundImage: `url(${loginBg})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center center",
    backgroundAttachment: "fixed",
    backgroundSize: "cover",
    minHeight: "100vh",
    paddingTop: "60px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  formBox: {
    backgroundColor: "rgba(255, 255, 255, 0.6)",
    padding: "40px",
    borderRadius: "20px",
    boxShadow: "0 8px 25px rgba(0,0,0,0.2)",
    width: "100%",
    maxWidth: "450px"
  },
  customBtn: {
    backgroundColor: "transparent",
    border: "2px solid #d63384",
    color: "#d63384",
    padding: "8px 16px",
    borderRadius: "6px",
    fontWeight: "500",
    transition: "all 0.3s ease"
  },
  formBox: {
  backgroundColor: "rgba(255, 255, 255, 0.6)",
  padding: "40px",
  borderRadius: "20px",
  boxShadow: "0 8px 25px rgba(0,0,0,0.2)",
  width: "100%",
  maxWidth: "450px",
  transform: "scale(0.9)",
  animation: "zoomIn 0.9s ease forwards"
}

};

export default Login;
