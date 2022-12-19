package org.example.Services;

import org.example.Models.DAO.impl.LeadDAOimpl;
import org.example.Models.Lead;

import java.util.List;

public class LeadService {
    List<Lead> leadList;
    LeadDAOimpl leadDAOimpl;

    public LeadService() {
        this.leadDAOimpl = new LeadDAOimpl();
    }

    public List<Lead> getAllLeads() {
        return leadDAOimpl.getAllLeads();
    }

    public Lead getLeadByID(long l){
        return leadDAOimpl.getLeadByID(l);
    }

    public void deleteLeadByID(long l) {
        leadDAOimpl.deleteLeadByID(l);
    }

    public void createLead(Lead l) {
        leadDAOimpl.createLead(l);
    }

    public void updateLead(Lead l, long id) {
        Lead oldLead = leadDAOimpl.getLeadByID(id);
        if (oldLead.getId() == l.getId()){
            oldLead.setNome(l.getNome());
            oldLead.setCognome(l.getCognome());
            oldLead.setNascita(l.getNascita());
            oldLead.setCellulare(l.getCellulare());
            oldLead.setEmail(l.getEmail());
            oldLead.setIndirizzo(l.getIndirizzo());
            oldLead.setArrivoLead(l.getArrivoLead());
            oldLead.setInNewsLetter(l.isInNewsLetter());
            oldLead.setCalled(l.isCalled());
            oldLead.setInFreeTrial(l.isInFreeTrial());
            oldLead.setStage(l.getStage());
        }
        leadDAOimpl.updateLead(oldLead);
    }
}
