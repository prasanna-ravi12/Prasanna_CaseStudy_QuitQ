package com.hexaware.QuitQ.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private int productId;
    private String productName;
    private double price;
    private String brand;
    private String category;  
    private String sellerEmail;
    private String imageUrl;
    private int stock;
    private String discount;
    private String deliveryInOneDay;
    private String gender;
    private String size;

    
    
    
	public Product() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	

	public Product(int productId, String productName, double price, String brand, String category, String sellerEmail,
			String imageUrl, int stock, String discount, String deliveryInOneDay, String gender, String size) {
		super();
		this.productId = productId;
		this.productName = productName;
		this.price = price;
		this.brand = brand;
		this.category = category;
		this.sellerEmail = sellerEmail;
		this.imageUrl = imageUrl;
		this.stock = stock;
		this.discount = discount;
		this.deliveryInOneDay = deliveryInOneDay;
		this.gender = gender;
		this.size = size;
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
	public double getPrice() {
		return price;
	}
	public void setPrice(double price) {
		this.price = price;
	}
	public String getBrand() {
		return brand;
	}
	public void setBrand(String brand) {
		this.brand = brand;
	}
	public String getCategory() {
		return category;
	}
	public void setCategory(String category) {
		this.category = category;
	}
	public String getSellerEmail() {
		return sellerEmail;
	}
	public void setSellerEmail(String sellerEmail) {
		this.sellerEmail = sellerEmail;
	}
	public int getStock() {
		return stock;
	}
	public void setStock(int stock) {
		this.stock = stock;
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



	public String getDeliveryInOneDay() {
		return deliveryInOneDay;
	}



	public void setDeliveryInOneDay(String deliveryInOneDay) {
		this.deliveryInOneDay = deliveryInOneDay;
	}



	public String getGender() {
		return gender;
	}



	public void setGender(String gender) {
		this.gender = gender;
	}



	public String getSize() {
		return size;
	}



	public void setSize(String size) {
		this.size = size;
	}
	
    
	
}
