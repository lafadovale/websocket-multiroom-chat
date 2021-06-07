// Import the server configuration
let app = require ('./config/server');

// Parameterize the listening port
let server = app.listen(8888, function(){
    console.log('Server online');
});

let io = require('socket.io').listen(server);

app.set('io', io);

// Create the websocket connection
io.on('connection', function(socket){
    console.log('User connected');

    socket.on('disconnect', function(){
        console.log('User disconnected');
    });

    socket.on('msgToServer', function(data){

        //dialog
        socket.emit(
            'msgToClient',
            {alias: data.alias, msg: data.msg}
        );

        socket.broadcast.emit(
            'msgToClient',
            {alias: data.alias, msg: data.msg}
        );

        //participants        
        if(parseInt(data.alias_updated_on_clients) == 0){
            socket.emit(
                'participantsToClient',
                {alias: data.alias}
            );
            socket.broadcast.emit(
                'participantsToClient',
                {alias: data.alias}
            );
        };        
    });
});