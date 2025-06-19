package com.hexaware.QuitQ.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.hexaware.QuitQ.entity.userRepo;

import jakarta.persistence.EntityNotFoundException;
import jakarta.servlet.http.HttpSession;

import com.hexaware.QuitQ.entity.Cart;
import com.hexaware.QuitQ.entity.CartRepo;
import com.hexaware.QuitQ.entity.Category;
import com.hexaware.QuitQ.entity.CategoryRepo;
import com.hexaware.QuitQ.entity.FinalOrder;
import com.hexaware.QuitQ.entity.FinalOrderRepo;
import com.hexaware.QuitQ.entity.Order;
import com.hexaware.QuitQ.entity.OrderRepo;
import com.hexaware.QuitQ.entity.Product;
import com.hexaware.QuitQ.entity.ProductRepo;
import com.hexaware.QuitQ.entity.user;

import com.itextpdf.text.*;
import com.itextpdf.text.pdf.*;
import jakarta.servlet.http.HttpServletResponse;

@Controller
public class MyController {
	
	
	@Autowired
	private userRepo repo;
	
	@RequestMapping("/")
	public String home() {
		return "home.jsp";
	}

	@RequestMapping("/user")
	public String user() {
		return "user.jsp";
	}
	
	@RequestMapping("register")
	public String register(user user,RedirectAttributes redirectAttributes) {
		repo.save(user);
		redirectAttributes.addFlashAttribute("user",user);
		return "redirect:loginPage";
	}
	
	@RequestMapping("/loginPage")
	public String loginPage(@ModelAttribute("user") user user,@ModelAttribute("msg")String msg, Model model) {
		model.addAttribute("user",user);
		model.addAttribute("msg",msg);
		return "loginPage.jsp";
	}
	
	@RequestMapping("logincheck")
	public String register(@RequestParam String email,@RequestParam String password,RedirectAttributes attributes,HttpSession session) {
		try {
		user reg=repo.getReferenceById(email); 

		if(reg.getPassword().equals(password)) {	
			session.setAttribute("loggedInUser", reg);
		    session.setAttribute("userEmail", reg.getEmail());
		    session.setAttribute("loggedInUserEmail", reg.getEmail());
            
			if (reg.getRole().equals("Admin")) {
			    return "redirect:adminpage";
			} else if (reg.getRole().equals("Seller")) {
				session.setAttribute("sellerEmail", reg.getEmail());
			    return "redirect:sellerpage";
			} else {
			    return "redirect:usercategory"; 
			}
		}else {
			attributes.addFlashAttribute("msg","Sorry, Invalid Password");
			return "redirect:loginPage";
		}
		}catch (EntityNotFoundException e) {
			System.err.println(e);
			attributes.addFlashAttribute("msg","Sorry, Invalid Emailid Or Password");
			return "redirect:loginPage";
		}
	}
	
	
	@RequestMapping("home")
	public String userhome() {
		return "home.jsp";
	}
	
	
	
	
	@Autowired
	private CategoryRepo categoryRepo;

	@GetMapping("/adminpage")
	public String showAdminPage(Model model) {
	    List<Category> categories = categoryRepo.findAll();
	    model.addAttribute("categories", categories);
	    return "adminpage.jsp";
	}

	@PostMapping("/addCategory")
	public String addCategory(@ModelAttribute Category category, Model model) {
	    categoryRepo.save(category);
	    return "redirect:/adminpage";
	}

	@GetMapping("/deleteCategory")
	public String deleteCategory(@RequestParam int categoryId) {
	    categoryRepo.deleteById(categoryId);
	    return "redirect:/adminpage";
	}

	@GetMapping("/getCategory")
	public String getCategory(@RequestParam int categoryId, Model model) {
	    Category category = categoryRepo.findById(categoryId).orElse(new Category());
	    List<Category> categories = categoryRepo.findAll();
	    model.addAttribute("updateCategory", category);
	    model.addAttribute("categories", categories);
	    return "adminpage";
	}

	
	
	@Autowired
	private ProductRepo productRepo;


	@GetMapping("/sellerpage")
	public String sellerPage(Model model, HttpSession session) {
	    String sellerEmail = (String) session.getAttribute("sellerEmail");
	    List<Product> products = productRepo.findBySellerEmail(sellerEmail);
	    model.addAttribute("products", products);
	    model.addAttribute("categories", categoryRepo.findAll());
	    return "sellerpage.jsp";
	}

	@PostMapping("/addProduct")
	public String addProduct(@ModelAttribute Product product, HttpSession session) {
	    String sellerEmail = (String) session.getAttribute("sellerEmail");
	    product.setSellerEmail(sellerEmail); 
	    productRepo.save(product);
	    return "redirect:/sellerpage";
	}

	@GetMapping("/deleteProduct")
	public String deleteProduct(@RequestParam int productId) {
	    productRepo.deleteById(productId);
	    return "redirect:/sellerpage";
	}

	@GetMapping("/getProduct")
	public String getProduct(@RequestParam int productId, Model model, HttpSession session) {
	    String sellerEmail = (String) session.getAttribute("sellerEmail");
	    Product p = productRepo.findById(productId).orElse(new Product());
	    List<Product> products = productRepo.findBySellerEmail(sellerEmail);
	    model.addAttribute("updateProduct", p);
	    model.addAttribute("products", products);
	    model.addAttribute("categories", categoryRepo.findAll());
	    return "sellerpage.jsp";
	}

	
	
	@GetMapping("/usercategory")
	public String home(Model model) {
	    List<Category> categories = categoryRepo.findAll();
	    model.addAttribute("categories", categories);
	    return "usercategory.jsp"; 
	}
	
	@GetMapping("/products")
	public String viewProductsByCategory(@RequestParam String category, Model model) {
		
		if ("all".equalsIgnoreCase(category)) {
	        List<Product> allProducts = productRepo.findAll();
	        model.addAttribute("products", allProducts);
	        model.addAttribute("selectedCategory", "All Products");
	        return "userproduct.jsp";
	    }
	    List<Product> products = productRepo.findByCategory(category);
	    model.addAttribute("products", products);
	    model.addAttribute("selectedCategory", category);
	    return "userproduct.jsp"; 
	}
	
	
	
	@Autowired
	private CartRepo cartRepo;


	@PostMapping("/addToCart")
	public String addToCart(@RequestParam String productName,
	                        @RequestParam String brand,
	                        @RequestParam double price,
	                        @RequestParam int quantity,
	                        HttpSession session) {

	    String customerEmail = (String) session.getAttribute("loggedInUserEmail");
	    List<Cart> existingCarts = cartRepo.findByCustomerEmailAndProductName(customerEmail, productName);

	    if (!existingCarts.isEmpty()) {
	        Cart existingCart = existingCarts.get(0);  
	        existingCart.setQuantity(existingCart.getQuantity() + quantity);
	        cartRepo.save(existingCart);
	    } else {
	        Cart cart = new Cart(customerEmail, productName, brand, price, quantity);
	        cartRepo.save(cart);
	    }


	    return "redirect:/cart";
	}
	
	

	@GetMapping("/cart")
	public String viewCart(Model model, HttpSession session) {
	    String customerEmail = (String) session.getAttribute("loggedInUserEmail");
	    List<Cart> cartItems = cartRepo.findByCustomerEmail(customerEmail);
	    model.addAttribute("cartItems", cartItems);
	    return "cart.jsp";
	}

	@GetMapping("/deleteCartItem")
	public String deleteCartItem(@RequestParam int cartId) {
	    cartRepo.deleteById(cartId);
	    return "redirect:/cart";
	}

	@PostMapping("/updateCart")
	public String updateCart(@RequestParam int cartId,
	                         @RequestParam int quantity) {
	    Cart cart = cartRepo.findById(cartId).orElse(null);
	    if (cart != null) {
	        cart.setQuantity(quantity);
	        cartRepo.save(cart);
	    }
	    return "redirect:/cart";
	}
	
	


	@GetMapping("/placeOrder")
	public String placeOrder(HttpSession session) {
	    String email = (String) session.getAttribute("loggedInUserEmail");
	    List<Cart> cartItems = cartRepo.findByCustomerEmail(email);

	    for (Cart cart : cartItems) {
	        double totalAmount = cart.getPrice() * cart.getQuantity();

	        Order order = new Order(
	            cart.getCustomerEmail(),
	            cart.getProductName(),
	            cart.getBrand(),
	            cart.getPrice(),
	            cart.getQuantity(),
	            totalAmount,
	            "NOT PAID" 
	        );
	        orderRepo.save(order);
	    }

	    cartRepo.deleteAll(cartItems);

	    return "redirect:/orderconfirmation";
	}

	

	@GetMapping("/downloadReceipt")
	public void downloadReceipt(HttpSession session, HttpServletResponse response) throws Exception {
	    String customerEmail = (String) session.getAttribute("loggedInUserEmail");
	    user loggedInUser = repo.findById(customerEmail).orElse(null);

	    List<Order> orders = orderRepo.findByCustomerEmail(customerEmail);

	    response.setContentType("application/pdf");
	    response.setHeader("Content-Disposition", "attachment; filename=payment_success.pdf");

	    Document document = new Document();
	    PdfWriter.getInstance(document, response.getOutputStream());
	    document.open();

	    Font boldFont = new Font(Font.FontFamily.HELVETICA, 16, Font.BOLD);
	    document.add(new Paragraph("Payment Receipt - QuitQ", boldFont));
	    document.add(new Paragraph(" "));

	    document.add(new Paragraph("Customer Email: " + loggedInUser.getEmail()));
	    document.add(new Paragraph("Delivery Address: " + loggedInUser.getAddress()));
	    document.add(new Paragraph(" "));

	    PdfPTable table = new PdfPTable(5);
	    table.setWidthPercentage(100);
	    table.setWidths(new float[]{2, 2, 2, 1, 2});
	    table.addCell("Product");
	    table.addCell("Brand");
	    table.addCell("Price");
	    table.addCell("Qty");
	    table.addCell("Total");

	    double grandTotal = 0;
	    for (Order item : orders) {
	        double total = item.getTotalAmount();
	        grandTotal += total;

	        table.addCell(item.getProductName());
	        table.addCell(item.getBrand());
	        table.addCell("₹" + item.getPrice());
	        table.addCell(String.valueOf(item.getQuantity()));
	        table.addCell("₹" + total);
	    }

	    document.add(table);
	    document.add(new Paragraph(" "));
	    document.add(new Paragraph("Grand Total: ₹" + grandTotal));
	    document.add(new Paragraph("Payment Status: SUCCESS ✅", new Font(Font.FontFamily.HELVETICA, 12, Font.BOLD, BaseColor.GREEN)));

	    document.close();
	}

	
	@GetMapping("/simulatePayment")
	public String simulatePaymentPage() {
	    return "simulatePayment.jsp";
	}


	
	@Autowired
	private OrderRepo orderRepo;

//	@PostMapping("/confirmPayment")
//	public String confirmPayment(HttpSession session) {
//	    String email = (String) session.getAttribute("loggedInUserEmail");
//
//	    List<Order> unpaidOrders = orderRepo.findByCustomerEmailAndPaymentStatus(email, "NOT PAID");
//
//	    for (Order order : unpaidOrders) {
//	        order.setPaymentStatus("PAID");
//	        orderRepo.save(order);
//	    }
//	    session.setAttribute("paymentDone", true);
//	    return "redirect:/orderconfirmation";
//	}
	
	@Autowired
	private FinalOrderRepo finalOrderRepo;

	@PostMapping("/confirmPayment")
	public String confirmPayment(HttpSession session) {
	    String email = (String) session.getAttribute("loggedInUserEmail");

	    List<Order> unpaidOrders = orderRepo.findByCustomerEmailAndPaymentStatus(email, "NOT PAID");

	    for (Order order : unpaidOrders) {
	        order.setPaymentStatus("PAID");
	        orderRepo.save(order);

	        FinalOrder finalOrder = new FinalOrder(
	            order.getCustomerEmail(),
	            order.getProductName(),
	            order.getBrand(),
	            order.getPrice(),
	            order.getQuantity(),
	            order.getTotalAmount(),
	            "PAID"
	        );

	        finalOrderRepo.save(finalOrder);
	    }

	    session.setAttribute("paymentDone", true);
	    return "redirect:/orderconfirmation";
	}



	@GetMapping("/orderconfirmation")
	public String showOrderConfirmation(HttpSession session, Model model) {
	    String email = (String) session.getAttribute("loggedInUserEmail");

	    List<Order> orderItems = orderRepo.findByCustomerEmail(email);
	    user loggedInUser = repo.findById(email).orElse(null);

	    model.addAttribute("orders", orderItems);
	    model.addAttribute("user", loggedInUser);
	    return "orderconfirmation.jsp";
	}
 
	@GetMapping("/finishPayment")
	public String finishPayment(HttpSession session) {
	    String email = (String) session.getAttribute("loggedInUserEmail");

	    List<Order> paidOrders = orderRepo.findByCustomerEmailAndPaymentStatus(email, "PAID");
	    orderRepo.deleteAll(paidOrders);
	    session.removeAttribute("paymentDone");


	    return "redirect:/cart";
	}


	@GetMapping("/myorders")
	public String viewPastOrders(HttpSession session, Model model) {
	    String email = (String) session.getAttribute("loggedInUserEmail");
	    List<FinalOrder> pastOrders = finalOrderRepo.findByCustomerEmail(email);
	    model.addAttribute("pastOrders", pastOrders);
	    return "pastorders.jsp";
	}

	
	@GetMapping("/manageUsers")
	public String manageUsers(Model model) {
	    List<user> users = repo.findAll();
	    model.addAttribute("users", users);
	    return "manage_users.jsp"; 
	}

	@GetMapping("/deleteUser")
	public String deleteUser(@RequestParam("emailid") String emailid, RedirectAttributes attributes) {
	    try {
	        repo.deleteById(emailid);
	        attributes.addFlashAttribute("msg", "User deleted successfully.");
	    } catch (Exception e) {
	        attributes.addFlashAttribute("msg", "Error deleting user.");
	    }
	    return "redirect:/manageUsers";
	}

	
	@RequestMapping("logout")
	public String logout(HttpSession session,RedirectAttributes attributes) {
	   
		session.invalidate();
		attributes.addFlashAttribute("msg","You Have Been Logged Out Successfully");
		return "redirect:loginPage";
	}
}

