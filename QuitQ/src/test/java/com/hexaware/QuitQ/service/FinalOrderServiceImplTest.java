package com.hexaware.QuitQ.service;

import com.hexaware.QuitQ.entity.Cart;
import com.hexaware.QuitQ.entity.CartRepo;
import com.hexaware.QuitQ.entity.FinalOrder;
import com.hexaware.QuitQ.entity.FinalOrderRepo;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;

import java.time.LocalDateTime;
import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class FinalOrderServiceImplTest {

    @Mock
    private FinalOrderRepo finalOrderRepo;

    @Mock
    private CartRepo cartRepo;

    @InjectMocks
    private FinalOrderServiceImpl finalOrderService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    // ✅ Test: Add Final Order
    @Test
    void testAddFinalOrder() {
        FinalOrder order = new FinalOrder();
        order.setCustomerEmail("test@gmail.com");

        when(finalOrderRepo.save(order)).thenReturn(order);

        FinalOrder result = finalOrderService.addFinalOrder(order);

        assertEquals("test@gmail.com", result.getCustomerEmail());
        verify(finalOrderRepo).save(order);
    }

    // ✅ Test: Get All Orders
    @Test
    void testGetAllFinalOrders() {
        List<FinalOrder> orders = List.of(new FinalOrder(), new FinalOrder());
        when(finalOrderRepo.findAll()).thenReturn(orders);

        List<FinalOrder> result = finalOrderService.getAllFinalOrders();

        assertEquals(2, result.size());
    }

    // ✅ Test: Get Final Order By ID
    @Test
    void testGetFinalOrderById() {
        FinalOrder order = new FinalOrder();
        order.setId(1);

        when(finalOrderRepo.findById(1)).thenReturn(Optional.of(order));

        Optional<FinalOrder> result = finalOrderService.getFinalOrderById(1);

        assertTrue(result.isPresent());
        assertEquals(1, result.get().getId());
    }

    // ✅ Test: Update Final Order
    @Test
    void testUpdateFinalOrder() {
        FinalOrder updated = new FinalOrder();
        updated.setCustomerEmail("updated@gmail.com");

        when(finalOrderRepo.save(any(FinalOrder.class))).thenReturn(updated);

        FinalOrder result = finalOrderService.updateFinalOrder(1, updated);

        assertEquals("updated@gmail.com", result.getCustomerEmail());
        assertEquals(1, result.getId());
        verify(finalOrderRepo).save(updated);
    }

    // ✅ Test: Delete Final Order - Exists
    @Test
    void testDeleteFinalOrderExists() {
        when(finalOrderRepo.existsById(5)).thenReturn(true);

        boolean result = finalOrderService.deleteFinalOrder(5);

        assertTrue(result);
        verify(finalOrderRepo).deleteById(5);
    }

    // ✅ Test: Delete Final Order - Not Exists
    @Test
    void testDeleteFinalOrderNotExists() {
        when(finalOrderRepo.existsById(10)).thenReturn(false);

        boolean result = finalOrderService.deleteFinalOrder(10);

        assertFalse(result);
        verify(finalOrderRepo, never()).deleteById(10);
    }

    // ✅ Test: Get Orders by Customer Email
    @Test
    void testGetOrdersByCustomer() {
        List<FinalOrder> mockOrders = List.of(new FinalOrder(), new FinalOrder());
        when(finalOrderRepo.findByCustomerEmail("cust@gmail.com")).thenReturn(mockOrders);

        List<FinalOrder> result = finalOrderService.getOrdersByCustomer("cust@gmail.com");

        assertEquals(2, result.size());
    }

    // ✅ Test: Get Orders by Seller Email
    @Test
    void testGetOrdersBySeller() {
        List<FinalOrder> mockOrders = List.of(new FinalOrder());
        when(finalOrderRepo.findBySellerEmail("seller@gmail.com")).thenReturn(mockOrders);

        List<FinalOrder> result = finalOrderService.getOrdersBySeller("seller@gmail.com");

        assertEquals(1, result.size());
    }
}
