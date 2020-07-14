const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pokemonsSchema = new Schema({
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

pokemonsSchema.index({ types: 1 }, { sparse: true });
pokemonsSchema.index({ favorite: 1 }, { sparse: true });
pokemonsSchema.index({ name: 1 }, { sparse: true });
pokemonsSchema.index({ id: 1 }, { sparse: true });

module.exports = mongoose.model('Pokemon', pokemonsSchema);
