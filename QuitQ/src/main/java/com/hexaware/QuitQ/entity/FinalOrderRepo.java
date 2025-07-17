package com.hexaware.QuitQ.entity;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface FinalOrderRepo extends JpaRepository<FinalOrder, Integer> {
    List<FinalOrder> findByCustomerEmail(String customerEmail);
    List<FinalOrder> findBySellerEmail(String sellerEmail); 
    List<FinalOrder> findByDeliveryStatusAndExpectedDeliveryBefore(String status, LocalDateTime time);

}

