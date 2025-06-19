<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page language="java" contentType="text/html; charset=UTF-8"%>
<html>
<head>
    <title>My Past Orders</title>
    <link rel="stylesheet" href="css/bootstrap.min.css">
      <jsp:include page="bootstrap_links.jsp"></jsp:include>
    
</head>
<body>
    <jsp:include page="cart_navbar.jsp" />
    <div class="container mt-5">
        <h2 class="mb-4 text-center">🛒 My Past Orders</h2>
        <table class="table table-bordered table-striped text-center">
            <thead class="table-dark">
                <tr>
                    <th>Product</th>
                    <th>Brand</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                    <th>Payment</th>
                </tr>
            </thead>
            <tbody>
                <c:forEach var="o" items="${pastOrders}">
                    <tr>
                        <td>${o.productName}</td>
                        <td>${o.brand}</td>
                        <td>₹${o.price}</td>
                        <td>${o.quantity}</td>
                        <td>₹${o.totalAmount}</td>
                        <td><span class="badge bg-success">${o.paymentStatus}</span></td>
                    </tr>
                </c:forEach>
            </tbody>
        </table>
    </div>
</body>
</html>
