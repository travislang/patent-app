# ResponseGen Patent App
ResponseGen organizes and streamlines communicating with the patent office during patent prosecution. Users create a document structure comprising different parts of the response to office actions, including special sections responsive to each reason for rejection given by the patent examiner. The sections are templated for ease of use, and fill in the correct data based on the specific patent application.

ResponseGen is a single-page application that runs in a browser for desktop use, and has server-side and relational database components to store the data.

## Built With
Uses React, Redux, Node.js, Express, Passport, PostgreSQL, Slate.js (rich-text editor), and DOCX (Word-compatible file generation). (A full list of dependencies can be found in `package.json`.)

## Getting Started

First, ensure that you have the following software installed on your computer:

- [Node.js](https://nodejs.org/en/)
- [PostgreSQL](https://www.postgresql.org/)
- [Nodemon](https://nodemon.io/)

## Installing

To get the development environment running:

Download this project.
npm install
npm start

## Create database, tables, and needed records
ResponseGen stores data in a database in PostgreSQL.

To make the initial database, execute the SQL commands found in the database.sql file. Use a tool like Postico (https://eggerapps.at/postico/) to execute the commands.

The commands will create the database and tables, and will also populate some tables with needed data.

### Initial admin account
Only an authenticated adminstrator user may register and edit user accounts. Because of this, an initial administrator user account must exist.

The SQL commands create an adminstrator user account with the following credentials:
```
username: admin
password: admin
```
**Be sure** to log into this account **immediately** upon deployment and change both the username and password. 

## Screenshot

## Documentation

How to perform common tasks:

### Add/Edit User
### Add Application
### Find Application
### Add Office Action
### Add Issues
### Add Responses
### Add Template

## Deployment

1. Create a new Heroku project
1. Link the Heroku project to the project GitHub Repo
1. Create an Heroku Postgres database
1. Connect to the Heroku Postgres database from Postico
1. Create the necessary tables
1. Add an environment variable for `SERVER_SESSION_SECRET` with a nice random string for security
1. In the deploy section, select manual deploy

## Authors

This project was authored by David Mayou, Josh Byron, Phia Thao, and Travis Lang.

## Acknowledgements
The authors acknowledge the inspiration of Brian Wallenfelt, and technical assistance of the the staff and instructors at Prime Digital Academy.