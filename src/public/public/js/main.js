

const socket = io(); 



socket.emit("mensaje", "Hola Mundo! te escribo desde el cliente!" );



socket.on("saludito", (data) => {
    console.log(data);
})


socket.on("usuarios", (data) => {
    
    const listaUsuarios = document.getElementById("lista-usuarios");
    listaUsuarios.innerHTML = "";

    data.forEach(usuario => {
        listaUsuarios.innerHTML += `<li> ${usuario.nombre} - ${usuario.apellido} </li>`
    })
})