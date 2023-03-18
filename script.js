let buttonSave = document.getElementById("AddButton");
let containerList = document.getElementById("row1");

// get Role
let Role = localStorage.getItem("Role");

//admin view
let addnewBookDiv = document.getElementById("addNewBook");
if (Role==="admin") {
  addnewBookDiv.style.display="inline"
}

function lSaccess() {
  let toString = localStorage.getItem("List");
  let toJason = JSON.parse(toString);
  if (toJason === null) {
    return [];
  } else {
    return toJason;
  }
}

let totalList = lSaccess();
let ListCount = totalList.length;

buttonSave.onclick = function (e) {
  getFromweb(Role);
  localStorage.setItem("List", JSON.stringify(totalList));
};

function getFromweb(role) {
  let userBookName = document.getElementById("bookName").value;
  let userBookPrice = document.getElementById("bookPrice").value;
  let userBookPic = document.getElementById("imgSelect").value[0];

  if (userBookName === "" || userBookPrice === "") {
    alert("Enter Valid Info");
    return;
  }

  ListCount = ListCount + 1;

  let newItem = {
    name: userBookName,
    price: userBookPrice,
    img: userBookPic,
    uniqueNo: ListCount,
    roles:role,
  };

  totalList.push(newItem);
  createItem(newItem);
  userBookName = "";
  userBookPrice = "";
  userBookPic = "";
}

//delete function
function DeleteItem(Id) {
  let todoElement = document.getElementById(Id);
  containerList.removeChild(todoElement);

  let deleteIndex = totalList.findIndex(function (item) {
    let itemId = item.uniqueNo;
    if (itemId === Id) {
      return true;
    } else {
      return false;
    }
  });

  totalList.splice(deleteIndex, 1);
  localStorage.setItem("List", JSON.stringify(totalList));
}

//add and append to web and storage
function createItem(item) {
  let ListId = item.uniqueNo;
  let LName = item.name;
  let Price = item.price;
  let Img = item.img;
  let Roles = item.roles;
  let Element = document.createElement("div");
  Element.classList.add("card");
  Element.id = ListId;

  let ImageIcon = document.createElement("img");
  ImageIcon.classList.add("card-img-top");
  ImageIcon.src = Img;

  let deleteIcon = document.createElement("i");
  deleteIcon.classList.add("far", "fa-trash-alt", "delete-icon");
  deleteIcon.style.cursor = "Pointer";
  deleteIcon.style.display = "none";
  if(Role==="admin") deleteIcon.style.display = "block";

  let CardBody = document.createElement("div");
  ImageIcon.classList.add("card-body");

  let TitleText = document.createElement("h5");
  TitleText.classList.add("card-title", "ml-5");
  TitleText.textContent = LName;

  let PriceText = document.createElement("h5");
  PriceText.classList.add("card-text", "ml-5");
  PriceText.textContent = "PRICE: " + Price + "$";

  let Abutton = document.createElement("a");
  Abutton.classList.add("btn", "btn-primary", "ml-5", "mt-3", "mb-4");
  Abutton.textContent = "ADD TO CART";

  CardBody.appendChild(TitleText);
  CardBody.appendChild(PriceText);
  CardBody.appendChild(Abutton);

  Element.appendChild(ImageIcon);
  Element.appendChild(deleteIcon);
  Element.appendChild(CardBody);
  containerList.appendChild(Element);
  deleteIcon.onclick = function () {
    DeleteItem(ListId);
  };
}

for (let items of totalList) {
  createItem(items);
}

//logout
function logout () {
  localStorage.setItem("Role", "user")
}
