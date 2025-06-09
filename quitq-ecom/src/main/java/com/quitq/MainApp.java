package com.quitq;

import java.util.List;
import java.util.Scanner;

import com.quitq.dao.UserDAO;
import com.quitq.dao.UserDAOImpl;
import com.quitq.entity.User;

public class MainApp {
    public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);
    UserDAO dao = new UserDAOImpl();

    while (true) {
        System.out.println("\n========= QuitQ User Menu =========");
        System.out.println("1. Insert User");
        System.out.println("2. Get User by ID");
        System.out.println("3. Get All Users");
        System.out.println("4. Update User");
        System.out.println("5. Delete User");
        System.out.println("6. Exit");
        System.out.print("Enter your choice: ");
        int choice = sc.nextInt();
        sc.nextLine(); // consume newline

        switch (choice) {
            case 1:
                User u = new User();
                System.out.print("Enter name: ");
                u.setName(sc.nextLine());
                System.out.print("Enter gender (Male/Female/Other): ");
                u.setGender(sc.nextLine());
                System.out.print("Enter email: ");
                u.setEmail(sc.nextLine());
                System.out.print("Enter password: ");
                u.setPasswordHash(sc.nextLine());
                System.out.print("Enter contact number: ");
                u.setContactNumber(sc.nextLine());
                System.out.print("Enter address: ");
                u.setAddress(sc.nextLine());
                System.out.print("Enter role (Customer/Seller/Admin): ");
                u.setRole(sc.nextLine());
                System.out.print("Enter createdAt (yyyy-mm-dd hh:mm:ss): ");
                u.setCreatedAt(sc.nextLine());

                if (dao.insertUser(u))
                    System.out.println("✅ User inserted successfully.");
                else
                    System.out.println("❌ Failed to insert user.");
                break;

            case 2:
                System.out.print("Enter user ID to fetch: ");
                int fetchId = sc.nextInt();
                User fetched = dao.getUserById(fetchId);
                if (fetched != null)
                    System.out.println(fetched);
                else
                    System.out.println("❌ User not found.");
                break;

            case 3:
                List<User> users = dao.getAllUsers();
                if (users.isEmpty()) {
                    System.out.println("❌ No users found.");
                } else {
                    for (User user : users) {
                        System.out.println(user);
                    }
                }
                break;

            case 4:
                System.out.print("Enter user ID to update: ");
                int updateId = sc.nextInt();
                sc.nextLine(); // consume newline
                User old = dao.getUserById(updateId);
                if (old == null) {
                    System.out.println("❌ User not found.");
                    break;
                }

                System.out.print("Enter new name (" + old.getName() + "): ");
                old.setName(sc.nextLine());
                System.out.print("Enter new gender (" + old.getGender() + "): ");
                old.setGender(sc.nextLine());
                System.out.print("Enter new email (" + old.getEmail() + "): ");
                old.setEmail(sc.nextLine());
                System.out.print("Enter new password: ");
                old.setPasswordHash(sc.nextLine());
                System.out.print("Enter new contact (" + old.getContactNumber() + "): ");
                old.setContactNumber(sc.nextLine());
                System.out.print("Enter new address (" + old.getAddress() + "): ");
                old.setAddress(sc.nextLine());
                System.out.print("Enter new role (" + old.getRole() + "): ");
                old.setRole(sc.nextLine());
                System.out.print("Enter new createdAt (" + old.getCreatedAt() + "): ");
                old.setCreatedAt(sc.nextLine());

                if (dao.updateUser(old))
                    System.out.println("✅ User updated successfully.");
                else
                    System.out.println("❌ Failed to update user.");
                break;

            case 5:
                System.out.print("Enter user ID to delete: ");
                int delId = sc.nextInt();
                if (dao.deleteUser(delId))
                    System.out.println("✅ User deleted.");
                else
                    System.out.println("❌ Deletion failed.");
                break;

            case 6:
                System.out.println("👋 Exiting. Thank you, Prasu!");
                sc.close();
                System.exit(0);
                break;

            default:
                System.out.println("❗ Invalid choice. Try again.");
        }
    }
}
}