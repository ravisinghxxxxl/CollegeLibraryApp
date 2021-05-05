console.log("start");

function Book(name, author, type) {
  this.name = name;
  this.author = author;
  this.type = type;
}

//DISPLAY CONSTRUCTOR
function Display() {}

// ADD METHOD TO DISPLAY PROTOTYPE
Display.prototype.add = function (book) {
  console.log("Adding to UI");
  let tableBody = document.getElementById("tableBody");
  let uiString = `<tr>
                    <td>${book.name}</td>
                    <td>${book.author}</td>
                    <td>${book.type}</td>
                 </tr> `;
tableBody.innerHTML += uiString;
};

// IMPLEMENT CLEAR FUNCTION
Display.prototype.clear = function () {
  let libraryForm = document.getElementById("libraryForm");
  libraryForm.reset();
};

// IMPLEMENT VALIDATE FUNCTION
Display.prototype.validate = function (book) {
 if(book.name.length<2 || book.author.length<2) {
     return false;
 } else {
     return true;
 }
};

// SHOW ERROR
Display.prototype.show = function(type, showMessage){
let message = document.getElementById('message');
message.innerHTML = `<div class="alert alert-${type} 
             alert-dismissible fade show" role="alert">
            <strong>Message!</strong> ${showMessage}
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
            </button>`
}
// ADD SUBMIT EVENtLISTENER TO libraryForm
let libraryForm = document.getElementById("libraryForm");
libraryForm.addEventListener("submit", libraryFormSubmit);
function libraryFormSubmit(e) {
  e.preventDefault();
  console.log("You have sumbmitted a library form !");
  let name = document.getElementById("bookName").value;
  let author = document.getElementById("author").value;
  let type;
  let fiction = document.getElementById("fiction");
  let programming = document.getElementById("programming");
  let cooking = document.getElementById("cooking");

  if (fiction.checked) {
    type = fiction.value;
  }
  if (programming.checked) {
    type = programming.value;
  }
  if (cooking.checked) {
    type = cooking.value;
  }
  let book = new Book(name, author, type);
  console.log(book);

  let display = new Display();

  if (display.validate(book)){
      display.add(book);
      display.clear();
      display.show('success', 'Your book has been successfully added!');
    } else {
        // SHOW ERROR TO USER
        display.show('danger', 'Sorry you can not add this book!');
  };
}
