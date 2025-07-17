
import React, { useState } from "react";
// import Navbar from "./Navbar";
import signinBg from "../assets/signinbg.jpg";
import { useNavigate } from "react-router-dom"; // ✅ Import this

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    gender: "",
    phone: "",
    address: "",
    role: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  
  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch("http://localhost:8080/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      const data = await response.json();
      alert("User Registered Successfully: " + data.email);

      // ✅ Navigate to login page with credentials
      navigate("/login", {
        state: {
          email: formData.email,
          password: formData.password
        }
      });
    } else if (response.status === 409) {
      alert("User already exists with this email.");
    } else {
      alert("Failed to register user");
    }
  } catch (error) {
    console.error("Error during registration:", error);
    alert("Error occurred while registering.");
  }
};


<style>
  {`
    .custom-btn {
      background-color: transparent;
      border: 2px solid #d63384;
      color: #d63384;
      padding: 8px 16px;
      border-radius: 6px;
      font-weight: 500;
      transition: all 0.3s ease;
    }

    .custom-btn:hover {
      background-color: #d63384;
      color: white;
    }

    
  `}
</style>


  return (
    <>
    
      {/* <Navbar /> */}
      <div className="container-fluid main-container" style={styles.background}>
        <div className="row w-100">
          <div className="col-md-6 d-none d-md-block"></div>
          <div className="col-md-6 d-flex justify-content-center align-items-center">
            <div className="form-box" style={styles.formBox}>
              <h3>SignUp</h3>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <input name="name" type="text" className="form-control" placeholder="FullName" required onChange={handleChange} />
                </div>
                <div className="mb-3">
                  <input name="email" type="email" className="form-control" placeholder="Email" required onChange={handleChange} />
                </div>
                <div className="mb-3">
                  <input name="password" type="password" className="form-control" placeholder="Password" required onChange={handleChange} />
                </div>
                <div className="mb-3">
                  <label>
                    <input type="radio" name="gender" value="male" onChange={handleChange} required /> Male
                  </label>
                  <label className="ms-3">
                    <input type="radio" name="gender" value="female" onChange={handleChange} /> Female
                  </label>
                </div>
                <div className="mb-3">
                  <input name="phone" type="tel" className="form-control" placeholder="Phone" required onChange={handleChange} />
                </div>
                <div className="mb-3">
                  <textarea name="address" className="form-control" placeholder="Address" required onChange={handleChange}></textarea>
                </div>
                <div className="mb-3">
                  <label>
                    <input type="radio" name="role" value="SELLER" onChange={handleChange} required /> SELLER
                  </label>
                  <label className="ms-3">
                    <input type="radio" name="role" value="CUSTOMER" onChange={handleChange} /> CUSTOMER
                  </label>
                  {/* <label>
                    <input type="radio" name="role" value="ADMIN" onChange={handleChange} required /> ADMIN
                  </label> */}
                </div>
                {/* <div className="mb-3 text-center">
                  <button type="submit" className="btn btn-primary">SignUp</button>
                  <button type="reset" className="btn btn-danger ms-3">Reset</button>
                </div> */}
                <div className="mb-3 text-center d-flex justify-content-center gap-3">
  <button type="submit" className="btn custom-btn" style={styles.customBtn}>SignUp</button>
  <button type="reset" className="btn custom-btn" style={styles.customBtn}>Reset</button>
  <button
    type="button"
    className="btn custom-btn"
    style={styles.customBtn}
    onClick={() => navigate("/login")}
  >
    Back to SignIn
  </button>
</div>

                
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const styles = {
  background: {
    backgroundImage: `url(${signinBg})`,
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
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    padding: "30px",
    borderRadius: "15px",
    boxShadow: "0 0 15px rgba(0,0,0,0.2)",
    width: "100%",
    maxWidth: "500px"
  },
  customBtn: {
  backgroundColor: "transparent",
  border: "2px solid #d63384", // Dark pinkish
  color: "#d63384",
  padding: "8px 16px",
  borderRadius: "6px",
  fontWeight: "500",
  transition: "all 0.3s ease",
}

};

export default Register;
