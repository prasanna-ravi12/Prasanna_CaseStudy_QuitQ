package com.hexaware.QuitQ.entity;

import org.junit.jupiter.api.Test;
import java.time.LocalDate;
import static org.junit.jupiter.api.Assertions.*;

public class ReviewTest {

    @Test
    public void testNoArgsConstructor() {
        Review review = new Review();
        assertNotNull(review);
    }

    @Test
    public void testAllArgsConstructor() {
        LocalDate reviewDate = LocalDate.now();
        Review review = new Review(
            1,
            "customer@example.com",
            1001,
            "Product Name",
            "seller@example.com",
            5,
            "Excellent",
            reviewDate,
            "BrandX",
            999.99,
            "http://example.com/image.jpg"
        );

        assertEquals(1, review.getId());
        assertEquals("customer@example.com", review.getCustomerEmail());
        assertEquals(1001, review.getProductId());
        assertEquals("Product Name", review.getProductName());
        assertEquals("seller@example.com", review.getSellerEmail());
        assertEquals(5, review.getRating());
        assertEquals("Excellent", review.getMeaning());
        assertEquals(reviewDate, review.getReviewDate());
        assertEquals("BrandX", review.getBrand());
        assertEquals(999.99, review.getPrice());
        assertEquals("http://example.com/image.jpg", review.getImageUrl());
    }

    @Test
    public void testSettersAndGetters() {
        Review review = new Review();
        LocalDate date = LocalDate.of(2025, 7, 16);

        review.setId(10);
        review.setCustomerEmail("testuser@mail.com");
        review.setProductId(2002);
        review.setProductName("Test Product");
        review.setSellerEmail("seller@mail.com");
        review.setRating(4);
        review.setMeaning("Good");
        review.setReviewDate(date);
        review.setBrand("BrandY");
        review.setPrice(499.50);
        review.setImageUrl("http://example.com/test.jpg");

        assertEquals(10, review.getId());
        assertEquals("testuser@mail.com", review.getCustomerEmail());
        assertEquals(2002, review.getProductId());
        assertEquals("Test Product", review.getProductName());
        assertEquals("seller@mail.com", review.getSellerEmail());
        assertEquals(4, review.getRating());
        assertEquals("Good", review.getMeaning());
        assertEquals(date, review.getReviewDate());
        assertEquals("BrandY", review.getBrand());
        assertEquals(499.50, review.getPrice());
        assertEquals("http://example.com/test.jpg", review.getImageUrl());
    }
}
