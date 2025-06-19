<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">

  <title>Products - ${selectedCategory}</title>
  <jsp:include page="bootstrap_links.jsp"></jsp:include>
 <style>
    /* Background Gradient & Animated Bubbles */
    body {
      margin: 0;
      padding: 0;
      background: linear-gradient(135deg, #ffb6c1, #ff69b4, #ff1493);
      background-size: 300% 300%;
      animation: bgAnim 20s ease infinite;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      position: relative;
      overflow-x: hidden;
    }

    @keyframes bgAnim {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }

    /* Bubbles Animation */
    body::before,
    body::after {
      content: '';
      position: absolute;
      border-radius: 50%;
      background-color: rgba(255, 20, 147, 0.3);
      animation: bubbleFloat 40s linear infinite;
      z-index: 0;
    }

    body::before {
      width: 300px;
      height: 300px;
      top: 15%;
      left: -100px;
    }

    body::after {
      width: 400px;
      height: 400px;
      bottom: 10%;
      right: -150px;
    }

    @keyframes bubbleFloat {
      0%   { transform: translateY(0) scale(1); }
      50%  { transform: translateY(-40px) scale(1.1); }
      100% { transform: translateY(0) scale(1); }
    }

    /* Card Styling */
    .card {
      background-color: rgba(255, 192, 203, 0.95);
      border: none;
      border-radius: 15px;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
      position: relative;
      z-index: 1;
    }

    .card:hover {
      transform: translateY(-10px);
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
    }

    .card-title {
      color: #880e4f;
      font-weight: bold;
    }

    .card-text {
      color: #4a4a4a;
      font-size: 0.95rem;
    }

    h3 {
      color: #6a1b9a;
      font-weight: 600;
      text-align: center;
      position: relative;
      z-index: 1;
    }

    .btn-success {
      background-color: #c2185b;
      border: none;
    }

    .btn-success:hover {
      background-color: #ad1457;
    }

    .form-control {
      border-radius: 8px;
    }
  </style>
  
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css">
</head>
<body>
	<jsp:include page="user_navbar.jsp"></jsp:include>

<%-- <div class="container mt-5">
  <h3>Products in <span class="text-primary">${selectedCategory}</span></h3>
  <div class="row mt-4">
    <c:forEach var="prod" items="${products}">
      <div class="col-md-4 mb-4">
        <div class="card h-100 shadow-sm">
        <img src="${prod.imageUrl}" class="card-img-top" alt="Product Image" style="height: 200px; object-fit: cover;">
          <div class="card-body">
          <h5 class="card-title">${prod.productName}</h5>
    <p class="card-text">Brand: ${prod.brand}</p>
    <p class="card-text">Price: ₹${prod.price}</p>
      </div>
            <h5 class="card-title">${prod.productName}</h5>
            <p class="card-text">Brand: ${prod.brand}</p>
            <p class="card-text">Price: ₹${prod.price}</p>
            <form action="addToCart" method="post">
              <input type="hidden" name="productId" value="${prod.productId}">
              <div class="mb-2">
                Quantity: <input type="number" name="quantity" class="form-control" value="1" min="1" max="${prod.stock}">
              </div>
              <button type="submit" class="btn btn-success">Add to Cart</button>
            </form>
            <form action="addToCart" method="post">
  <input type="hidden" name="productName" value="${prod.productName}">
  <input type="hidden" name="brand" value="${prod.brand}">
  <input type="hidden" name="price" value="${prod.price}">
  <div class="mb-2">
    Quantity: <input type="number" name="quantity" class="form-control" value="1" min="1" max="${prod.stock}">
  </div>
  <button type="submit" class="btn btn-success">Add to Cart</button>
</form>
            
          </div>
        </div>
      </div>
    </c:forEach>
  </div>
</div> --%>
<div class="container mt-5">
  <h3>Products in <span class="text-primary">${selectedCategory}</span></h3>
  <div class="row mt-4">
    <c:forEach var="prod" items="${products}">
      <div class="col-md-4 mb-4">
        <div class="card h-100 shadow-sm">
        
          <!-- ✅ Product Image -->
          <img src="${prod.imageUrl}" class="card-img-top" alt="Product Image"
               style="height: 280px; object-fit: cover; border-top-left-radius: 15px; border-top-right-radius: 15px;">
          
          <div class="card-body">
            <h5 class="card-title">${prod.productName}</h5>
            <p class="card-text">Brand: ${prod.brand}</p>
            <p class="card-text">Price: ₹${prod.price}</p>

            <form action="addToCart" method="post">
              <input type="hidden" name="productName" value="${prod.productName}">
              <input type="hidden" name="brand" value="${prod.brand}">
              <input type="hidden" name="price" value="${prod.price}">
              
              <div class="mb-2">
                Quantity: <input type="number" name="quantity" class="form-control" value="1" min="1" max="${prod.stock}">
              </div>
              
              <button type="submit" class="btn btn-success">Add to Cart</button>
            </form>
          </div>
        </div>
      </div>
    </c:forEach>
  </div>
</div>

</body>
</html>
