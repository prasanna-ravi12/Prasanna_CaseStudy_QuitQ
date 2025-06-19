<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html lang="en">
<head>
<jsp:include page="bootstrap_links.jsp"></jsp:include>
<!-- <style>
    .user-home-container {
        max-width: 600px;
        margin: 80px auto;
        padding: 30px;
        background-color: #f8f9fa;
        border-radius: 15px;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        text-align: center;
    }

    .user-email {
        font-size: 1.2rem;
        color: #333;
        margin-bottom: 20px;
    }

    .logout-btn {
        display: inline-block;
        padding: 10px 25px;
        font-size: 1rem;
        border: none;
        border-radius: 5px;
        background-color: #dc3545;
        color: white;
        text-decoration: none;
        transition: background-color 0.3s ease;
    }

    .logout-btn:hover {
        background-color: #c82333;
        text-decoration: none;
    }
</style> -->
<style>
  body {
    margin: 0;
    padding: 0;
    background: linear-gradient(135deg, #dff6ff, #c8e7ff, #bae0ff);
    background-size: 600% 600%;
    animation: gradientShift 15s ease infinite;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }

  @keyframes gradientShift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }

  h3 {
    color: #2c3e50;
    margin-bottom: 20px;
    font-weight: 600;
  }

  form {
    background-color: rgba(255, 255, 255, 0.95);
    padding: 25px 30px;
    border-radius: 15px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;
  }

  form:hover {
    transform: translateY(-4px);
  }

  input[type="text"],
  input[type="number"],
  input[type="email"],
  input[type="password"],
  textarea,
  .form-control {
    border-radius: 8px !important;
    padding: 10px;
    transition: border 0.3s;
    box-shadow: inset 0 1px 3px rgba(0,0,0,0.1);
  }

  input:focus,
  textarea:focus {
    border-color: #1f66c1 !important;
    box-shadow: 0 0 4px #89b3f4;
  }

  .btn-primary {
    background-color: #1f66c1;
    border: none;
    padding: 8px 20px;
    border-radius: 25px;
  }

  .btn-primary:hover {
    background-color: #1558ad;
  }

  .btn-secondary {
    border-radius: 25px;
    background-color: #888;
    color: white;
  }

  .btn-secondary:hover {
    background-color: #6c757d;
  }

  .table-section {
    background-color: rgba(255, 255, 255, 0.95);
    padding: 25px 30px;
    border-radius: 15px;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;
  }

  .table-section:hover {
    transform: translateY(-4px);
  }

  .table {
    border-radius: 12px;
    overflow: hidden;
  }

  .table th {
    background-color: #2c3e50;
    color: #ffffff;
    vertical-align: middle;
  }

  .table td {
    vertical-align: middle;
    background-color: #f4f9ff;
  }

  .btn-sm {
    padding: 5px 12px;
    border-radius: 20px;
  }

  .btn-info {
    background-color: #00b894;
    border: none;
  }

  .btn-info:hover {
    background-color: #019374;
  }

  .btn-danger {
    background-color: #e17055;
    border: none;
  }

  .btn-danger:hover {
    background-color: #d35400;
  }

  label {
    font-weight: 500;
  }

  .mb-3 input[type="radio"] {
    margin-right: 8px;
  }
  .bubble-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0; /* behind the form */
  overflow: hidden;
  pointer-events: none;
}

.bubble {
  position: absolute;
  bottom: -100px;
  width: 40px;
  height: 40px;
  background-color: rgba(0, 51, 102, 0.4); /* light blue */
  border-radius: 50%;
  animation: rise 15s infinite ease-in;
}

.bubble:nth-child(2) {
  width: 30px;
  height: 30px;
  left: 20%;
  animation-duration: 12s;
}

.bubble:nth-child(3) {
  width: 50px;
  height: 50px;
  left: 40%;
  animation-duration: 18s;
}

.bubble:nth-child(4) {
  width: 25px;
  height: 25px;
  left: 60%;
  animation-duration: 10s;
}

.bubble:nth-child(5) {
  width: 35px;
  height: 35px;
  left: 80%;
  animation-duration: 20s;
}

.bubble:nth-child(6) {
  width: 45px;
  height: 45px;
  left: 10%;
  animation-duration: 14s;
}

@keyframes rise {
  0% {
    transform: translateY(0) scale(1);
    opacity: 0.6;
  }
  50% {
    transform: translateY(-50vh) scale(1.2);
    opacity: 0.4;
  }
  100% {
    transform: translateY(-100vh) scale(1);
    opacity: 0;
  }
}
  
</style>

  <title>Seller Dashboard</title>
  <meta charset="UTF-8">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
	<jsp:include page="seller_navbar.jsp"></jsp:include>

<div class="container-fluid mt-4">
  <div class="row">

    <!-- Product Form -->
    <div class="col-sm-5">
      <h3>Add / Update Product</h3>
      <form action="addProduct" method="post">
        <%-- <div class="mb-3">
          <input type="number" class="form-control" name="productId" placeholder="Product ID" value="${updateProduct.productId}" required>
        </div> --%>
        <div class="mb-3">
          <input type="text" class="form-control" name="productName" placeholder="Product Name" value="${updateProduct.productName}" required>
        </div>
        <div class="mb-3">
          <input type="number" step="0.01" class="form-control" name="price" placeholder="Price" value="${updateProduct.price}" required>
        </div>
        <div class="mb-3">
          <input type="text" class="form-control" name="brand" placeholder="Brand" value="${updateProduct.brand}" required>
        </div>

        <div class="mb-3">
          <label><strong>Category:</strong></label><br>
          <c:forEach var="cat" items="${categories}">
            <input type="radio" name="category" value="${cat.categoryName}" 
              <c:if test="${updateProduct.category eq cat.categoryName}">checked</c:if>> ${cat.categoryName}<br>
          </c:forEach>
        </div>
        <div class="mb-3">
  <label for="imageUrl" class="form-label">Image URL</label>
  <input type="text" name="imageUrl" class="form-control" placeholder="Paste image URL (e.g. https://...jpg)">
</div>
        
        <div class="mb-3">
             <input type="number" class="form-control" name="stock" placeholder="Stock Quantity" value="${updateProduct.stock}" required>
        </div>
        
        <div class="mb-3">
          <button type="submit" class="btn btn-primary">Save</button>
          <button type="reset" class="btn btn-secondary">Reset</button>
        </div>
      </form>
    </div>

    <!-- Product Table -->
    <div class="col-sm-7">
      <h3>My Products</h3>
      <table class="table table-bordered">
        <thead>
          <tr>
            <th>Product ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Brand</th>
            <th>Category</th>
            <th>Stock</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <c:forEach var="p" items="${products}">
            <tr>
              <td>${p.productId}</td>
              <td>${p.productName}</td>
              <td>${p.price}</td>
              <td>${p.brand}</td>
              <td>${p.category}</td>
              <td>${p.stock}</td>
              <td>
                <a href="deleteProduct?productId=${p.productId}" class="btn btn-danger btn-sm">Delete</a>
                <a href="getProduct?productId=${p.productId}" class="btn btn-info btn-sm">Update</a>
              </td>
            </tr>
          </c:forEach>
        </tbody>
      </table>
    </div>
    
<div class="bubble-container">
  <div class="bubble"></div>
  <div class="bubble"></div>
  <div class="bubble"></div>
  <div class="bubble"></div>
  <div class="bubble"></div>
  <div class="bubble"></div>
</div>

  </div>
  
<%-- </div>
User Home<br>${loggedInUser.getEmail()}
<div>
	<a href="logout" >Logout</a>
</div> --%>

<%-- <div class="user-home-container">
    <h3>Welcome, Seller!</h3>
    <div class="user-email">
        ${loggedInUser.getEmail()}
    </div>
    <a href="logout" class="logout-btn">Logout</a>
</div> --%>

</body>
</html>
