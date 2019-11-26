// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs

var sgMail = require("@sendgrid/mail");
var CronJob = require("cron").CronJob;

//USE THIS VARIABLE TO SET UP HTML FORMAT TO BE USED IN SENDING THE EMAIL.

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
//DOCUMENTATION FOR USING THE CRON PACKAGE HERE - https://www.npmjs.com/package/cron
//THIS IS CURRENT SET TO RUN EVERYONE ON MINUTE - CHANGE THE NUMBER IN "NEW CRONJOB" TO CHAGE TIME - E.G. CHANGE TO A 10 FOR EVERY 10 MINUTES
// console.log("Before job instantiation");
var job = new CronJob("0 */1 * * * *", function() {
  var d = new Date();
  console.log("Every  Minute:", d);
  sgMail
  .send(msg)
  .then(() => {
    //Celebrate
  })
  .catch(error => {

    //Log friendly error
    console.error(error.toString());

    //Extract error msg
    var {message, code, response} = error;

    //Extract response msg
    var {headers, body} = response;
  });;
});
// console.log("After job instantiation");
job.start();


