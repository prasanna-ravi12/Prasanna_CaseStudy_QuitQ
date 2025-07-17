package com.hexaware.QuitQ.service;

import com.hexaware.QuitQ.entity.Product;
import com.hexaware.QuitQ.entity.ProductRepo;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;

import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class ProductServiceImplTest {

    @Mock
    private ProductRepo productRepo;

    @InjectMocks
    private ProductServiceImpl productService;

    @BeforeEach
    void setup() {
        MockitoAnnotations.openMocks(this);
    }

    // ✅ Add product
    @Test
    void testAddProduct() {
        Product product = new Product();
        product.setProductName("iPhone");

        when(productRepo.save(product)).thenReturn(product);

        Product result = productService.addProduct(product);
        assertEquals("iPhone", result.getProductName());
    }

    // ✅ Get all products
    @Test
    void testGetAllProducts() {
        List<Product> list = List.of(new Product(), new Product());
        when(productRepo.findAll()).thenReturn(list);

        List<Product> result = productService.getAllProducts();
        assertEquals(2, result.size());
    }

    // ✅ Get product by ID
    @Test
    void testGetProductById() {
        Product product = new Product();
        product.setProductId(101);

        when(productRepo.findById(101)).thenReturn(Optional.of(product));

        Optional<Product> result = productService.getProductById(101);
        assertTrue(result.isPresent());
        assertEquals(101, result.get().getProductId());
    }

    // ✅ Update product
    @Test
    void testUpdateProduct() {
        Product updated = new Product();
        updated.setProductName("Updated");

        when(productRepo.save(updated)).thenReturn(updated);

        Product result = productService.updateProduct(1, updated);
        assertEquals("Updated", result.getProductName());
        assertEquals(1, result.getProductId());
    }

    // ✅ Delete product - exists
    @Test
    void testDeleteProductExists() {
        when(productRepo.existsById(10)).thenReturn(true);

        boolean result = productService.deleteProduct(10);

        assertTrue(result);
        verify(productRepo).deleteById(10);
    }

    // ❌ Delete product - not exists
    @Test
    void testDeleteProductNotExists() {
        when(productRepo.existsById(20)).thenReturn(false);

        boolean result = productService.deleteProduct(20);
        assertFalse(result);
        verify(productRepo, never()).deleteById(20);
    }

    // ✅ Get products by category
    @Test
    void testGetProductsByCategory() {
        List<Product> list = List.of(new Product());
        when(productRepo.findByCategory("Electronics")).thenReturn(list);

        List<Product> result = productService.getProductsByCategory("Electronics");
        assertEquals(1, result.size());
    }

    // ✅ Get filter values for category
    @Test
    void testGetFilterValuesForCategory() {
        when(productRepo.findDistinctBrandsByCategory("fashion")).thenReturn(List.of("Nike"));
        when(productRepo.findMinPriceByCategory("fashion")).thenReturn(100.0);
        when(productRepo.findMaxPriceByCategory("fashion")).thenReturn(999.0);
        when(productRepo.findDistinctDiscountsByCategory("fashion")).thenReturn(List.of("10%"));
        when(productRepo.findDistinctGenderByCategory("fashion")).thenReturn(List.of("Male"));
        when(productRepo.findDistinctSizesByCategory("fashion")).thenReturn(List.of("M", "L"));

        Map<String, Object> filters = productService.getFilterValuesForCategory("fashion");

        assertEquals(List.of("Nike"), filters.get("brands"));
        assertEquals(100.0, filters.get("minPrice"));
        assertEquals(999.0, filters.get("maxPrice"));
        assertEquals(List.of("Male"), filters.get("genders"));
        assertEquals(List.of("M", "L"), filters.get("sizes"));
    }

    // ✅ Filtered Products
    @Test
    void testGetFilteredProducts() {
        Product p1 = new Product();
        p1.setPrice(500.0);
        p1.setBrand("Samsung");
        p1.setDiscount("10%");
        p1.setDeliveryInOneDay("Yes");
        p1.setGender("Male");
        p1.setSize("M");
        p1.setCategory("electronics");

        Product p2 = new Product(); // Should be filtered out
        p2.setPrice(2000.0);
        p2.setBrand("Apple");
        p2.setDiscount("No");
        p2.setDeliveryInOneDay("No");
        p2.setGender("Female");
        p2.setSize("L");
        p2.setCategory("electronics");

        List<Product> all = List.of(p1, p2);

        when(productRepo.findByCategory("electronics")).thenReturn(all);

        Map<String, Object> filters = new HashMap<>();
        filters.put("category", "electronics");
        filters.put("priceMin", 100);
        filters.put("priceMax", 1000);
        filters.put("brand", List.of("Samsung"));
        filters.put("discount", List.of("10%"));
        filters.put("delivery", true);
        filters.put("gender", List.of("Male"));
        filters.put("size", List.of("M"));

        List<Product> result = productService.getFilteredProducts(filters);
        assertEquals(1, result.size());
        assertEquals("Samsung", result.get(0).getBrand());
    }

    // ✅ Get products by seller
    @Test
    void testGetProductsBySeller() {
        List<Product> list = List.of(new Product());
        when(productRepo.findBySellerEmail("seller@gmail.com")).thenReturn(list);

        List<Product> result = productService.getProductsBySeller("seller@gmail.com");

        assertEquals(1, result.size());
    }
}
