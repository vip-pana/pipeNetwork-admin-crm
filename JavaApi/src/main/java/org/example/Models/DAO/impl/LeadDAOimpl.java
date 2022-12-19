package org.example.Models.DAO.impl;

import org.example.Data.ConnectionManager;
import org.example.Models.DAO.LeadDAO;
import org.example.Models.Lead;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

public class LeadDAOimpl implements LeadDAO {
    List<Lead> leadList;

    @Override
    public void createLead(Lead l) {
        Connection connection = ConnectionManager.getConnection();
        Statement statement;
        try {
            String query = String.format("INSERT INTO pipenetwork.lead VALUES('%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s');",
                    l.getId(), l.getNome(), l.getCognome(), l.getNascita(), l.getCellulare(), l.getEmail(), l.getIndirizzo(), l.getArrivoLead(), l.isInNewsLetter(), l.isCalled(), l.isInFreeTrial(), l.getStage()  );
            statement = connection.createStatement();
            statement.executeUpdate(query);

        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    @Override
    public List<Lead> getAllLeads() {
        this.leadList = new ArrayList<Lead>();
        Connection connection = ConnectionManager.getConnection();
        Statement statement;
        ResultSet resultSet = null;
        try {
            String query = "SELECT * FROM pipenetwork.lead";
            statement = connection.createStatement();
            resultSet = statement.executeQuery(query);
            while (resultSet.next()) {
                long id = resultSet.getLong("id");
                String nome = resultSet.getString("nome");
                String cognome = resultSet.getString("cognome");
                String nascita = resultSet.getString("nascita");
                String cellulare = resultSet.getString("cellulare");
                String email = resultSet.getString("email");
                String indirizzo = resultSet.getString("indirizzo");
                String arrivoLead = resultSet.getString("arrivoLead");
                boolean inNewsLetter = resultSet.getBoolean("inNewsLetter");
                boolean isCalled = resultSet.getBoolean("isCalled");
                boolean inFreeTrial = resultSet.getBoolean("inFreeTrial");
                long stage = resultSet.getLong("stage");
                Lead l = new Lead(id, nome, cognome, nascita, cellulare, email, indirizzo, arrivoLead, inNewsLetter, isCalled, inFreeTrial, stage);
                leadList.add(l);
            }
        }
        catch (SQLException e) {
            e.printStackTrace();
        }
        return leadList;
    }

    @Override
    public Lead getLeadByID(long idSearch) {
        Connection connection = ConnectionManager.getConnection();
        Statement statement;
        ResultSet resultSet = null;
        Lead lead = null;
        try {
            String query = String.format("select * from pipenetwork.lead where id= %s", idSearch);
            statement = connection.createStatement();
            resultSet = statement.executeQuery(query);
            while (resultSet.next()) {
                long id = resultSet.getLong("id");
                String nome = resultSet.getString("nome");
                String cognome = resultSet.getString("cognome");
                String nascita = resultSet.getString("nascita");
                String cellulare = resultSet.getString("cellulare");
                String email = resultSet.getString("email");
                String indirizzo = resultSet.getString("indirizzo");
                String arrivoLead = resultSet.getString("arrivoLead");
                boolean inNewsLetter = resultSet.getBoolean("inNewsLetter");
                boolean isCalled = resultSet.getBoolean("isCalled");
                boolean inFreeTrial = resultSet.getBoolean("inFreeTrial");
                long stage = resultSet.getLong("stage");
                lead = new Lead(id, nome, cognome, nascita, cellulare, email, indirizzo, arrivoLead, inNewsLetter, isCalled, inFreeTrial, stage);
            }
        } catch (SQLException e) {

            e.printStackTrace();
        }
        return lead;
    }



    @Override
    public void deleteLeadByID(long l) {
        Connection connection = ConnectionManager.getConnection();
        Statement statement;
        try {
            String query = String.format("delete from pipenetwork.lead where id= %s", l);
            statement = connection.createStatement();
            statement.executeUpdate(query);
        } catch (Exception e) {
            System.out.println(e);
        }
    }

    @Override
    public void updateLead(Lead l) {

        Connection connection = ConnectionManager.getConnection();
        Statement statement;
        try {
            String query = String.format("UPDATE pipenetwork.lead SET id='%s', nome='%s', cognome='%s', nascita='%s', cellulare='%s', email='%s', indirizzo='%s', arrivoLead='%s', inNewsLetter='%s', isCalled='%s', inFreeTrial='%s', stage='%s' WHERE id='%s';",
            l.getId(), l.getNome(), l.getCognome(), l.getNascita(),
                    l.getCellulare(), l.getEmail(), l.getIndirizzo(),
                    l.getArrivoLead(), l.isInNewsLetter(), l.isCalled(),
                    l.isInFreeTrial(), l.getStage(), l.getId());
            statement = connection.createStatement();
            statement.executeUpdate(query);

        } catch (Exception e) {
            System.out.println(e);
        }

    }
}
