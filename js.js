"use strict";
function openModal() {
  document.getElementById('myModal').style.display = 'flex';
}

function closeModal(event) {
  if (event.target === document.getElementById('myModal') || event.target === document.getElementById('closeModalBtn')) {
    document.getElementById('myModal').style.display = 'none';
  }
}


let users = [
  {
    name: "Mohammad Zaaroura",
    number: "0522090019",
    email: "zaaroura@example.com"
  },
  {
    name: "Mohammad Mansor",
    number: "0542880776",
    email: "mansor@example.com"
  },
  {
    name: "Amir Fahmawi",
    number: "0507331341",
    email: "fahmawi@example.com"
  },
  {
    name: "Natan Albat",
    number: "0544475586",
    email: "albat@example.com"
  },
  {
    name: "Hazem Habrat",
    number: "0546876987",
    email: "habrat@example.com"
  }
];

const list = document.getElementById("contactList");

function addContact(contact, ind) {
  const li = document.createElement('li')
  li.classList.add("contact")
  li.innerHTML =
    `
      <img src="https://picsum.photos/200/300?random=${ind}" alt="${contact.name}" class="profile-pic">
      <div class="info">
          <div class="name">${contact.name}</div>
          <div class="phone">${contact.number}</div>
          <div class="email">${contact.email}</div>
      </div>
      <div class="button-group">
          <button class="info-button" onclick="popInfo(${ind})"><img src="images/info.png"   class="icon" alt=" Info" ></button>
          <div>
          <button class="edit-button" onclick="popEdit(${ind})"><img src="images/edit.png"   class="icon" alt=" Edit" ></button>
          <button class="delete-button" onclick="dltContact(${ind})"><img src="images/bin.png"   class="icon" alt=" Delete" ></button>
      </div>
      </div>
            
  `
  list.append(li);
}


function sortContacts(contacts) {
  contacts.sort((a, b) => {
    if (a.name < b.name) return -1;
    if (a.name > b.name) return 1;
    return 0;
  });
  return contacts;
}

sortContacts(users);
users.forEach((contact, ind) => addContact(contact, ind));




function popInfo(ind) {
  openModal();
  const modalCont = document.querySelector(".modal-container");
  const contact = users[ind]
  modalCont.innerHTML =
    `
    <img src="https://picsum.photos/200/300?random=${ind}"  alt="Error 404">
    <p>Name: ${contact.name}</p><br
    <p>Number: ${contact.number}</p><br
    ${contact.email === "" ? "" :
      `
      <p>Email: ${contact.email}</p>
    
      `
    }
    
    `
}

function popEdit(ind) {
  openModal();
  const modalCont = document.querySelector(".modal-container");
  const contact = users[ind]
  modalCont.innerHTML =
    `
    <form>
    <img src="https://picsum.photos/200/300?random=${ind}" alt="Error 404">
    <label>Name: <input id="editName" type="text" value="${contact.name}"> </label>
    <label>Number: <input id="editNumber" type="number" value="${contact.number}"></label>
    <label>Email: <input id="editEmail" type="email" value="${contact.email}"></label>
    <input type="submit" id="saveBtn" onclick="saveEdit(event,${ind})" value="Save" ></input>
    </form>
  `
}

function dltAll() {
  let isOk = confirm("Are you sure?");
  if (isOk) {
    list.innerHTML =
      `
    <p id="inner"> No contacts were added  </p>
    
    `
    users = [];
  }
}

function dltContact(ind) {
  let isOk = confirm("Are you sure?");
  if (isOk) {
    users = users.slice(0, ind).concat(users.slice(ind + 1))
    list.innerHTML = ``;
    users.forEach((contact, ind) => addContact(contact, ind))
    if (users.length === 0)
      list.innerHTML =
        `
        <p id="inner"> No contacts were added  </p>

        `
  }
}



function popAdd() {
  openModal();
  const modalCont = document.querySelector(".modal-container");
  modalCont.innerHTML =
    `
    <img src="https://picsum.photos/200/300?random=100" alt="Error 404">
    <p>Name: <input id="addName" type="text" placeholder="name"> </p><br
    <p>Number: <input id="addNumber" type="number" placeholder="number"></p><br
    <p>Email: <input id="addEmail" type="email" placeholder="email"></p>
    <button id="saveBtn" onclick="saveNew()">Save</button>
  `
}

function saveNew() {
  let newName = document.querySelector("#addName").value;
  let newNumber = document.querySelector("#addNumber").value;
  let newEmail = document.querySelector("#addEmail").value;

  if (newName === "" || newNumber === "") {
    alert("name or number can't be empty");
  } else {
    if (checkName(newName)) {
      alert("name is exist")
      return;
    }
    if (checkNumber(newNumber)) {
      alert("number is exist")
      return;
    }
    if (newEmail !== "") {
      if (!validateEmail(newEmail)) {
        alert("Invalid email address");
        return;
      }
    }
    const newUser = { name: newName, number: newNumber, email: newEmail };
    users.push(newUser);
    list.innerHTML = ``;
    sortContacts(users);
    users.forEach((contact, ind) => addContact(contact, ind));
    document.getElementById('myModal').style.display = 'none';
  }
}

function saveEdit(event, ind) {
  event.preventDefault();
  let newName = document.querySelector("#editName").value;
  let newNumber = document.querySelector("#editNumber").value;
  let newEmail = document.querySelector("#editEmail").value;

  if (newName === "" || newNumber === "") {
    alert("name or number can't be empty");
  } else {
    if(checkName(newName,ind)){
      alert("name is exist")
      return;
    }
    if (checkNumber(newNumber,ind)) {
      alert("number is exist")
      return;
    }
    if (newEmail !== "") {
      if (!validateEmail(newEmail)) {
        alert("Invalid email address");
        return;
      }
    }
    const newUser = { name: newName, number: newNumber, email: newEmail };
    users[ind] = newUser;
    list.innerHTML = ``;
    sortContacts(users);
    users.forEach((contact, ind) => addContact(contact, ind));
    document.getElementById('myModal').style.display = 'none';
  }
}

function searchContact(e) {
  list.innerHTML = ``;
  sortContacts(users);
  const filteredList = users
    .filter(user => {
      return user.name.toLowerCase().includes(e.target.value.toLowerCase());
    });
  list.innerHTML = ``;
  filteredList.forEach(user => {
    addContact(user);
  })
}



function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}



function checkNumber(number,ind) {
  for (let i = 0; i < users.length; i++) {
    if (i !== ind && users[i].number === number) {
      return true;
    }
  }
  return false;
}

function checkName(name, ind) {
  for (let i = 0; i < users.length; i++)
    return (i !== ind && users[i].name === name)
}