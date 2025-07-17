package com.hexaware.QuitQ.entity;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

public class CartTest {

    @Test
    public void testCartAllArgsConstructor() {
        Cart cart = new Cart(
            1,
            "user@example.com",
            101,
            "iPhone",
            "Apple",
            99999.99,
            2,
            "iphone.jpg",
            "10%",
            "seller@example.com"
        );

        assertEquals(1, cart.getCartId());
        assertEquals("user@example.com", cart.getCustomerEmail());
        assertEquals(101, cart.getProductId());
        assertEquals("iPhone", cart.getProductName());
        assertEquals("Apple", cart.getBrand());
        assertEquals(99999.99, cart.getPrice());
        assertEquals(2, cart.getQuantity());
        assertEquals("iphone.jpg", cart.getImageUrl());
        assertEquals("10%", cart.getDiscount());
        assertEquals("seller@example.com", cart.getSellerEmail());
    }

    @Test
    public void testCartSettersAndGetters() {
        Cart cart = new Cart();

        cart.setCartId(2);
        cart.setCustomerEmail("customer@example.com");
        cart.setProductId(202);
        cart.setProductName("Samsung TV");
        cart.setBrand("Samsung");
        cart.setPrice(49999.50);
        cart.setQuantity(1);
        cart.setImageUrl("tv.jpg");
        cart.setDiscount("15%");
        cart.setSellerEmail("samsung@seller.com");

        assertEquals(2, cart.getCartId());
        assertEquals("customer@example.com", cart.getCustomerEmail());
        assertEquals(202, cart.getProductId());
        assertEquals("Samsung TV", cart.getProductName());
        assertEquals("Samsung", cart.getBrand());
        assertEquals(49999.50, cart.getPrice());
        assertEquals(1, cart.getQuantity());
        assertEquals("tv.jpg", cart.getImageUrl());
        assertEquals("15%", cart.getDiscount());
        assertEquals("samsung@seller.com", cart.getSellerEmail());
    }
}
