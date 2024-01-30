
const express = require('express');
const fs = require('fs/promises');
const { v4: uuidv4 } = require('uuid');


const app = express();
const PORT = 8080;


app.use(express.json());


const productsRouter = express.Router();


productsRouter.get('/', async (req, res) => {
  try {

    const productsData = await fs.readFile('productos.json', 'utf-8');
    const products = JSON.parse(productsData);
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener productos.' });
  }
});


productsRouter.get('/:pid', async (req, res) => {
  const productId = req.params.pid;
  try {

    const productsData = await fs.readFile('productos.json', 'utf-8');
    const products = JSON.parse(productsData);

   
    const product = products.find((p) => p.id === productId);

    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: 'Producto no encontrado.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener el producto.' });
  }
});


productsRouter.post('/', async (req, res) => {
  const newProduct = {
    id: uuidv4(), 
    title: req.body.title,
    description: req.body.description,
    code: req.body.code,
    price: req.body.price,
    status: req.body.status !== undefined ? req.body.status : true,
    stock: req.body.stock,
    category: req.body.category,
    thumbnails: req.body.thumbnails,
  };

  try {
 
    const productsData = await fs.readFile('productos.json', 'utf-8');
    const products = JSON.parse(productsData);

    
    products.push(newProduct);

  
    await fs.writeFile('productos.json', JSON.stringify(products, null, 2), 'utf-8');

    res.json(newProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al agregar un nuevo producto.' });
  }
});


productsRouter.put('/:pid', async (req, res) => {
  const productId = req.params.pid;
  try {

    const productsData = await fs.readFile('productos.json', 'utf-8');
    let products = JSON.parse(productsData);


    const productIndex = products.findIndex((p) => p.id === productId);

    if (productIndex !== -1) {
  
      products[productIndex] = { ...products[productIndex], ...req.body };


      await fs.writeFile('productos.json', JSON.stringify(products, null, 2), 'utf-8');

      res.json(products[productIndex]);
    } else {
      res.status(404).json({ error: 'Producto no encontrado.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar el producto.' });
  }
});


productsRouter.delete('/:pid', async (req, res) => {
  const productId = req.params.pid;
  try {

    const productsData = await fs.readFile('productos.json', 'utf-8');
    let products = JSON.parse(productsData);


    products = products.filter((p) => p.id !== productId);


    await fs.writeFile('productos.json', JSON.stringify(products, null, 2), 'utf-8');

    res.json({ message: 'Producto eliminado correctamente.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar el producto.' });
  }
});


app.use('/api/products', productsRouter);


const cartsRouter = express.Router();


cartsRouter.post('/', async (req, res) => {
  const newCart = {
    id: uuidv4(),
    products: [],
  };

  try {
   
    const cartsData = await fs.readFile('carrito.json', 'utf-8');
    const carts = JSON.parse(cartsData);

   
    carts.push(newCart);

   
    await fs.writeFile('carrito.json', JSON.stringify(carts, null, 2), 'utf-8');

    res.json(newCart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear un nuevo carrito.' });
  }
});


cartsRouter.get('/:cid', async (req, res) => {
  const cartId = req.params.cid;
  try {
   
    const cartsData = await fs.readFile('carrito.json', 'utf-8');
    const carts = JSON.parse(cartsData);

  
    const cart = carts.find((c) => c.id === cartId);

    if (cart) {
      res.json(cart.products);
    } else {
      res.status(404).json({ error: 'Carrito no encontrado.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los productos del carrito.' });
  }
});


cartsRouter.post('/:cid/product/:pid', async (req, res) => {
  const cartId = req.params.cid;
  const productId = req.params.pid;
  const quantity = req.body.quantity || 1;

  try {

    const cartsData = await fs.readFile('carrito.json', 'utf-8');
    let carts = JSON.parse(cartsData);


    const cartIndex = carts.findIndex((c) => c.id === cartId);

    if (cartIndex !== -1) {

      const existingProductIndex = carts[cartIndex].products.findIndex((p) => p.id === productId);

      if (existingProductIndex !== -1) {
     
        carts[cartIndex].products[existingProductIndex].quantity += quantity;
      } else {
      
        carts[cartIndex].products.push({ id: productId, quantity });
      }

      
      await fs.writeFile('carrito.json', JSON.stringify(carts, null, 2), 'utf-8');

      res.json(carts[cartIndex]);
    } else {
      res.status(404).json({ error: 'Carrito no encontrado.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al agregar el producto al carrito.' });
  }
});


app.use('/api/carts', cartsRouter);


app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
