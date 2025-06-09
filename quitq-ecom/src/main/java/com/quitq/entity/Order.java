package com.quitq.entity;

public class Order {
    private int orderId;
    private int userId;
    private String orderStatus;
    private String paymentStatus;
    private double totalAmount;
    private String shippingAddress;
    private String orderDate;

    public Order() {}

    public Order(int orderId, int userId, String orderStatus, String paymentStatus,
                 double totalAmount, String shippingAddress, String orderDate) {
        this.orderId = orderId;
        this.userId = userId;
        this.orderStatus = orderStatus;
        this.paymentStatus = paymentStatus;
        this.totalAmount = totalAmount;
        this.shippingAddress = shippingAddress;
        this.orderDate = orderDate;
    }

    public int getOrderId() { return orderId; }
    public void setOrderId(int orderId) { this.orderId = orderId; }

    public int getUserId() { return userId; }
    public void setUserId(int userId) { this.userId = userId; }

    public String getOrderStatus() { return orderStatus; }
    public void setOrderStatus(String orderStatus) { this.orderStatus = orderStatus; }

    public String getPaymentStatus() { return paymentStatus; }
    public void setPaymentStatus(String paymentStatus) { this.paymentStatus = paymentStatus; }

    public double getTotalAmount() { return totalAmount; }
    public void setTotalAmount(double totalAmount) { this.totalAmount = totalAmount; }

    public String getShippingAddress() { return shippingAddress; }
    public void setShippingAddress(String shippingAddress) { this.shippingAddress = shippingAddress; }

    public String getOrderDate() { return orderDate; }
    public void setOrderDate(String orderDate) { this.orderDate = orderDate; }
}
