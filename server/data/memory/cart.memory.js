const { v4: uuidv4 } = require('uuid');

class CartMemoryManager {
  constructor() {
    this.carts = [];
  }

  async create() {
    const newCart = {
      id: uuidv4(),
      products: [],
    };

    this.carts.push(newCart);
    return newCart;
  }

  async read() {
    return this.carts;
  }

  async readOne(id) {
    return this.carts.find(cart => cart.id === id);
  }

  async addProductToCart(cartId, productId, quantity) {
    const cartIndex = this.carts.findIndex(cart => cart.id === cartId);

    if (cartIndex !== -1) {
      const productIndex = this.carts[cartIndex].products.findIndex(product => product.id === productId);

      if (productIndex !== -1) {
        // Product already exists in the cart, update quantity
        this.carts[cartIndex].products[productIndex].quantity += quantity;
      } else {
        // Product doesn't exist in the cart, add it
        this.carts[cartIndex].products.push({ id: productId, quantity });
      }

      return this.carts[cartIndex];
    }

    return null;
  }

  async destroy(id) {
    this.carts = this.carts.filter(cart => cart.id !== id);
  }
}

module.exports = CartMemoryManager;
