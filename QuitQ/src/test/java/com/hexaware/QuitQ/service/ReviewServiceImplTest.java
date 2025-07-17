package com.hexaware.QuitQ.service;

import com.hexaware.QuitQ.entity.Review;
import com.hexaware.QuitQ.entity.ReviewRepo;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;

import java.time.LocalDate;
import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class ReviewServiceImplTest {

    @Mock
    private ReviewRepo reviewRepo;

    @InjectMocks
    private ReviewServiceImpl reviewService;

    @BeforeEach
    void setup() {
        MockitoAnnotations.openMocks(this);
    }

//    // ✅ Test addReview
//    @Test
//    void testAddReview() {
//        Review review = new Review();
//        review.setComment("Nice product");
//        review.setRating(4);
//        review.setReviewDate(null);
//
//        when(reviewRepo.save(any(Review.class))).thenAnswer(i -> {
//            Review saved = i.getArgument(0);
//            saved.setId(1);  // simulate DB ID generation
//            return saved;
//        });
//
//        Review saved = reviewService.addReview(review);
//
//        assertNotNull(saved);
//        assertEquals("Nice product", saved.getComment());
//        assertEquals(4, saved.getRating());
//        assertNotNull(saved.getReviewDate());
//    }

    // ✅ Test getAllReviews
    @Test
    void testGetAllReviews() {
        List<Review> list = List.of(new Review(), new Review());
        when(reviewRepo.findAll()).thenReturn(list);

        List<Review> result = reviewService.getAllReviews();

        assertEquals(2, result.size());
    }

    // ✅ Test getReviewById (exists)
    @Test
    void testGetReviewByIdExists() {
        Review review = new Review();
        review.setId(1);
        when(reviewRepo.findById(1)).thenReturn(Optional.of(review));

        Review found = reviewService.getReviewById(1);
        assertNotNull(found);
        assertEquals(1, found.getId());
    }

    // ❌ Test getReviewById (not exists)
    @Test
    void testGetReviewByIdNotExists() {
        when(reviewRepo.findById(2)).thenReturn(Optional.empty());

        Review result = reviewService.getReviewById(2);
        assertNull(result);
    }

    // ✅ Test getReviewsByCustomer
    @Test
    void testGetReviewsByCustomer() {
        List<Review> reviews = List.of(new Review(), new Review());
        when(reviewRepo.findByCustomerEmail("test@gmail.com")).thenReturn(reviews);

        List<Review> result = reviewService.getReviewsByCustomer("test@gmail.com");
        assertEquals(2, result.size());
    }

    // ✅ Test getReviewsByProduct
    @Test
    void testGetReviewsByProduct() {
        List<Review> reviews = List.of(new Review());
        when(reviewRepo.findByProductId(10)).thenReturn(reviews);

        List<Review> result = reviewService.getReviewsByProduct(10);
        assertEquals(1, result.size());
    }

    // ✅ Test getReviewsBySeller
    @Test
    void testGetReviewsBySeller() {
        List<Review> reviews = List.of(new Review());
        when(reviewRepo.findBySellerEmail("seller@gmail.com")).thenReturn(reviews);

        List<Review> result = reviewService.getReviewsBySeller("seller@gmail.com");
        assertEquals(1, result.size());
    }

//    // ✅ Test updateReview (exists)
//    @Test
//    void testUpdateReviewExists() {
//        Review updated = new Review();
//        updated.setComment("Updated");
//        updated.setRating(5);
//
//        when(reviewRepo.existsById(1)).thenReturn(true);
//        when(reviewRepo.save(any(Review.class))).thenReturn(updated);
//
//        Review result = reviewService.updateReview(1, updated);
//
//        assertNotNull(result);
//        assertEquals("Updated", result.getComment());
//        assertEquals(5, result.getRating());
//        assertEquals(1, result.getId());
//    }

    // ❌ Test updateReview (not exists)
    @Test
    void testUpdateReviewNotExists() {
        when(reviewRepo.existsById(2)).thenReturn(false);

        Review result = reviewService.updateReview(2, new Review());
        assertNull(result);
    }

    // ✅ Test deleteReview
    @Test
    void testDeleteReview() {
        doNothing().when(reviewRepo).deleteById(1);

        reviewService.deleteReview(1);

        verify(reviewRepo, times(1)).deleteById(1);
    }
}
