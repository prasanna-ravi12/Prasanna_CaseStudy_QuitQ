package com.hexaware.QuitQ.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.hexaware.QuitQ.entity.FinalOrder;
import com.hexaware.QuitQ.entity.FinalOrderRepo;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class DeliveryScheduler {

    @Autowired
    private FinalOrderRepo orderRepo;

    //Run every day at 2 AM
    @Scheduled(cron = "0 0 2 * * ?") // or use @Scheduled(fixedRate = 86400000) for every 24 hours or //    @Scheduled(fixedRate = 30000) // runs every minute
    public void updateDeliveredOrders() {
        LocalDate today = LocalDate.now();

        List<FinalOrder> allOrders = orderRepo.findAll();

        for (FinalOrder order : allOrders) {
            if (order.getExpectedDelivery() != null &&
                order.getExpectedDelivery().toLocalDate().isEqual(today) &&
                (order.getDeliveryStatus() == null || !order.getDeliveryStatus().equals("Delivered"))
            ) {
                order.setDeliveryStatus("Delivered");
                order.setDeliveryDate(order.getExpectedDelivery());
                orderRepo.save(order);
                System.out.println("✔ Updated delivery for order ID: " + order.getId());
            }
        }
    }
}

