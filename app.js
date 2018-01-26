var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');

const moment = require('moment');
const SocketHander = require('./socket/index');

require('dotenv').config();

var app = express();

const server = require('http').Server(app);
const io = require('socket.io')(server);

io.on('connection', async (socket) => {

  console.log('a user connected');
  const clients = await io.engine.clientsCount;

  const socketid = socket.id;

  socketHander = new SocketHander();

  socketHander.connect();

  const history = await socketHander.getMessages();

  io.to(socketid).emit('history', history);
  io.to(socketid).emit('clients', {
    clients: clients,
  });

  socket.on("disconnect", async () => {
    console.log("a user go out");
    io.emit("clients", {
      clients: clients,
    });
  });

  socket.on("message", (obj) => {
    socketHander.storeMessages(obj);
    io.emit("message", obj);
  });

  socket.on('clients', (obj) => {
    io.emit("clients", {
      clients: clients,
      user: obj,
    });
  });

});

server.listen(process.env.SOCKET_PORT);

// app.use(function (req, res, next) {
//   res.io = io;
//   next();
// });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.all('*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;