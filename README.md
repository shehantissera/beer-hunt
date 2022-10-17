
# BeerHunt
This is a application built with VueJS on top of an ExpressJS server. It consumes a thrid-party API called PunkAPI for data retrieval. This is built to demonstrates my ability to work with NodeJS and VueJS in a small given period of time.

### Prerequisites
The following should be installed on your machine in order to run this application.

 - [NodeJS](https://nodejs.org/en/)
 - [Git](https://git-scm.com/)

### Initiate & Run the project
Run the following command on your terminal to initiate the project. It should install all the files necessary to run this project.

    npm run init

Run the following command to start the project. It will build the necessary files needed to host the web app.

    npm start

Now, navigate to the following URL on your browser.

    http://localhost:3000/

You can now search for any beer name and see results and it's details.
### API Documentation
The following Postman Link contains the full documentation of all the available API on the Express Server
[Link to the Postman Documentation Link](https://documenter.getpostman.com/view/109342/2s83zpL1jf)

### Additional commands
Run the following to run all the testcases

    npm run test

Run the following command to check formatting for the code

    npm run format:check

Run the following command to fix formatting errors on the code

    npm run format:write

Run the following command to check lint issues on the code

    npm run lint:check

Run the following command to fix lint issues on the code

    npm run lint:fix
