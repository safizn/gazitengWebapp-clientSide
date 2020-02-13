// import http://localhost:8087/socket.io/socket.io.js
var socket = io('http://localhost:8087')
socket.on('connect', function() {
  console.log('Connected !!')
})
socket.on('event', function(data) {
  console.log(data)
})
socket.on('disconnect', function() {})

// ----------------------------------------------------
// OR:
// Create a socket instance
var socket = new WebSocket('{%= argument.url %}')

// Open the socket
socket.onopen = function(event) {
  console.log('☕ WebSocket connected.')

  // Send an initial message
  // socket.send('I am the client and I\'m listening!');

  // Listen for messages
  socket.onmessage = function(event) {
    console.log('Client received a message', event)
  }

  // Listen for socket closes
  socket.onclose = function(event) {
    console.log('Client notified socket has closed', event)
  }

  // To close the socket....
  //socket.close()
}
