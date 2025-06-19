<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
<head>
<jsp:include page="bootstrap_links.jsp"></jsp:include>
<style>
	body {
		background: url('images/signinbg.jpg') no-repeat center center fixed;
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
<title>QuitQ</title>
</head>
<body>
	<jsp:include page="navbar.jsp"></jsp:include>

<!-- 	<div class="main-container">
 -->		
 <div class="container-fluid main-container">
	<div class="row w-100">
		<div class="col-md-6 d-none d-md-block">
		</div>

		<div class="col-md-6 d-flex justify-content-center align-items-center"><div class="form-box">
			<h3>SignUp</h3>
			<form action="register" method="post">
				<div class="mb-3">
					<input type="text" class="form-control" name="name" placeholder="FullName" required>
				</div>
				<div class="mb-3">
					<input type="email" class="form-control" name="email" placeholder="Email" required>
				</div>
				<div class="mb-3">
					<input type="password" class="form-control" name="password" placeholder="Password" required>
				</div>
				<div class="mb-3">
					<input type="radio" name="gender" value="male" required> Male
					<input type="radio" name="gender" value="female"> Female
				</div>
				<div class="mb-3">
					<input type="tel" class="form-control" name="phone" placeholder="Phone" required>
				</div>
				<div class="mb-3">
					<textarea class="form-control" name="address" placeholder="Address" required></textarea>
				</div>
				<div class="mb-3">
<!-- 					<input type="radio" name="role" value="Admin" required> Admin
 -->					<input type="radio" name="role" value="Seller"> Seller
					<input type="radio" name="role" value="Customer"> Customer
				</div>
				<div class="mb-3 text-center">
					<button type="submit" class="btn btn-primary">SignUp</button>
					<button type="reset" class="btn btn-danger">Reset</button>
				</div>
			</form>
		</div>
	</div>
	</div>

</body>
</html>
