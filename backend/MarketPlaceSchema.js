const mongoose = require('mongoose');

const MarketPlaceSchema = new mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    price: {type: Number, required: true},
    image: {type: String, required: true}
})

const MarketPlaceItem = mongoose.model('MarketPlaceItem', MarketPlaceSchema)

module.exports = MarketPlaceItem;