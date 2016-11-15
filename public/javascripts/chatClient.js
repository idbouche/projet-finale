var socket = io();


$(document).ready(function(){

    var email = $('#spanUser').html()
    console.log(email)

    if( email != undefined ){

        socket.emit('start',{user: email,  state:true});

        socket.on('message',function(data){
    
             console.log(data)
         });

    }else{

       socket.emit('start',{  state:true}); 
    }

    
});

