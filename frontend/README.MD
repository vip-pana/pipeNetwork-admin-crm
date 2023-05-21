### Yarn Package Manager

Per gestire le dipendenze del progetto, ho utilizzato Yarn come package manager. Pertanto, è necessario installare ogni pacchetto successivo utilizzando Yarn.

# Rewrite

Per il progetto di rewrite, ho scritto il programma utilizzando React con TypeScript. Ho scelto questa combinazione per garantire un software di alta qualità. Inoltre, ho utilizzato Chakra UI per implementare il design dell'applicazione. Chakra UI si è dimostrato molto adattabile e ha offerto un'ottima integrazione con la modalità di colori di base del software.

## Login

Come primo passo, ho completamente riscritto la pagina di login. Ora è più minimale e facilmente leggibile.

## Backend Login
Il backend è fatto utilizzando .NET Web API Core e si occupa di controllare se l'utente esiste, nel caso di sì, se l'hashing della password inviata combaci con l'hashing salvato nel Database e di conseguenza permetterà l'acceso o lo negherà

## Backend .NET API Web Core
Devono Eseguire lo scaffolding da un DB per avere così i modelli
Devo avere Entity Framework CORE e il driver PostgresSQL dentro il mio VS. installiamo dal NuGet package manager precisamente i pacchetti:
- Microsoft.EntityFrameworkCore.Tools
- Npgsql.EntityFrameworkCore.PostgreSQL

in seguito nella console di NuGet utilizzi il comando

Scaffold-DbContext “Host=localhost;Database=database_name;Username=user_name;Password=password” Npgsql.EntityFrameworkCore.PostgreSQL -OutputDir Models

rimpiazzando i nomi delle variabili Database, Username e Password co i tuoi

Usando questo comando verrà creato una cartella chiamata Models in cui saranno inserite tutte le tabelle del database come classi e il context del database.

Se Apri il file Context, al suo interno troverai i dati del Database hardcoded dentro la connection string al Database. 
Bisogna inserire successivamente questa conneciton string per una questione di sicurezza dentro il file appsettings.json e accederci successivamente al program.cs
questo lo fai inserendolo proprio come chiave valore così 
"ConnectionStrings": {
    "DefaultConnection": "Host=localhost;Database=postgres;Username=postgres;Password=postgres"
  },