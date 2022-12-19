package org.example.Models;

public class Lead {

    public long id;

    public String nome;

    public String cognome;

    public Lead(long id, String nome, String cognome, String nascita, String cellulare, String email, String indirizzo, String arrivoLead, boolean inNewsLetter, boolean isCalled, boolean inFreeTrial, long stage) {
        this.id = id;
        this.nome = nome;
        this.cognome = cognome;
        this.nascita = nascita;
        this.cellulare = cellulare;
        this.email = email;
        this.indirizzo = indirizzo;
        this.arrivoLead = arrivoLead;
        this.inNewsLetter = inNewsLetter;
        this.isCalled = isCalled;
        this.inFreeTrial = inFreeTrial;
        this.stage = stage;
    }

    public String nascita;

    public String cellulare;

    public String email;

    public String indirizzo;

    public String arrivoLead;

    public boolean inNewsLetter;

    public boolean isCalled;

    public boolean inFreeTrial;

    public long getStage() {
        return stage;
    }

    public void setStage(long stage) {
        this.stage = stage;
    }

    public long stage;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getCognome() {
        return cognome;
    }

    public void setCognome(String cognome) {
        this.cognome = cognome;
    }

    public String getNascita() {
        return nascita;
    }

    public void setNascita(String nascita) {
        this.nascita = nascita;
    }

    public String getCellulare() {
        return cellulare;
    }

    public void setCellulare(String cellulare) {
        this.cellulare = cellulare;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getIndirizzo() {
        return indirizzo;
    }

    public void setIndirizzo(String indirizzo) {
        this.indirizzo = indirizzo;
    }

    public String getArrivoLead() {
        return arrivoLead;
    }

    public void setArrivoLead(String arrivoLead) {
        this.arrivoLead = arrivoLead;
    }

    public boolean isInNewsLetter() {
        return inNewsLetter;
    }

    public void setInNewsLetter(boolean inNewsLetter) {
        this.inNewsLetter = inNewsLetter;
    }

    public boolean isCalled() {
        return isCalled;
    }

    public void setCalled(boolean called) {
        isCalled = called;
    }

    public boolean isInFreeTrial() {
        return inFreeTrial;
    }

    public void setInFreeTrial(boolean inFreeTrial) {
        this.inFreeTrial = inFreeTrial;
    }
}