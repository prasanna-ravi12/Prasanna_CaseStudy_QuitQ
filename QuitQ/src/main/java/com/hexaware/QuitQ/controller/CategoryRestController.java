//package com.hexaware.QuitQ.controller;
//
//import java.util.List;
//import java.util.Optional;
//
//import com.hexaware.QuitQ.entity.Category;
//import com.hexaware.QuitQ.entity.CategoryRepo;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.*;
//import org.springframework.web.bind.annotation.*;
//
//@RestController
//@RequestMapping("/api/categories")
//public class CategoryRestController {
//
//    @Autowired
//    private CategoryRepo repo;
//
//    @PostMapping
//    public ResponseEntity<Category> addCategory(@RequestBody Category category) {
//        repo.save(category);
//        return new ResponseEntity<>(category, HttpStatus.CREATED);
//    }
//
//    @GetMapping
//    public ResponseEntity<List<Category>> getAllCategories() {
//        return new ResponseEntity<>(repo.findAll(), HttpStatus.OK);
//    }
//
//    @GetMapping("/{id}")
//    public ResponseEntity<Category> getCategoryById(@PathVariable int id) {
//        Optional<Category> optional = repo.findById(id);
//
//        if (optional.isPresent()) {
//            return new ResponseEntity<>(optional.get(), HttpStatus.OK);
//        } else {
//            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
//        }
//    }
//
//    @PutMapping("/{id}")
//    public ResponseEntity<Category> updateCategory(@PathVariable int id, @RequestBody Category updatedCategory) {
//        Optional<Category> optional = repo.findById(id);
//        if (optional.isPresent()) {
//            repo.save(updatedCategory);  
//            return new ResponseEntity<>(updatedCategory, HttpStatus.OK);
//        } else {
//            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
//        }
//    }
//
//    @DeleteMapping("/{id}")
//    public ResponseEntity<String> deleteCategory(@PathVariable int id) {
//        Optional<Category> optional = repo.findById(id);
//        if (optional.isPresent()) {
//            repo.deleteById(id);
//            return new ResponseEntity<>("Category deleted successfully", HttpStatus.OK);
//        } else {
//            return new ResponseEntity<>("Category not found", HttpStatus.NOT_FOUND);
//        }
//    }
//}
package com.hexaware.QuitQ.controller;

import com.hexaware.QuitQ.entity.Category;
import com.hexaware.QuitQ.service.CategoryService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/categories")
public class CategoryRestController {

    @Autowired
    private CategoryService service;

    @PostMapping
    public ResponseEntity<Category> addCategory(@RequestBody Category category) {
        Category saved = service.addCategory(category);
        return new ResponseEntity<>(saved, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<Category>> getAllCategories() {
        return new ResponseEntity<>(service.getAllCategories(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Category> getCategoryById(@PathVariable int id) {
        Optional<Category> optional = service.getCategoryById(id);

        return optional.map(cat -> new ResponseEntity<>(cat, HttpStatus.OK))
                       .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Category> updateCategory(@PathVariable int id, @RequestBody Category updatedCategory) {
        Category updated = service.updateCategory(id, updatedCategory);
        if (updated != null) {
            return new ResponseEntity<>(updated, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteCategory(@PathVariable int id) {
        boolean deleted = service.deleteCategory(id);
        if (deleted) {
            return new ResponseEntity<>("Category deleted successfully", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Category not found", HttpStatus.NOT_FOUND);
        }
    }
}
