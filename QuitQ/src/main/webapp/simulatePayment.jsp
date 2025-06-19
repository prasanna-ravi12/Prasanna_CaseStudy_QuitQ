<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <jsp:include page="bootstrap_links.jsp"></jsp:include>
    <style>
        .payment-box {
            margin: 100px auto;
            width: 400px;
            text-align: center;
            background: rgba(255,255,255,0.9);
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 0 10px gray;
        }
        img.qr {
            width: 250px;
            height: auto;
        }
    </style>
</head>
<body>
    <div class="payment-box">
        <h3>Scan to Pay</h3>
        <p>Please scan the QR code using any UPI app to proceed.</p>
        <img src="images/qrrr.jpg" alt="QR Code" class="qr"><br><br>
        <form action="confirmPayment" method="post">
            <button class="btn btn-success">I Have Paid</button>
        </form>
    </div>
</body>
</html>
