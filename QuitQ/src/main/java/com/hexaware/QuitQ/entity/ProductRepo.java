package com.hexaware.QuitQ.entity;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.hexaware.QuitQ.entity.Product;

public interface ProductRepo extends JpaRepository<Product, Integer> {
    List<Product> findBySellerEmail(String sellerEmail);
    List<Product> findByCategory(String category);


}