package com.hexaware.QuitQ.entity;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

public class ProductTest {

    @Test
    public void testConstructorAndGetters() {
        int productId = 101;
        String productName = "Wireless Mouse";
        double price = 599.99;
        String brand = "Logitech";
        String category = "Electronics";
        String sellerEmail = "seller@example.com";
        int stock = 50;

        Product product = new Product(productId, productName, price, brand, category, sellerEmail, stock);

        assertEquals(productId, product.getProductId());
        assertEquals(productName, product.getProductName());
        assertEquals(price, product.getPrice());
        assertEquals(brand, product.getBrand());
        assertEquals(category, product.getCategory());
        assertEquals(sellerEmail, product.getSellerEmail());
        assertEquals(stock, product.getStock());
    }

    @Test
    public void testSetters() {
        Product product = new Product();

        product.setProductId(102);
        product.setProductName("Keyboard");
        product.setPrice(899.50);
        product.setBrand("Dell");
        product.setCategory("Accessories");
        product.setSellerEmail("keyboard@seller.com");
        product.setStock(80);

        assertEquals(102, product.getProductId());
        assertEquals("Keyboard", product.getProductName());
        assertEquals(899.50, product.getPrice());
        assertEquals("Dell", product.getBrand());
        assertEquals("Accessories", product.getCategory());
        assertEquals("keyboard@seller.com", product.getSellerEmail());
        assertEquals(80, product.getStock());
    }
}
