const { model, Schema } = require('mongoose');

const ProductSchema = new Schema({
  title: String,
  description: String,
  price: Number,
  thumbnail: String,
  code: String,
  stock: Number,
  // Add any other fields if necessary
});

const ProductModel = model('Product', ProductSchema);

module.exports = ProductModel;
