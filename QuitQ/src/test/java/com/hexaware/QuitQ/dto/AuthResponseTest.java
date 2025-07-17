package com.hexaware.QuitQ.dto;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.Test;

public class AuthResponseTest {

    @Test
    void testConstructorAndGetters() {
        AuthResponse response = new AuthResponse("sampleToken123", "ROLE_USER");

        assertEquals("sampleToken123", response.getToken());
        assertEquals("ROLE_USER", response.getRole());
    }

    @Test
    void testSetters() {
        AuthResponse response = new AuthResponse(null, null);

        response.setToken("newToken456");
        response.setRole("ROLE_ADMIN");

        assertEquals("newToken456", response.getToken());
        assertEquals("ROLE_ADMIN", response.getRole());
    }

    @Test
    void testTokenSetterGetter() {
        AuthResponse response = new AuthResponse(null, "USER");
        response.setToken("abc123");
        assertEquals("abc123", response.getToken());
    }

    @Test
    void testRoleSetterGetter() {
        AuthResponse response = new AuthResponse("jwt-token", null);
        response.setRole("ADMIN");
        assertEquals("ADMIN", response.getRole());
    }
}
