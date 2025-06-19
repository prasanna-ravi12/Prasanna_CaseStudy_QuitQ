package com.hexaware.QuitQ.entity;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepo extends JpaRepository<Order, Integer> {
    List<Order> findByCustomerEmail(String email);
//    List<Order> findByCustomerEmailAndPaymentStatus(String email, String status);
    List<Order> findByCustomerEmailAndPaymentStatus(String customerEmail, String paymentStatus);
//    List<Order> findByCustomerEmailAndPaymentStatus(String customerEmail, String paymentStatus);




}
