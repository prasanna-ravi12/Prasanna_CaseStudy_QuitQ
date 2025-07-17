// // // import React from 'react';
// // // import { Link, useNavigate } from 'react-router-dom';
// // // import logo from "../assets/logo.jpg";

// // // export default function UserNavbar() {
// // // const navigate = useNavigate();
// // // const email = localStorage.getItem('email'); // simulate loggedInUser.getEmail()

// // // const handleLogout = () => {
// // // localStorage.removeItem('email');
// // // navigate('/login');
// // // };

// // // return (
// // // <nav
// // // className="navbar navbar-expand-lg navbar-light px-3"
// // // style={{ backgroundColor: '#c2185b' }}
// // // >
// // // <div className="container-fluid">
// // // {/* Logo */}
// // // <Link className="navbar-brand d-flex align-items-center" to="/usercategory">
// // // <img
// // // src={logo}
// // // alt="QuitQ Logo"
// // // style={{ width: '40px' }}
// // // className="rounded-pill me-2"
// // // />
// // // <div>
// // // <span className="fw-bold text-white">QuitQ</span>
// // // <br />
// // // <small className="text-warning">Explore... <span className="fw-bold"></span></small>
// // // </div>
// // // </Link>
// // //     {/* Search Bar */}
// // //     <form className="d-flex flex-grow-1 mx-4" role="search">
// // //       <input
// // //         className="form-control me-2"
// // //         type="search"
// // //         placeholder="Search for Products, Brands and More"
// // //         aria-label="Search"
// // //       />
// // //       <button className="btn btn-primary" type="button">
// // //         Search
// // //       </button>
// // //     </form>

// // //     {/* Right Menu */}
// // //     <ul className="navbar-nav d-flex flex-row align-items-center gap-3 mb-0">
// // //       <li className="nav-item">
// // //         <Link className="nav-link text-white" to="/cart">
// // //           <i className="fas fa-shopping-cart"></i> Cart
// // //         </Link>
// // //       </li>
// // //       <li className="nav-item">
// // //         <Link className="nav-link text-white" to="/finalorder">
// // //           <i className="fas fa-shopping-cart"></i> My Orders
// // //         </Link>
// // //       </li>
// // //     </ul>

// // //     {/* User Info and Logout */}
// // //     <div className="ml-auto d-flex align-items-center text-white">
// // //       <span className="me-3">
// // //         <strong>{email}</strong>
// // //       </span>
// // //       <button  onClick={handleLogout} className="btn btn-outline-light btn-sm">
// // //         Logout
// // //       </button>
// // //     </div>
// // //   </div>
// // // </nav>
// // // );
// // // }

// // // import React from 'react';
// // // import { Link, useNavigate } from 'react-router-dom';
// // // import logo from "../assets/logo.jpg";

// // // export default function UserNavbar() {
// // // const navigate = useNavigate();
// // // const email = localStorage.getItem('email'); // simulate loggedInUser.getEmail()

// // // const handleLogout = () => {
// // // localStorage.removeItem('email');
// // // navigate('/login');
// // // };

// // // return (
// // // <nav
// // // className="navbar navbar-expand-lg navbar-light px-3"
// // // style={{ backgroundColor: '#c2185b' }}
// // // >
// // // <div className="container-fluid">
// // // {/* Logo */}
// // // <Link className="navbar-brand d-flex align-items-center" to="/usercategory">
// // // <img
// // // src={logo}
// // // alt="QuitQ Logo"
// // // style={{ width: '40px' }}
// // // className="rounded-pill me-2"
// // // />
// // // <div>
// // // <span className="fw-bold text-white">QuitQ</span>
// // // <br />
// // // <small className="text-warning">Explore... <span className="fw-bold"></span></small>
// // // </div>
// // // </Link>
// // //     {/* Search Bar */}
// // //     <form className="d-flex flex-grow-1 mx-4" role="search">
// // //       <input
// // //         className="form-control me-2"
// // //         type="search"
// // //         placeholder="Search for Products, Brands and More"
// // //         aria-label="Search"
// // //       />
// // //       <button className="btn btn-primary" type="button">
// // //         Search
// // //       </button>
// // //     </form>

// // //     {/* Right Menu */}
// // //     <ul className="navbar-nav d-flex flex-row align-items-center gap-3 mb-0">
// // //       <li className="nav-item">
// // //         <Link className="nav-link text-white" to="/cart">
// // //           <i className="fas fa-shopping-cart"></i> Cart
// // //         </Link>
// // //       </li>
// // //       <li className="nav-item">
// // //         <Link className="nav-link text-white" to="/finalorder">
// // //           <i className="fas fa-shopping-cart"></i> My Orders
// // //         </Link>
// // //       </li>
// // //     </ul>

// // //     {/* User Info and Logout */}
// // //     <div className="ml-auto d-flex align-items-center text-white">
// // //       <span className="me-3">
// // //         <strong>{email}</strong>
// // //       </span>
// // //       <button  onClick={handleLogout} className="btn btn-outline-light btn-sm">
// // //         Logout
// // //       </button>
// // //     </div>
// // //   </div>
// // // </nav>
// // // );
// // // }

// // import React from 'react';
// // import { Link, useNavigate } from 'react-router-dom';
// // import logo from '../assets/logo.jpg';
// // import { Dropdown } from 'react-bootstrap';

// // export default function UserNavbar() {
// //   const navigate = useNavigate();
// //   const email = localStorage.getItem('email');
// //   const name = localStorage.getItem('name') || "User";

// //   const handleLogout = () => {
// //     localStorage.removeItem('email');
// //     localStorage.removeItem('name');
// //     navigate('/login');
// //   };

// //   return (
// //     <nav className="navbar navbar-expand-lg navbar-dark px-4" style={{ backgroundColor: '#c2185b' }}>
// //       <div className="container-fluid">
// //         {/* Logo */}
// //         <Link className="navbar-brand d-flex align-items-center" to="/usercategory">
// //           <img src={logo} alt="QuitQ" style={{ width: '40px' }} className="rounded-circle me-2" />
// //           <div>
// //             <span className="fw-bold text-white">QuitQ</span><br />
// //             <small className="text-warning">Explore...</small>
// //           </div>
// //         </Link>

// //         {/* Search Bar */}
// //         <div className="flex-grow-1 mx-4">
// //           <input
// //             className="form-control rounded-pill"
// //             type="search"
// //             placeholder="Search for Products, Brands and More"
// //             style={{ paddingLeft: '20px' }}
// //           />
// //         </div>

// //         {/* Icons & Dropdown */}
// //         <ul className="navbar-nav d-flex flex-row align-items-center gap-3 mb-0">
// //           <li className="nav-item">
// //             <Link className="nav-link text-white" to="/cart">
// //               <i className="fas fa-shopping-cart me-1"></i> Cart
// //             </Link>
// //           </li>

// //           <li className="nav-item">
// //             <Dropdown align="end">
// //               <Dropdown.Toggle
// //                 variant="link"
// //                 className="nav-link text-white d-flex align-items-center"
// //                 style={{ textDecoration: 'none' }}
// //               >
// //                 <i className="fas fa-user-circle me-1"></i> {name}
// //               </Dropdown.Toggle>

// //               <Dropdown.Menu>
// //                 <Dropdown.Item as={Link} to="/profile">
// //                   <i className="fas fa-user me-2"></i> My Profile
// //                 </Dropdown.Item>
// //                 <Dropdown.Item as={Link} to="/finalorder">
// //                   <i className="fas fa-box me-2"></i> Orders
// //                 </Dropdown.Item>
// //                 <Dropdown.Item as={Link} to="/wishlist">
// //                   <i className="fas fa-heart me-2"></i> Wishlist
// //                 </Dropdown.Item>
// //                 <Dropdown.Divider />
// //                 <Dropdown.Item as={Link} to="/login">
// //                   <i className="fas fa-sign-in-alt me-2"></i> Login
// //                 </Dropdown.Item>
// //                 <Dropdown.Item as={Link} to="/register">
// //                   <i className="fas fa-user-plus me-2"></i> Signup
// //                 </Dropdown.Item>
// //                 <Dropdown.Divider />
// //                 <Dropdown.Item onClick={handleLogout}>
// //                   <i className="fas fa-sign-out-alt me-2"></i> Logout
// //                 </Dropdown.Item>
// //               </Dropdown.Menu>
// //             </Dropdown>
// //           </li>
// //         </ul>
// //       </div>
// //     </nav>
// //   );
// // }
// import React, { useEffect, useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import logo from '../assets/logo.jpg';
// import { Dropdown } from 'react-bootstrap';
// import axiosInstance from '../utils/axiosInstance';
// import { toast } from 'react-toastify';

// export default function UserNavbar() {
//   const navigate = useNavigate();
//   const email = localStorage.getItem('email');
//   const [name, setName] = useState(localStorage.getItem('name') || "User");

//   useEffect(() => {
//     const fetchUserName = async () => {
//       try {
//         const res = await axiosInstance.get(`/api/users/${email}`);
//         const fetchedName = res.data.name;
//         setName(fetchedName);
//         localStorage.setItem("name", fetchedName); // Store in localStorage for future
//       } catch (err) {
//         console.error("Error fetching user name:", err);
//       }
//     };

//     if (email && !localStorage.getItem("name")) {
//       fetchUserName();
//     }
//   }, [email]);

//   const handleLogout = () => {
//     localStorage.removeItem('email');
//     localStorage.removeItem('name');
//     // navigate('/login');
//     navigate("/login", { replace: true });
//     toast.success("Logout successful!");
//   };

//   return (
//     <nav className="navbar navbar-expand-lg navbar-dark fixed-top px-4" style={{ backgroundColor: '#c2185b' }}>
//       <div className="container-fluid">
//         {/* Logo */}
//         <Link className="navbar-brand d-flex align-items-center" to="/usercategory">
//           <img src={logo} alt="QuitQ" style={{ width: '40px' }} className="rounded-circle me-2" />
//           <div>
//             <span className="fw-bold text-white">QuitQ</span><br />
//             <small className="text-warning">Explore...</small>
//           </div>
//         </Link>

//         {/* Toggler for mobile */}
//     <button
//       className="navbar-toggler"
//       type="button"
//       data-bs-toggle="collapse"
//       data-bs-target="#navbarContent"
//       aria-controls="navbarContent"
//       aria-expanded="false"
//       aria-label="Toggle navigation"
//     >
//       <span className="navbar-toggler-icon"></span>
//     </button>

//     {/* Collapsible content */}
//     <div className="collapse navbar-collapse" id="navbarContent">
//       {/* Search bar & links inside collapse */}
//       <div className="flex-grow-1 mx-4">
//         <input
//           className="form-control rounded-pill"
//           type="search"
//           placeholder="Search for Products, Brands and More"
//           style={{ paddingLeft: '20px' }}
//         />
//       </div>

//         {/* Search Bar */}
//         <div className="flex-grow-1 mx-4">
//           <input
//             className="form-control rounded-pill"
//             type="search"
//             placeholder="Search for Products, Brands and More"
//             style={{ paddingLeft: '20px' }}
//           />
//         </div>

//         {/* Icons & Dropdown */}
//         <ul className="navbar-nav d-flex flex-row align-items-center gap-3 mb-0">
//           <li className="nav-item">
//             <Link className="nav-link text-white" to="/cart">
//               <i className="fas fa-shopping-cart me-1"></i> Cart
//             </Link>
//           </li>

//           <li className="nav-item">
//             <Dropdown align="end">
//               <Dropdown.Toggle
//                 variant="link"
//                 className="nav-link text-white d-flex align-items-center"
//                 style={{ textDecoration: 'none' }}
//               >
//                 <i className="fas fa-user-circle me-1"></i> {name}
//               </Dropdown.Toggle>

//               <Dropdown.Menu>
//                 <Dropdown.Item as={Link} to="/myprofile">
//                   <i className="fas fa-user me-2"></i> My Profile
//                 </Dropdown.Item>
//                 <Dropdown.Item as={Link} to="/finalorder">
//                   <i className="fas fa-box me-2"></i> Orders
//                 </Dropdown.Item>
//                 <Dropdown.Item as={Link} to="/wishlist">
//                   <i className="fas fa-heart me-2"></i> Wishlist
//                 </Dropdown.Item>
//                 <Dropdown.Divider />
//                 <Dropdown.Item as={Link} to="/login">
//                   <i className="fas fa-sign-in-alt me-2"></i> Login
//                 </Dropdown.Item>
//                 <Dropdown.Item as={Link} to="/register">
//                   <i className="fas fa-user-plus me-2"></i> Signup
//                 </Dropdown.Item>
//                 <Dropdown.Divider />
//                 {/* <Dropdown.Item onClick={handleLogout}>
//                   <i className="fas fa-sign-out-alt me-2"></i> Logout
//                 </Dropdown.Item> */}
//                 <Dropdown.Item onClick={handleLogout} className="text-danger">
//   <i className="fas fa-sign-out-alt me-2"></i> Logout
// </Dropdown.Item>
//               </Dropdown.Menu>
//             </Dropdown>
//           </li>
//         </ul>
//       </div>
//     </nav>
//   );
// }
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.jpg';
import { Dropdown } from 'react-bootstrap';
import axiosInstance from '../utils/axiosInstance';
import { toast } from 'react-toastify';

export default function UserNavbar() {
  const navigate = useNavigate();
  const email = localStorage.getItem('email');
  const [name, setName] = useState(localStorage.getItem('name') || "User");

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const res = await axiosInstance.get(`/api/users/${email}`);
        const fetchedName = res.data.name;
        setName(fetchedName);
        localStorage.setItem("name", fetchedName);
      } catch (err) {
        console.error("Error fetching user name:", err);
      }
    };

    if (email && !localStorage.getItem("name")) {
      fetchUserName();
    }
  }, [email]);

  const handleLogout = () => {
    localStorage.removeItem('email');
    localStorage.removeItem('name');
    navigate("/login", { replace: true });
    toast.success("Logout successful!");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark fixed-top px-4" style={{ backgroundColor: '#c2185b' }}>
      <div className="container-fluid">

        {/* Logo */}
        <Link className="navbar-brand d-flex align-items-center" to="/usercategory">
          <img src={logo} alt="QuitQ" style={{ width: '40px' }} className="rounded-circle me-2" />
          <div>
            <span className="fw-bold text-white">QuitQ</span><br />
            <small className="text-warning">Explore...</small>
          </div>
        </Link>

        {/* Toggler */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Collapsible content */}
        <div className="collapse navbar-collapse" id="navbarContent">

          {/* Search Bar */}
          <div className="flex-grow-1 mx-4">
            <input
              className="form-control rounded-pill"
              type="search"
              placeholder="Search for Products, Brands and More"
              style={{ paddingLeft: '20px' }}
            />
          </div>

          {/* Icons & Dropdown */}
          <ul className="navbar-nav d-flex flex-row align-items-center gap-3 mb-0">
            <li className="nav-item">
              <Link className="nav-link text-white" to="/cart">
                <i className="fas fa-shopping-cart me-1"></i> Cart
              </Link>
            </li>

            <li className="nav-item">
              <Dropdown align="end">
                <Dropdown.Toggle
                  variant="link"
                  className="nav-link text-white d-flex align-items-center"
                  style={{ textDecoration: 'none' }}
                >
                  <i className="fas fa-user-circle me-1"></i> {name}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item as={Link} to="/myprofile">
                    <i className="fas fa-user me-2"></i> My Profile
                  </Dropdown.Item>
                  <Dropdown.Item as={Link} to="/finalorder">
                    <i className="fas fa-box me-2"></i> Orders
                  </Dropdown.Item>
                  <Dropdown.Item as={Link} to="/wishlist">
                    <i className="fas fa-heart me-2"></i> Wishlist
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item as={Link} to="/login">
                    <i className="fas fa-sign-in-alt me-2"></i> Login
                  </Dropdown.Item>
                  <Dropdown.Item as={Link} to="/register">
                    <i className="fas fa-user-plus me-2"></i> Signup
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={handleLogout} className="text-danger">
                    <i className="fas fa-sign-out-alt me-2"></i> Logout
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </li>
          </ul>
        </div> {/* ✅ This closes collapse div properly */}
      </div>
    </nav>
  );
}
