// Requiring our models and passport as we've configured it
var db = require("../models");
var passport = require("../config/passport");
var nodemailer = require("nodemailer");
var sgTransport = require("nodemailer-sendgrid-transport");

module.exports = function(app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), function(req, res) {
    res.json(req.user);
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", function(req, res) {
    db.User.create({
      email: req.body.email,
      password: req.body.password,
      firstName: req.body.firstName,
      lastName: req.body.lastName
    })
      .then(function() {
        res.redirect(307, "/api/login");
      })
      .catch(function(err) {
        res.status(401).json(err);
      });
  });

  app.put("/api/addStudent/:userID", function(req, res) {
    db.User.update(
      {
        studentName: req.body.studentName,
        studentGradeLevel: req.body.studentGradeLevel,
        reminderSchedule: req.body.reminderSchedule
      },
      {
        where: {
          id: req.params.userID
        }
      }
    )
      .then(function(studentUpdate) {
        res.json(studentUpdate);
      })
      .catch(function(err) {
        res.status(401).json(err);
      });
  });

  // Route for logging user out
  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", function(req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        id: req.user.id,
        studentGradeLevel: req.user.studentGradeLevel,
        studentListCount: req.user.studentListCount,
        firstName: req.user.firstName,
        lastName: req.user.lastName
      });
    }
  });

  app.get("/api/curriculum", function(req, res) {
    db.Curriculum.findAll({}).then(function(results) {
      res.json(results);
    });
  });

  app.get("/api/send", function(req, res) {
    console.log("/api/send");

    var mailOptions = {
      from: "justincarlson7@gmail.com",
      to: req.query.to,
      subject: req.query.subject,
      text: req.query.text,
      html: req.query.html
    };

    console.log(mailOptions);

    var options = {
      auth: {
        api_user: "justincarlson7",
        api_key: "$$Pa$$word$$$$Pa$$word$$1"
      }
    };

    var client = nodemailer.createTransport(sgTransport(options));

    client.sendMail(mailOptions, function(err, info) {
      if (err) {
        console.log(err);
      } else {
        console.log("Message sent: " + info.response);
      }
    });
  });

  app.get("/api/curriculum/:grade/:list", function(req, res) {
    db.Curriculum.findAll({
      where: {
        grade: req.params.grade,
        listNumber: req.params.list
      }
    }).then(function(vocabByGrade) {
      res.json(vocabByGrade);
      res.sendFile(path.join(__dirname, "../public/vocabCards.html"));
    });
  });
};
