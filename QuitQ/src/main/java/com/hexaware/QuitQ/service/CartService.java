package com.hexaware.QuitQ.service;

import com.hexaware.QuitQ.entity.Cart;

import java.util.List;
import java.util.Optional;

public interface CartService {
    Cart addCart(Cart cart);
    List<Cart> getAllCarts();
    Optional<Cart> getCartById(int id);
    Cart updateCart(int id, Cart updatedCart);
    boolean deleteCart(int id);
}
