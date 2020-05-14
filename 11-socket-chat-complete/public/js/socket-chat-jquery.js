var params = new URLSearchParams(window.location.search);

//Jquery references
var usersDiv = $('#divUsuarios');
var sendMessageForm = $('#sendMessageForm');
var messageTxt = $('#messageTxt');
var chatBoxDiv = $('#divChatbox');

//Functions to render users
function renderUsers(people) {
    console.log(people);
    var html = 
        `<li>
            <a href="javascript:void(0)" class="active"> Chat de <span> ${params.get('room')}</span></a>
        </li>`
    ;

    for (let i = 0; i < people.length; i++) {
        const person = people[i];
        html += 
            `<li>
                <a data-id="${person.id}" href="javascript:void(0)"><img src="assets/images/users/1.jpg" alt="user-img" class="img-circle"> <span>${person.name} <small class="text-success">online</small></span></a>
            </li>`
        ;
    }

    usersDiv.html(html);
}

function renderMessages(message, me) {
    var date = new Date(message.date);
    var hour = date.getHours() + ':' + date.getMinutes();
    var html = '';
    var adminClass = 'info';
    if (message.name === 'Administrator') {
        adminClass = 'danger';
    }

    if (me) {
        html += '<li class="reverse">';
        html += '   <div class="chat-content">';
        html += '       <h5>' + message.name + '</h5>';
        html += '       <div class="box bg-light-info">' + message.message + '</div>';
        html += '   </div>';
        html += '   <div class="chat-img"><img src="assets/images/users/5.jpg" alt="user" /></div>';
        html += '   <div class="chat-time">' + hour + '</div>';
        html += '</li>';
    } else {
        html += '<li class="animated fadeIn">';
        if (message.name !== 'Administrator') {
            html += '   <div class="chat-img"><img src="assets/images/users/1.jpg" alt="user" /></div>';
        }
        html += '   <div class="chat-content">';
        html += '       <h5>' + message.name + '</h5>';
        html += '       <div class="box bg-light-' + adminClass + '">' + message.message + '</div>';
        html += '   </div>';
        html += '   <div class="chat-time">' + hour + '</div>';
        html += '</li>';
    }

    chatBoxDiv.append(html);
}

function scrollBottom() {
    // selectors
    var newMessage = chatBoxDiv.children('li:last-child');

    // heights
    var clientHeight = chatBoxDiv.prop('clientHeight');
    var scrollTop = chatBoxDiv.prop('scrollTop');
    var scrollHeight = chatBoxDiv.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight() || 0;

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        chatBoxDiv.scrollTop(scrollHeight);
    }
}

//Listeners
usersDiv.on('click', 'a', function() {
    var id = $(this).data('id');

    if (id) {
        console.log(id);
    }
});

sendMessageForm.on('submit', function(e) {
    e.preventDefault();
    if (messageTxt.val().trim().length === 0) return;

    socket.emit('createMessage', {
        message: messageTxt.val()
    }, function(message){ 
        messageTxt.val('').focus();
        renderMessages(message, true);
        scrollBottom();
    });
});