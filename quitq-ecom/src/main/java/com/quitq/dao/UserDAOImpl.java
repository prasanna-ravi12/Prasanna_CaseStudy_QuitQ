package com.quitq.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import com.quitq.entity.User;
import com.quitq.util.DBUtil;

public class UserDAOImpl implements UserDAO {
    @Override
public boolean insertUser(User user) {
    String sql = "INSERT INTO Users (name, gender, email, password_hash, contact_number, address, role, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    try (Connection conn = DBUtil.getDBConnection();
         PreparedStatement ps = conn.prepareStatement(sql)) {

        ps.setString(1, user.getName());
        ps.setString(2, user.getGender());
        ps.setString(3, user.getEmail());
        ps.setString(4, user.getPasswordHash());
        ps.setString(5, user.getContactNumber());
        ps.setString(6, user.getAddress());
        ps.setString(7, user.getRole());
        ps.setString(8, user.getCreatedAt());

        return ps.executeUpdate() > 0;
    } catch (SQLException e) {
        System.out.println("Insert failed: " + e.getMessage());
        return false;
    }
}

@Override
public User getUserById(int userId) {
    String sql = "SELECT * FROM Users WHERE user_id = ?";
    try (Connection conn = DBUtil.getDBConnection();
         PreparedStatement ps = conn.prepareStatement(sql)) {

        ps.setInt(1, userId);
        ResultSet rs = ps.executeQuery();
        if (rs.next()) {
            return extractUser(rs);
        }
    } catch (SQLException e) {
        System.out.println("Fetch failed: " + e.getMessage());
    }
    return null;
}

@Override
public List<User> getAllUsers() {
    List<User> list = new ArrayList<>();
    String sql = "SELECT * FROM Users";

    try (Connection conn = DBUtil.getDBConnection();
         Statement stmt = conn.createStatement();
         ResultSet rs = stmt.executeQuery(sql)) {

        while (rs.next()) {
            list.add(extractUser(rs));
        }
    } catch (SQLException e) {
        System.out.println("Fetch all failed: " + e.getMessage());
    }

    return list;
}

@Override
public boolean updateUser(User user) {
    String sql = "UPDATE Users SET name = ?, gender = ?, email = ?, password_hash = ?, contact_number = ?, address = ?, role = ?, created_at = ? WHERE user_id = ?";
    try (Connection conn = DBUtil.getDBConnection();
         PreparedStatement ps = conn.prepareStatement(sql)) {

        ps.setString(1, user.getName());
        ps.setString(2, user.getGender());
        ps.setString(3, user.getEmail());
        ps.setString(4, user.getPasswordHash());
        ps.setString(5, user.getContactNumber());
        ps.setString(6, user.getAddress());
        ps.setString(7, user.getRole());
        ps.setString(8, user.getCreatedAt());
        ps.setInt(9, user.getUserId());

        return ps.executeUpdate() > 0;
    } catch (SQLException e) {
        System.out.println("Update failed: " + e.getMessage());
        return false;
    }
}

@Override
public boolean deleteUser(int userId) {
    String sql = "DELETE FROM Users WHERE user_id = ?";
    try (Connection conn = DBUtil.getDBConnection();
         PreparedStatement ps = conn.prepareStatement(sql)) {

        ps.setInt(1, userId);
        return ps.executeUpdate() > 0;
    } catch (SQLException e) {
        System.out.println("Delete failed: " + e.getMessage());
        return false;
    }
}

private User extractUser(ResultSet rs) throws SQLException {
    return new User(
        rs.getInt("user_id"),
        rs.getString("name"),
        rs.getString("gender"),
        rs.getString("email"),
        rs.getString("password_hash"),
        rs.getString("contact_number"),
        rs.getString("address"),
        rs.getString("role"),
        rs.getString("created_at")
    );
}
}