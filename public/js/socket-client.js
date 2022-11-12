
// Referencias Html
const lblOnline = document.querySelector("#lblOnline");
const lblOfline = document.querySelector("#lblOfline");
const textMessage = document.querySelector("#textMessage");
const btnEnviar = document.querySelector("#btnEnviar");

const socket = io();

// On para escuchar un evento
socket.on('connect', () => {
    lblOfline.style.display = "none"
    lblOnline.style.display = ""
});


socket.on("disconnect", () => {
    lblOfline.style.display = ""
    lblOnline.style.display = "none"
});

// Escuchar mensaje 
socket.on('send-message', (payload)=>{
    console.log(payload)
})

btnEnviar.addEventListener('click', () => {
    const message = textMessage.value;
    const payload = {
        message,
        id: "abc4569",
        fecha: new Date().toISOString(),
    }

    // emit emitir un evento
    socket.emit('send-message', payload, (id)=>{
        console.log(`Desde el servidor ${id}`)
    } )
})