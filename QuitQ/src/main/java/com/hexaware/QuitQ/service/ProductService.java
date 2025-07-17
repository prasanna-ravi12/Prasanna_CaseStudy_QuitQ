package com.hexaware.QuitQ.service;

import com.hexaware.QuitQ.entity.Product;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;

public interface ProductService {
    Product addProduct(Product product);
    List<Product> getAllProducts();
    Optional<Product> getProductById(int id);
    Product updateProduct(int id, Product updatedProduct);
    boolean deleteProduct(int id);
    public List<Product> getProductsByCategory(String categoryName);
    Map<String, Object> getFilterValuesForCategory(String category);
    List<Product> getFilteredProducts(Map<String, Object> filters);
    List<Product> getProductsBySeller(String SellerEmail);


 

}
