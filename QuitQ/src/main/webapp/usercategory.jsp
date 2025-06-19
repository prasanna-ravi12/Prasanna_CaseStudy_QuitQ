<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
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
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        background: linear-gradient(135deg, #ffdde1, #ee9ca7, #ff758c);
        background-size: 400% 400%;
        animation: animatedBackground 20s ease infinite;
        color: #333;
    }

    @keyframes animatedBackground {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
    }

    .user-home-container {
        max-width: 600px;
        margin: 60px auto 40px auto;
        padding: 30px;
        background: rgba(255, 255, 255, 0.75);
        border-radius: 20px;
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
        backdrop-filter: blur(8px);
        text-align: center;
        transition: transform 0.3s ease;
    }

    .user-home-container:hover {
        transform: scale(1.02);
    }

    h3 {
        color: #d63384;
        font-weight: bold;
    }

    .user-email {
        font-size: 1.2rem;
        color: #6c757d;
        margin-bottom: 20px;
    }

    .logout-btn {
        display: inline-block;
        padding: 10px 25px;
        font-size: 1rem;
        border: none;
        border-radius: 25px;
        background-color: #ff6b81;
        color: white;
        text-decoration: none;
        transition: background-color 0.3s ease;
    }

    .logout-btn:hover {
        background-color: #e5506d;
        text-decoration: none;
    }

    .container h2 {
        color: #d63384;
        font-weight: 600;
        text-align: center;
    }

    .table {
        border-radius: 10px;
        overflow: hidden;
        background-color: white;
        box-shadow: 0 5px 20px rgba(0,0,0,0.1);
        transition: box-shadow 0.3s ease-in-out;
    }

    .table:hover {
        box-shadow: 0 8px 25px rgba(0,0,0,0.15);
    }

    .table th {
        background-color: #ffb6c1;
        color: white;
        font-weight: bold;
        text-align: center;
    }

    .table td {
        text-align: center;
        vertical-align: middle;
        font-size: 1.05rem;
    }

    .table a {
        color: #e83e8c;
    }

    .table a:hover {
        color: #bd165c;
        text-decoration: underline;
    }
</style>

  <title>QuitQ Home</title>
  <jsp:include page="bootstrap_links.jsp"></jsp:include>
  
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css">
</head>
<body>
	<jsp:include page="user_navbar.jsp"></jsp:include>
<div class="user-home-container">
    <h3>Welcome, Customer!</h3>
    <%-- <div class="user-email">
        ${loggedInUser.getEmail()}
    </div>
    <a href="logout" class="logout-btn">Logout</a>
</div> --%>
<div class="container mt-5">
  <h2 class="mb-4">Shop by Category</h2>
  <table class="table table-bordered">
    <thead>
      <tr><th>Category Name</th></tr>
    </thead>
    <tbody>
      <c:forEach var="cat" items="${categories}">
        <tr>
          <td>
            <a href="products?category=${cat.categoryName}" class="text-decoration-none fw-bold text-primary">
              ${cat.categoryName}
            </a>
          </td>
        </tr>
      </c:forEach>
    </tbody>
  </table>
</div>
</body>
</html>
