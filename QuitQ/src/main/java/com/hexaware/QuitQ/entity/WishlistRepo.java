package com.hexaware.QuitQ.entity;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.hexaware.QuitQ.entity.WishlistItem;

public interface WishlistRepo extends JpaRepository<WishlistItem, Integer> {
    List<WishlistItem> findByCustomerEmail(String email);
    boolean existsByCustomerEmailAndProductId(String email, int productId);
    void deleteByCustomerEmailAndProductId(String email, int productId);
}
