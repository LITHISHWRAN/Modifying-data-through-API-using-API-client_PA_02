const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
    },
    description : {type : String},
    price : {
        type : Number,
        required : true,
    },
})

const Product = new mongoose.model("Product",productSchema);

module.exports = Product;