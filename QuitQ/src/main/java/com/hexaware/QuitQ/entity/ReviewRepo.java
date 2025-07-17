package com.hexaware.QuitQ.entity;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.hexaware.QuitQ.entity.Review;

public interface ReviewRepo extends JpaRepository<Review, Integer> {
    List<Review> findByCustomerEmail(String email);
    List<Review> findByProductId(int productId);
    List<Review> findBySellerEmail(String sellerEmail);
}
