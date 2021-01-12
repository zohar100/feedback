const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const seeds = require('./seeds');
const User = require('./models/user.model');

require("dotenv").config();

//BASIC CONFIGURATIONS
app.use(cors({ 
  credentials: true, 
  origin: 'http://localhost:3000',
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
seeds();

//ROUTES
const commentRoutes = require('./routes/comment');
const postRoutes = require('./routes/posts');
const userRoutes = require('./routes/users');

app.use('/', userRoutes);
app.use('/posts', postRoutes);
app.use('/comments', commentRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("Connect succesfully on port: " + port);
});