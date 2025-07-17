//package com.hexaware.QuitQ.entity;
//
//import jakarta.persistence.Entity;
//import jakarta.persistence.GeneratedValue;
//import jakarta.persistence.GenerationType;
//import jakarta.persistence.Id;
//import jakarta.persistence.Table;
//
//@Entity
//@Table(name = "final_order")
//public class FinalOrder {
//
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private int id;
//
//    private String customerEmail;
//    private String productName;
//    private String brand;
//    private double price;
//    private int quantity;
//    private double totalAmount;
//    private String paymentStatus;
//
//    public FinalOrder() {}
//
//    public FinalOrder(String customerEmail, String productName, String brand, double price, int quantity, double totalAmount, String paymentStatus) {
//        this.customerEmail = customerEmail;
//        this.productName = productName;
//        this.brand = brand;
//        this.price = price;
//        this.quantity = quantity;
//        this.totalAmount = totalAmount;
//        this.paymentStatus = paymentStatus;
//    }
//
//	public int getId() {
//		return id;
//	}
//
//	public void setId(int id) {
//		this.id = id;
//	}
//
//	public String getCustomerEmail() {
//		return customerEmail;
//	}
//
//	public void setCustomerEmail(String customerEmail) {
//		this.customerEmail = customerEmail;
//	}
//
//	public String getProductName() {
//		return productName;
//	}
//
//	public void setProductName(String productName) {
//		this.productName = productName;
//	}
//
//	public String getBrand() {
//		return brand;
//	}
//
//	public void setBrand(String brand) {
//		this.brand = brand;
//	}
//
//	public double getPrice() {
//		return price;
//	}
//
//	public void setPrice(double price) {
//		this.price = price;
//	}
//
//	public int getQuantity() {
//		return quantity;
//	}
//
//	public void setQuantity(int quantity) {
//		this.quantity = quantity;
//	}
//
//	public double getTotalAmount() {
//		return totalAmount;
//	}
//
//	public void setTotalAmount(double totalAmount) {
//		this.totalAmount = totalAmount;
//	}
//
//	public String getPaymentStatus() {
//		return paymentStatus;
//	}
//
//	public void setPaymentStatus(String paymentStatus) {
//		this.paymentStatus = paymentStatus;
//	}
//
//    
//    
//}


package com.hexaware.QuitQ.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonFormat;

@Entity
@Table(name = "final_order")
public class FinalOrder {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String customerEmail;
    private String productName;
    private String brand;
    private String sellerEmail; // ✅ NEW
    private double price;
    private int quantity;
    private double totalAmount;
    private String imageUrl; // ✅ New field

    
    private String paymentMethod; // ✅ NEW: UPI, CARD, COD, NETBANKING
    private String paymentStatus; // ✅ Already Present
//    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime orderDate; // ✅ NEW
    private String deliveryStatus; // ✅ New field
    private LocalDateTime expectedDelivery; // ✅ New field
    private LocalDateTime deliveryDate; // ✅ New field
    private int productId;


    public FinalOrder() {}

  

	
	   public FinalOrder(int id, String customerEmail, String productName, String brand, String sellerEmail, double price,
			int quantity, double totalAmount, String imageUrl, String paymentMethod, String paymentStatus,
			LocalDateTime orderDate, String deliveryStatus, LocalDateTime expectedDelivery, LocalDateTime deliveryDate,
			int productId) {
		super();
		this.id = id;
		this.customerEmail = customerEmail;
		this.productName = productName;
		this.brand = brand;
		this.sellerEmail = sellerEmail;
		this.price = price;
		this.quantity = quantity;
		this.totalAmount = totalAmount;
		this.imageUrl = imageUrl;
		this.paymentMethod = paymentMethod;
		this.paymentStatus = paymentStatus;
		this.orderDate = orderDate;
		this.deliveryStatus = deliveryStatus;
		this.expectedDelivery = expectedDelivery;
		this.deliveryDate = deliveryDate;
		this.productId = productId;
	}




	public int getProductId() {
	      return productId;
	    }

	    public void setProductId(int productId) {
	      this.productId = productId;
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

	public String getSellerEmail() {
		return sellerEmail;
	}

	public void setSellerEmail(String sellerEmail) {
		this.sellerEmail = sellerEmail;
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

	public double getTotalAmount() {
		return totalAmount;
	}

	public void setTotalAmount(double totalAmount) {
		this.totalAmount = totalAmount;
	}

	public String getPaymentMethod() {
		return paymentMethod;
	}

	public void setPaymentMethod(String paymentMethod) {
		this.paymentMethod = paymentMethod;
	}

	public String getPaymentStatus() {
		return paymentStatus;
	}

	public void setPaymentStatus(String paymentStatus) {
		this.paymentStatus = paymentStatus;
	}

	public LocalDateTime getOrderDate() {
		return orderDate;
	}

	public void setOrderDate(LocalDateTime orderDate) {
		this.orderDate = orderDate;
	}



	public String getImageUrl() {
		return imageUrl;
	}



	public void setImageUrl(String imageUrl) {
		this.imageUrl = imageUrl;
	}



	public String getDeliveryStatus() {
		return deliveryStatus;
	}



	public void setDeliveryStatus(String deliveryStatus) {
		this.deliveryStatus = deliveryStatus;
	}



	public LocalDateTime getExpectedDelivery() {
		return expectedDelivery;
	}



	public void setExpectedDelivery(LocalDateTime expectedDelivery) {
		this.expectedDelivery = expectedDelivery;
	}



	public LocalDateTime getDeliveryDate() {
		return deliveryDate;
	}



	public void setDeliveryDate(LocalDateTime deliveryDate) {
		this.deliveryDate = deliveryDate;
	}

   
    
    
}

