package com.hexaware.QuitQ.service;

import com.hexaware.QuitQ.entity.FinalOrder;
import java.util.List;
import java.util.Optional;

public interface FinalOrderService {
    FinalOrder addFinalOrder(FinalOrder order);
    List<FinalOrder> getAllFinalOrders();
    Optional<FinalOrder> getFinalOrderById(int id);
    FinalOrder updateFinalOrder(int id, FinalOrder updatedOrder);
    boolean deleteFinalOrder(int id);
//    List<FinalOrder> getOrdersBySellerEmail(String email);
    List<FinalOrder> getOrdersByCustomer(String email);
    List<FinalOrder> getOrdersBySeller(String sellerEmail);
//    void placeOrder(String customerEmail, String paymentMethod);


}
