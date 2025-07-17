package com.hexaware.QuitQ.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Cart {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int cartId;
    
    private String customerEmail;
    private int productId;
    private String productName;
    private String brand;
    private double price;
    private int quantity;
    private String imageUrl;
    private String discount;
	private String sellerEmail;

    
    
    
	public Cart() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	
    



    
//
//	public Cart(int cartId, String customerEmail, int productId, String productName, String brand, double price,
//			int quantity, String imageUrl, String discount) {
//		super();
//		this.cartId = cartId;
//		this.customerEmail = customerEmail;
//		this.productId = productId;
//		this.productName = productName;
//		this.brand = brand;
//		this.price = price;
//		this.quantity = quantity;
//		this.imageUrl = imageUrl;
//		this.discount = discount;
//	}
	public Cart(int cartId, String customerEmail, int productId, String productName, String brand, double price,
            int quantity, String imageUrl, String discount, String sellerEmail) {
    this.cartId = cartId;
    this.customerEmail = customerEmail;
    this.productId = productId;
    this.productName = productName;
    this.brand = brand;
    this.price = price;
    this.quantity = quantity;
    this.imageUrl = imageUrl;
    this.discount = discount;
    this.sellerEmail = sellerEmail;
}









	public int getCartId() {
		return cartId;
	}


	public void setCartId(int cartId) {
		this.cartId = cartId;
	}


	public String getCustomerEmail() {
		return customerEmail;
	}
	public void setCustomerEmail(String customerEmail) {
		this.customerEmail = customerEmail;
	}
	
	public int getProductId() {
	    return productId;
	}

	public void setProductId(int productId) {
	    this.productId = productId;
	}

	public String getProductName() {
		return productName;
	}
	public void setProductName(String productName) {
		this.productName = productName;
	}
	public String getBrand() {
		return brand;
	}
	public void setBrand(String brand) {
		this.brand = brand;
	}
	public double getPrice() {
		return price;
	}
	public void setPrice(double price) {
		this.price = price;
	}
	public int getQuantity() {
		return quantity;
	}
	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}

	public String getImageUrl() {
	    return imageUrl;
	}

	public void setImageUrl(String imageUrl) {
	    this.imageUrl = imageUrl;
	}
    

	public String getDiscount() {
	    return discount;
	}

	public void setDiscount(String discount) {
	    this.discount = discount;
	}

	public String getSellerEmail() {
	    return sellerEmail;
	}

	public void setSellerEmail(String sellerEmail) {
	    this.sellerEmail = sellerEmail;
	}

    
    
}