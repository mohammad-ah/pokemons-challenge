const jwt = require("jsonwebtoken");
const { ACCESS_TOKEN_SECRET } = require("../bin/.env");

module.exports = (req, res, next) => {
    var token = jwt.sign("PANDA", ACCESS_TOKEN_SECRET);
    res.status(200).send({ message: "User Name is PANDA.", "token" : token});
};
