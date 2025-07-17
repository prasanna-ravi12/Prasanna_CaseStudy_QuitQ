package com.hexaware.QuitQ.entity;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
public class Review {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String customerEmail;
    private int productId;
    private String productName;
    private String sellerEmail;

    private int rating; // 1 to 5
    private String meaning; // e.g., "Excellent", "Bad"
//    private String reviewText;
    private LocalDate reviewDate;

    // Optional: Can be used for admin/seller display
    private String brand;
    private double price;
    private String imageUrl;
    
	public Review() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Review(int id, String customerEmail, int productId, String productName, String sellerEmail, int rating,
			String meaning, LocalDate reviewDate, String brand, double price, String imageUrl) {
		super();
		this.id = id;
		this.customerEmail = customerEmail;
		this.productId = productId;
		this.productName = productName;
		this.sellerEmail = sellerEmail;
		this.rating = rating;
		this.meaning = meaning;
		this.reviewDate = reviewDate;
		this.brand = brand;
		this.price = price;
		this.imageUrl = imageUrl;
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

	public String getSellerEmail() {
		return sellerEmail;
	}

	public void setSellerEmail(String sellerEmail) {
		this.sellerEmail = sellerEmail;
	}

	public int getRating() {
		return rating;
	}

	public void setRating(int rating) {
		this.rating = rating;
	}

	public String getMeaning() {
		return meaning;
	}

	public void setMeaning(String meaning) {
		this.meaning = meaning;
	}

	public LocalDate getReviewDate() {
		return reviewDate;
	}

	public void setReviewDate(LocalDate reviewDate) {
		this.reviewDate = reviewDate;
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

    // Getters & Setters
    // ...
    
    
}
