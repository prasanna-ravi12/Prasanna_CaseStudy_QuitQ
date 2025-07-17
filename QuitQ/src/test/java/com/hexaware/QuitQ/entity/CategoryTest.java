package com.hexaware.QuitQ.entity;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

public class CategoryTest {

    @Test
    public void testCategoryConstructorAndGetters() {
        int id = 101;
        String name = "Electronics";

        Category category = new Category(id, name);

        assertEquals(101, category.getCategoryId());
        assertEquals("Electronics", category.getCategoryName());
    }

    @Test
    public void testSetters() {
        Category category = new Category();

        category.setCategoryId(202);
        category.setCategoryName("Clothing");

        assertEquals(202, category.getCategoryId());
        assertEquals("Clothing", category.getCategoryName());
    }
}
