const mongoose = require("mongoose")
const { ObjectId } = mongoose.Schema

const bookingSchema = new mongoose.Schema({
    itemId : {
        _id: {
            type: ObjectId,
            ref: 'Item',
            required: true
        },
        name: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        duration: {
            type: Number,
            required: true
        },
    },
    bookingStartDate : {
        type: String,
        required: true
    },
    bookingEndDate : {
        type: String,
        required: true
    },
    total : {
        type: Number,
        required: true
    },
    memberId: {
        type: ObjectId,
        required: true
    },
    payments: {
        image: {
            type: String,
            required: true
        },
        bankFrom: {
            type: String,
            required: true
        },
        accountHolder: {
            type: String,
            required: true
        },
    },
    memberId:{
        type: ObjectId,
        required: true
    }
})

module.exports = mongoose.model("Booking", bookingSchema)
