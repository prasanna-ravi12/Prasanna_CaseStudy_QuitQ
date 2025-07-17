package com.hexaware.QuitQ.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.hexaware.QuitQ.entity.Review;
import com.hexaware.QuitQ.service.IReviewService;

@RestController
@RequestMapping("/api/reviews")
//@CrossOrigin(origins = "*")
public class ReviewController {

    @Autowired
    private IReviewService reviewService;

    @PostMapping
    public Review addReview(@RequestBody Review review) {
        return reviewService.addReview(review);
    }

    @GetMapping
    public List<Review> getAllReviews() {
        return reviewService.getAllReviews();
    }

    @GetMapping("/{id}")
    public Review getReviewById(@PathVariable int id) {
        return reviewService.getReviewById(id);
    }

    @GetMapping("/customer/{email}")
    public List<Review> getReviewsByCustomer(@PathVariable String email) {
        return reviewService.getReviewsByCustomer(email);
    }

    @GetMapping("/product/{productId}")
    public List<Review> getReviewsByProduct(@PathVariable int productId) {
        return reviewService.getReviewsByProduct(productId);
    }

    @GetMapping("/seller/{sellerEmail}")
    public List<Review> getReviewsBySeller(@PathVariable String sellerEmail) {
        return reviewService.getReviewsBySeller(sellerEmail);
    }

    @PutMapping("/{id}")
    public Review updateReview(@PathVariable int id, @RequestBody Review review) {
        return reviewService.updateReview(id, review);
    }

    @DeleteMapping("/{id}")
    public void deleteReview(@PathVariable int id) {
        reviewService.deleteReview(id);
    }
}
