# Gift Exchange

A gift exchange (secret santa) application built with [ReactJS](https://facebook.github.io/react/) with [Material-UI](http://material-ui.com/#/)
for the client side and [NodeJS](https://nodejs.org/en/) with [Mongoose](http://mongoosejs.com/) for the server.
Grunt and Webpack are used for the building and running of the application.

## Install

Install the needed npm packages and build the local development version:
* `npm i`
* `npm i grunt -g`
* `grunt dev`

Open the application [http://localhost:8081/index-dev.html](http://localhost:8081/index-dev.html)

### Using the application

The application has three input areas:
* The sign up area, allows users tro register for the gift exchange.
* The match retrieval area, allows users to get who they have been matched. The user will only get a match once the matches
have been done via the admin panel.
* The admin panel, this allows any admin (the admins must be added to the db). The admin has the ability to trigger the matches
once the matches have been made the users can the obtain a match. To access the admin panel add `?admin` to the end of the page url

### Setting up the database
To use the application you first need to set up a mongodb instance and configure the instance in the application. This can be done
in `config/mongo.js`. Once configured you will need to add one admin to the gift-exchange-admins collection. Below is an
example of the admin user object.

```
{
    "_id": {
        "$oid": "5651f54ae4b06d0088f91fd1"
    },
    "email": "admin@email.com",
    "password": "test123"
}
```

### Running on production

To run the application in production check put the code on the serve or move manually, ensure that all the node modules
 have been installed and grunt is installed as a global module. Then on the server run:
* grunt build
* node server.js

The application will be running under the same port as development.

![main site](./assets/Screen Shot 2015-11-22 at 20.08.35.png)
