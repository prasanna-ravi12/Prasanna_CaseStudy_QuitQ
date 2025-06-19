<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
<head>
<jsp:include page="bootstrap_links.jsp"></jsp:include>
<style>
	body {
		background: url('images/loginbp.jpg') no-repeat center center fixed;
		background-size: cover;
		min-height: 100vh;
		margin: 0;
		display: flex;
		flex-direction: column;
	}

	.main-container {
		flex: 1;
		display: flex;
		justify-content: center;
		align-items: center;
		padding-top: 60px; /* Space between navbar and form */
	}

	.form-box {
		background-color: rgba(255, 255, 255, 0.5); /* Semi-transparent */
		padding: 30px;
		border-radius: 15px;
		box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
		width: 100%;
		max-width: 500px;
	}

	h3 {
		text-align: center;
		margin-bottom: 25px;
	}
</style>
</head>
<body>
	<jsp:include page="navbar.jsp"></jsp:include>

<!-- 	<div class="main-container">
 -->		
 <div class="container-fluid main-container">
  <div class="row w-100">
    
    <!-- Left side (form section) -->
    <div class="col-md-6 d-flex justify-content-center align-items-center"><div class="form-box">
			<h3>Login</h3>
			<form action="logincheck" method="post">
				<div class="mb-3">
					<input type="email" value="${user.getEmail()}" class="form-control" name="email" placeholder="Email" required>
				</div>
				<div class="mb-3">
					<input type="password" value="${user.getPassword()}" class="form-control" name="password" placeholder="Password" required>
				</div>
				<div class="mb-3 text-center">
					<button type="submit" class="btn btn-primary">SignIn</button>
					<button type="reset" class="btn btn-danger">Reset</button>
				</div>
				<div class="text-center text-danger">
					${msg}
				</div>
			</form>
		</div>
	</div>
	<div class="col-md-6 d-none d-md-block">
      <!-- Image or empty -->
    </div>
	</div>
	</div>
</body>
</html>
