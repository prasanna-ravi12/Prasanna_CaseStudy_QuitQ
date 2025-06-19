package com.hexaware.QuitQ.entity;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

public class PaymentTest {

    @Test
    public void testNoArgsConstructorAndSetters() {
        Payment payment = new Payment();

        payment.setPaymentId(1);
        payment.setOrderId(101);
        payment.setPaymentMethod("UPI");
        payment.setPaymentStatus("Success");
        payment.setTransactionId("TXN123456");
        payment.setPaymentDate("2024-06-01");

        assertEquals(1, payment.getPaymentId());
        assertEquals(101, payment.getOrderId());
        assertEquals("UPI", payment.getPaymentMethod());
        assertEquals("Success", payment.getPaymentStatus());
        assertEquals("TXN123456", payment.getTransactionId());
        assertEquals("2024-06-01", payment.getPaymentDate());
    }

    @Test
    public void testAllArgsConstructor() {
        Payment payment = new Payment(2, 102, "Card", "Pending", "TXN7890", "2024-06-05");

        assertEquals(2, payment.getPaymentId());
        assertEquals(102, payment.getOrderId());
        assertEquals("Card", payment.getPaymentMethod());
        assertEquals("Pending", payment.getPaymentStatus());
        assertEquals("TXN7890", payment.getTransactionId());
        assertEquals("2024-06-05", payment.getPaymentDate());
    }
}
