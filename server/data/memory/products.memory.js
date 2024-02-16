const { v4: uuidv4 } = require('uuid');

class ProductMemoryManager {
  constructor() {
    this.products = [];
  }

  async create(data) {
    const newProduct = {
      id: uuidv4(),
      title: data.title,
      description: data.description,
      price: data.price,
      thumbnail: data.thumbnail,
      code: data.code,
      stock: data.stock, 
    };

    this.products.push(newProduct);
    return newProduct;
  }

  async read() {
    return this.products;
  }

  async readOne(id) {
    return this.products.find(product => product.id === id);
  }

  async destroy(id) {
    this.products = this.products.filter(product => product.id !== id);
  }
}

module.exports = ProductMemoryManager;
