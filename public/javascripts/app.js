
var socket = io();

$(document).ready(function(){
    
    var email = $('#spanUser').html()
    var emailSender 
    var idlocal= $('#id').val()
    var namelocal= $('#name').val()
    var cont = 0
    socket.emit('start', {email: email,  state:true, name:namelocal});
    socket.on('start chat', function(data){
        if (cont == 0){
            var string = data.data.split('&')
            let id = string[1]  
            emailSender = string[0]
            var nameSender = string[2]    
            let nameLocal = $('.'+nameSender+' a').html()
            console.log(nameLocal + "  "+nameSender)
            if (nameSender == nameLocal){
                $('.'+nameSender).append('<span class="mdl-badge" data-badge="1">M</span>')

            }
            
            cont++
        } 
    })

    var ids = []
    $.get( "/friends")
        .done(function( data ) { 
            if (data.user.length >= 1){
                for(i=0; i<data.user.length; i++){
                    $(".listAmie").append('<li   class="mdl-list__item mdl-list__item--two-line"><span class="mdl-list__item-primary-content"><img data-options="'+data.user[i]._id+'&'+data.user[i].status+
                    '" class="material-icons mdl-list__item-avatar" src="'
                    + data.user[i].profile.picture+'"><span class="'+ data.user[i].profile.name+'" ><a href="/profiles?id='+data.user[i]._id+'" >'
                    + data.user[i].profile.name+'</a></span> <span class="mdl-list__item-sub-title '
                    +data.user[i].status+'"></span></span></li> ')  
                    
                }
            }
        });
      


        $(".amici").delegate("img", "click", function(e){
                   
                var options  = $(this).data("options")
                var str = options.split('&')
                console.log(str)
                var status = str[1];
                var id = str[0];
                var room = email+'&'+id+'&'+namelocal
                console.log(status)
                if(status === "true"){
                    console.log('status')
                   if(ids.indexOf(id) === -1){
                       socket.emit('subscribe', room);
                        $(".chats").append(`
                        <ul class="demo-list-three mdl-list chat">

                        </ul>
                       
                            <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                            <textarea id="schools${id}" type="text" rows="5" name="message" class="mdl-textfield__input"></textarea>
                            <label for="schools${id}" class="mdl-textfield__label">Type message</label>
                            </div>
                            <p>
                            <button id="chatss${id}" class="mdl-button mdl-js-button mdl-button--raised mdl-button--accent">Envoyez</button>
                            </p>
                        `)
                        ids.push(id)
                        $('.chats').delegate('#chatss'+id, 'click', function(event){
                            var message = $(`#schools${id}`).val()
                            console.log(message)
                            socket.emit('send message', {room:room, message:message});   

                        })

                            socket.on('conversation private post', function(data) {
                                //display data.message
                                console.log("lathtt", data) 
                                var strings = data.room.split('&')
                                $('.chat').append('<li><h3>'+strings[2]+'</H3>'+data.message+'</li>')                      
                            });

                         

                   }
                }
                   
            });


    ///chat?id=' +data.user[i]._id+'&name='+data.user[i].profile.name+'&avatar=' +data.user[i].profile.picture+'

    

        $.get( "/messages")
            .done(function( data ) {
                console.log(data)
                if (data.message.length >= 1){
                    for(i=0; i < data.message.length; i++){
                        $(".messageShow").append('<li class="mdl-list__item mdl-list__item--three-line"><span class="mdl-list__item-primary-content"><img class="material-icons mdl-list__item-avatar" src= "'
                        +data.message[i].messageAvatar+'"><span>'+data.message[i].userName+
                        '</span><span class="mdl-list__item-text-body">'+data.message[i].message+'</span></span></li>')
                    }  
                } 
                $('#schools').val('');   
            });
    
    document.onkeypress=function(e){
        var textSearch = $('#search').val();
            if(textSearch.length >= 2){
                console.log(e.code)
                $.get( "/search", { name: textSearch} )
                .done(function( data ) {
                    console.log(data.result.length)
                    if (data.result.length >= 1){
                        console.dir(data.result[0].profile.name)
                        $(".searchShow").html('<div class="mdl-layout-spacer"><img src="'+data.result[0].profile.picture+
                        '" alt=""><br><br><table class="mdl-data-table mdl-js-data-table mdl-shadow--2dp"><tbody><tr><td class = "mdl-data-table__cell--non-numeric">UserName</td><td>'
                        +data.result[0].profile.name+
                        '</td></tr><tr><td class = "mdl-data-table__cell--non-numeric">Email</td><td>'
                        +data.result[0].email+
                        '</td></tr><tr><td class = "mdl-data-table__cell--non-numeric">Firstname</td><td>'
                        +data.result[0].profile.firstName+
                        '</td></tr><tr><td class = "mdl-data-table__cell--non-numeric">Secondename</td><td>'
                        +data.result[0].profile.secondeName+
                        '</td></tr><tr><td class = "mdl-data-table__cell--non-numeric">Prefirence</td><td>'
                        +data.result[0].profile.prefirence+
                        '</td></tr><tr><td class = "mdl-data-table__cell--non-numeric">Sex</td><td>'
                        +data.result[0].profile.sex+
                        '</td></tr><tr><td class = "mdl-data-table__cell--non-numeric">Age</td><td>'
                        +data.result[0].profile.age+
                        '</td></tr><tr><td class = "mdl-data-table__cell--non-numeric">Address</td><td>'
                        +data.result[0].profile.address+
                        '</td></tr><tr><td class = "mdl-data-table__cell--non-numeric">Presintation</td><td>'
                        +data.result[0].profile.presintation+
                        '</td><td class="mdl-button mdl-js-button mdl-js-ripple-effect"><a href="/invet?email='
                        +data.result[0].email+'&idi='+data.result[0]._id+
                        '">Invitation</a></td></tr></tbody></table></div>');
                    }

                });
             }
             if (e.code === 'Enter'){
                  $('#search').val('');
             }
    }




    $(".messageUser").click(function(){
       
        var id = window.location.href.slice(window.location.href.indexOf('?') + 1)
        $.get( "/message?"+id)
        .done(function( data ) {
            if (data.message.length >= 1){
                for(i=0; i < data.message.length; i++){
                    $(".messageShows").append('<li class="mdl-list__item mdl-list__item--three-line"><span class="mdl-list__item-primary-content"><img class="material-icons mdl-list__item-avatar" src= "'
                    +data.message[i].messageAvatar+'"><span>'+data.message[i].userName+
                    '</span><span class="mdl-list__item-text-body">'+data.message[i].message+'</span></span></li>')
                } 
                $(".messageUser").hide() 
            }
        });
    });

     //$("#chat").click(function(){    
        var id = window.location.href.slice(window.location.href.indexOf('?') + 1)
        
     //});

/*/setInterval("Horloge()", 1000);
    //setInterval(function(){
        $.get( "/chat?"+id)
            
            .done(function( data ) {
                if (data.chat.length >= 1){
                    console.log("chat")
                    for(i=0; i < data.chat.length; i++){
                        $(".chat").append( `<li class="mdl-list__item mdl-list__item--three-line">
                        <span class="mdl-list__item-primary-content"><i class="material-icons mdl-list__item-avatar">person</i>
                        <span>${ data.chat[i].senderName}</span><span class="mdl-list__item-text-body">
                        ${data.chat[i].message}</span></span></li>`)
                    } 
                }
            });
    //}, 500000000000);*/
});