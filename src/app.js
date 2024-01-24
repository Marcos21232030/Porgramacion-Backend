const http = require("http");

const server = http.createServer( (reuest, response)=>{
    console.log("se realizo una peticion al servidor");
    response.end("Mi primer Hola Mundo desde Backend");
})

const PUERTO = 8080;

/*server.listen(PUERTO, ()=>{
    console.log(`Escuchando en el http://localhost:${PUERTO}`);
})*/

const express = require("express");
const exp = require("constants");

const app = express();

app.get("/", (req, res) => {
    res.send("Mi respuesta desde Express");
})

app.get("/tienda", (req, res)=>{
    res.send("Bienvenido a la tienda");
})

app.get("/contacto", (req, res)=>{
    res.send("Estamos en contacto ahora");
})

app.listen(PUERTO, ()=> {
    console.log(`Escuchando en el http://localhost:${PUERTO}`);
})

const arrayProductos = [
    {id: 1, nombre: "fideos" , precio:150},
    {id: 2, nombre: "arroz" , precio:250},
    {id: 3, nombre: "pan" , precio:350},
    {id: 4, nombre: "leche" , precio:450},
    {id: 5, nombre: "aceite" , precio:550},
]

app.get("/productos", (req, res) => {

    res.send(arrayProductos);
} )

app.get("/productos/:id", (req, res) => {

    let id = req.params.id;

    console.log(id, typeof id);

    let producto = arrayProductos.find(producto => producto.id == id);

    if(producto) {
        res.send(producto);
    }else {
        res.send("Producto no encontrado");
    }

} )

app.use(express.urlencoded({extended:true}));

app.get("/clientes", (req, res) => {
    let nombre = req.query.nombre;
    let apellido = req.query.apellido;

    res.send(`Bienvenido ${nombre} ${apellido}`);
})