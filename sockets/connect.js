//  /sockets/connect.js

    socket = io.connect('http://localhost:6080'); // local server //

// *************************************************** //
//  Initialise socket.io connection in production server. 
//  source: "https://gonzalo123.com/2011/05/23/real-time-notifications-part-ii-now-with-node-js-and-socket-io/"
/*
    socket = new io.connect(null, {
    //  no host used. "null" without port is needed to work // IMPORTANT //
    //  no port used. Socket.io server is listening to port 8080 of express http server.
        transports: ["websocket"],
        "try multiple transports": false,
        "flash policy server": false
     }); 

//  or simple: socket = new io.connect(null); // host "null" without port is needed to work // IMPORTANT //
*/
// *************************************************** //

//  We are using room of socket io.
//  socket.emit("join", { namespace:room() });
    
//  Add a connect listener.
    socket.on('connect',function() {
        debugMode && console.log("Client has connected to the server!");
        debugMode && console.log("clientid:", socket.socket.sessionid);
    });

//  Add a connect listener.
    socket.on('message',function(data) {
        debugMode && console.log("Received a message from the server:", data);
    });

//  Add an error listener.
    socket.on("error", function (message) {
        debugMode && console.error("Reseving 'error' message from the server:", message);
    });

//  Add a disconnect listener.
    socket.on('disconnect',function() {
        debugMode && console.log("The client has disconnected!");
    });

    function room(){ 
        return "webspaces";
    //  return window.location.pathname.replace(/\//g, "");
    //  return window.location.pathname.replace(/[\/\W]/g, "");
    }

//  Sends a message to the server via sockets
    function sendMessageToServer(message) {
        socket.send(message);
        debugMode && console.log("Sending", message, "to the server!");
    }









































