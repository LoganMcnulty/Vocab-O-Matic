var cron = require("node-cron");

console.log("Before job instantiation");
var job = new CronJob("0 */2 * * * *", function() {
  var d = new Date();
  console.log("Every Tenth Minute:", d);
});
console.log("After job instantiation");
job.start();
