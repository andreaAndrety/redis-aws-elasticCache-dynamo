const dynamoose = require('dynamoose');
const BET_TABLE = process.env.BET_TABLE;
Schema = dynamoose.Schema;

bet = new Schema({
    "betId": {
        type: String,
        required: true,
        hashKey: true
    },
    "userId": {
        type: String,
        required: true
    },
    "type": {
        type: Boolean,
        required: true,
        enum: ['color', 'number']
    },
    "bet": {
        type: String,
        required: true
    },
    "betValor": {
        type: Number,
        required: true,
        validate: (val) => val > 0 && val <= 10000
    },
    "betDate": {
        type: String,
        required: true
    }
}, {
    "timestamps": true,
    "saveUnknown": true
});

module.exports = dynamoose.model(BET_TABLE, bet);