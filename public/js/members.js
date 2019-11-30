$(document).ready(function() {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page

  var vocabWords = [];
  var wordCount = 0;
  var word = "";
  var definition = "";
  var userID;
  var grade;
  var list;
  var email;
  var justWords;
  var htmlFormat;

  

  $.get("/api/user_data").then(function(data) {
    $(".member-name").text(`${data.firstName} ${data.lastName}`);
    userID = data.id;
    grade = data.studentGradeLevel;
    list = data.studentListCount;
    email = data.email;

    console.log(
      "Collected info from user_data route and got name",
      userID,
      grade,
      list,
      email
    );
  });

  $("#addStudent").on("click", function(event) {
    event.preventDefault();

    studentName = $("#studentNameInput")
      .val()
      .trim();
    studentGradeLevel = $("#studentGradeLevelForm")
      .val()
      .trim();
    reminderSchedule = $("#reminderFreqSelect")
      .val()
      .trim();

    addStudent(studentName, studentGradeLevel, reminderSchedule);
    sendEmail();
    
  });

  function addStudent(studentName, studentGradeLevel, reminderSchedule) {
    

    $.ajax({
      method: "PUT",
      url: "/api/addStudent/" + userID,
      data: {
        studentName: studentName,
        studentGradeLevel: studentGradeLevel,
        reminderSchedule: reminderSchedule
      }
    }).then(function(result) {
      console.log(result);
    });
  }
//TO DO: FIX THIS API BECAUSE IT RETURNS EVERYTHING, but manually limiting to 5 words in the for loop
  function sendEmail() {
    $.get(`api/curriculum/?=${grade}/${list}`).then(function(data) {
      console.log(data);
      for (i = 0; i < 5; i++) {
        vocabWords.push(data[i]);
      }
      console.log(
        `these are the vocab words for grade ${grade} from list ${list}...`
      );

      console.log(vocabWords);
      console.log(JSON.stringify(vocabWords));

      justWords = vocabWords.map(function(words) {
        return words.word;
      });

      console.log("This is a reformated vocab", justWords);

      arrayLength = justWords.length;

      for (i = 0; i < arrayLength; i++) {
        htmlFormat =
          "<div><p>Use the words list with your child to build vocabulary knowledge</p><ul>" +
          justWords
            .map(function(words1) {
              return "<li>" + words1 + "</li>";
            })
            .join("") +
          "</ul></div>";
      }
      console.log(htmlFormat);

      to = email;
      subject = "Vocab-O-Matic";
      text = "Vocab-O-Matic";
      html = htmlFormat;

      $.get(
        "api/send",
        { to: to, subject: subject, text: text, html: html }).then
        (function(data) {
          sendfile("/vocabCards");
        }
      );
    });
  }
});
