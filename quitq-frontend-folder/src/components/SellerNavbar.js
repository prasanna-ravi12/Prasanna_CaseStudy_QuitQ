
import React from 'react';
import { toast } from 'react-toastify';

export default function SellerNavbar({ email }) {
  // logout handler
  const handleLogout = () => {
    localStorage.removeItem("email");
    window.location.href = "/login";
    toast.success("Logout successful!");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark fixed-top px-4" style={styles.navbar}>
      {/* Left side - logo or link to SellerHome */}
      <a className="navbar-brand" href="/sellerhome" style={styles.brandLink}>
        ← Back to Home
      </a>

      {/* Right side - welcome + logout */}
      <div className="ms-auto d-flex align-items-center">
        <span className="text-white me-3">
          <strong>Welcome,</strong> {email}
        </span>
        <button onClick={handleLogout} className="btn btn-outline-light btn-sm">
          Logout
        </button>
      </div>
    </nav>
  );
}

const styles = {
  navbar: {
    background: 'linear-gradient(90deg, #1e3c72, #2a5298)',
    boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
    borderBottom: '2px solid #ffffff33',
  },
  brandLink: {
    color: 'white',
    fontWeight: 'bold',
    textDecoration: 'none',
    fontSize: '16px'
  }
};
