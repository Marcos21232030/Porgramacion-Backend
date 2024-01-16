const fs = require('fs');

class ProductManager {
  constructor(filePath) {
    this.path = filePath;
  }

  addProduct(product) {
    const products = this.getProductsFromFile();
    product.id = this.generateId(products);
    products.push(product);
    this.saveProductsToFile(products);
    return product;
  }

  getProducts() {
    return this.getProductsFromFile();
  }

  getProductById(id) {
    const products = this.getProductsFromFile();
    return products.find(product => product.id === id);
  }

  updateProduct(id, updatedFields) {
    const products = this.getProductsFromFile();
    const index = products.findIndex(product => product.id === id);

    if (index !== -1) {
      products[index] = { ...products[index], ...updatedFields };
      this.saveProductsToFile(products);
      return products[index];
    }

    return null;
  }

  deleteProduct(id) {
    const products = this.getProductsFromFile();
    const updatedProducts = products.filter(product => product.id !== id);
    this.saveProductsToFile(updatedProducts);
    return products.find(product => product.id === id) || null;
  }

  generateId(products) {
    return products.length > 0 ? Math.max(...products.map(product => product.id)) + 1 : 1;
  }

  getProductsFromFile() {
    try {
      const data = fs.readFileSync(this.path, 'utf8');
      return JSON.parse(data) || [];
    } catch (error) {
      return [];
    }
  }

  saveProductsToFile(products) {
    const data = JSON.stringify(products, null, 2);
    fs.writeFileSync(this.path, data);
  }
}


const productManager = new ProductManager('productos.json');


const newProduct = {
  title: 'Nuevo Producto',
  description: 'Descripción del nuevo producto',
  price: 19.99,
  thumbnail: 'ruta/de/imagen.jpg',
  code: 'ABC123',
  stock: 50,
};

const addedProduct = productManager.addProduct(newProduct);
console.log('Producto agregado:', addedProduct);

// Obetener todos los productos 
const allProducts = productManager.getProducts();
console.log('Todos los productos:', allProducts);

//Obtener producto por ID
const productIdToFind = 1; 
const foundProduct = productManager.getProductById(productIdToFind);
console.log('Producto encontrado por ID:', foundProduct);

//Actualizar producto por ID
const productIdToUpdate = 1; 
const updatedFields = { price: 29.99, stock: 60 };
const updatedProduct = productManager.updateProduct(productIdToUpdate, updatedFields);
console.log('Producto actualizado:', updatedProduct);

//Eliminar producto por ID
const productIdToDelete = 1; 
const deletedProduct = productManager.deleteProduct(productIdToDelete);
console.log('Producto eliminado:', deletedProduct);
