package com.hexaware.QuitQ.entity;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.hexaware.QuitQ.entity.Product;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ProductRepo extends JpaRepository<Product, Integer> {
    
    List<Product> findBySellerEmail(String sellerEmail);
    List<Product> findByCategory(String category);



    @Query("SELECT DISTINCT p.brand FROM Product p WHERE p.category = :category")
    List<String> findDistinctBrandsByCategory(@Param("category") String category);

    @Query("SELECT MIN(p.price) FROM Product p WHERE p.category = :category")
    Double findMinPriceByCategory(@Param("category") String category);

    @Query("SELECT MAX(p.price) FROM Product p WHERE p.category = :category")
    Double findMaxPriceByCategory(@Param("category") String category);

    @Query("SELECT DISTINCT p.discount FROM Product p WHERE p.category = :category")
    List<String> findDistinctDiscountsByCategory(@Param("category") String category);

    @Query("SELECT DISTINCT p.gender FROM Product p WHERE p.category = :category AND p.gender IS NOT NULL")
    List<String> findDistinctGenderByCategory(@Param("category") String category);

    @Query("SELECT DISTINCT p.size FROM Product p WHERE p.category = :category AND p.size IS NOT NULL")
    List<String> findDistinctSizesByCategory(@Param("category") String category);
}
