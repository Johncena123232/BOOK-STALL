let Role = "user";

let UserName = document.getElementById("user").value;
let Pass = document.getElementById("pass").value;

let Loginbutton = document.getElementById("buttonClick");

Loginbutton.onclick = function (e) {
  console.log(UserName);
  console.log(Pass);
};
