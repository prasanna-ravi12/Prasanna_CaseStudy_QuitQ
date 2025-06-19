<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
    <jsp:include page="bootstrap_links.jsp"></jsp:include>
    <title>Order Confirmation</title>
     <style>
        body {
            margin: 0;
            padding: 0;
            font-family: 'Segoe UI', sans-serif;
            background: linear-gradient(120deg, #d0e7ff, #b3ecff, #a3cfff);
            background-size: 300% 300%;
            animation: animatedBG 20s ease infinite;
            position: relative;
        }

        @keyframes animatedBG {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }

        body::before,
        body::after {
            content: '';
            position: absolute;
            border-radius: 50%;
            background-color: rgba(173, 216, 230, 0.3);
            z-index: 0;
            animation: floatBubble 30s linear infinite;
        }

        body::before {
            width: 250px;
            height: 250px;
            top: 10%;
            left: -100px;
        }

        body::after {
            width: 300px;
            height: 300px;
            bottom: 5%;
            right: -120px;
        }

        @keyframes floatBubble {
            0% { transform: translateY(0); }
            50% { transform: translateY(-30px); }
            100% { transform: translateY(0); }
        }

        .container {
            background-color: rgba(255, 255, 255, 0.9);
            border-radius: 15px;
            padding: 30px;
            margin-top: 50px;
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
            position: relative;
            z-index: 2;
        }

        h2 {
            color: #1565c0;
            font-weight: 600;
        }

        h5, p {
            color: #333;
        }

        .alert-info {
            background-color: #e3f2fd;
            color: #0d47a1;
            border-left: 5px solid #42a5f5;
        }

        table {
            background-color: #f0f8ff;
            border-radius: 10px;
            overflow: hidden;
        }

        thead {
            background-color: #90caf9;
            color: #0d47a1;
        }

        th, td {
            text-align: center;
            vertical-align: middle;
        }

        .btn-warning {
            background-color: #29b6f6;
            border: none;
            color: white;
        }

        .btn-warning:hover {
            background-color: #0288d1;
        }

        .btn-success {
            background-color: #1e88e5;
            border: none;
            color: white;
        }

        .btn-success:hover {
            background-color: #1565c0;
        }
    </style>
</head>
<body>
    <jsp:include page="order_nav.jsp"></jsp:include>

    <div class="container mt-5">
        <h2 class="text-center mb-4">Order Confirmation</h2>

        <h5>Customer Email: <strong>${user.email}</strong></h5>
        <h5>Delivery Address:</h5>
        <p>${user.address}</p>

        <div class="alert alert-info mt-3">
            <strong>Your order will be delivered to this address within 5 days.</strong>
        </div>

        <h4 class="mt-4">Ordered Products:</h4>
        <%-- <table class="table table-bordered">
            <thead>
                <tr>
                    <th>Product</th>
                    <th>Brand</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                </tr>
            </thead>
            <tbody>
                <c:forEach var="item" items="${cartItems}">
                    <tr>
                        <td>${item.productName}</td>
                        <td>${item.brand}</td>
                        <td>₹${item.price}</td>
                        <td>${item.quantity}</td>
                        <td>₹${item.price * item.quantity}</td>
                    </tr>
                </c:forEach>
            </tbody>
        </table> --%>
        <table class="table table-bordered">
    <thead>
        <tr>
            <th>Product</th>
            <th>Brand</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
        </tr>
    </thead>
    <tbody>
        <c:forEach var="order" items="${orders}">
            <tr>
                <td>${order.productName}</td>
                <td>${order.brand}</td>
                <td>₹${order.price}</td>
                <td>${order.quantity}</td>
                <td>₹${order.totalAmount}</td>
            </tr>
        </c:forEach>
    </tbody>
</table>
    <!--     <form action="downloadReceipt" method="get">
    <button class="btn btn-primary mt-3" type="submit">Pay & Download Receipt (PDF)</button>
</form> -->

<%-- <c:if test="${not sessionScope.paymentDone}">
    <form action="simulatePayment" method="get">
        <button class="btn btn-warning">Pay Now</button>
    </form>
</c:if>

<c:if test="${sessionScope.paymentDone}">
    <form action="downloadReceipt" method="get">
        <button class="btn btn-success">Download Receipt (PDF)</button>
    </form>
</c:if> --%>
<c:if test="${not paymentDone}">
    <form action="simulatePayment" method="get">
        <button type="submit" class="btn btn-success">Pay Now</button>
    </form>
</c:if>

<c:if test="${paymentDone}">
    <a href="downloadReceipt" class="btn btn-primary">Download Receipt (PDF)</a>
    <a href="finishPayment" class="btn btn-warning">Finish Payment</a>
</c:if>


        
    </div>
</body>
</html>
