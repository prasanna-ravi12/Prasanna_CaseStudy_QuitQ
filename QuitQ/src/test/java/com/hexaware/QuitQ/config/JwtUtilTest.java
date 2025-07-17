package com.hexaware.QuitQ.config;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

public class JwtUtilTest {

    private JwtUtil jwtUtil;

    @BeforeEach
    public void setUp() {
        jwtUtil = new JwtUtil();
    }

    @Test
    public void testGenerateAndExtractUsername() {
        String token = jwtUtil.generateToken("testuser@example.com", "CUSTOMER");

        assertNotNull(token);
        String username = jwtUtil.extractUsername(token);
        assertEquals("testuser@example.com", username);
    }

    @Test
    public void testGenerateAndExtractRole() {
        String token = jwtUtil.generateToken("seller@example.com", "SELLER");

        assertEquals("SELLER", jwtUtil.extractRole(token));
    }

    @Test
    public void testValidateValidToken() {
        String token = jwtUtil.generateToken("admin@example.com", "ADMIN");
        assertTrue(jwtUtil.validateToken(token));
    }

    @Test
    public void testValidateInvalidToken() {
        String invalidToken = "abc.def.ghi";
        assertFalse(jwtUtil.validateToken(invalidToken));
    }

    @Test
    public void testExtractFromExpiredToken() throws InterruptedException {
        // Create custom JwtUtil subclass with short expiration
        JwtUtil shortExpiryUtil = new JwtUtil() {
            @Override
            public String generateToken(String username, String role) {
                return Jwts.builder()
                        .setSubject(username)
                        .claim("role", role)
                        .setIssuedAt(new java.util.Date(System.currentTimeMillis()))
                        .setExpiration(new java.util.Date(System.currentTimeMillis() + 1000)) // 1 sec
                        .signWith(io.jsonwebtoken.security.Keys.hmacShaKeyFor("Qv3jP8YZtMBv2EaWmZs9uFjKWqx7XHy2RUHgJ6cvz5g=\n".getBytes()), io.jsonwebtoken.SignatureAlgorithm.HS256)
                        .compact();
            }
        };

        String token = shortExpiryUtil.generateToken("expireduser", "CUSTOMER");
        Thread.sleep(1500); // wait until token expires

        assertFalse(shortExpiryUtil.validateToken(token));
    }
}
