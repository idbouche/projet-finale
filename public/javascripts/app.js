
$(document).ready(function(){

     $.get( "/friends")
        .done(function( data ) { 
            if (data.user.length >= 1){
                console.dir(data.user)
                for(i=0; i<data.user.length; i++){
                    $(".listAmie").append('<li   class="mdl-list__item mdl-list__item--two-line"><span class="mdl-list__item-primary-content"><img class="material-icons mdl-list__item-avatar" src="'
                    + data.user[i].profile.picture+'"><span><a href="/profiles?id='+data.user[i]._id+'">'
                    + data.user[i].profile.name+'</a></span> <span class="mdl-list__item-sub-title '
                    +data.user[i].status+'"></span></span></li> ')
                
                    
                }  
                var myFunction = function(id){
                    console.log(id)
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

    

    $('.chatin').click(function(){
        console.log('chat ')
        $(".chat").append( `<div class="demo-card-wide mdl-card mdl-shadow--2dp">
        <div class="mdl-card__title">
            <h2 class="mdl-card__title-text">Welcome</h2>
        </div>
        <div class="mdl-card__supporting-text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Mauris sagittis pellentesque lacus eleifend lacinia...
        </div>
        <div class="mdl-card__actions mdl-card--border">
            <a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">
            Get Started
            </a>
        </div>
        <div class="mdl-card__menu">
            <button class="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect">
            <i class="material-icons">share</i>
            </button>
        </div>
        </div>`)
    })
});