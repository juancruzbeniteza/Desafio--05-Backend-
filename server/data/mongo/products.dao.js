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

module.exports = {
  create: async (data) => {
    try {
      const newProduct = await ProductModel.create(data);
      return newProduct;
    } catch (error) {
      throw error;
    }
  },

  read: async () => {
    try {
      const products = await ProductModel.find();
      return products;
    } catch (error) {
      throw error;
    }
  },

  // Add any other CRUD operations if needed
};
