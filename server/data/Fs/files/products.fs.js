  const fs = require('fs').promises;
  const { v4: uuidv4 } = require('uuid');

  class ProductFsManager {
    constructor(filePath) {
      this.path = filePath;
    }

    async create(data) {
      try {
        const products = await this.read();
        const newProduct = {
          id: uuidv4(),
          title: data.title,
          description: data.description,
          price: data.price,
          thumbnail: data.thumbnail,
          code: data.code,
          stock: data.stock,
        };

        products.push(newProduct);
        await this.save(products);
        return newProduct;
      } catch (error) {
        console.error('Error adding product:', error.message);
        return null;
      }
    }

    async read() {
      try {
        const data = await fs.readFile(this.path, 'utf8');
        return data ? JSON.parse(data) : [];
      } catch (error) {
        console.error('Error reading products:', error.message);
        return [];
      }
    }

    async readOne(id) {
      const products = await this.read();
      return products.find(product => product.id === id);
    }

    async destroy(id) {
      try {
        const products = await this.read();
        const updatedProducts = products.filter(product => product.id !== id);
        await this.save(updatedProducts);
      } catch (error) {
        console.error('Error deleting product:', error.message);
      }
    }

    async save(products) {
      try {
        await fs.writeFile(this.path, JSON.stringify(products, null, 2), 'utf8');
        console.log('Products saved successfully.');
      } catch (error) {
        console.error('Error saving products:', error.message);
      }
    }
  }

  module.exports = ProductFsManager;
