package com.hexaware.QuitQ.service;

import java.util.List;
import com.hexaware.QuitQ.entity.Review;

public interface IReviewService {
    Review addReview(Review review);
    List<Review> getAllReviews();
    Review getReviewById(int id);
    List<Review> getReviewsByCustomer(String email);
    List<Review> getReviewsByProduct(int productId);
    List<Review> getReviewsBySeller(String sellerEmail);
    Review updateReview(int id, Review updatedReview);
    void deleteReview(int id);
}
