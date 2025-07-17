//package com.hexaware.QuitQ.controller;
//
//import com.hexaware.QuitQ.entity.Product;
//import com.hexaware.QuitQ.entity.ProductRepo;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.*;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.*;
//
//@RestController
//@RequestMapping("/api/products")
//public class ProductRestController {
//
//    @Autowired
//    private ProductRepo repo;
//
//    @PostMapping
//    public ResponseEntity<Product> addProduct(@RequestBody Product product) {
//        repo.save(product);
//        return new ResponseEntity<>(product, HttpStatus.CREATED);
//    }
//
//    @GetMapping
//    public ResponseEntity<List<Product>> getAllProducts() {
//        return new ResponseEntity<>(repo.findAll(), HttpStatus.OK);
//    }
//
//    @GetMapping("/{id}")
//    public ResponseEntity<Product> getProductById(@PathVariable int id) {
//        Optional<Product> optionalProduct = repo.findById(id);
//        if (optionalProduct.isPresent()) {
//            return new ResponseEntity<>(optionalProduct.get(), HttpStatus.OK);
//        } else {
//            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
//        }
//    }
//
//    @PutMapping("/{id}")
//    public ResponseEntity<Product> updateProduct(@PathVariable int id, @RequestBody Product updatedProduct) {
//        Optional<Product> optionalProduct = repo.findById(id);
//        if (optionalProduct.isPresent()) {
//            updatedProduct.setProductId(id); 
//            repo.save(updatedProduct);
//            return new ResponseEntity<>(updatedProduct, HttpStatus.OK);
//        } else {
//            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
//        }
//    }
//
//    @DeleteMapping("/{id}")
//    public ResponseEntity<String> deleteProduct(@PathVariable int id) {
//        Optional<Product> optionalProduct = repo.findById(id);
//        if (optionalProduct.isPresent()) {
//            repo.deleteById(id);
//            return new ResponseEntity<>("Product deleted successfully", HttpStatus.OK);
//        } else {
//            return new ResponseEntity<>("Product not found", HttpStatus.NOT_FOUND);
//        }
//    }
//}
package com.hexaware.QuitQ.controller;

import com.hexaware.QuitQ.entity.Product;
import com.hexaware.QuitQ.service.ProductService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/products")
public class ProductRestController {

    @Autowired
    private ProductService service;

    @PostMapping
    public ResponseEntity<Product> addProduct(@RequestBody Product product) {
        Product saved = service.addProduct(product);
        return new ResponseEntity<>(saved, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<Product>> getAllProducts() {
        return new ResponseEntity<>(service.getAllProducts(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable int id) {
        Optional<Product> product = service.getProductById(id);
        return product.map(p -> new ResponseEntity<>(p, HttpStatus.OK))
                      .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Product> updateProduct(@PathVariable int id, @RequestBody Product updatedProduct) {
        if (service.getProductById(id).isPresent()) {
            Product updated = service.updateProduct(id, updatedProduct);
            return new ResponseEntity<>(updated, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteProduct(@PathVariable int id) {
        if (service.deleteProduct(id)) {
            return new ResponseEntity<>("Product deleted successfully", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Product not found", HttpStatus.NOT_FOUND);
        }
    }
    
    @GetMapping("/category/{categoryName}")
    public ResponseEntity<List<Product>> getProductsByCategory(@PathVariable String categoryName) {
    List<Product> products = service.getProductsByCategory(categoryName);
    return new ResponseEntity<>(products, HttpStatus.OK);
    }
    
    @PostMapping("/filter")
    public ResponseEntity<List<Product>> getFilteredProducts(@RequestBody Map<String, Object> filters) {
        List<Product> result = service.getFilteredProducts(filters);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @GetMapping("/filter-values/{category}")
    public ResponseEntity<Map<String, Object>> getFilterValues(@PathVariable String category) {
        Map<String, Object> filters = service.getFilterValuesForCategory(category);
        return new ResponseEntity<>(filters, HttpStatus.OK);
    }

    
    @GetMapping("/seller/{email}")
    public ResponseEntity<List<Product>> getProductsBySeller(@PathVariable String SellerEmail) {
        List<Product> products = service.getProductsBySeller(SellerEmail);
        return new ResponseEntity<>(products, HttpStatus.OK);
    }

 

}
