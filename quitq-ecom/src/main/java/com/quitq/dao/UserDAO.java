package com.quitq.dao;

import java.util.List;

import com.quitq.entity.User;

public interface UserDAO {
boolean insertUser(User user);
User getUserById(int userId);
List<User> getAllUsers();
boolean updateUser(User user);
boolean deleteUser(int userId);
}