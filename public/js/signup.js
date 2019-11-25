$(document).ready(function() {
  // Getting references to our form and input
  var signUpForm = $("form.signup");
  var emailInput = $("input#email-input");
  var passwordInput = $("input#password-input");
  var firstNameInput = $("#firstNameInput");
  var lastNameInput = $("#lastNameInput");

  // When the signup button is clicked, we validate the email and password are not blank
  signUpForm.on("submit", function(event) {
    event.preventDefault();
    var userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim(),
      firstName: firstNameInput.val().trim(),
      lastName: lastNameInput.val().trim()
    };

    if (
      !userData.email ||
      !userData.password ||
      !userData.firstName ||
      !userData.lastName
    ) {
      return;
    }
    // If we have an email and password, run the signUpUser function
    signUpUser(
      userData.email,
      userData.password,
      userData.firstName,
      userData.lastName
    );
    emailInput.val("");
    passwordInput.val("");
    firstNameInput.val("");
    lastNameInput.val("");
  });

  // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  function signUpUser(email, password, firstName, lastName) {
    $.post("/api/signup", {
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName
    })
      .then(function(data) {
        window.location.replace("/members");
        // If there's an error, handle it by throwing up a bootstrap alert
      })
      .catch(handleLoginErr);
    console.log(email, password, firstName, lastName);
  }

  function handleLoginErr(err) {
    $("#alert .msg").text("Are you sure you don't already have an account?");
    $("#alert").fadeIn(500);
    console.log(err);
  }
});
