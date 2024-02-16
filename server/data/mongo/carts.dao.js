const { model, Schema, Types } = require('mongoose');

const CartProductSchema = new Schema({
  product: { type: Types.ObjectId, ref: 'Product' },
  quantity: Number,
});

const CartSchema = new Schema({
  products: [CartProductSchema],
  uid: { type: Types.ObjectId, ref: 'User' },
  state: String,
  // Add any other fields if necessary
});

const CartModel = model('Cart', CartSchema);

module.exports = {
  create: async (data) => {
    try {
      const newCart = await CartModel.create(data);
      return newCart;
    } catch (error) {
      throw error;
    }
  },

  read: async () => {
    try {
      const carts = await CartModel.find();
      return carts;
    } catch (error) {
      throw error;
    }
  },

  // Add any other CRUD operations if needed
};
