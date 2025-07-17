package com.hexaware.QuitQ.service;

import com.hexaware.QuitQ.entity.Cart;
import com.hexaware.QuitQ.entity.CartRepo;
import com.hexaware.QuitQ.entity.Product;
import com.hexaware.QuitQ.entity.ProductRepo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CartServiceImpl implements CartService {

    @Autowired
    private CartRepo repo;
    
    @Autowired
    private ProductRepo productRepo;

//    public Cart addCart(Cart cart) {
//        return repo.save(cart);
//    }
    
    
//    public Cart addCart(Cart cart) {
//    	Optional<Cart> existing = repo.findByCustomerEmailAndProductNameAndBrand(
//    		    cart.getCustomerEmail(), cart.getProductName(), cart.getBrand()
//    		);
//
//
//        if (existing.isPresent()) {
//            Cart existingCart = existing.get();
//            existingCart.setQuantity(existingCart.getQuantity() + cart.getQuantity());
//            return repo.save(existingCart);
//        } else {
//            return repo.save(cart);
//        }
//    }

    @Override
    public Cart addCart(Cart cart) {
        Optional<Cart> existing = repo.findByCustomerEmailAndProductNameAndBrand(
            cart.getCustomerEmail(), cart.getProductName(), cart.getBrand()
        );

        if (existing.isPresent()) {
            Cart existingCart = existing.get();
            existingCart.setQuantity(existingCart.getQuantity() + cart.getQuantity());
            return repo.save(existingCart);
        } else {
            // Fetch product by productId
            Optional<Product> productOpt = productRepo.findById(cart.getProductId());
            if (productOpt.isPresent()) {
                Product prod = productOpt.get();
                cart.setProductName(prod.getProductName());
                cart.setBrand(prod.getBrand());
                cart.setPrice(prod.getPrice());
                cart.setImageUrl(prod.getImageUrl()); // ✅ Set imageUrl
                cart.setDiscount(prod.getDiscount()); 
                cart.setSellerEmail(prod.getSellerEmail());
            } else {
                throw new RuntimeException("Product not found with ID: " + cart.getProductId());
            }

            return repo.save(cart);
        }
    }


    @Override
    public List<Cart> getAllCarts() {
        return repo.findAll();
    }

    @Override
    public Optional<Cart> getCartById(int id) {
        return repo.findById(id);
    }

    @Override
    public Cart updateCart(int id, Cart updatedCart) {
        if (repo.existsById(id)) {
            updatedCart.setCartId(id);
            return repo.save(updatedCart);
        }
        return null;
    }

    @Override
    public boolean deleteCart(int id) {
        if (repo.existsById(id)) {
            repo.deleteById(id);
            return true;
        }
        return false;
    }
}
