function signup(e) {
  e.preventDefault();
  localStorage.setItem("user", document.getElementById("signupUser").value);
  localStorage.setItem("pass", document.getElementById("signupPass").value);
  alert("Signup Successful!");
  window.location = "login.html";
}

function login(e) {
  e.preventDefault();
  let user = localStorage.getItem("user");
  let pass = localStorage.getItem("pass");

  let u = document.getElementById("loginUser").value;
  let p = document.getElementById("loginPass").value;

  if (u === user && p === pass) {
    localStorage.setItem("loggedIn", true);
    window.location = "quiz.html";
  } else {
    alert("Invalid login!");
  }
}
