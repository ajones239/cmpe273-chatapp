//connect to websocket endpoint
var socket = new WebSocket("ws://localhost:8000/ws");

//func connect used to listen to and 
//log websocket 
//connection events

let connect = cb => {
  console.log("connecting");

  socket.onopen = () => {
    console.log("Successfully Connected");
  };

  socket.onmessage = msg => {
    console.log(msg);
    cb(msg);
  };

  socket.onclose = event => {
    console.log("Socket Closed Connection: ", event);
  };

  socket.onerror = error => {
    console.log("Socket Error: ", error);
  };
};

//send message func
//allows us to send messages from fe to be via
//websocket conn using socket.send(msg)
let sendMsg = msg => {
  console.log("sending msg: ", msg);
  socket.send(msg);
};

export { connect, sendMsg };