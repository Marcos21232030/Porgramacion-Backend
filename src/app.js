const express = require("express");
const app = express();
const PUERTO = 8080; 
const exphbs = require("express-handlebars"); 
const viewsRouter = require("./routes/views.router.js");

//Handlebars
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views"); 


//Middleware
app.use(express.static("./src/public"));

//Routing
app.use("/", viewsRouter);

//Iniciamos el servidor

const httpServer = app.listen(PUERTO, () => {
    console.log(`Escuchando en el puerto ${PUERTO} `);
})

//Importamos el módulo

const socket = require("socket.io");

//Creamos un array de usuarios

const usuarios = [
    {id: 1, nombre: "Lionel", apellido: "Messi"},
    {id: 2, nombre: "Cristiano", apellido: "Ronaldo"},
    {id: 3, nombre: "Neymar", apellido: "Junior"},
    {id: 4, nombre: "Kyliam", apellido: "Mbappe"},
    {id: 5, nombre: "Pocho", apellido: "Lavezzi"},
]


const io = socket(httpServer);

io.on("connection", (socket) => {
    console.log("Un cliente se conectó conmigo");
    

    socket.on("mensaje", (data) => {
        console.log(data);
    })

    socket.emit("saludito", "Hola Cliente, ¿cómo estas?");

    //Enviamos el array usuarios
    socket.emit("usuarios", usuarios);
})