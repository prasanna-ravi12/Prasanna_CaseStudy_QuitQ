package com.quitq.entity;

public class User {
    private int userId;
    private String name;
    private String gender;
    private String email;
    private String passwordHash;
    private String contactNumber;
    private String address;
    private String role;
    private String createdAt;

    public User() {}

    public User(int userId, String name, String gender, String email, String passwordHash,
                String contactNumber, String address, String role, String createdAt) {
        this.userId = userId;
        this.name = name;
        this.gender = gender;
        this.email = email;
        this.passwordHash = passwordHash;
        this.contactNumber = contactNumber;
        this.address = address;
        this.role = role;
        this.createdAt = createdAt;
    }

    public int getUserId() { return userId; }
    public void setUserId(int userId) { this.userId = userId; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getGender() { return gender; }
    public void setGender(String gender) { this.gender = gender; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPasswordHash() { return passwordHash; }
    public void setPasswordHash(String passwordHash) { this.passwordHash = passwordHash; }

    public String getContactNumber() { return contactNumber; }
    public void setContactNumber(String contactNumber) { this.contactNumber = contactNumber; }

    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }

    public String getCreatedAt() { return createdAt; }
    public void setCreatedAt(String createdAt) { this.createdAt = createdAt; }

    @Override
     public String toString() {
        return "User ID: " + userId + ", Name: " + name + ", Email: " + email + ", Role: " + role;
    }
}
