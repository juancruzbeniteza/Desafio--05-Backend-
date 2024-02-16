const fs = require('fs').promises;
const { v4: uuidv4 } = require('uuid');

class CartFsManager {
  constructor(filePath) {
    this.path = filePath;
  }

  async create() {
    try {
      const carts = await this.read();
      const newCart = {
        id: uuidv4(),
        products: [],
      };

      carts.push(newCart);
      await this.save(carts);
      return newCart;
    } catch (error) {
      console.error('Error creating cart:', error.message);
      return null;
    }
  }

  async read() {
    try {
      const data = await fs.readFile(this.path, 'utf8');
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error reading carts:', error.message);
      return [];
    }
  }

  async readOne(id) {
    const carts = await this.read();
    return carts.find(cart => cart.id === id);
  }

  async addProductToCart(cartId, productId, quantity) {
    try {
      const carts = await this.read();
      const cartIndex = carts.findIndex(cart => cart.id === cartId);

      if (cartIndex !== -1) {
        const productIndex = carts[cartIndex].products.findIndex(product => product.id === productId);

        if (productIndex !== -1) {
          // Product already exists in the cart, update quantity
          carts[cartIndex].products[productIndex].quantity += quantity;
        } else {
          // Product doesn't exist in the cart, add it
          carts[cartIndex].products.push({ id: productId, quantity });
        }

        await this.save(carts);
        return carts[cartIndex];
      }

      return null;
    } catch (error) {
      console.error('Error adding product to cart:', error.message);
      return null;
    }
  }

  async destroy(id) {
    try {
      const carts = await this.read();
      const updatedCarts = carts.filter(cart => cart.id !== id);
      await this.save(updatedCarts);
    } catch (error) {
      console.error('Error deleting cart:', error.message);
    }
  }

  async save(carts) {
    try {
      await fs.writeFile(this.path, JSON.stringify(carts, null, 2), 'utf8');
      console.log('Carts saved successfully.');
    } catch (error) {
      console.error('Error saving carts:', error.message);
    }
  }
}

module.exports = CartFsManager;
