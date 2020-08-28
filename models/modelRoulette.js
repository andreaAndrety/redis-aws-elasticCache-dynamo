const dynamoose = require('dynamoose');
const ROULETTE_TABLE = process.env.ROULETTE_TABLE;
Schema = dynamoose.Schema;

roulette = new Schema({
    "rouletteId": {
        type: String,
        required: true,
        hashKey: true
    },
    "name": {
        type: String,
        required: true
    },
    "isOpen": {
        type: Boolean,
        required: true,
        default: true
    },
    "rouletteDate": {
        type: String,
        required: true,
    }
}, {
    "timestamps": true,
    "saveUnknown": true
});

module.exports = dynamoose.model(ROULETTE_TABLE, roulette);