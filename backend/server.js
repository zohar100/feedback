const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const initListeners = require("./socket");
const socketio = require('socket.io');
const http = require('http')
const seeds = require('./seeds');

const ServerError = require('./utility/ServerError');

const server = http.createServer(app);
const io = socketio(server, {
  cors: {
    origin: '*'
  }
});

require("dotenv").config();

//MIDDLEWARES
app.use(cors({ 
  credentials: true,
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

//DB CONFIGURATION
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
}); 
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connect");
});

initListeners(io);
seeds();

//ROUTES
const commentRoutes = require('./routes/comment');
const postRoutes = require('./routes/posts');
const userRoutes = require('./routes/users');
const chatRoutes = require('./routes/chats')

app.use('/', userRoutes);
app.use('/posts', postRoutes);
app.use('/comments', commentRoutes);
app.use('/chats', chatRoutes);

app.use((err, req, res, next) => {
  const { status = 500, message = 'Something Went Wrong'} = err;
  res.status(status).json({msg: message})
})

const port = process.env.PORT || 8080;
server.listen(port, () => {
  console.log("Connect succesfully on port: " + port);
});