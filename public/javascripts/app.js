
$(document).ready(function(){

     $.get( "/friends")
        .done(function( data ) { 
            if (data.user.length >= 1){
                console.dir(data.user)
                for(i=0; i<data.user.length; i++){
                    $(".listAmie").append('<li><img src="'+ data.user[i].profile.picture+
                    '" class="demo-avatar" alt=""> '+ data.user[i].profile.firstName+
                    ' '+ data.user[i].profile.secondeName+'</li>')
                }  
            }
        });


        $.get( "/message")
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
                        $(".searchShow").append('<div class="mdl-layout-spacer"><img src="'+data.result[0].profile.picture+
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

    $("#searchBtn").click(function(){
        var textSearch = $('#search').val();
        $.get( "/friendrs")
        .done(function( data ) {
            if (data.user.length >= 1){
                console.dir(data.result[0].profile.name)
            }
            $('#search').val('');
        });
    });

    $("#sendMessage").click(function(){
        
    })