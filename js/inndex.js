var form = document.getElementById("contactForm");
var userinfo = document.getElementById("userinfo");
var savebtn = document.getElementById("save");
var favBox = document.getElementById("merc");
var emerBox = document.getElementById("bmw");
var total = document.getElementById("total");
var Favoritesnum = document.getElementById("Favoritesnum");
var Nocontet = document.getElementById("Nocontet");
var allol = document.getElementById("allol");
var searchInput = document.getElementById("searchInput");
var editIndex = null;


var fullName = document.getElementById("fullName");
var phone = document.getElementById("phone");
var email = document.getElementById("email");
var address = document.getElementById("address");
var formSelect = document.getElementById("FormSele");
var TextAree = document.getElementById("TextAree");
var checkFav = document.getElementById("checkFav");
var checkemer = document.getElementById("checkemer");



const nameRegex  = /^[A-Za-z\u0600-\u06FF]{2,}(?:\s[A-Za-z\u0600-\u06FF]{2,})+$/;
const phoneRegex = /^01[0125][0-9]{8}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

var contacts = [];
var contactsemerg = [];
var contactsfaverot = [];

searchInput.addEventListener("input", function () {
  var searchValue = searchInput.value.toLowerCase().trim();
  var filteredContacts = [];

  for (var i = 0; i < contacts.length; i++) {
    if (contacts[i].name.toLowerCase().includes(searchValue)) {
      filteredContacts.push(contacts[i]);
    }
  }

  displayFilteredContacts(filteredContacts);
});

window.addEventListener("DOMContentLoaded", function(){
  var storedContacts = localStorage.getItem("contacts");
  if (storedContacts != null) {
    contacts = JSON.parse(storedContacts);
    displayContacts();
  }
}
);

function viewwNum(){
  var numtotal = contacts.length;
  var numfav = contactsfaverot.length;
  var numemerg = contactsemerg.length;

  total.innerHTML = numtotal;
  Favoritesnum.innerHTML = numfav;
  Emergency.innerHTML = numemerg;
  allol.innerHTML = numtotal;

}

form.addEventListener("submit",function(e){
  e.preventDefault();
  var hasError = false;
  var errors = document.querySelectorAll(".error");
  for (var i = 0; i < errors.length; i++) {
    errors[i].textContent = "";
  }

  var inputs = document.querySelectorAll(".form-control");
  for (var i = 0; i < inputs.length; i++) {
    inputs[i].classList.remove("error-input");
  }
  var nameVal  = fullName.value.trim();
  var phoneVal = phone.value.trim();
  var emailVal = email.value.trim();
  var userContact = {
    name : fullName.value,
    Uphone : phone.value,
    Uemail : email.value,
    Uaddress : address.value,
    Uformselect : formSelect.value,
    Utextarea : TextAree.value,
    UcheckFav :checkFav.checked,
    Ucheckemer :checkemer.checked
  }
  if (!nameRegex.test(nameVal)) {
    showError(fullName, "nameError", "Name should contain only letters and spaces (2-50 characters)");
    hasError = true;
  }
  if (!phoneRegex.test(phoneVal)) {
    showError(phone, "phoneError", "Please enter a valid Egyptian phone number");
    hasError = true;
  }
  if (email && !emailRegex.test(emailVal)) {
    showError(email, "emailError", "Please enter a valid email address");
    hasError = true;
  }
  if (hasError) {
    Swal.fire({
      icon: "error",
      title: "Invalid Name",
      text: "Name should contain only letters and spaces (2-50 characters)"
    });
    return;
  }

  Swal.fire({
    icon: "success",
    title: "added",
    text: "Contact has been added successfully",
    timer: 1500,
    showConfirmButton: false
  });
  var userContact = {
    name: nameVal,
    Uphone: phoneVal,
    Uemail: emailVal,
    Uaddress: address.value,
    Uformselect: formSelect.value,
    Utextarea: TextAree.value,
    UcheckFav: checkFav.checked,
    Ucheckemer: checkemer.checked
  };
if (editIndex !== null) {
  contacts[editIndex] = userContact;
  Swal.fire({
    icon: "success",
    title: "Updated",
    text: "Contact updated successfully",
    timer: 1500,
    showConfirmButton: false
  });

  editIndex = null;
} else {
  contacts.push(userContact);
  Swal.fire({
    icon: "success",
    title: "Added",
    text: "Contact added successfully",
    timer: 1500,
    showConfirmButton: false
  });
}
  localStorage.setItem("contacts", JSON.stringify(contacts));
  form.reset();
  displayContacts();
  var modalEl = document.getElementById("addContact");
  var modal = bootstrap.Modal.getInstance(modalEl);
  if (modal) modal.hide();
})



function showError(input, errorId, message) {
  document.getElementById(errorId).textContent = message;
  input.classList.add("error-input");
}
function toggleFav(index) {
  contacts[index].UcheckFav = !contacts[index].UcheckFav;
  localStorage.setItem("contacts", JSON.stringify(contacts));
  displayContacts();
}

function toggleEmer(index) {
  contacts[index].Ucheckemer = !contacts[index].Ucheckemer;

  localStorage.setItem("contacts", JSON.stringify(contacts));
  displayContacts();
}
function deleteContact(index) {
  Swal.fire({
    title: "Delete Contact?",
    text: "Are you sure you want to delete fghghgfh? This action cannot be undone.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#dc3545",
    cancelButtonColor: "#6c757d",
    confirmButtonText: "Yes,delete it!",
    cancelButtonText: "Cancel"
  }).then((result) => {
    if (result.isConfirmed) {
      contacts.splice(index, 1);
      localStorage.setItem("contacts", JSON.stringify(contacts));
      displayContacts();

      Swal.fire({
        title: "Deleted",
        text: "Contact has been deleted.",
        icon: "success",
        timer: 1500,
        showConfirmButton: false
      });
    }
  });
}

function confirmDelete() {
  contacts.splice(deleteIndex, 1);
  localStorage.setItem("contacts", JSON.stringify(contacts));
  displayContacts();
  closeDeleteModal();
}
function closeDeleteModal() {
  document.getElementById("deleteOverlay").style.display = "none";
  deleteIndex = null;
}
function editContact(index) {
  editIndex = index;

  var contact = contacts[index];

  fullName.value  = contact.name;
  phone.value     = contact.Uphone;
  email.value     = contact.Uemail;
  address.value   = contact.Uaddress;
  formSelect.value = contact.Uformselect;
  TextAree.value  = contact.Utextarea;
  checkFav.checked  = contact.UcheckFav;
  checkemer.checked = contact.Ucheckemer;

  document.querySelector(".modal-title").innerText = "Edit Contact";
  var modal = new bootstrap.Modal(document.getElementById("addContact"));
  modal.show();
}
function displayContacts(){
   box = ``;
   boxfav = ``;
   boxemerg = ``;
   contactsfaverot = [];
   contactsemerg = [];
   
  if(contacts.length === 0){
    Nocontet.style.display = "block";
    userinfo.innerHTML = "";

  }else{
    Nocontet.style.display = "none";
    for (var i = 0; i < contacts.length; i++) {
      var addressHTML = "";
if (contacts[i].Uaddress.trim() !== "") {
  addressHTML = `
    <div class="location d-flex align-items-center">
      <i class="fa-solid fa-location-dot"></i>
      <span>${contacts[i].Uaddress}</span>
    </div>
  `;
}
var groupHTML = "";
if (contacts[i].Uformselect !== "Select a group") {
  groupHTML = `
    <p class="${contacts[i].Uformselect} mt-2 mb-4">
      ${contacts[i].Uformselect}
    </p>
  `;
}
var notesHTML = "";
if (contacts[i].Utextarea.trim() !== "") {
  notesHTML = `
    <p class="notes">
      <i class="fa-solid fa-note-sticky"></i>
      ${contacts[i].Utextarea}
    </p>
  `;
}


   box +=`
   <div class="col-md-6" >
                              <div class="favorit" >
                                <div class="d-flex align-items-center">
                            <div class="nameFav">${contacts[i].name.charAt(0).toUpperCase()}
                                <div class="iconstar ${contacts[i].UcheckFav ? 'show' : ''}">
                                  <i class="fa-solid fa-star"></i>
                                </div>
                                <div class="iconemerg ${contacts[i].Ucheckemer ? 'show' : ''}">
                                  <i class="fa-solid fa-heart-pulse"></i>
                                </div>
                            </div>
                            <div class="tele ">
                                <h4>${contacts[i].name}</h4>
                                <div class="d-flex align-items-center"><i class="fa-solid fa-phone"></i><span>${contacts[i].Uphone}</span></div>
                            </div>
                        </div>
                        <div class="email d-flex align-items-center my-2">
                            <i class="fa-solid fa-envelope"></i>
                            <span>${contacts[i].Uemail}</span>
                        </div>
                        ${addressHTML}
                        ${groupHTML}
                       
                        <div class="footerr d-flex justify-content-between align-items-center">
                            <div class="contactt d-flex gap-2">
                                <i class="fa-solid fa-phone"></i>
                                <i class="fa-solid fa-envelope"></i>
                            </div>
                            <div class="favContent d-flex gap-2">
                                <i class="fa-star ${contacts[i].UcheckFav ? 'fa-solid text-warning' : 'fa-regular'}"
                                onclick="toggleFav(${i})"></i>
                                <i class="${contacts[i].Ucheckemer ? 'fa-solid fa-heart text-danger' : 'fa-regular fa-heart'}"
                                onclick="toggleEmer(${i})"></i>
                                <i class="fa-solid fa-pen" onclick="editContact(${i})"></i>
                                <i class="fa-solid fa-trash "
                                 onclick="deleteContact(${i})"></i>

                            </div>
                        </div>
                            </div>
                            </div>
   
   `
    userinfo.innerHTML = box;
     if(contacts[i].UcheckFav) {
      contactsfaverot.push(contacts[i]);
      boxfav += `
                        <div class="d-flex align-items-center loll mb-2">
                            <div class="d-flex rabiaa ">
                            <h5>${contacts[i].name.charAt(0).toUpperCase()}</h5>
                            <div class="malol">
                                <p>${contacts[i].name}</p>
                                <span>${contacts[i].Uphone}</span>
                            </div>
                        </div>
                        <i class="fa-solid fa-phone"></i>
                        </div>
                    `; 
    }
    
    if(contacts[i].Ucheckemer) {
      contactsemerg.push(contacts[i]);
      boxemerg += `
                        <div class="d-flex align-items-center loll emerge mb-2">
                            <div class="d-flex rabiaa ">
                            <h5>${contacts[i].name.charAt(0).toUpperCase()}</h5>
                            <div class="malol">
                                <p>${contacts[i].name}</p>
                                <span>${contacts[i].Uphone}</span>
                            </div>
                        </div>
                        <i class="fa-solid fa-phone"></i>
                        </div>
      `;
    }
  }

if (contactsfaverot.length === 0) {
    favBox.innerHTML = `<div class="card-body card-boody d-flex justify-content-center" id="Nofav">
                          <p class="text-muted fw-normal">No favorites yet</p>
                        </div>`;
} else {
    favBox.innerHTML = boxfav;
}

if (contactsemerg.length === 0) {
  emerBox.innerHTML = `
    <div class="card-body card-boody d-flex justify-content-center">
      <p class="text-muted fw-normal">No emergencies yet</p>
    </div>`;
} else {
  emerBox.innerHTML = boxemerg;
}


Nocontet.style.display = contacts.length ? "none" : "block";

  viewwNum()

  }

}

function displayFilteredContacts(filteredContacts) {
  var box = "";

  if (filteredContacts.length === 0) {
    userinfo.innerHTML = "";
    Nocontet.style.display = "block";
    return;
  }

  Nocontet.style.display = "none";

  for (var i = 0; i < filteredContacts.length; i++) {
    box += `
      <div class="col-md-6">
        <div class="favorit">
          <div class="d-flex align-items-center">
            <div class="nameFav">
              ${filteredContacts[i].name.charAt(0).toUpperCase()}
            </div>
            <div class="tele">
              <h4>${filteredContacts[i].name}</h4>
              <div class="d-flex align-items-center">
                <i class="fa-solid fa-phone"></i>
                <span>${filteredContacts[i].Uphone}</span>
              </div>
            </div>
          </div>
          <div class="email d-flex align-items-center my-2">
            <i class="fa-solid fa-envelope"></i>
            <span>${filteredContacts[i].Uemail}</span>
          </div>
        </div>
      </div>
    `;
  }

  userinfo.innerHTML = box;
}
