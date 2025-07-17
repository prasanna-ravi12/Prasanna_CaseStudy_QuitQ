package com.hexaware.QuitQ.entity;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

public class ProductTest {

    @Test
    public void testProductNoArgsConstructor() {
        Product product = new Product();
        assertNotNull(product);
    }

    @Test
    public void testProductAllArgsConstructor() {
        Product product = new Product(
            1,
            "Shoes",
            999.99,
            "Nike",
            "Footwear",
            "seller@example.com",
            "image.jpg",
            10,
            "10%",
            "Yes",
            "Unisex",
            "M"
        );

        assertEquals(1, product.getProductId());
        assertEquals("Shoes", product.getProductName());
        assertEquals(999.99, product.getPrice());
        assertEquals("Nike", product.getBrand());
        assertEquals("Footwear", product.getCategory());
        assertEquals("seller@example.com", product.getSellerEmail());
        assertEquals("image.jpg", product.getImageUrl());
        assertEquals(10, product.getStock());
        assertEquals("10%", product.getDiscount());
        assertEquals("Yes", product.getDeliveryInOneDay());
        assertEquals("Unisex", product.getGender());
        assertEquals("M", product.getSize());
    }

    @Test
    public void testSettersAndGetters() {
        Product product = new Product();

        product.setProductId(101);
        product.setProductName("T-Shirt");
        product.setPrice(499.50);
        product.setBrand("Adidas");
        product.setCategory("Clothing");
        product.setSellerEmail("test@seller.com");
        product.setImageUrl("tshirt.jpg");
        product.setStock(25);
        product.setDiscount("5%");
        product.setDeliveryInOneDay("No");
        product.setGender("Male");
        product.setSize("L");

        assertEquals(101, product.getProductId());
        assertEquals("T-Shirt", product.getProductName());
        assertEquals(499.50, product.getPrice());
        assertEquals("Adidas", product.getBrand());
        assertEquals("Clothing", product.getCategory());
        assertEquals("test@seller.com", product.getSellerEmail());
        assertEquals("tshirt.jpg", product.getImageUrl());
        assertEquals(25, product.getStock());
        assertEquals("5%", product.getDiscount());
        assertEquals("No", product.getDeliveryInOneDay());
        assertEquals("Male", product.getGender());
        assertEquals("L", product.getSize());
    }
}
