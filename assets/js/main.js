import "./chat";

const socket = io("/");

function sendMessage(message){
    socket.emit("newMessage", { message: message });
    console.log(`You: ${message}`);
}

function setNickname(nickname){
    socket.emit("setNickname", { nickname });
}

socket.on("messageNotif", handleMessageNotif);