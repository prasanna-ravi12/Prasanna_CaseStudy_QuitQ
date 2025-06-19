<%-- <!-- <nav class="navbar navbar-expand-lg bg-dark navbar-dark px-3">
 -->  
 <nav class="navbar navbar-expand-lg navbar-light px-3" style="background-color: #c2185b;">
 
 <div class="container-fluid">
    
    <!-- Logo -->
    <a class="navbar-brand d-flex align-items-center" href="home">
      <img src="images/logo.jpg" alt="QuitQ Logo" style="width:40px;" class="rounded-pill me-2">
      <div>
        <span class="fw-bold" >QuitQ</span><br>
        
        <small class="text-warning">Explore... <span class="fw-bold"></span></small>
      </div>
    </a>

  
 
 </form>

    <!-- Right Menu -->
    <ul class="navbar-nav d-flex flex-row align-items-center gap-3">
      <!-- <li class="nav-item">
        <a class="nav-link text-white" href="login.jsp">
          <i class="fas fa-user"></i> Login
        </a>
      </li> -->
      <!-- <li class="nav-item dropdown">
  <a class="btn btn-outline-light dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
    <i class="fas fa-user"></i> Login
  </a>
  <ul class="dropdown-menu dropdown-menu-end p-3" style="min-width: 250px;">
    <li class="mb-2"><strong>New User?</strong> <a href="user" class="text-primary">Sign Up</a></li>
    <li><hr class="dropdown-divider"></li>
    <li><a class="dropdown-item" href="loginPage">Login</a></li>
  </ul>
</li> -->
      
      
       

  
    </ul>
    
    <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
      <ul class="navbar-nav">
      <li class="nav-item mx-2">
        <a class="btn btn-outline-light" href="myorders">
          <!-- <i class="fas fa-shopping-cart"></i> --> My Orders
        </a>
      </li>
        <li class="nav-item mx-2">
          <a class="btn btn-outline-light" href="usercategory">Back to Categories</a>
        </li>
        <li class="nav-item mx-2">
          <a class="btn btn-outline-light" href="products?category=all">Back to Products</a>
        </li>
       
      </ul>
    </div>
      <div class="ml-auto d-flex align-items-center text-white">
    <span class="mr-3">
      <strong></strong> ${loggedInUser.getEmail()}
    </span>
    <a href="logout" class="btn btn-outline-light btn-sm">Logout</a>
  </div>
  </div>
</nav>

 --%>
 
 <nav class="navbar navbar-expand-lg navbar-light px-3" style="background-color: #c2185b;">
  <div class="container-fluid">
    
    <!-- Logo -->
    <a class="navbar-brand d-flex align-items-center text-white" href="home">
      <img src="images/logo.jpg" alt="QuitQ Logo" style="width:40px;" class="rounded-pill me-2">
      <div>
        <span class="fw-bold">QuitQ</span><br>
        <small class="text-warning">Explore...</small>
      </div>
    </a>

    <!-- Toggler for mobile view -->
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
      <span class="navbar-toggler-icon"></span>
    </button>

    <!-- Menu Items -->
    <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
      <ul class="navbar-nav align-items-center gap-3">
        <li class="nav-item">
          <a class="btn btn-outline-light" href="myorders">My Orders</a>
        </li>
        <li class="nav-item">
          <a class="btn btn-outline-light" href="usercategory">Back to Categories</a>
        </li>
        <li class="nav-item">
          <a class="btn btn-outline-light" href="products?category=all">Back to Products</a>
        </li>
        <li class="nav-item text-white">
          <strong>${loggedInUser.getEmail()}</strong>
        </li>
        
      </ul>
    </div>

  </div>
</nav>
 