package com.hexaware.QuitQ.dto;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.Test;

public class LoginRequestTest {

    @Test
    void testDefaultConstructorAndSetters() {
        LoginRequest request = new LoginRequest();
        request.setEmail("user@example.com");
        request.setPassword("securePassword");

        assertEquals("user@example.com", request.getEmail());
        assertEquals("securePassword", request.getPassword());
    }

   
    @Test
    void testSetEmail() {
        LoginRequest request = new LoginRequest();
        request.setEmail("test@mail.com");

        assertEquals("test@mail.com", request.getEmail());
    }

    @Test
    void testSetPassword() {
        LoginRequest request = new LoginRequest();
        request.setPassword("testPass");

        assertEquals("testPass", request.getPassword());
    }
}
