<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html>
<html>
<head>
    <jsp:include page="bootstrap_links.jsp" />
    <meta charset="UTF-8">
    <title>Manage Users - QuitQ Admin</title>

    <style>
        body {
            background: linear-gradient(135deg, #fce4ec, #f3e5f5, #e1f5fe);
            background-size: 400% 400%;
            animation: gradient 15s ease infinite;
            font-family: 'Segoe UI', sans-serif;
            margin: 0;
            padding: 0;
        }

        @keyframes gradient {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }

        .container {
            margin-top: 50px;
            background-color: rgba(255, 255, 255, 0.95);
            padding: 30px;
            border-radius: 12px;
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
        }

        .table {
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

        .table th {
            background-color: #6a1b9a;
            color: #fff;
            font-weight: 600;
        }

        .table td, .table th {
            text-align: center;
            vertical-align: middle;
        }

        .table tbody tr:hover {
            background-color: #f3e5f5;
            transition: background-color 0.3s ease;
        }

        .btn-danger {
            border-radius: 20px;
            padding: 5px 12px;
            font-size: 14px;
            transition: 0.3s ease;
        }

        .btn-danger:hover {
            background-color: #c62828;
            transform: scale(1.05);
        }

        h2 {
            font-weight: bold;
            color: #6a1b9a;
        }

        .alert {
            margin-bottom: 20px;
        }
    </style>
</head>
<body>

<jsp:include page="admin_navbar.jsp" />

<div class="container">
    <h2 class="text-center mb-4">All Registered Users</h2>

    <c:if test="${not empty msg}">
        <div class="alert alert-info text-center">${msg}</div>
    </c:if>

    <div class="table-responsive">
        <table class="table table-bordered table-hover table-striped">
            <thead>
                <tr>
                    <th>Email ID</th>
                    <th>Name</th>
                    <th>Gender</th>
                    <th>Role</th>
                    <th>Phone</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                <c:forEach var="user" items="${users}">
                    <tr>
                        <td>${user.email}</td>
                        <td>${user.name}</td>
                        <td>${user.gender}</td>
                        <td>${user.role}</td>
                        <td>${user.phone}</td>
                        <td>
                            <a href="deleteUser?emailid=${user.email}" 
                               class="btn btn-danger btn-sm"
                               onclick="return confirm('Are you sure you want to delete this user?');">
                               Delete
                            </a>
                        </td>
                    </tr>
                </c:forEach>
            </tbody>
        </table>
    </div>
</div>

</body>
</html>
