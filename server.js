// Requiring necessary npm packages
var express = require("express");
var session = require("express-session");

// var sgTransport = require("nodemailer-sendgrid-transport");

// Requiring passport as we've configured it
var passport = require("./config/passport");

// Setting up express app
var PORT = process.env.PORT || 8080;
var app = express();

//Email transport

// Requiring our models for syncing
var db = require("./models");

// Creating express app and configuring middleware needed for authentication
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static directory
app.use(express.static("public"));

// We need to use sessions to keep track of our user's login status
app.use(
  session({ secret: "keyboard cat", resave: true, saveUninitialized: true })
);
app.use(passport.initialize());
app.use(passport.session());

// Requiring our routes
require("./routes/html-routes.js")(app);
require("./routes/api-routes.js")(app);

// Syncing our database and logging a message to the user upon success
db.sequelize.sync().then(function() {
  app.listen(PORT, function() {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});
