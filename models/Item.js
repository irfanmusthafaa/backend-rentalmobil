const mongoose= require("mongoose");
const { ObjectId } = mongoose.Schema;

const itemSchema = new mongoose.Schema( {
    name: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    unit: {
        type: String,
        required: true
    },
    isPopular: {
        type: Boolean,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    categoryId: {
        type: ObjectId,
        required: true
    },
    imageUrl: [{
        type: ObjectId,
        ref: 'Image',
        required: true
    }],

})

module.exports = mongoose.model('Item', itemSchema)