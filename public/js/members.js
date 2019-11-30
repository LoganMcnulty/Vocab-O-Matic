$(document).ready(function() {
  // This file just does a GET request to figure out which user is logged in

  var userID;

  $.get("/api/user_data").then(function(data) {
    $(".member-name").text(`${data.firstName} ${data.lastName}`);
    userID = data.id;
    var studentName = data.studentName
    var studentGrade = data.studentGradeLevel
    var reminderSchedule = data.reminderSchedule

    $("#studentNameExisting").text(`${studentName}`)
    $("#studentGradeExisting").text(`Grade Level: ${studentGrade} `)
    $("#studentReminderExisting").text(`Reminder: ${reminderSchedule}`)

    console.log(data)
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
    }).then(function() {
      console.log(data);
    });
  }
});
