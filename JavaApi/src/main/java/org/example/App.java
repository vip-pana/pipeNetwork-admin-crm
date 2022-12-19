package org.example;

import org.example.Controllers.LeadController;
import org.example.Services.LeadService;

import java.sql.Connection;

public class App 
{
    public static void main( String[] args )
    {
        LeadService leadService = new LeadService();
        LeadController leadController = new LeadController(leadService);

        leadController.startServices();

    }
}
