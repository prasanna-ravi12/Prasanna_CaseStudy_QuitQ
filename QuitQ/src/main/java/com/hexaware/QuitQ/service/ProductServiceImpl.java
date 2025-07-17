package com.hexaware.QuitQ.service;

import com.hexaware.QuitQ.entity.Product;
import com.hexaware.QuitQ.entity.ProductRepo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductRepo repo;

    @Override
    public Product addProduct(Product product) {
        return repo.save(product);
    }

    @Override
    public List<Product> getAllProducts() {
        return repo.findAll();
    }

    @Override
    public Optional<Product> getProductById(int id) {
        return repo.findById(id);
    }

    @Override
    public Product updateProduct(int id, Product updatedProduct) {
        updatedProduct.setProductId(id);
        return repo.save(updatedProduct);
    }

    @Override
    public boolean deleteProduct(int id) {
        if (repo.existsById(id)) {
            repo.deleteById(id);
            return true;
        }
        return false;
    }
    
    @Override
    public List<Product> getProductsByCategory(String categoryName) {
    	return repo.findByCategory(categoryName);
    	}
    @Override
    public Map<String, Object> getFilterValuesForCategory(String category) {
        Map<String, Object> filters = new HashMap<>();
        filters.put("brands", repo.findDistinctBrandsByCategory(category));
        filters.put("minPrice", repo.findMinPriceByCategory(category));
        filters.put("maxPrice", repo.findMaxPriceByCategory(category));
        filters.put("discounts", repo.findDistinctDiscountsByCategory(category));

        if (category.equalsIgnoreCase("fashion")) {
            filters.put("genders", repo.findDistinctGenderByCategory(category));
            filters.put("sizes", repo.findDistinctSizesByCategory(category));
        }

        return filters;
    }

    @Override
    public List<Product> getFilteredProducts(Map<String, Object> filters) {
        String category = (String) filters.get("category");
        List<Product> products = repo.findByCategory(category);

        return products.stream().filter(p -> {
            // Price Range
            Double min = Double.valueOf(filters.getOrDefault("priceMin", 0).toString());
            Double max = Double.valueOf(filters.getOrDefault("priceMax", 100000).toString());
            if (p.getPrice() < min || p.getPrice() > max) return false;

            // Brand
            List<String> selectedBrands = (List<String>) filters.get("brand");
            if (selectedBrands != null && !selectedBrands.isEmpty() && !selectedBrands.contains(p.getBrand())) return false;

            // Discount
            List<String> selectedDiscounts = (List<String>) filters.get("discount");
            if (selectedDiscounts != null && !selectedDiscounts.isEmpty() && !selectedDiscounts.contains(p.getDiscount())) return false;

            // Delivery
            if (Boolean.TRUE.equals(filters.get("delivery")) && !"Yes".equalsIgnoreCase(p.getDeliveryInOneDay())) return false;

            // Gender
            if (filters.containsKey("gender")) {
                List<String> genderList = (List<String>) filters.get("gender");
                if (genderList != null && !genderList.isEmpty() && !genderList.contains(p.getGender())) return false;
            }

            // Size
            if (filters.containsKey("size")) {
                List<String> sizeList = (List<String>) filters.get("size");
                if (sizeList != null && !sizeList.isEmpty() && !sizeList.contains(p.getSize())) return false;
            }

            return true;
        }).toList();
    }
 
    @Override
    public List<Product> getProductsBySeller(String SellerEmail) {
        return repo.findBySellerEmail(SellerEmail);
    }

 

}
