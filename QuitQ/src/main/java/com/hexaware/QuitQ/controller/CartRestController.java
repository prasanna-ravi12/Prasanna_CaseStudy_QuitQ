package com.hexaware.QuitQ.controller;

import com.hexaware.QuitQ.entity.Cart;
import com.hexaware.QuitQ.entity.CartRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/cart")
public class CartRestController {

    @Autowired
    private CartRepo repo;

    @PostMapping
    public ResponseEntity<Cart> addCartItem(@RequestBody Cart cart) {
        repo.save(cart);
        return new ResponseEntity<>(cart, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<Cart>> getAllCartItems() {
        return new ResponseEntity<>(repo.findAll(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Cart> getCartItem(@PathVariable int id) {
        Optional<Cart> cart = repo.findById(id);
        if (cart.isPresent()) {
            return new ResponseEntity<>(cart.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Cart> updateCartItem(@PathVariable int id, @RequestBody Cart updatedCart) {
        Optional<Cart> existing = repo.findById(id);
        if (existing.isPresent()) {
            updatedCart.setCartId(id);  
            repo.save(updatedCart);
            return new ResponseEntity<>(updatedCart, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteCartItem(@PathVariable int id) {
        Optional<Cart> cart = repo.findById(id);
        if (cart.isPresent()) {
            repo.deleteById(id);
            return new ResponseEntity<>("Cart item deleted successfully", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Cart item not found", HttpStatus.NOT_FOUND);
        }
    }
}
