package com.hexaware.QuitQ.entity;

import static org.junit.jupiter.api.Assertions.assertNotNull;

import com.hexaware.QuitQ.entity.WishlistRepo;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class WishlistRepoTest {

    @Autowired
    private WishlistRepo wishlistRepo;

    @Test
    void testWishlistRepoIsNotNull() {
        assertNotNull(wishlistRepo, "WishlistRepo should not be null");
    }
}
