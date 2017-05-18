const express = require('express');
const path    = require('path');
var app       = express();
var http      = require('http').Server(app);
var io        = require('socket.io')(http);

const PORT = process.env.PORT || 3000;


require('./lib/middleware.js')(app);
require('./lib/sockets.js')(app, io);

//Static assets
app.use('/assets', express.static(path.join(__dirname, 'public')))

app.get('/', (req, res, next) => {
  return res.sendFile(__dirname + '/public/index.html');
});

//Starting serrver
http.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`)
})
