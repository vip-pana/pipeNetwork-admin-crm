package org.example.Controllers;
import org.example.Models.Lead;
import spark.Spark.*;
import com.google.gson.Gson;
import org.example.Services.LeadService;

import static spark.Spark.*;

public class LeadController {
    Gson gson;
    LeadService leadService;

    public LeadController(LeadService leadService) {
        this.leadService = leadService;
        this.gson = new Gson();
    }
    public void startServices () {
        options("/*",
                (request, response) -> {

                    String accessControlRequestHeaders = request
                            .headers("Access-Control-Request-Headers");
                    if (accessControlRequestHeaders != null) {
                        response.header("Access-Control-Allow-Headers",
                                accessControlRequestHeaders);
                    }

                    String accessControlRequestMethod = request
                            .headers("Access-Control-Request-Method");
                    if (accessControlRequestMethod != null) {
                        response.header("Access-Control-Allow-Methods",
                                accessControlRequestMethod);
                    }

                    return "OK";
                });

        before((request, response) -> response.header("Access-Control-Allow-Origin", "*"));

        get("/Leads",(req,res)->{
            res.type("application/json");
            return leadService.getAllLeads();
        },gson::toJson);

        get("/Lead/:id",(req,res)->{
            res.type("application/json");
            int id = Integer.parseInt(req.params("id"));
            return leadService.getLeadByID(id);
        },gson::toJson);

        delete("/Lead/:id", (req,res)->{
            res.type("application/json");
            int id = Integer.parseInt(req.params("id"));
            leadService.deleteLeadByID(id);
            return null;
        }, gson::toJson);

        //create new software
        post("/Lead", (req, res) -> {
            res.type("application/json");
            Lead leadFromRequest = new Gson().fromJson(req.body(), Lead.class);
            leadService.createLead(leadFromRequest);
            return leadFromRequest;
        }, gson::toJson);

        put("/Lead/:id", (req, res) -> {
            res.type("application/json");
            int id = Integer.parseInt(req.params("id"));
            Lead leadFromRequest = new Gson().fromJson(req.body(), Lead.class);
            leadService.updateLead(leadFromRequest, id);
            return leadFromRequest;
        }, gson::toJson);
    }
}
