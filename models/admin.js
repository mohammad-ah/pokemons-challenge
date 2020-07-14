const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
    id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    classification: {
        type: String
    },
    types: {
        type: [String]
    },
    resistant: {
        type: [String]
    },
    weaknesses: {
        type: [String]
    },
    weight: {
        type: {}
    },
    height: {
        type: {}
    },
    fleeRate: {
        type: Number
    },
    evolutionRequirements: {
        type: {}
    },
    evolutions: {
        type: [{}]
    },
    maxCP: {
        type: Number
    },
    maxHP: {
        type: Number
    },
    attacks: {
        type: {}
    },
    favorite: {
        type: Boolean
    }
});

postSchema.index({ types: 1 }, { sparse: true });
postSchema.index({ favorite: 1 }, { sparse: true });

module.exports = mongoose.model('Post', postSchema);
