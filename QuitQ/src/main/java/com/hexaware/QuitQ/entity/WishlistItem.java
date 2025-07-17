package com.hexaware.QuitQ.entity;

import jakarta.persistence.*;

@Entity
public class WishlistItem {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String customerEmail;
    private int productId;
    private String productName;
    private String brand;
    private double price;
    private String imageUrl;
    private String sellerEmail;
    private double discount;
    private String category;

    
	public WishlistItem() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	
	


	public WishlistItem(int id, String customerEmail, int productId, String productName, String brand, double price,
			String imageUrl, String sellerEmail, double discount, String category) {
		super();
		this.id = id;
		this.customerEmail = customerEmail;
		this.productId = productId;
		this.productName = productName;
		this.brand = brand;
		this.price = price;
		this.imageUrl = imageUrl;
		this.sellerEmail = sellerEmail;
		this.discount = discount;
		this.category = category;
	}





	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
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
	public String getImageUrl() {
		return imageUrl;
	}
	public void setImageUrl(String imageUrl) {
		this.imageUrl = imageUrl;
	}
	public String getSellerEmail() {
		return sellerEmail;
	}
	public void setSellerEmail(String sellerEmail) {
		this.sellerEmail = sellerEmail;
	}
	public double getDiscount() {
		return discount;
	}
	public void setDiscount(double discount) {
		this.discount = discount;
	}
	
	public String getCategory() {
	    return category;
	}

	public void setCategory(String category) {
	    this.category = category;
	}


    // Getters and Setters
    
}
