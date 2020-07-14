const fs = require('fs');
const path = require("path");
const mongoose = require("mongoose");
const dbPath = path.resolve(__dirname, '../utils/pokemons.json');
const db = mongoose.connection;
const Pokemon = require('../models/admin')

// function to read data from JSON file, parse it and insert them to DB
function insertDataToDB(res) {
    let data = fs.readFileSync(dbPath);
    data = JSON.parse(data);

    db.collection('pokemons').insert(data, function(error, record){
        if (error) throw error;
        res.status(200).send({ message: "DB initialized successfully."});
    });
}

// init the DB
exports.initDb = async (req, res, next) => {
    try {
        // check if eollection exists user should append force to the query param
        db.db.listCollections({name: 'pokemons'})
        .next(function(err, info) {
            if (info && req.query.force != 'true') {
                res.status(201).send({ message: "Collection already exists, you can redo this using force: true"});
                res.end();
            } else {
                insertDataToDB(res);
            }
        });
    } catch (err) {
        next(err);
    }
};

// get pokemon by id
exports.getById = async (req, res, next) => {
    try {
        // read id and append zeros to the beginning so it will be 3 characters long
        let id = req.params.id;
        id = ('000' + id).substr(-3);
        const pokemon = await Pokemon.findOne(
            {
                id: id
            });
        res.status(200).send({message: "Pokemon gotten successfully - ById.", data: pokemon});
    } catch (err) {
        next(err);
    }
}

// change pokemon favorite
// if body request mark = true mark pokemon as favorite=true, unmark it to favorite=false otherwise
exports.toggleFavorite = async(req, res, next) => {
    try {
        let mark_unmark = req.body.mark;
        console.log(mark_unmark)
        let id = req.params.id;
        // read id and append zeros to the beginning so it will be 3 characters long
        id = ('000' + id).substr(-3);

        const pokemon = await Pokemon.findOne(
            {
                id: id
            });
        if (mark_unmark == true) {
            pokemon.favorite = true;
        } else {
            pokemon.favorite = false;
        }
        pokemon.save();
        res.status(200).send({ message: "Favorite set successfully.", data: pokemon});
    } catch (err) {
        next(err);
    }
}

// get pokemon by name using name param
exports.getByName = async(req, res, next) => {
    try {
        let name = req.params.name;
        console.log(name)
        let pokemons = await Pokemon.findOne(
            {
                // to search with part of the name we can only remove  "^" & "$"
                name: new RegExp("^" + name + "$", "i")
            });

        res.status(200).send({message: "Pokemon gotten successfully.", data: pokemons});
    } catch (err) {
        next(err);
    }
}

// get pokemon by comma separated types using types param
exports.getByTypes = async(req, res, next) => {
    try {
        let types = req.params.types;
        types = types.split(',');
        // change type into expression to eb used in the find method. i.e: case insensitive
        types = types.map(value => new RegExp("^" + value + "$", "i"));

        let pokemons = await Pokemon.find(
            {
                types: {$in: types}
            });

        res.status(200).send({message: "Pokemon gotten successfully.", data: pokemons});
    } catch (err) {
        next(err);
    }
}

// search by name with a page limit and skip. filter by type/s or favorite
// limit deafult equals to 50, and skip default equals to 0
// in case user forget to send them so it will not return all the data at once
async function generalQuery (req, res, next) {
    try {
        let name = req.query.name;
        let limit = parseInt(req.query.limit);
        let skip = parseInt(req.query.skip);
        let favorite = req.query.favorite;
        console.log(favorite)
        let types = req.query.types;
        let pokemons;

        if (!limit) {
            limit = 50;
        }
        if (!skip) {
            skip = 0;
        }

        if (types) {
            types = types.split(',');
            types = types.map(value => new RegExp("^" + value + "$", "i"));

            pokemons = await Pokemon.aggregate([
                {
                    '$match': {
                        'name': new RegExp(name, "i"),
                        'types': {$in: types},
                        'favorite': favorite
                    }
                }
            ]).skip(skip).limit(limit);
        } else if (favorite) {
            favorite = (favorite == 'true');
            pokemons = await Pokemon.aggregate([
                {
                    '$match': {
                        'name': new RegExp(name, "i"),
                        'favorite': favorite
                    }
                }
            ]).skip(skip).limit(limit);
        } else if (name) {
            pokemons = await Pokemon.find(
                {
                    name: new RegExp(name, "i")
                }).skip(skip).limit(limit);
        } else {
            pokemons = await Pokemon.find().skip(skip).limit(limit);
        }

        res.status(200).send({message: "Pokemon gotten successfully.", data: pokemons});
    } catch (err) {
        next(err);
    }
}

exports.generalQuery = generalQuery;
