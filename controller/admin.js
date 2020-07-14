const fs = require('fs');
const path = require("path");
const mongoose = require("mongoose");
const dbPath = path.resolve(__dirname, '../utils/pokemons.json');
const db = mongoose.connection;

function insertDataToDB(res) {
    let data = fs.readFileSync(dbPath);
    data = JSON.parse(data);

    db.collection('pokemons').insert(data, function(error, record){
        if (error) throw error;
        res.status(200).send({ message: "DB initialized successfully."});
    });
}

exports.initDb = async (req, res, next) => {
    try {
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

exports.getById = async (req, res, next) => {
    try {
        res.status(200).send({message: "Pokemon gotten successfully - ById.", data: 'Data'});
    } catch (err) {
        next(err);
    }
}

exports.toggleFavorite = async(req, res, next) => {
    try {
        res.status(200).send({ message: "Toggled successfully."});
    } catch (err) {
        next(err);
    }
}

exports.search = async(req, res, next) => {
    try {
        res.status(200).send({message: "Pokemon gotten successfully - Search.", data: 'Data'});
    } catch (err) {
        next(err);
    }
}

async function generalQuery (req, res, next) {
    try {
        res.status(200).send({message: "Pokemon gotten successfully - General.", data: 'Data'});
    } catch (err) {
        next(err);
    }
}

exports.generalQuery = generalQuery;
