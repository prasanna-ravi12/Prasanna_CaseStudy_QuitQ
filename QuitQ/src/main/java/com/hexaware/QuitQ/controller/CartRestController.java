package com.hexaware.QuitQ.controller;

import com.hexaware.QuitQ.entity.Cart;
import com.hexaware.QuitQ.service.CartService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/cart")
public class CartRestController {

    @Autowired
    private CartService service;

    @PostMapping
    public ResponseEntity<Cart> addCartItem(@RequestBody Cart cart) {
        Cart savedCart = service.addCart(cart);
        return new ResponseEntity<>(savedCart, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<Cart>> getAllCartItems() {
        return new ResponseEntity<>(service.getAllCarts(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Cart> getCartItem(@PathVariable int id) {
        Optional<Cart> cart = service.getCartById(id);
        return cart.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                   .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Cart> updateCartItem(@PathVariable int id, @RequestBody Cart updatedCart) {
        Cart updated = service.updateCart(id, updatedCart);
        if (updated != null) {
            return new ResponseEntity<>(updated, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteCartItem(@PathVariable int id) {
        boolean deleted = service.deleteCart(id);
        if (deleted) {
            return new ResponseEntity<>("Cart item deleted successfully", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Cart item not found", HttpStatus.NOT_FOUND);
        }
    }
}
