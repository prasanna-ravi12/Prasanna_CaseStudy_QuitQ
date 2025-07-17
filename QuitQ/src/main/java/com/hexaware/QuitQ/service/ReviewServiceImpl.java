package com.hexaware.QuitQ.service;

import java.time.LocalDate;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hexaware.QuitQ.entity.Review;
import com.hexaware.QuitQ.entity.ReviewRepo;

@Service
public class ReviewServiceImpl implements IReviewService {

    @Autowired
    private ReviewRepo reviewRepo;

    @Override
    public Review addReview(Review review) {
        review.setReviewDate(LocalDate.now());
        return reviewRepo.save(review);
    }

    @Override
    public List<Review> getAllReviews() {
        return reviewRepo.findAll();
    }

    @Override
    public Review getReviewById(int id) {
        return reviewRepo.findById(id).orElse(null);
    }

    @Override
    public List<Review> getReviewsByCustomer(String email) {
        return reviewRepo.findByCustomerEmail(email);
    }

    @Override
    public List<Review> getReviewsByProduct(int productId) {
        return reviewRepo.findByProductId(productId);
    }

    @Override
    public List<Review> getReviewsBySeller(String sellerEmail) {
        return reviewRepo.findBySellerEmail(sellerEmail);
    }

    @Override
    public Review updateReview(int id, Review updatedReview) {
        if (reviewRepo.existsById(id)) {
            updatedReview.setId(id);
            return reviewRepo.save(updatedReview);
        }
        return null;
    }

    @Override
    public void deleteReview(int id) {
        reviewRepo.deleteById(id);
    }
}
