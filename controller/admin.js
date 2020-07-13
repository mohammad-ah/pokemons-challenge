exports.initDb = async (req, res, next) => {
    try {
        res.status(200).send({ message: "DB initialized successfully."});
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
