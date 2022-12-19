package org.example.Models.DAO;
import java.util.List;
import org.example.Models.Lead;

public interface LeadDAO {
    public void createLead(Lead l);
    public List<Lead> getAllLeads();
    public Lead getLeadByID(long l);
    public void deleteLeadByID(long l);
    public void updateLead(Lead l);
}
