package com.hexaware.QuitQ.entity;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

public class WishlistItemTest {

    @Test
    public void testNoArgsConstructor() {
        WishlistItem item = new WishlistItem();
        assertNotNull(item);
    }

    @Test
    public void testAllArgsConstructor() {
        WishlistItem item = new WishlistItem(
                1,
                "user@example.com",
                101,
                "Smartphone",
                "BrandX",
                15000.00,
                "http://example.com/image.jpg",
                "seller@example.com",
                10.5,
                "Electronics"
        );

        assertEquals(1, item.getId());
        assertEquals("user@example.com", item.getCustomerEmail());
        assertEquals(101, item.getProductId());
        assertEquals("Smartphone", item.getProductName());
        assertEquals("BrandX", item.getBrand());
        assertEquals(15000.00, item.getPrice());
        assertEquals("http://example.com/image.jpg", item.getImageUrl());
        assertEquals("seller@example.com", item.getSellerEmail());
        assertEquals(10.5, item.getDiscount());
        assertEquals("Electronics", item.getCategory());
    }

    @Test
    public void testSettersAndGetters() {
        WishlistItem item = new WishlistItem();

        item.setId(2);
        item.setCustomerEmail("test@mail.com");
        item.setProductId(202);
        item.setProductName("Laptop");
        item.setBrand("BrandY");
        item.setPrice(45000.00);
        item.setImageUrl("http://example.com/laptop.jpg");
        item.setSellerEmail("laptop_seller@mail.com");
        item.setDiscount(15.0);
        item.setCategory("Computers");

        assertEquals(2, item.getId());
        assertEquals("test@mail.com", item.getCustomerEmail());
        assertEquals(202, item.getProductId());
        assertEquals("Laptop", item.getProductName());
        assertEquals("BrandY", item.getBrand());
        assertEquals(45000.00, item.getPrice());
        assertEquals("http://example.com/laptop.jpg", item.getImageUrl());
        assertEquals("laptop_seller@mail.com", item.getSellerEmail());
        assertEquals(15.0, item.getDiscount());
        assertEquals("Computers", item.getCategory());
    }
}
