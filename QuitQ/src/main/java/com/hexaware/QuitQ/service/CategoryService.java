package com.hexaware.QuitQ.service;

import com.hexaware.QuitQ.entity.Category;

import java.util.List;
import java.util.Optional;

public interface CategoryService {
    Category addCategory(Category category);
    List<Category> getAllCategories();
    Optional<Category> getCategoryById(int id);
    Category updateCategory(int id, Category updatedCategory);
    boolean deleteCategory(int id);
}
