package com.hexaware.QuitQ.entity;

import static org.junit.jupiter.api.Assertions.assertNotNull;

import com.hexaware.QuitQBackend.entity.CategoryRepo;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest  
public class CartRepoTest {

    @Autowired
    private CartRepo cartRepo;

    @Test
    void testCategoryRepoIsNotNull() {
        assertNotNull(cartRepo, "CategoryRepo should not be null");
    }
}
