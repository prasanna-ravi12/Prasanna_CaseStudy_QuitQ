package com.hexaware.QuitQ.entity;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.Test;

public class CartTest {

    @Test
    public void testCartConstructorAndGetters() {
        Cart cart = new Cart("user@example.com", "Shoes", "Nike", 2999.99, 2);

        assertEquals("user@example.com", cart.getCustomerEmail());
        assertEquals("Shoes", cart.getProductName());
        assertEquals("Nike", cart.getBrand());
        assertEquals(2999.99, cart.getPrice());
        assertEquals(2, cart.getQuantity());
    }

    @Test
    public void testSettersAndGetters() {
        Cart cart = new Cart();

        cart.setCartId(101);
        cart.setCustomerEmail("buyer@example.com");
        cart.setProductName("Watch");
        cart.setBrand("Fossil");
        cart.setPrice(5999.00);
        cart.setQuantity(1);

        assertEquals(101, cart.getCartId());
        assertEquals("buyer@example.com", cart.getCustomerEmail());
        assertEquals("Watch", cart.getProductName());
        assertEquals("Fossil", cart.getBrand());
        assertEquals(5999.00, cart.getPrice());
        assertEquals(1, cart.getQuantity());
    }
}
