using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using WebApplication1.Models;

namespace WebApplication1.Data;

public partial class GcmaucfjContext : DbContext
{
    public GcmaucfjContext()
    {
    }

    public GcmaucfjContext(DbContextOptions<GcmaucfjContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Acquisto> Acquistos { get; set; }

    public virtual DbSet<CartaDebito> CartaDebitos { get; set; }

    public virtual DbSet<Lead> Leads { get; set; }

    public virtual DbSet<Licenza> Licenzas { get; set; }

    public virtual DbSet<Message> Messages { get; set; }

    public virtual DbSet<RelationTicketMessage> RelationTicketMessages { get; set; }

    public virtual DbSet<Responsabile> Responsabiles { get; set; }

    public virtual DbSet<Software> Softwares { get; set; }

    public virtual DbSet<Ticket> Tickets { get; set; }

    public virtual DbSet<Utente> Utentes { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseNpgsql("Host=ella.db.elephantsql.com;Database=gcmaucfj;Username=gcmaucfj;Password=86OZX_ZcrhCa1l7PbzNRTi852QjkrQ88");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder
            .HasPostgresExtension("btree_gin")
            .HasPostgresExtension("btree_gist")
            .HasPostgresExtension("citext")
            .HasPostgresExtension("cube")
            .HasPostgresExtension("dblink")
            .HasPostgresExtension("dict_int")
            .HasPostgresExtension("dict_xsyn")
            .HasPostgresExtension("earthdistance")
            .HasPostgresExtension("fuzzystrmatch")
            .HasPostgresExtension("hstore")
            .HasPostgresExtension("intarray")
            .HasPostgresExtension("ltree")
            .HasPostgresExtension("pg_stat_statements")
            .HasPostgresExtension("pg_trgm")
            .HasPostgresExtension("pgcrypto")
            .HasPostgresExtension("pgrowlocks")
            .HasPostgresExtension("pgstattuple")
            .HasPostgresExtension("tablefunc")
            .HasPostgresExtension("unaccent")
            .HasPostgresExtension("uuid-ossp")
            .HasPostgresExtension("xml2");

        modelBuilder.Entity<Acquisto>(entity =>
        {
            entity.HasKey(e => e.TxId).HasName("acquisto_pkey");

            entity.ToTable("acquisto", "pipenetwork");

            entity.Property(e => e.TxId).HasColumnName("txId");
            entity.Property(e => e.CartaDebito)
                .HasColumnType("character varying")
                .HasColumnName("cartaDebito");
            entity.Property(e => e.Importo).HasColumnName("importo");
            entity.Property(e => e.Licenza).HasColumnName("licenza");
            entity.Property(e => e.StatoPagamento).HasColumnName("statoPagamento");

            entity.HasOne(d => d.CartaDebitoNavigation).WithMany(p => p.Acquistos)
                .HasForeignKey(d => d.CartaDebito)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("tipoPagamento");

            entity.HasOne(d => d.LicenzaNavigation).WithMany(p => p.Acquistos)
                .HasForeignKey(d => d.Licenza)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("licenzaFK");
        });

        modelBuilder.Entity<CartaDebito>(entity =>
        {
            entity.HasKey(e => e.Numero).HasName("cartaDebito_pkey");

            entity.ToTable("cartaDebito", "pipenetwork");

            entity.Property(e => e.Numero)
                .HasColumnType("character varying")
                .HasColumnName("numero");
            entity.Property(e => e.DataScadenza).HasColumnName("dataScadenza");
            entity.Property(e => e.Titolare)
                .HasColumnType("character varying")
                .HasColumnName("titolare");
        });

        modelBuilder.Entity<Lead>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("lead_pkey");

            entity.ToTable("lead", "pipenetwork");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.ArrivoLead).HasColumnName("arrivoLead");
            entity.Property(e => e.Cellulare)
                .HasColumnType("character varying")
                .HasColumnName("cellulare");
            entity.Property(e => e.Cognome)
                .HasColumnType("character varying")
                .HasColumnName("cognome");
            entity.Property(e => e.Email)
                .HasColumnType("character varying")
                .HasColumnName("email");
            entity.Property(e => e.InFreeTrial).HasColumnName("inFreeTrial");
            entity.Property(e => e.InNewsLetter).HasColumnName("inNewsLetter");
            entity.Property(e => e.Indirizzo)
                .HasColumnType("character varying")
                .HasColumnName("indirizzo");
            entity.Property(e => e.IsCalled).HasColumnName("isCalled");
            entity.Property(e => e.Nascita).HasColumnName("nascita");
            entity.Property(e => e.Nome)
                .HasColumnType("character varying")
                .HasColumnName("nome");
            entity.Property(e => e.Stage).HasColumnName("stage");
        });

        modelBuilder.Entity<Licenza>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("licenza_pkey");

            entity.ToTable("licenza", "pipenetwork");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.DataAttivazione).HasColumnName("dataAttivazione");
            entity.Property(e => e.DataScadenza).HasColumnName("dataScadenza");
            entity.Property(e => e.Software)
                .HasColumnType("character varying")
                .HasColumnName("software");
            entity.Property(e => e.TipoLicenza)
                .HasColumnType("character varying")
                .HasColumnName("tipoLicenza");

            entity.HasOne(d => d.SoftwareNavigation).WithMany(p => p.Licenzas)
                .HasForeignKey(d => d.Software)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("softwareFK");
        });

        modelBuilder.Entity<Message>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("Message_pkey");

            entity.ToTable("message", "pipenetwork");

            entity.Property(e => e.Id).HasDefaultValueSql("nextval('pipenetwork.\"Message_Id_seq\"'::regclass)");
            entity.Property(e => e.Contenuto)
                .HasColumnType("character varying")
                .HasColumnName("contenuto");
            entity.Property(e => e.Inviato).HasColumnName("inviato");
            entity.Property(e => e.Role).HasColumnType("character varying");
        });

        modelBuilder.Entity<RelationTicketMessage>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("relationTicketMessage_pkey");

            entity.ToTable("relationTicketMessage", "pipenetwork");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.MessageId).HasColumnName("messageId");
            entity.Property(e => e.TicketId).HasColumnName("ticketId");

            entity.HasOne(d => d.Message).WithMany(p => p.RelationTicketMessages)
                .HasForeignKey(d => d.MessageId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("relationTicketMessage_messageId_fkey");

            entity.HasOne(d => d.Ticket).WithMany(p => p.RelationTicketMessages)
                .HasForeignKey(d => d.TicketId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("ticketFK");
        });

        modelBuilder.Entity<Responsabile>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("responsabile_pkey");

            entity.ToTable("responsabile", "pipenetwork");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Cellulare)
                .HasColumnType("character varying")
                .HasColumnName("cellulare");
            entity.Property(e => e.Cognome)
                .HasColumnType("character varying")
                .HasColumnName("cognome");
            entity.Property(e => e.Email)
                .HasColumnType("character varying")
                .HasColumnName("email");
            entity.Property(e => e.Indirizzo)
                .HasColumnType("character varying")
                .HasColumnName("indirizzo");
            entity.Property(e => e.Nascita).HasColumnName("nascita");
            entity.Property(e => e.Nome)
                .HasColumnType("character varying")
                .HasColumnName("nome");
            entity.Property(e => e.Password)
                .HasColumnType("character varying")
                .HasColumnName("password");
        });

        modelBuilder.Entity<Software>(entity =>
        {
            entity.HasKey(e => e.ProductKey).HasName("software_pkey");

            entity.ToTable("software", "pipenetwork");

            entity.Property(e => e.ProductKey)
                .HasColumnType("character varying")
                .HasColumnName("productKey");
            entity.Property(e => e.Nome)
                .HasColumnType("character varying")
                .HasColumnName("nome");
        });

        modelBuilder.Entity<Ticket>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("ticket_pkey");

            entity.ToTable("ticket", "pipenetwork");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.MainObject)
                .HasColumnType("character varying")
                .HasColumnName("mainObject");
            entity.Property(e => e.Status)
                .HasColumnType("character varying")
                .HasColumnName("status");
            entity.Property(e => e.Utente).HasColumnName("utente");

            entity.HasOne(d => d.UtenteNavigation).WithMany(p => p.Tickets)
                .HasForeignKey(d => d.Utente)
                .HasConstraintName("utente_fk");
        });

        modelBuilder.Entity<Utente>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("utente_pkey");

            entity.ToTable("utente", "pipenetwork");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.CartaDebito)
                .HasColumnType("character varying")
                .HasColumnName("cartaDebito");
            entity.Property(e => e.Cellulare)
                .HasColumnType("character varying")
                .HasColumnName("cellulare");
            entity.Property(e => e.Cognome)
                .HasColumnType("character varying")
                .HasColumnName("cognome");
            entity.Property(e => e.Email)
                .HasColumnType("character varying")
                .HasColumnName("email");
            entity.Property(e => e.Indirizzo)
                .HasColumnType("character varying")
                .HasColumnName("indirizzo");
            entity.Property(e => e.Iscrizione).HasColumnName("iscrizione");
            entity.Property(e => e.Nascita).HasColumnName("nascita");
            entity.Property(e => e.Nome)
                .HasColumnType("character varying")
                .HasColumnName("nome");
            entity.Property(e => e.Paese)
                .HasColumnType("character varying")
                .HasColumnName("paese");

            entity.HasOne(d => d.CartaDebitoNavigation).WithMany(p => p.Utentes)
                .HasForeignKey(d => d.CartaDebito)
                .HasConstraintName("cartaDebitoFK");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
