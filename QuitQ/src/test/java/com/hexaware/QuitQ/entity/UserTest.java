package com.hexaware.QuitQ.entity;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

public class UserTest {

    @Test
    public void testConstructorAndGetters() {
        
        String name = "John Doe";
        String email = "john@example.com";
        String password = "password123";
        String gender = "Male";
        String phone = "1234567890";
        String address = "123 Street, City";
        String role = "Customer";

        user userObj = new user(name, email, password, gender, phone, address, role);

        assertEquals(name, userObj.getName());
        assertEquals(email, userObj.getEmail());
        assertEquals(password, userObj.getPassword());
        assertEquals(gender, userObj.getGender());
        assertEquals(phone, userObj.getPhone());
        assertEquals(address, userObj.getAddress());
        assertEquals(role, userObj.getRole());
    }

    @Test
    public void testSetters() {
        user userObj = new user();

        userObj.setName("Alice");
        userObj.setEmail("alice@example.com");
        userObj.setPassword("alice123");
        userObj.setGender("Female");
        userObj.setPhone("9876543210");
        userObj.setAddress("456 Avenue, Town");
        userObj.setRole("Admin");

        assertEquals("Alice", userObj.getName());
        assertEquals("alice@example.com", userObj.getEmail());
        assertEquals("alice123", userObj.getPassword());
        assertEquals("Female", userObj.getGender());
        assertEquals("9876543210", userObj.getPhone());
        assertEquals("456 Avenue, Town", userObj.getAddress());
        assertEquals("Admin", userObj.getRole());
    }

    
}
