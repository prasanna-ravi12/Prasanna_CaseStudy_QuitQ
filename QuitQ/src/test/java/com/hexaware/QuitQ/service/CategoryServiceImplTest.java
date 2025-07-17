package com.hexaware.QuitQ.service;

import com.hexaware.QuitQ.entity.Category;
import com.hexaware.QuitQ.entity.CategoryRepo;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;
import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class CategoryServiceImplTest {

    @Mock
    private CategoryRepo repo;

    @InjectMocks
    private CategoryServiceImpl service;

    private Category category;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        category = new Category();
        category.setCategoryId(1);
        category.setCategoryName("Electronics");
    }

    @Test
    void testAddCategory() {
        when(repo.save(category)).thenReturn(category);
        Category saved = service.addCategory(category);
        assertEquals("Electronics", saved.getCategoryName());
        verify(repo, times(1)).save(category);
    }

    @Test
    void testGetAllCategories() {
        List<Category> mockList = Arrays.asList(category);
        when(repo.findAll()).thenReturn(mockList);

        List<Category> result = service.getAllCategories();
        assertEquals(1, result.size());
        assertEquals("Electronics", result.get(0).getCategoryName());
    }

    @Test
    void testGetCategoryById() {
        when(repo.findById(1)).thenReturn(Optional.of(category));

        Optional<Category> found = service.getCategoryById(1);
        assertTrue(found.isPresent());
        assertEquals("Electronics", found.get().getCategoryName());
    }

    @Test
    void testUpdateCategoryWhenExists() {
        when(repo.existsById(1)).thenReturn(true);
        when(repo.save(any(Category.class))).thenAnswer(i -> i.getArgument(0));

        Category updated = new Category();
        updated.setCategoryName("Updated Name");

        Category result = service.updateCategory(1, updated);
        assertEquals(1, result.getCategoryId());
        assertEquals("Updated Name", result.getCategoryName());
    }

    @Test
    void testUpdateCategoryWhenNotExists() {
        when(repo.existsById(1)).thenReturn(false);
        Category result = service.updateCategory(1, category);
        assertNull(result);
    }

    @Test
    void testDeleteCategoryWhenExists() {
        when(repo.existsById(1)).thenReturn(true);
        boolean deleted = service.deleteCategory(1);
        assertTrue(deleted);
        verify(repo).deleteById(1);
    }

    @Test
    void testDeleteCategoryWhenNotExists() {
        when(repo.existsById(1)).thenReturn(false);
        boolean deleted = service.deleteCategory(1);
        assertFalse(deleted);
    }
}
