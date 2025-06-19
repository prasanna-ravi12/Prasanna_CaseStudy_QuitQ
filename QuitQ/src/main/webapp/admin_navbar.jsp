<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<%-- <nav class="navbar navbar-expand-lg navbar-dark bg-dark px-4">
  <a class="navbar-brand" href="adminpage">Admin Dashboard</a>

  <div class="ml-auto d-flex align-items-center text-white">
  <ul class="navbar-nav mr-3">
      <li class="nav-item mx-2">
        <a class="btn btn-outline-light btn-sm" href="manageUsers">Manage Users</a>
      </li>
    </ul>
    <span class="mr-3">
      <strong>Welcome,</strong> ${loggedInUser.getEmail()}
    </span>
    <a href="logout" class="btn btn-outline-light btn-sm">Logout</a>
  </div>
</nav> --%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<nav class="navbar navbar-expand-lg navbar-dark bg-dark px-4">
  <!-- Brand and Manage Users on the left -->
  <div class="d-flex align-items-center">
    <a class="navbar-brand" href="adminpage">Admin Dashboard</a>

    <!-- Manage Users Button -->
    <a class="btn btn-outline-light btn-sm ml-3" href="manageUsers">Manage Users</a>
  </div>

  <!-- Right side of navbar -->
  <div class="ml-auto d-flex align-items-center text-white">
    <span class="mr-3">
      <strong>Welcome,</strong> ${loggedInUser.getEmail()}
    </span>
    <a href="logout" class="btn btn-outline-light btn-sm">Logout</a>
  </div>
</nav>

<style>
.navbar {
    background: linear-gradient(90deg, #1e3c72, #2a5298); /* Elegant blue gradient */
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
    border-bottom: 2px solid #ffffff33;
}

.navbar-brand {
    font-weight: bold;
    font-size: 22px;
    color: #ffffff !important;
    letter-spacing: 1px;
}

.navbar .ml-auto {
    margin-left: auto !important;
}

.navbar .mr-3 {
    margin-right: 15px;
    font-size: 14px;
    color: #f1f1f1;
    white-space: nowrap;
}

.navbar a.btn {
    border-radius: 20px;
    padding: 5px 15px;
    font-size: 13px;
    transition: all 0.3s ease;
}

.navbar a.btn:hover {
    background-color: #ffffff !important;
    color: #2a5298 !important;
    border-color: #ffffff !important;
}
</style>
