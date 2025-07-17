package com.hexaware.QuitQ.service;

import com.hexaware.QuitQ.entity.Cart;
import com.hexaware.QuitQ.entity.CartRepo;
import com.hexaware.QuitQ.entity.FinalOrder;
import com.hexaware.QuitQ.entity.FinalOrderRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class FinalOrderServiceImpl implements FinalOrderService {

    @Autowired
    private FinalOrderRepo repo;
    
   

    @Autowired
    private CartRepo cartRepo;

    @Override
    public FinalOrder addFinalOrder(FinalOrder order) {
        return repo.save(order);
    }

    @Override
    public List<FinalOrder> getAllFinalOrders() {
        return repo.findAll();
    }

    @Override
    public Optional<FinalOrder> getFinalOrderById(int id) {
        return repo.findById(id);
    }

    @Override
    public FinalOrder updateFinalOrder(int id, FinalOrder updatedOrder) {
        updatedOrder.setId(id); // Change this if your field is finalOrderId
        return repo.save(updatedOrder);
    }

    @Override
    public boolean deleteFinalOrder(int id) {
        if (repo.existsById(id)) {
            repo.deleteById(id);
            return true;
        }
        return false;
    }
    
//    @Override
//    public List<FinalOrder> getOrdersBySellerEmail(String email) {
//        return repo.findBySellerEmail(email);
//    }
//    
    @Override
    public List<FinalOrder> getOrdersByCustomer(String email) {
        return repo.findByCustomerEmail(email);
    }

    @Override
    public List<FinalOrder> getOrdersBySeller(String sellerEmail) {
        return repo.findBySellerEmail(sellerEmail);
    }

//    @Override
//    public void placeOrder(String customerEmail, String paymentMethod) {
//        List<Cart> cartItems = cartRepo.findByCustomerEmail(customerEmail);
//
//        for (Cart cart : cartItems) {
//            double price = cart.getPrice();
//            int quantity = cart.getQuantity();
//            double discount = 0.0;
//
//            if (cart.getDiscount() != null && !cart.getDiscount().equalsIgnoreCase("No")) {
//                String stripped = cart.getDiscount().replaceAll("%", "");
//                try {
//                    discount = Double.parseDouble(stripped);
//                } catch (Exception e) {
//                    discount = 0.0;
//                }
//            }
//
//            double discountedPrice = price - (price * discount / 100.0);
//            double totalAmount = discountedPrice * quantity;
//
//            FinalOrder order = new FinalOrder();
//            order.setCustomerEmail(customerEmail);
//            order.setProductName(cart.getProductName());
//            order.setBrand(cart.getBrand());
//            order.setPrice(discountedPrice);
//            order.setQuantity(quantity);
//            order.setTotalAmount(totalAmount);
//            order.setPaymentMethod(paymentMethod);
//            order.setPaymentStatus("Paid");
//            order.setOrderDate(LocalDateTime.now());
//            order.setSellerEmail(cart.getSellerEmail());
//            order.setImageUrl(cart.getImageUrl());
//
//            repo.save(order);
//        }
//
//        cartRepo.deleteAll(cartItems);
//    }
}

