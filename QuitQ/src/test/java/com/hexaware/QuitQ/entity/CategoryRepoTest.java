package com.hexaware.QuitQ.entity;

import static org.junit.jupiter.api.Assertions.assertNotNull;

import com.hexaware.QuitQ.entity.CategoryRepo;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest  
public class CategoryRepoTest {

    @Autowired
    private CategoryRepo categoryRepo;

    @Test
    void testCategoryRepoIsNotNull() {
        assertNotNull(categoryRepo, "CategoryRepo should not be null");
    }
}
