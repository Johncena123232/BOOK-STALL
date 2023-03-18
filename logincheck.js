const adminProfile = {
  username : "admin",
  password : "1234"
}

function clickedLogin() {
  let UserName = document.getElementById("user").value;
  let Pass = document.getElementById("pass").value;

  //check credentials
  if(UserName===adminProfile.username && Pass===adminProfile.password) Role="admin"
  else Role = "user";

  //set Role
  localStorage.setItem("Role", Role);
};