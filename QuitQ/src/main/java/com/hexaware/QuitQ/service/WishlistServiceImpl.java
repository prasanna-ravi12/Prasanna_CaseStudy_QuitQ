package com.hexaware.QuitQ.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hexaware.QuitQ.entity.Product;
import com.hexaware.QuitQ.entity.ProductRepo;
import com.hexaware.QuitQ.entity.WishlistItem;
import com.hexaware.QuitQ.entity.WishlistRepo;

@Service
public class WishlistServiceImpl implements IWishlistService {

    @Autowired
    private WishlistRepo wishlistRepo;
    
    @Autowired
    private ProductRepo productRepo;  // Add this line


//    @Override
//    public WishlistItem addToWishlist(WishlistItem item) {
//        if (!wishlistRepo.existsByCustomerEmailAndProductId(item.getCustomerEmail(), item.getProductId())) {
//            return wishlistRepo.save(item);
//        }
//        return null;
//    }
    @Override
    public WishlistItem addToWishlist(WishlistItem item) {
        if (!wishlistRepo.existsByCustomerEmailAndProductId(item.getCustomerEmail(), item.getProductId())) {

            Product product = productRepo.findById(item.getProductId()).orElse(null);

            if (product != null) {
                item.setProductName(product.getProductName());
                item.setBrand(product.getBrand());
                item.setPrice(product.getPrice());
                item.setImageUrl(product.getImageUrl());
                item.setSellerEmail(product.getSellerEmail());

                // Handle discount conversion
                String discountStr = product.getDiscount(); // assuming this is like "10%"
                double discountVal = 0.0;
                if (discountStr != null && discountStr.endsWith("%")) {
                    discountVal = Double.parseDouble(discountStr.replace("%", ""));
                }
                item.setDiscount(discountVal);

                // Handle category (assuming it's already a string)
                item.setCategory(product.getCategory()); 
            }

            return wishlistRepo.save(item);
        }
        return null;
    }



    @Override
    public List<WishlistItem> getWishlist(String email) {
        return wishlistRepo.findByCustomerEmail(email);
    }

    @Override
    public void removeFromWishlist(String email, int productId) {
        wishlistRepo.deleteByCustomerEmailAndProductId(email, productId);
    }
    @Override
    public void deleteFromWishlist(Integer id) {
        wishlistRepo.deleteById(id);
    }

}
