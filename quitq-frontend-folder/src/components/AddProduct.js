import React, { useEffect, useState } from 'react';
// import axios from 'axios';
import axiosInstance from '../utils/axiosInstance';
import SellerNavbar from './SellerNavbar';

export default function SellerHome() {
  const [inputs, setInputs] = useState({});
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [editId, setEditId] = useState(null);
  const email = localStorage.getItem("email"); // or pass from props

  // const fetchProducts = async () => {
  //   const res = await axios.get("http://localhost:8080/api/products");
  //   setProducts(res.data);
  // };

//   const fetchProducts = async () => {
//   const res = await axiosInstance.get("/api/products");
//   setProducts(res.data);
// };
// const fetchProducts = async () => {
//   const email = localStorage.getItem("email");
//   const res = await axiosInstance.get(`/api/products/seller/${email}`);
  
//   setProducts(res.data);
// };
// const fetchProducts = async () => {
//   const email = localStorage.getItem("email");
//   try {
//     const res = await axiosInstance.get(`/api/products/seller/${email}`);
//     setProducts(res.data);
//   } catch (error) {
//     console.error("Error fetching seller products:", error);
//     alert("Unauthorized: Please login again");
//   }
// };
 const fetchProducts = async () => {
    const res = await axiosInstance.get("/api/products");
    const sellerProducts = res.data.filter(p => p.sellerEmail === email);
    setProducts(sellerProducts);
  };



  const fetchCategories = async () => {
    const res = await axiosInstance.get("/api/categories"); // Adjust endpoint
    setCategories(res.data);
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   if (editId !== null) {
  //     await axios.put(`http://localhost:8080/api/products/${editId}`, inputs);
  //     setEditId(null);
  //   } else {
  //     await axios.post("http://localhost:8080/api/products", inputs);
  //   }
  //   setInputs({});
  //   fetchProducts();
  // };
//   const handleSubmit = async (e) => {
//   e.preventDefault();
//   const sellerEmail = localStorage.getItem("email"); // ✅ get seller's email

//   const dataToSend = {
//     ...inputs,
//     sellerEmail, // ✅ add sellerEmail field
//   };

//   if (editId !== null) {
//     await axios.put(`http://localhost:8080/api/products/${editId}`, dataToSend);
//     setEditId(null);
//   } else {
//     await axios.post("http://localhost:8080/api/products", dataToSend);
//   }

//   setInputs({});
//   fetchProducts();
// };

const handleSubmit = async (e) => {
  e.preventDefault();
  const sellerEmail = localStorage.getItem("email");

  const dataToSend = {
    ...inputs,
    sellerEmail,
  };

  if (editId !== null) {
    await axiosInstance.put(`/api/products/${editId}`, dataToSend);
    setEditId(null);
  } else {
    await axiosInstance.post("/api/products", dataToSend);
  }

  setInputs({});
  fetchProducts();
};



  const handleEdit = (product) => {
    setInputs(product);
    setEditId(product.productId);
  };

  // const handleDelete = async (id) => {
  //   if (window.confirm("Are you sure?")) {
  //     await axios.delete(`http://localhost:8080/api/products/${id}`);
  //     fetchProducts();
  //   }
  // };
  const handleDelete = async (id) => {
  if (window.confirm("Are you sure?")) {
    await axiosInstance.delete(`/api/products/${id}`);
    fetchProducts();
  }
};
const showFashionFields = inputs.category === "Fashion";


  return (
    <div style={{ paddingTop: '60px' }}>

      <SellerNavbar email={email} />
      <div className="container-fluid mt-4">
        <div className="row">

          {/* Form */}
          <div className="col-sm-5">
            <h3>{editId ? "Update" : "Add"} Product</h3>
            <form onSubmit={handleSubmit} style={styles.form}>
              <div className="mb-3">
                <input type="text" className="form-control" name="productName"
                  placeholder="Product Name" value={inputs.productName || ''} onChange={handleChange} required />
              </div>
              <div className="mb-3">
                <input type="number" className="form-control" name="price"
                  placeholder="Price" value={inputs.price || ''} onChange={handleChange} required />
              </div>
              <div className="mb-3">
                <input type="text" className="form-control" name="brand"
                  placeholder="Brand" value={inputs.brand || ''} onChange={handleChange} required />
              </div>
              <div className="mb-3">
                <label><strong>Category:</strong></label><br />
                {categories.map((cat, i) => (
                  <div key={i}>
                    <input type="radio" name="category" value={cat.categoryName}
                      checked={inputs.category === cat.categoryName}
                      onChange={handleChange} /> {cat.categoryName}
                  </div>
                ))}
              </div>
              <div className="mb-3">
                <input type="text" name="imageUrl" className="form-control"
                  placeholder="Image URL" value={inputs.imageUrl || ''} onChange={handleChange} />
              </div>
              <div className="mb-3">
                <input type="number" className="form-control" name="stock"
                  placeholder="Stock Quantity" value={inputs.stock || ''} onChange={handleChange} required />
              </div>
              {/* Discount */}
<div className="mb-3">
  <label><strong>Discount:</strong></label>
  <select name="discount" className="form-control" value={inputs.discount || ''} onChange={handleChange}>
    <option value="">-- Select Discount --</option>
    <option value="30%">30% or more</option>
    <option value="40%">40% or more</option>
    <option value="50%">50% or more</option>
    <option value="60%">60% or more</option>
    <option value="70%">70% or more</option>
    <option value="No">No Discount</option>
  </select>
</div>

{/* Delivery in 1 Day */}
<div className="mb-3">
  <label><strong>Delivery in 1 Day:</strong></label>
  <select name="deliveryInOneDay" className="form-control" value={inputs.deliveryInOneDay || ''} onChange={handleChange}>
    <option value="">-- Select Option --</option>
    <option value="Yes">Yes</option>
    <option value="No">No</option>
  </select>
</div>

{/* Conditional fields for Fashion */}
{showFashionFields && (
  <>
    {/* Gender */}
    <div className="mb-3">
      <label><strong>Gender:</strong></label>
      <select name="gender" className="form-control" value={inputs.gender || ''} onChange={handleChange}>
        <option value="">-- Select Gender --</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </select>
    </div>

    {/* Size */}
    <div className="mb-3">
      <label><strong>Size:</strong></label>
      <select name="size" className="form-control" value={inputs.size || ''} onChange={handleChange}>
        <option value="">-- Select Size --</option>
        <option value="XS">XS</option>
        <option value="S">S</option>
        <option value="M">M</option>
        <option value="L">L</option>
        <option value="XL">XL</option>
        <option value="2XL">2XL</option>
        <option value="No Size">No size</option>
        
      </select>
    </div>
  </>
)}

              <div className="mb-3">
                <button type="submit" className="btn btn-primary">Save</button>
                <button type="reset" className="btn btn-secondary ms-2" onClick={() => { setInputs({}); setEditId(null); }}>Reset</button>
              </div>
            </form>
          </div>

          {/* Table */}
          <div className="col-sm-7">
            <h3>My Products</h3>
            <table className="table table-bordered">
              <thead>
                {/* <tr>
                  <th>ID</th><th>Name</th><th>Price</th><th>Brand</th><th>Category</th><th>Stock</th><th>Action</th>
                </tr> */}
                <tr>
  <th>ID</th><th>Name</th><th>Price</th><th>Brand</th><th>Category</th>
  <th>Stock</th><th>Discount</th><th>Delivery</th><th>Action</th>
</tr>

              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p.productId}>
                    {/* <td>{p.productId}</td>
                    <td>{p.productName}</td>
                    <td>{p.price}</td>
                    <td>{p.brand}</td>
                    <td>{p.category}</td>
                    <td>{p.stock}</td> */}
                    <td>{p.productId}</td>
<td>{p.productName}</td>
<td>{p.price}</td>
<td>{p.brand}</td>
<td>{p.category}</td>
<td>{p.stock}</td>
<td>{p.discount || 'N/A'}</td>
<td>{p.deliveryInOneDay || 'N/A'}</td>
{/* <td>{p.category === 'Fashion' ? p.gender : 'Not Valid'}</td>
<td>{p.category === 'Fashion' ? p.size : 'Not Valid'}</td> */}

                    <td>
                      <button className="btn btn-sm btn-info m-1" onClick={() => handleEdit(p)}>Edit</button>
                      <button className="btn btn-sm btn-danger" onClick={() => handleDelete(p.productId)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
        {/* Bubbles */}
        <div className="bubble-container">
          {[...Array(6)].map((_, i) => <div key={i} className="bubble"></div>)}
        </div>
      </div>

      <style>{bubbleStyles}</style>
    </div>
  );
}


const styles = {
  form: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    padding: '30px',
    borderRadius: '18px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)',
    transition: 'transform 0.3s ease',
  }
};


const bubbleStyles = `
  body {
    margin: 0;
    padding: 0;
    background: linear-gradient(-45deg, #f0f9ff, #c8e7ff, #e0eafc, #f3e5f5);
    background-size: 400% 400%;
    animation: gradientShift 15s ease infinite;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }

  .bubble-container {
    position: fixed;
    top: 0; left: 0;
    width: 100%; height: 100%;
    z-index: 0;
    pointer-events: none;
    overflow: hidden;
  }

  .bubble {
    position: absolute;
    bottom: -100px;
    background-color: rgba(33, 150, 243, 0.2);
    border-radius: 50%;
    backdrop-filter: blur(3px);
    animation: rise 15s infinite ease-in;
  }

  .bubble:nth-child(1) { width: 40px; height: 40px; left: 5%; animation-duration: 16s; }
  .bubble:nth-child(2) { width: 30px; height: 30px; left: 20%; animation-duration: 12s; }
  .bubble:nth-child(3) { width: 50px; height: 50px; left: 40%; animation-duration: 18s; }
  .bubble:nth-child(4) { width: 25px; height: 25px; left: 60%; animation-duration: 10s; }
  .bubble:nth-child(5) { width: 35px; height: 35px; left: 80%; animation-duration: 20s; }
  .bubble:nth-child(6) { width: 45px; height: 45px; left: 90%; animation-duration: 14s; }

  @keyframes rise {
    0% { transform: translateY(0) scale(1); opacity: 0.5; }
    50% { transform: translateY(-50vh) scale(1.2); opacity: 0.3; }
    100% { transform: translateY(-100vh) scale(1); opacity: 0; }
  }

  @keyframes gradientShift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }

  /* ✅ Table container styling */
  .table {
    border-collapse: separate;
    border-spacing: 0;
    width: 100%;
    margin-top: 20px;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 10px 30px rgba(0,0,0,0.12);
    background: white;
  }

  thead tr {
    background: linear-gradient(to right, #42a5f5, #1e88e5);
    color: white;
    text-shadow: 1px 1px 2px #00000033;
    font-size: 16px;
  }

  th, td {
    padding: 14px 16px;
    text-align: center;
    vertical-align: middle;
  }

  tbody tr {
    transition: background-color 0.3s ease;
  }

  tbody tr:nth-child(even) {
    background-color: #f5faff;
  }

  tbody tr:hover {
    background-color: #e1f5fe;
    cursor: pointer;
  }

  /* ✅ Buttons */
  .btn {
    border-radius: 8px !important;
    font-weight: 600;
    padding: 6px 12px;
    box-shadow: 0 3px 6px rgba(0,0,0,0.12);
    transition: transform 0.2s ease, background-color 0.3s ease;
  }

  .btn-info {
    background-color: #29b6f6 !important;
    border: none;
    color: white;
  }

  .btn-info:hover {
    background-color: #0288d1 !important;
    transform: translateY(-1px);
  }

  .btn-danger {
    background-color: #ef5350 !important;
    border: none;
    color: white;
  }

  .btn-danger:hover {
    background-color: #d32f2f !important;
    transform: translateY(-1px);
  }

  .form-control {
    border-radius: 8px;
    box-shadow: inset 0 1px 3px rgba(0,0,0,0.1);
  }

  h3 {
    font-weight: 600;
    color: #1a237e;
    margin-bottom: 20px;
  }
`;
