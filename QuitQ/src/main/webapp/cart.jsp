<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
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
      background: linear-gradient(135deg, #ffb6c1, #ffc0cb, #ff69b4);
      background-size: 300% 300%;
      animation: gradientMove 20s ease infinite;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      position: relative;
    }

    @keyframes gradientMove {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }

    body::before, body::after {
      content: '';
      position: absolute;
      border-radius: 50%;
      background-color: rgba(255, 105, 180, 0.2);
      animation: floatBubble 25s linear infinite;
      z-index: 0;
    }

    body::before {
      width: 300px;
      height: 300px;
      top: 10%;
      left: -100px;
    }

    body::after {
      width: 400px;
      height: 400px;
      bottom: 5%;
      right: -150px;
    }

    @keyframes floatBubble {
      0%   { transform: translateY(0) scale(1); }
      50%  { transform: translateY(-40px) scale(1.1); }
      100% { transform: translateY(0) scale(1); }
    }

    .container {
      position: relative;
      z-index: 2;
    }

    h2 {
      color: #880e4f;
      font-weight: 600;
      text-align: center;
    }

    .table {
      background-color: rgba(255, 240, 245, 0.85);
      border-radius: 15px;
      overflow: hidden;
      box-shadow: 0 0 15px rgba(0,0,0,0.15);
    }

    .table thead th {
      background-color: #f06292;
      color: white;
      border: none;
    }

    .table tbody tr td {
      vertical-align: middle;
      color: #4a4a4a;
    }

    .btn-warning {
      background-color: #f8bbd0;
      color: #880e4f;
      border: none;
    }

    .btn-warning:hover {
      background-color: #f48fb1;
      color: white;
    }

    .btn-danger {
      background-color: #ec407a;
      border: none;
    }

    .btn-danger:hover {
      background-color: #d81b60;
    }

    .btn-success {
      background-color: #c2185b;
      border: none;
    }

    .btn-success:hover {
      background-color: #ad1457;
    }

    .user-home-container {
      max-width: 500px;
      margin: 40px auto;
      padding: 25px;
      background-color: rgba(255, 240, 245, 0.9);
      border-radius: 15px;
      box-shadow: 0 8px 20px rgba(0,0,0,0.1);
      text-align: center;
      z-index: 2;
      position: relative;
    }

    .user-email {
      font-size: 1.1rem;
      color: #6a1b9a;
      margin-bottom: 15px;
    }

    .logout-btn {
      display: inline-block;
      padding: 10px 25px;
      font-size: 1rem;
      border: none;
      border-radius: 5px;
      background-color: #d81b60;
      color: white;
      text-decoration: none;
      transition: background-color 0.3s ease;
    }

    .logout-btn:hover {
      background-color: #ad1457;
      text-decoration: none;
    }
  </style>

  <jsp:include page="bootstrap_links.jsp"></jsp:include>

  <title>Your Cart</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
	<jsp:include page="cart_navbar.jsp"></jsp:include>

<div class="container mt-5">
  <h2>Your Shopping Cart</h2>

  <%-- <table class="table table-bordered mt-4">
    <thead>
      <tr>
        <th>Product</th>
        <th>Brand</th>
        <th>Price</th>
        <th>Quantity</th>
        <th>Update</th>
        <th>Delete</th>
      </tr>
    </thead>
    <tbody>
      <c:forEach var="item" items="${cartItems}">
        <tr>
          <td>${item.productName}</td>
          <td>${item.brand}</td>
          <td>₹${item.price}</td>
          <td>
            <form action="updateCart" method="post" class="d-flex">
              <input type="hidden" name="cartId" value="${item.cartId}">
              <input type="number" name="quantity" value="${item.quantity}" class="form-control w-50 me-2" min="1">
              <button type="submit" class="btn btn-warning btn-sm">Update</button>
            </form>
          </td>
          <td>
            <a href="deleteCartItem?cartId=${item.cartId}" class="btn btn-danger btn-sm">Delete</a>
          </td>
        </tr>
      </c:forEach>
    </tbody>
  </table> --%>
  
  <table class="table table-bordered mt-4">
  <thead>
    <tr>
      <th>Product</th>
      <th>Brand</th>
      <th>Price</th>
      <th>Quantity</th>
      <th>Update</th>
      <th>Delete</th> <!-- ✅ Add this column -->
    </tr>
  </thead>
  <tbody>
    <c:forEach var="item" items="${cartItems}">
      <tr>
        <td>${item.productName}</td>
        <td>${item.brand}</td>
        <td>₹${item.price}</td>

        <!-- ✅ Quantity input column -->
        <td>
          <form action="updateCart" method="post" class="d-flex">
            <input type="hidden" name="cartId" value="${item.cartId}">
            <input type="number" name="quantity" value="${item.quantity}" class="form-control w-75" min="1">
        </td>

        <!-- ✅ Update button column -->
        <td>
            <button type="submit" class="btn btn-warning btn-sm">Update</button>
          </form>
        </td>

        <!-- ✅ Delete button column -->
        <td>
          <a href="deleteCartItem?cartId=${item.cartId}" class="btn btn-danger btn-sm">Delete</a>
        </td>
       <!--  <form action="placeOrder" method="get" class="text-center mt-3">
    <button type="submit" class="btn btn-success">Place Order</button>
     </form> -->
        
        
      </tr>
      
    </c:forEach>
  </tbody>
</table>
   <form action="placeOrder" method="get" class="text-center mt-3">
    <button type="submit" class="btn btn-success">Place Order</button>
     </form>
</div>
<<%-- div class="user-home-container">
    <div class="user-email">
        ${loggedInUser.getEmail()}
    </div>
    <a href="logout" class="logout-btn">Logout</a>
</div> --%>


</body>
</html>
