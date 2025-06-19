package com.hexaware.QuitQ.entity;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface FinalOrderRepo extends JpaRepository<FinalOrder, Integer> {
    List<FinalOrder> findByCustomerEmail(String customerEmail);
}

