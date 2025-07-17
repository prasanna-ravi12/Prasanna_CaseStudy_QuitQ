package com.hexaware.QuitQ.service;

import com.hexaware.QuitQ.entity.Category;
import com.hexaware.QuitQ.entity.CategoryRepo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoryServiceImpl implements CategoryService {

    @Autowired
    private CategoryRepo repo;

    @Override
    public Category addCategory(Category category) {
        return repo.save(category);
    }

    @Override
    public List<Category> getAllCategories() {
        return repo.findAll();
    }

    @Override
    public Optional<Category> getCategoryById(int id) {
        return repo.findById(id);
    }

    @Override
    public Category updateCategory(int id, Category updatedCategory) {
        if (repo.existsById(id)) {
            updatedCategory.setCategoryId(id);  // Ensure correct ID
            return repo.save(updatedCategory);
        }
        return null;
    }

    @Override
    public boolean deleteCategory(int id) {
        if (repo.existsById(id)) {
            repo.deleteById(id);
            return true;
        }
        return false;
    }
}
