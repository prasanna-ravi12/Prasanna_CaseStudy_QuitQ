<%-- <%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html lang="en">
<head>
  <jsp:include page="bootstrap_links.jsp"></jsp:include>
  <style>
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
</style>
  
  <title>Admin Page - Categories</title>
  <meta charset="utf-8">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
	<jsp:include page="admin_navbar.jsp"></jsp:include>

<div class="container-fluid mt-4">
  <div class="row">
    
    <!-- Category Form -->
    <div class="col-sm-4">
      <h3>Add / Update Category</h3>
      <form action="addCategory" method="post">
        <div class="mb-3">
          <input type="number" class="form-control" name="categoryId" placeholder="Category ID" value="${updateCategory.categoryId}" required>
        </div>
        <div class="mb-3">
          <input type="text" class="form-control" name="categoryName" placeholder="Category Name" value="${updateCategory.categoryName}" required>
        </div>
        <div class="mb-3">
          <button type="submit" class="btn btn-primary">Save</button>
          <button type="reset" class="btn btn-secondary">Reset</button>
        </div>
      </form>
    </div>

    <!-- Category Table -->
    <div class="col-sm-8">
      <h3>Category List</h3>
      <table class="table table-bordered">
        <thead>
          <tr>
            <th>Category ID</th>
            <th>Category Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <c:forEach var="category" items="${categories}">
            <tr>
              <td>${category.categoryId}</td>
              <td>${category.categoryName}</td>
              <td>
                <a href="deleteCategory?categoryId=${category.categoryId}" class="btn btn-danger btn-sm">Delete</a>
                <a href="getCategory?categoryId=${category.categoryId}" class="btn btn-info btn-sm">Update</a>
              </td>
            </tr>
          </c:forEach>
        </tbody>
      </table>
    </div>

  </div>
</div>
User Home<br>${loggedInUser.getEmail()}
<div>
	<a href="logout" >Logout</a>
</div>

<div class="user-home-container">
    <h3>Welcome, Admin!</h3>
    <div class="user-email">
        ${loggedInUser.getEmail()}
    </div>
    <a href="logout" class="logout-btn">Logout</a>
</div>

</body>
</html>
 --%>
 
 <%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html lang="en">
<head>
  <jsp:include page="bootstrap_links.jsp"></jsp:include>

 <!--  <style>
    body {
      margin: 0;
      padding: 0;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background: linear-gradient(-45deg, #74ebd5, #ACB6E5, #f6d365, #fda085);
      background-size: 400% 400%;
      animation: gradientBG 15s ease infinite;
      min-height: 100vh;
    }

    @keyframes gradientBG {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }

    .container-fluid {
      padding: 40px 20px;
    }

    h3 {
      color: #2c3e50;
      margin-bottom: 20px;
    }

    .form-section, .table-section {
      background-color: rgba(255, 255, 255, 0.95);
      padding: 25px;
      border-radius: 15px;
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
      transition: transform 0.3s ease-in-out;
    }

    .form-section:hover,
    .table-section:hover {
      transform: translateY(-5px);
    }

    .btn-primary {
      background-color: #6c5ce7;
      border: none;
      transition: background-color 0.3s;
    }

    .btn-primary:hover {
      background-color: #4834d4;
    }

    .btn-secondary {
      background-color: #636e72;
      border: none;
    }

    .btn-danger:hover {
      background-color: #e74c3c;
    }

    .btn-info:hover {
      background-color: #3498db;
    }

    table {
      background-color: #fff;
    }

    th {
      background-color: #2d3436;
      color: white;
    }

    td, th {
      text-align: center;
      vertical-align: middle !important;
    }

    .table th, .table td {
      padding: 12px;
    }
  </style>
 -->
 <style>
    body {
      margin: 0;
      padding: 0;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background: linear-gradient(-45deg, #74ebd5, #ACB6E5, #d4a5f9, #fbc2eb);
      background-size: 400% 400%;
      animation: gradientBG 15s ease infinite;
      min-height: 100vh;
    }

    @keyframes gradientBG {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }

    .container-fluid {
      padding: 40px 20px;
    }

    h3 {
      color: #2c3e50;
      margin-bottom: 20px;
    }

    .form-section, .table-section {
      background-color: rgba(255, 255, 255, 0.95);
      padding: 25px;
      border-radius: 15px;
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
      transition: transform 0.3s ease-in-out;
    }

    .form-section:hover,
    .table-section:hover {
      transform: translateY(-5px);
    }

    .btn-primary {
      background-color: #6c5ce7;
      border: none;
      transition: background-color 0.3s;
    }

    .btn-primary:hover {
      background-color: #4834d4;
    }

    .btn-secondary {
      background-color: #636e72;
      border: none;
    }

    .btn-danger:hover {
      background-color: #e74c3c;
    }

    .btn-info:hover {
      background-color: #3498db;
    }

    table {
      background-color: #fff;
    }

    th {
      background-color: #2d3436;
      color: white;
    }

    td, th {
      text-align: center;
      vertical-align: middle !important;
    }

    .table th, .table td {
      padding: 12px;
    }
  </style>
  <title>Admin Page - Categories</title>
  <meta charset="utf-8">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
	<jsp:include page="admin_navbar.jsp"></jsp:include>

<div class="container-fluid">
  <div class="row g-4">

    <!-- Category Form -->
    <div class="col-sm-4">
      <div class="form-section">
        <h3>Add / Update Category</h3>
        <form action="addCategory" method="post">
          <div class="mb-3">
            <input type="number" class="form-control" name="categoryId" placeholder="Category ID" value="${updateCategory.categoryId}" required>
          </div>
          <div class="mb-3">
            <input type="text" class="form-control" name="categoryName" placeholder="Category Name" value="${updateCategory.categoryName}" required>
          </div>
          <div class="mb-3">
            <button type="submit" class="btn btn-primary">Save</button>
            <button type="reset" class="btn btn-secondary">Reset</button>
          </div>
        </form>
      </div>
    </div>

    <!-- Category Table -->
    <div class="col-sm-8">
      <div class="table-section">
        <h3>Category List</h3>
        <div class="table-responsive">
          <table class="table table-bordered table-hover table-striped">
            <thead>
              <tr>
                <th>Category ID</th>
                <th>Category Name</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <c:forEach var="category" items="${categories}">
                <tr>
                  <td>${category.categoryId}</td>
                  <td>${category.categoryName}</td>
                  <td>
                    <a href="deleteCategory?categoryId=${category.categoryId}" class="btn btn-danger btn-sm">Delete</a>
                    <a href="getCategory?categoryId=${category.categoryId}" class="btn btn-info btn-sm">Update</a>
                  </td>
                </tr>
              </c:forEach>
            </tbody>
          </table>
        </div>
      </div>
    </div>

  </div>
</div>

</body>
</html>
 