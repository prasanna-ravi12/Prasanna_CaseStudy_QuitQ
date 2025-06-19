package com.hexaware.QuitQ.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import com.hexaware.QuitQ.entity.user;
import com.hexaware.QuitQ.entity.userRepo;

@RestController
@RequestMapping("/api/users")
public class UserRestController {

    @Autowired
    private userRepo repo;

    @PostMapping
    public ResponseEntity<user> createUser(@RequestBody user newUser) {
        if (repo.existsById(newUser.getEmail())) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
        repo.save(newUser);
        return new ResponseEntity<>(newUser, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<user>> getAllUsers() {
        return new ResponseEntity<>(repo.findAll(), HttpStatus.OK);
    }

    @GetMapping("/{email}")
    public ResponseEntity<user> getUser(@PathVariable String email) {
        Optional<user> u = repo.findById(email);
        if (u.isPresent()) {
            return new ResponseEntity<>(u.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    
    


    @PutMapping("/{email}")
    public ResponseEntity<user> updateUser(@PathVariable String email, @RequestBody user updatedUser) {
        Optional<user> existingUser = repo.findById(email);
        if (existingUser.isPresent()) {
            updatedUser.setEmail(email); 
            repo.save(updatedUser);
            return new ResponseEntity<>(updatedUser, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{email}")
    public ResponseEntity<Void> deleteUser(@PathVariable String email) {
        if (repo.existsById(email)) {
            repo.deleteById(email);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
