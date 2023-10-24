const mongoose = require("mongoose");

const electronicsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        minLength: [10, "Name must be atleast 10 characters long."]
    },
    type: {
        type: String,
        required: [true, "Type is required"],
        minLength: [2, "Type must be atleast 2 characters long."]
    },
    damages: {
        type: String,
        required: [true, "Damages is required"],
        minLength: [10, "Damages must be atleast 10 characters long."]
    },
    imageUrl: {
        type: String,
        required: [true, "Image is required"],
        validate: /^https?:\/\//i
    },
    description: {
        type: String,
        required: [true, "Description is required"],
        minLength: [10, "Description must be atleast 10 characters long."],
        maxLength: [200, "Description can not be more than 200 charactesrs long"]
    },
    production: {
        type: Number,
        required: [true, "Production is required"],
        min: 1900,
        max: 2023,
    },
    exploitation: {
        type: Number,
        required: [true, "Exploitation is required"],
        min: [1, "Exploitation must be a positive number"]
    },
    price: {
        type: Number,
        required: [true, "Price is required"],
        min: [1, "Price must be a positive number"]
    },
    buyingList: [
        {
            type: mongoose.Types.ObjectId,
            ref: "User"
        }
    ],
    owner: {
        type: mongoose.Types.ObjectId,
        ref: "USer",
    }
})

const Electronics = mongoose.model("Electronics", electronicsSchema);

module.exports = Electronics;

