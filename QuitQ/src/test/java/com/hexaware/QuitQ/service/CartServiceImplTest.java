package com.hexaware.QuitQ.service;

import com.hexaware.QuitQ.entity.Cart;
import com.hexaware.QuitQ.entity.CartRepo;
import com.hexaware.QuitQ.entity.Product;
import com.hexaware.QuitQ.entity.ProductRepo;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;

import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class CartServiceImplTest {

    @InjectMocks
    private CartServiceImpl cartService;

    @Mock
    private CartRepo cartRepo;

    @Mock
    private ProductRepo productRepo;

    private Cart cart;
    private Product product;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);

        cart = new Cart();
        cart.setCartId(1);
        cart.setProductId(101);
        cart.setCustomerEmail("test@example.com");
        cart.setProductName("Laptop");
        cart.setBrand("HP");
        cart.setQuantity(1);

        product = new Product();
        product.setProductId(101);
        product.setProductName("Laptop");
        product.setBrand("HP");
        product.setPrice(1000.0);
        product.setImageUrl("image.jpg");
        product.setDiscount(String.valueOf(10.0)); 

        product.setSellerEmail("seller@example.com");
    }

    @Test
    void testAddCart_NewItem() {
        when(cartRepo.findByCustomerEmailAndProductNameAndBrand("test@example.com", "Laptop", "HP"))
                .thenReturn(Optional.empty());
        when(productRepo.findById(101)).thenReturn(Optional.of(product));
        when(cartRepo.save(any(Cart.class))).thenReturn(cart);

        Cart savedCart = cartService.addCart(cart);
        assertNotNull(savedCart);
        assertEquals("Laptop", savedCart.getProductName());
        verify(cartRepo, times(1)).save(any(Cart.class));
    }

    @Test
    void testAddCart_ExistingItem() {
        Cart existingCart = new Cart();
        existingCart.setCartId(1);
        existingCart.setProductId(101);
        existingCart.setCustomerEmail("test@example.com");
        existingCart.setProductName("Laptop");
        existingCart.setBrand("HP");
        existingCart.setQuantity(2);

        when(cartRepo.findByCustomerEmailAndProductNameAndBrand("test@example.com", "Laptop", "HP"))
                .thenReturn(Optional.of(existingCart));
        when(cartRepo.save(any(Cart.class))).thenReturn(existingCart);

        cart.setQuantity(1);
        Cart updatedCart = cartService.addCart(cart);

        assertEquals(3, updatedCart.getQuantity());
        verify(cartRepo, times(1)).save(existingCart);
    }

    @Test
    void testGetAllCarts() {
        when(cartRepo.findAll()).thenReturn(List.of(cart));
        List<Cart> carts = cartService.getAllCarts();
        assertEquals(1, carts.size());
    }

    @Test
    void testGetCartById_Found() {
        when(cartRepo.findById(1)).thenReturn(Optional.of(cart));
        Optional<Cart> found = cartService.getCartById(1);
        assertTrue(found.isPresent());
        assertEquals(1, found.get().getCartId());
    }

    @Test
    void testUpdateCart_Exists() {
        Cart updatedCart = new Cart();
        updatedCart.setQuantity(5);

        when(cartRepo.existsById(1)).thenReturn(true);
        when(cartRepo.save(any(Cart.class))).thenReturn(updatedCart);

        Cart result = cartService.updateCart(1, updatedCart);
        assertEquals(5, result.getQuantity());
    }

    @Test
    void testUpdateCart_NotExists() {
        when(cartRepo.existsById(1)).thenReturn(false);
        Cart result = cartService.updateCart(1, cart);
        assertNull(result);
    }

    @Test
    void testDeleteCart_Exists() {
        when(cartRepo.existsById(1)).thenReturn(true);
        boolean result = cartService.deleteCart(1);
        assertTrue(result);
        verify(cartRepo).deleteById(1);
    }

    @Test
    void testDeleteCart_NotExists() {
        when(cartRepo.existsById(2)).thenReturn(false);
        boolean result = cartService.deleteCart(2);
        assertFalse(result);
    }
}
