package com.hexaware.QuitQ.entity;

import org.junit.jupiter.api.Test;

import java.time.LocalDateTime;

import static org.junit.jupiter.api.Assertions.*;

public class FinalOrderTest {

    @Test
    public void testNoArgsConstructor() {
        FinalOrder order = new FinalOrder();
        assertNotNull(order);
    }

    @Test
    public void testAllArgsConstructor() {
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime deliveryEstimate = now.plusDays(4);
        LocalDateTime actualDelivery = now.plusDays(5);

        FinalOrder order = new FinalOrder(
                1,
                "customer@example.com",
                "Smartphone",
                "BrandX",
                "seller@example.com",
                15000.0,
                2,
                30000.0,
                "http://example.com/image.jpg",
                "UPI",
                "PAID",
                now,
                "SHIPPED",
                deliveryEstimate,
                actualDelivery,
                101
        );

        assertEquals(1, order.getId());
        assertEquals("customer@example.com", order.getCustomerEmail());
        assertEquals("Smartphone", order.getProductName());
        assertEquals("BrandX", order.getBrand());
        assertEquals("seller@example.com", order.getSellerEmail());
        assertEquals(15000.0, order.getPrice());
        assertEquals(2, order.getQuantity());
        assertEquals(30000.0, order.getTotalAmount());
        assertEquals("http://example.com/image.jpg", order.getImageUrl());
        assertEquals("UPI", order.getPaymentMethod());
        assertEquals("PAID", order.getPaymentStatus());
        assertEquals(now, order.getOrderDate());
        assertEquals("SHIPPED", order.getDeliveryStatus());
        assertEquals(deliveryEstimate, order.getExpectedDelivery());
        assertEquals(actualDelivery, order.getDeliveryDate());
        assertEquals(101, order.getProductId());
    }

    @Test
    public void testSettersAndGetters() {
        FinalOrder order = new FinalOrder();

        LocalDateTime now = LocalDateTime.now();
        LocalDateTime deliveryEstimate = now.plusDays(3);
        LocalDateTime actualDelivery = now.plusDays(5);

        order.setId(2);
        order.setCustomerEmail("test@example.com");
        order.setProductName("Laptop");
        order.setBrand("BrandY");
        order.setSellerEmail("seller@example.com");
        order.setPrice(45000.0);
        order.setQuantity(1);
        order.setTotalAmount(45000.0);
        order.setImageUrl("http://example.com/laptop.jpg");
        order.setPaymentMethod("CARD");
        order.setPaymentStatus("PENDING");
        order.setOrderDate(now);
        order.setDeliveryStatus("OUT_FOR_DELIVERY");
        order.setExpectedDelivery(deliveryEstimate);
        order.setDeliveryDate(actualDelivery);
        order.setProductId(202);

        assertEquals(2, order.getId());
        assertEquals("test@example.com", order.getCustomerEmail());
        assertEquals("Laptop", order.getProductName());
        assertEquals("BrandY", order.getBrand());
        assertEquals("seller@example.com", order.getSellerEmail());
        assertEquals(45000.0, order.getPrice());
        assertEquals(1, order.getQuantity());
        assertEquals(45000.0, order.getTotalAmount());
        assertEquals("http://example.com/laptop.jpg", order.getImageUrl());
        assertEquals("CARD", order.getPaymentMethod());
        assertEquals("PENDING", order.getPaymentStatus());
        assertEquals(now, order.getOrderDate());
        assertEquals("OUT_FOR_DELIVERY", order.getDeliveryStatus());
        assertEquals(deliveryEstimate, order.getExpectedDelivery());
        assertEquals(actualDelivery, order.getDeliveryDate());
        assertEquals(202, order.getProductId());
    }
}
