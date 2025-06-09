package com.quitq.util;

import java.io.FileReader;
import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.Properties;


public class DBUtil {
public static Connection getDBConnection() throws SQLException {
Properties prop = new Properties();
try (FileReader fr = new FileReader("quitq-ecom/src/main/resources/Database.properties")) {
prop.load(fr);
} catch (IOException e) {
e.printStackTrace();
}
    String url = prop.getProperty("url");
    String username = prop.getProperty("username");
    String password = prop.getProperty("password");

    DriverManager.registerDriver(new com.mysql.cj.jdbc.Driver());
    return DriverManager.getConnection(url, username, password);
}
}