package com.hexaware.QuitQ.service;

import com.hexaware.QuitQ.entity.user;

import java.util.List;
import java.util.Optional;

public interface UserService {
    user createUser(user newUser);
    List<user> getAllUsers();
    Optional<user> getUserByEmail(String email);
    user updateUser(String email, user updatedUser);
    boolean deleteUser(String email);
    boolean userExists(String email);
    String encodePassword(String rawPassword);
}
