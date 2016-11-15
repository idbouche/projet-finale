var express = require('express');
var router = express.Router();
var app = express();
var server = require('http').Server(app);
var io = require('socket.io').listen(server,{});
var mongoose = require('mongoose');
var User = require('../model/user');

var idU 
var SOCKET_LIST={}
var USER_LIST = {}
var Player = function(email){
    var play = {
        email:email,
    }
}


module.exports = function(io) {

    router.get('/', function(req, res, next) {
  		idU = req.user._id
        console.log(req.user._id)
        res.render('index', { title: 'Game multiplayers' });
        
    });

    io.on('connection', function(socket) {
 
        socket.on('start',function(dat){
            console.log(dat.user)
            socket.id = dat.user;
            SOCKET_LIST[socket.id] = socket
            
            var sizeSocket = Object.keys(SOCKET_LIST).length;
            var user = new Player(socket.id)
            
            USER_LIST[socket.id] = user;
            var sizeUsers = Object.keys(USER_LIST).length;
            console.log(sizeUsers)

            if(dat.user != undefined){

                User.findOne({ email: dat.user }, function(err, user) {
                if (err) return next(err);
                //console.log(user)
                user.status = dat.state
                user.save(function(err) {
                    if (err) return next(err);
                });
            });
            }

            socket.emit('message',{message:"Veuiller ressie"});

                    
        });

         socket.on('state',function (data) {

         })

        socket.on('disconnect',function(){
            console.log('(disconnect)')
            delete SOCKET_LIST[socket.id];
            delete USER_LIST[socket.id];
        });

    });
    return router;
}