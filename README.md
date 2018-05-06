# Reporthis
Reporthis is an application to register reports about things you think ain't right
Just for education


To run this application you will need:
 - NodeJS & npm
 - PostgreSQL

The database structure is in "databaseScripts.sql" file (This file is in git just because this project is only for education)

Then, you will need to create a file name ".env" in the root folder, containing:
SALT="a random string to generate Hash for your user's passwords"
DATABASE_URL="Your database connect URI, if your database is hosted by Heroku, add '?ssl=true' to the end of the URI"

Then, just open your terminal and type "npm install", wait the npm install all dependecies and type "npm run dev" to run the application in dev mode, or "node app" to run the application.