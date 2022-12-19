package org.example.Data;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class ConnectionManager {
    static Connection connection;
    private static  String dbAddress = "jdbc:postgresql://ella.db.elephantsql.com:5432/gcmaucfj";
    private static String userName = "gcmaucfj";
    private static String password = "86OZX_ZcrhCa1l7PbzNRTi852QjkrQ88";

    public static Connection getConnection(){
        if (connection != null){
            return  connection;
        }

        String driverClassName = "org.postgresql.Driver";

        try {
            Class.forName(driverClassName);

            connection = DriverManager.getConnection(dbAddress, userName, password);

            if (connection == null ){
                System.out.println("connection null");
            }
            else {
                System.out.println("connection estabilished");
            }
        } catch (ClassNotFoundException e){
            e.printStackTrace();
        } catch (SQLException e){
            e.printStackTrace();
        }
        return connection;
    }
}
