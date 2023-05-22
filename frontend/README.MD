### Yarn Package Manager

Per gestire le dipendenze del progetto, ho utilizzato Yarn come package manager. Pertanto, è necessario installare ogni pacchetto successivo utilizzando Yarn.

## Pacchetti Backend

NuGet Package manager:

- Microsoft.EntityFrameworkCore.Tools
- Npgsql.EntityFrameworkCore.PostgreSQL
- BCrypt.Net-Next
- Microsoft.AspNetCore.Authentication.JwtBearer
- Microsoft.IdentityModel.Tokens
- System.IdentityModel.Tokens.Jwt

# Rewrite

Per il progetto di rewrite, ho scritto il programma utilizzando React con TypeScript. Ho scelto questa combinazione per garantire un software di alta qualità. Inoltre, ho utilizzato Chakra UI per implementare il design dell'applicazione. Chakra UI si è dimostrato molto adattabile e ha offerto un'ottima integrazione con la modalità di colori di base del software.

## Login

Come primo passo, ho completamente riscritto la pagina di login. Ora è più minimale e facilmente leggibile.

## Backend Login

Il backend è fatto utilizzando .NET Web API Core e si occupa di controllare se l'utente esiste, nel caso di sì, se l'hashing della password inviata combaci con l'hashing salvato nel Database e di conseguenza permetterà l'acceso o lo negherà

## Backend .NET API Web Core

Bisogna Eseguire lo scaffolding da un DB per avere così i models con cui poter lavorare

in seguito nella console di NuGet utilizzi il comando :
Scaffold-DbContext “Host=localhost;Database=database_name;Username=user_name;Password=password” Npgsql.EntityFrameworkCore.PostgreSQL -OutputDir Models

rimpiazzando i nomi delle variabili Database, Username e Password con i propri.

Usando questo comando verrà creato una cartella "Models" in cui saranno inserite tutte le tabelle del database come classi e il context del database.

al interno del file Context, ci sono i dati del Database hardcoded dentro la connection string al Database. Per una questione di sicurezza e manutenibilità ho inserito i dati all'interno di appsetting.json come ConnectionStrings -> Default. Successivamente dal Program.cs aggiungere il db context al Builder.Services, eliminandolo poi dal context dentro la cartella models, questo si fa perché avendo il context nel program si possono eseguire e utilizzare le variabili del builder.

Prima di tutto dovresti inserire l'utilizzo di questo tipo di connessione dentro al file Startup.cs, ma nelle nuove versioni di ASP.NET il file è unito al file Program.cs per semplificazione.

Di base il context è fatto a parte e fa un ovverride del on configuration del builder. ma per poter mettere la connection string passata direttamente dal file app.settings.json devi portare la configurazione del DBContext nel file program.cs e passare da lì usando il builder il file di configurazione della connection string

Dopo aver sistemato il context, assicuriamoci di essere all'interno della solution e poi nella cartella controntrollers clicca Add -> Controller -> Scegli il tab 'API' -> e seleziona 'API Controller with actions, using Entity Framework'.
Questo creerà un controller preassemblato con le API CRUD preconfezionate, ma da completare

in seguito creiamo il controller del Signin, così da valorizzare e creare un user, qui riceviamo un user in input, da questo controlliamo se esiste nel db la mail in input, se no eseguiamo l'hashing della password usando BCrypt e salviamo l'user, altrimenti manda indietro una badRequest

in seguito creiamo il controller del Login, Così da poterci loggare con i dati inseriti.
Qui dentro controlliamo i dati input, prima la mail e la controlliamo in lowercase (questo perché le email sono case insensitive), se non esiste manda una BadRequest, se esiste controlla la password validando gli hashing, se ok genera un Token JWT e lo ritorna all'utente, questo dato è importante per poter eseguire l'accesso nell'applicazione.

Sia login che signup non richiedono l'utilizzo del jwt token perché sono due api che l'utente richiama subito come prima cosa

## autenticazione con jwt token

prima di tutto installiamo il pacchetto nel nuget package manager

### cose che potrei aggiungere in futuro

- sistemare possibilità di overposting delle POST E PUT dei controllers
- rendere email uniche nel db (forse non ha senso perché se uno si elimina ma poi si riregistra deve poterlo fare)
- mettere il fatto che la email sia settata to lowercase nel BE, perché la email non è case sensitive

## NOTE IMPORTANTI segnati questo account per entrare

email : mariorossi@gmail.com
pwd : test123!
