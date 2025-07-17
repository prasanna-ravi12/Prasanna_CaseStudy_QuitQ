//package com.hexaware.QuitQ.controller;
//
//import com.hexaware.QuitQ.entity.FinalOrder;
//import com.hexaware.QuitQ.entity.FinalOrderRepo;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.*;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.List;
//import java.util.Optional;
//
//@RestController
//@RequestMapping("/api/finalorders")
//public class FinalOrderRestController {
//
//    @Autowired
//    private FinalOrderRepo repo;
//
//    @PostMapping
//    public ResponseEntity<FinalOrder> addFinalOrder(@RequestBody FinalOrder order) {
//        repo.save(order);
//        return new ResponseEntity<>(order, HttpStatus.CREATED);
//    }
//
//    @GetMapping
//    public ResponseEntity<List<FinalOrder>> getAllFinalOrders() {
//        return new ResponseEntity<>(repo.findAll(), HttpStatus.OK);
//    }
//
//    @GetMapping("/{id}")
//    public ResponseEntity<FinalOrder> getFinalOrderById(@PathVariable int id) {
//        Optional<FinalOrder> optional = repo.findById(id);
//
//        if (optional.isPresent()) {
//            return new ResponseEntity<>(optional.get(), HttpStatus.OK);
//        } else {
//            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
//        }
//    }
//
//    @PutMapping("/{id}")
//    public ResponseEntity<FinalOrder> updateFinalOrder(@PathVariable int id, @RequestBody FinalOrder updatedOrder) {
//        Optional<FinalOrder> optional = repo.findById(id);
//
//        if (optional.isPresent()) {
//            updatedOrder.setId(id); 
//            repo.save(updatedOrder);
//            return new ResponseEntity<>(updatedOrder, HttpStatus.OK);
//        } else {
//            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
//        }
//    }
//
//    @DeleteMapping("/{id}")
//    public ResponseEntity<String> deleteFinalOrder(@PathVariable int id) {
//        Optional<FinalOrder> optional = repo.findById(id);
//
//        if (optional.isPresent()) {
//            repo.deleteById(id);
//            return new ResponseEntity<>("Final Order deleted successfully", HttpStatus.OK);
//        } else {
//            return new ResponseEntity<>("Final Order not found", HttpStatus.NOT_FOUND);
//        }
//    }
//}
package com.hexaware.QuitQ.controller;

import com.hexaware.QuitQ.entity.FinalOrder;
import com.hexaware.QuitQ.service.FinalOrderService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/finalorders")
public class FinalOrderRestController {

    @Autowired
    private FinalOrderService service;

    @PostMapping
    public ResponseEntity<FinalOrder> addFinalOrder(@RequestBody FinalOrder order) {
        FinalOrder saved = service.addFinalOrder(order);
        return new ResponseEntity<>(saved, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<FinalOrder>> getAllFinalOrders() {
        return new ResponseEntity<>(service.getAllFinalOrders(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<FinalOrder> getFinalOrderById(@PathVariable int id) {
        Optional<FinalOrder> order = service.getFinalOrderById(id);
        return order.map(o -> new ResponseEntity<>(o, HttpStatus.OK))
                    .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PutMapping("/{id}")
    public ResponseEntity<FinalOrder> updateFinalOrder(@PathVariable int id, @RequestBody FinalOrder updatedOrder) {
        if (service.getFinalOrderById(id).isPresent()) {
            FinalOrder updated = service.updateFinalOrder(id, updatedOrder);
            return new ResponseEntity<>(updated, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteFinalOrder(@PathVariable int id) {
        if (service.deleteFinalOrder(id)) {
            return new ResponseEntity<>("Final Order deleted successfully", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Final Order not found", HttpStatus.NOT_FOUND);
        }
    }
    
//    @GetMapping("/seller/{email}")
//    public ResponseEntity<List<FinalOrder>> getOrdersBySeller(@PathVariable String email) {
//        return new ResponseEntity<>(service.getOrdersBySellerEmail(email), HttpStatus.OK);
//    }
    
    @GetMapping("/customer/{email}")
    public ResponseEntity<List<FinalOrder>> getOrdersByCustomer(@PathVariable String email) {
        return new ResponseEntity<>(service.getOrdersByCustomer(email), HttpStatus.OK);
    }

    @GetMapping("/seller/{email}")
    public ResponseEntity<List<FinalOrder>> getOrdersBySeller(@PathVariable String email) {
        return new ResponseEntity<>(service.getOrdersBySeller(email), HttpStatus.OK);
    }
    
   

}
