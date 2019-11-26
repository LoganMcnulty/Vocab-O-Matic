// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs

var sgMail = require("@sendgrid/mail");
var cron = require("node-cron");

var vocabString =
  "<div>Use these words with your child in normal conversation to increase vocabulary. Include multiple meanings and spelling in the guided conversations. </br> This is more text about vocab.</strong>";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

var msg = {
  to: "justincarlson7@gmail.com",
  from: "justincarlson7@gmail.com",
  subject: "Vocab - O - Matic",
  text: "You have a new list from Vocab-O-Matic",
  html: vocabString
};

console.log("Before job instantiation");
var job = new CronJob("0 */2 * * * *", function() {
  var d = new Date();
  console.log("Every Tenth Minute:", d);
  sgMail.send(msg);
});
console.log("After job instantiation");

job.start();
