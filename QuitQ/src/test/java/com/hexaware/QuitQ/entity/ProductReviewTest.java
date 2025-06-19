package com.hexaware.QuitQ.entity;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

public class ProductReviewTest {

    @Test
    public void testNoArgsConstructorAndSetters() {
        ProductReview review = new ProductReview();

        review.setReviewId(1);
        review.setProductId(1001);
        review.setUserId(501);
        review.setRating(4);
        review.setComment("Great product!");
        review.setReviewDate("2025-06-15");

        assertEquals(1, review.getReviewId());
        assertEquals(1001, review.getProductId());
        assertEquals(501, review.getUserId());
        assertEquals(4, review.getRating());
        assertEquals("Great product!", review.getComment());
        assertEquals("2025-06-15", review.getReviewDate());
    }

    @Test
    public void testAllArgsConstructor() {
        ProductReview review = new ProductReview(
            2, 1002, 502, 5, "Excellent quality!", "2025-06-16"
        );

        assertEquals(2, review.getReviewId());
        assertEquals(1002, review.getProductId());
        assertEquals(502, review.getUserId());
        assertEquals(5, review.getRating());
        assertEquals("Excellent quality!", review.getComment());
        assertEquals("2025-06-16", review.getReviewDate());
    }
}
