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
**Be sure to immediately** make a new administrator account and mark this account as inactive upon deployment.

## Screenshot

## Documentation

How to perform common tasks:

### Log In and Update Admin Account
For security, the first user must inactivate the built-in admin account. Log in as described in the Initial admin account section, above, and follow the instructions to inactivate this user, below.
### Add User
This feature in only available to admin users.
To add a user:
1. Log in using an admin account.
1. Choose Users from the navigation bar.
1. Press the Register User button.
1. Add fields as appropriate and press Register.
To make the new user an admin, find the user in the resulting list click the checkbox in the admin column.
### Change user's active status
This feature in only available to admin users.
To add a user:
1. Log in using an admin account.
1. Choose Users from the navigation bar.
1. Click the checkbox in the Active column.
If you make the user account that you're loggin in with inactive, you will immediately be unable to operate the application.
If no admin-level user accounts are active, then you will be unable to use the functions of the Users page. 
### Add Application
All users may add an application.
To add an application:
1. Choose Dashboard from the navigation bar.
1. Click the Add Application button.
1. Choose the user who will be the application's owner. This affects whether that application will appear in a given user's list. Non-admin-level users may only add applications for their own user.
1. Enter the application number in the Application Number field.
1. You may press the Search button to query the USPTO PEDS database. If the application number is available, the fields will be populated.
1. Review, update, or enter any fields and click Add Application.

### Find Application
All users may find applications. Admin-level users may find all applications. Non-admin-level users may only find ones that they own.
Applications are viewed in the Dashboard, available from the navigation bar.
### Add Office Action
All users may add office actions, but non-admin-level users may only add office actions for their own applications.
To add an office action:
1. Select the application from the Dashboard.
1. Press the New Response button.
1. Enter fields in the form and press Add Office Action.

### Add Issues
All users may add issues, but non-admin-level users may only add issues to their own application's office actions.
To add an issue:
1. Select the application from the Dashboard.
1. Select an office action to which to add an issue.
1. Press the Add Item button on the left-hand side of the view at the bottom of the Office Action Issues list.

### Add Responses
Only non-admin users may add responses.
To add a response:

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