import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function OAuthSuccessRedirect() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const email = params.get("email");

    if (email) {
      localStorage.setItem("email", email);
      localStorage.setItem("role", "CUSTOMER"); // optional if you're checking role
      navigate("/usercategory"); // Go to user dashboard
    } else {
      alert("OAuth login failed to fetch email");
    }
  }, [location, navigate]);

  return <p>Redirecting...</p>;
}

export default OAuthSuccessRedirect;
