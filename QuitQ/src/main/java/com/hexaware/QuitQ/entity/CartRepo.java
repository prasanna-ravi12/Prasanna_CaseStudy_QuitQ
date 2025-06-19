package com.hexaware.QuitQ.entity;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface CartRepo extends JpaRepository<Cart, Integer> {
    List<Cart> findByCustomerEmail(String customerEmail);
//    Cart findByCustomerEmailAndProductName(String customerEmail, String productName);
    List<Cart> findByCustomerEmailAndProductName(String customerEmail, String productName);

}