# pokemons-challenge

This project is meant to slove a challenge:


## Challenges Coding Exercise Backend
We have provided you with Pokemon data in a json file. Your mission is to create a database and expose the database to a API. Basically, you need to:

* Design the database to store information for the Pokemon data

* Load the database with the data

* Implement the API Interface withe the following features:
  * Query pokemons with the options:
    * Pagination
    * Search by name
    * Filter by pokemon type
    * Filter by favorite
  * Query a pokemon by id
  * Query a pokemon by name
  * Query list of pokemon types
  * Mutation to mark/unmark pokemon as favorite
* Tests are important and if time allows it, we'd like to see some test coverage.

### Technology
Remember that our technology stack is:

* Loopback.io (Javascript and Typescript)
* MongoDB / PostgreSQL
Be careful with your decisitions. You can use the framework that you prefer, but please write the challenge in JS or TS. You can choose MongoDB or PostgreSQL like database, be free but take in consideration the best database to store the data provided in the JSON file.



## Steps to run this project locally on windows:

To clone and run this repository you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. From your command line:

```bash
# Clone this repository
git clone https://github.com/mohammad-ah/pokemons-challenge.git
# Install dependencies
npm install
# Run the app
npm start
```

> **You then can test the APIs using Postman or other tools**

You can also run the test coverage by using the command:
```bash
npm test
```

### Technologies used:
* Express/Node.js
* MnogoDB
* chai and mocha for testing

> **Mainly there will be thsoe APIs**
```
/* init DB */
POST: /pokemons/init

/* get by id */
GET: /pokemons/:id

/* toggle favorite by id. */
GET: /pokemons/:id/favorite

/* this will handle search by name. */
GET: /pokemons/name/:name

/* this will handle search by types list. */
GET: /pokemons/types/:types

/* this will handle search by name and types list. */
GET /pokemons?:name&:limit&:skip&:types&:favorite

/* Basically to get a token. */
POST: /pokemons/login
```
#### You can login first to get a token and then use it with other APIs
 
----------------
 
> ## **Addition, Swagger is integrated to document APIs**

Though the documentation needs a bit of extra work but it worth it.

```
GET: /api-docs
```




