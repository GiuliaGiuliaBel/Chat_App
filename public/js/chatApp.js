'use strict';

$( document ).ready( () => {
const socket = io(); 

 const $chatForm = $('#chatForm');
 const $chatInput = $('#chat-input');
 const $chat = $('#chat');
 const $joined = $('#joined');
 const $chatUserId =$('#chat-user-id');
 const $chatUserName = $('#chat-user-name');
 let userName = $chatUserName.val();

$chatForm.submit((e) => {
    e.preventDefault();
   const userId = $chatUserId.val(),
    message  = $chatInput.val();
    socket.emit('message', {
        message: message,
        userName: userName,
        userId: userId
    });

 $chatInput.val('');
 return false;
});

socket.on('user joined', data => {
    $joined.append(`<div class="card card-body bg-light">${data.userName} joined the room</div>`).delay(5000).fadeOut();
})

socket.on('message', (message) => {
    displayMessage(message);
    for(let i = 0; i < 2; i++) {
        $('.chat-icon').fadeOut(200).fadeIn(200);
    }
});

socket.emit('send username', {userName:userName});

socket.on('user disconnected', () => {
    displayMessage({
        userName: 'Notice',
        message: 'User left the chat'
    }); 
});

let displayMessage = data => {
    $chat.append(`<div class='${getCurrentUserClass(data.user)}'>${data.userName}: ${data.message}</div>`)
};

let getCurrentUserClass = id => {
    let userId = $chatUserId.val();
    return userId === id ? 'current-user' : '';
 };
});
