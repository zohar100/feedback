const express = require("express");
const cors = require("cors");
const app = express();
const session = require('express-session');
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const seeds = require('./seeds');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user.model');

require("dotenv").config();

//BASIC CONFIGURATIONS
app.use(cors());
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

//SESSION CONFIGURATION
const sessionConfig = {
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge : 3600000 } 
};
app.use(session(sessionConfig));

//AUTH/PASSPORT CONFIGURATION
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//ROUTES
const postRoutes = require('./routes/posts');
const userRoutes = require('./routes/users');

app.use('/posts', postRoutes)
app.use('/', userRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("Connect succesfully on port: " + port);
});