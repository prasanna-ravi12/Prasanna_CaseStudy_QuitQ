package com.hexaware.QuitQ.service;

import com.hexaware.QuitQ.entity.Product;
import com.hexaware.QuitQ.entity.ProductRepo;
import com.hexaware.QuitQ.entity.WishlistItem;
import com.hexaware.QuitQ.entity.WishlistRepo;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class WishlistServiceImplTest {

    @Mock
    private WishlistRepo wishlistRepo;

    @Mock
    private ProductRepo productRepo;

    @InjectMocks
    private WishlistServiceImpl service;

    private WishlistItem wishlistItem;
    private Product product;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);

        wishlistItem = new WishlistItem();
        wishlistItem.setCustomerEmail("user@gmail.com");
        wishlistItem.setProductId(1);

        product = new Product();
        product.setProductId(1);
        product.setProductName("iPhone");
        product.setBrand("Apple");
        product.setPrice(999.99);
        product.setImageUrl("iphone.jpg");
        product.setSellerEmail("apple@seller.com");
        product.setDiscount("10%");
        product.setCategory("Electronics");
    }

    @Test
    public void testAddToWishlist_NewItem() {
        when(wishlistRepo.existsByCustomerEmailAndProductId("user@gmail.com", 1)).thenReturn(false);
        when(productRepo.findById(1)).thenReturn(Optional.of(product));
        when(wishlistRepo.save(any(WishlistItem.class))).thenAnswer(invocation -> invocation.getArgument(0));

        WishlistItem result = service.addToWishlist(wishlistItem);

        assertNotNull(result);
        assertEquals("iPhone", result.getProductName());
        assertEquals("Apple", result.getBrand());
        assertEquals(999.99, result.getPrice());
        assertEquals("iphone.jpg", result.getImageUrl());
        assertEquals("apple@seller.com", result.getSellerEmail());
        assertEquals(10.0, result.getDiscount());
        assertEquals("Electronics", result.getCategory());
    }

    @Test
    public void testAddToWishlist_AlreadyExists() {
        when(wishlistRepo.existsByCustomerEmailAndProductId("user@gmail.com", 1)).thenReturn(true);

        WishlistItem result = service.addToWishlist(wishlistItem);

        assertNull(result);
        verify(wishlistRepo, never()).save(any());
    }

    @Test
    public void testGetWishlist() {
        when(wishlistRepo.findByCustomerEmail("user@gmail.com")).thenReturn(Arrays.asList(wishlistItem));

        List<WishlistItem> result = service.getWishlist("user@gmail.com");

        assertEquals(1, result.size());
        assertEquals(1, result.get(0).getProductId());
    }

    @Test
    public void testRemoveFromWishlist() {
        service.removeFromWishlist("user@gmail.com", 1);

        verify(wishlistRepo).deleteByCustomerEmailAndProductId("user@gmail.com", 1);
    }

    @Test
    public void testDeleteFromWishlist() {
        service.deleteFromWishlist(101);

        verify(wishlistRepo).deleteById(101);
    }
}
