package com.hexaware.QuitQ.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.hexaware.QuitQ.entity.WishlistItem;
import com.hexaware.QuitQ.service.IWishlistService;

@RestController
@RequestMapping("/api/wishlist")
//@CrossOrigin("*")
public class WishlistRestController {

    @Autowired
    private IWishlistService wishlistService;

    @PostMapping
    public WishlistItem addToWishlist(@RequestBody WishlistItem item) {
        return wishlistService.addToWishlist(item);
    }

    @GetMapping("/{email}")
    public List<WishlistItem> getWishlist(@PathVariable String email) {
        return wishlistService.getWishlist(email);
    }

    @DeleteMapping("/{email}/{productId}")
    public void removeFromWishlist(@PathVariable String email, @PathVariable int productId) {
        wishlistService.removeFromWishlist(email, productId);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteFromWishlist(@PathVariable Integer id) {
        wishlistService.deleteFromWishlist(id);
        return ResponseEntity.ok("Item removed from wishlist");
    }

}
