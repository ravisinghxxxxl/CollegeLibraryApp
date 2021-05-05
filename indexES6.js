console.log("start");

class Book {
  constructor(name, author, type) {
    this.name = name;
    this.author = author;
    this.type = type;
  };
  add(book) {
    console.log("Adding to UI");
    let tableBody = document.getElementById("tableBody");
    let uiString = `<tr>
                          <td>${book.name}</td>
                          <td>${book.author}</td>
                          <td>${book.type}</td>
                       </tr> `;
    tableBody.innerHTML += uiString;
  };
  clear() {
    let libraryForm = document.getElementById("libraryForm");
    libraryForm.reset();
  };
  validate(book) {
    if (book.name.length < 2 || book.author.length < 2) {
      return false;
    } else {
      return true;
    }
  };
  show(type, showMessage) {
    let message = document.getElementById("message");
    message.innerHTML = `<div class="alert alert-${type} 
                 alert-dismissible fade show" role="alert">
                <strong>Message!</strong> ${showMessage}
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
                </div>`;
    setTimeout(() => {
      message.innerHTML = "";
    }, 2000);
  };
};


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


  if (book.validate(book)){
    book.add(book);
    book.clear();
    book.show('success', 'Your book has been successfully added!');
  } else {
      // SHOW ERROR TO USER
      book.show('danger', 'Sorry you can not add this book!');
};
}