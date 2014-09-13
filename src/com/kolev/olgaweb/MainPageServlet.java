package com.kolev.olgaweb;

import java.io.IOException;
import java.sql.*;

/**
 * Created by Grigoriy on 16.08.2014.
 */
public class MainPageServlet extends javax.servlet.http.HttpServlet {
    protected void doPost(javax.servlet.http.HttpServletRequest request, javax.servlet.http.HttpServletResponse response) throws javax.servlet.ServletException, IOException {

    }

    protected void doGet(javax.servlet.http.HttpServletRequest request, javax.servlet.http.HttpServletResponse response) throws javax.servlet.ServletException, IOException {
        response.getOutputStream().println("Hello World!");
        response.getOutputStream().println("My name is Greg!");

        Connection c;
        try {
            try {
                DriverManager.registerDriver(new org.postgresql.Driver());
                Class.forName("org.postgresql.Driver");
            } catch (ClassNotFoundException e) {
                response.getOutputStream().println(e.toString() );
                e.printStackTrace();
            }
            c = DriverManager.getConnection("jdbc:postgresql://localhost:5432/temp2", "postgres", "q");

            Statement stmt = c.createStatement();

            String insertTableSQL = "INSERT INTO \"T_TEMP\"(\"ID\", \"NAME\") "
                    + " VALUES (?, ?)";
            PreparedStatement preparedStatement = c.prepareStatement(insertTableSQL);
            preparedStatement.setInt(1, 11);
            preparedStatement.setString(2, "name");
            preparedStatement.execute();

            String query = "select \"ID\", \"NAME\" " +
                    "from \"T_TEMP\"";
            ResultSet rs = stmt.executeQuery(query);

            while(rs.next())
            {
                String name = rs.getString("NAME");
                int ide = rs.getInt("ID");
                response.getOutputStream().println(String.format("%d %s", ide, name));

            }

        } catch (SQLException e) {
            response.getOutputStream().println(e.toString() );
            e.printStackTrace();
        }

        response.getOutputStream().println("End of connection");

    }
}
