console.log("This is Harry potter's library");

ShowBooks();
// Add Scroll Bar into the table
function ShowBooks() {
  let bookList = localStorage.getItem("books");
  let bookObj;

  if (bookList == null) {
    bookObj = [];
  } else {
    bookObj = JSON.parse(bookList);
  }
  let addArr = "";
  bookObj.forEach(function (element, index) {
    addArr += `<tr>
            <td>${element.name}</td>
            <td>${element.author}</td>
            <td>${element.type}</td>
            <td><button id="${index}" class="btn btn-primary"> Delete Book </button></td>
          </tr>`;
  });
  let tablebody = document.getElementById("tableBody");
  tablebody.innerHTML = addArr;
}

function deleteBook(index) {
    let getBooks = localStorage.getItem('books');
    let bookObj;
    if (getBooks == null) {
        bookObj = [];
    } else {
        bookObj = JSON.parse(getBooks);
    }
    let array = JSON.stringify(bookObj);
    console.log(`array: `+ array[index]['author']);
    bookObj.splice(index, 1);
    localStorage.setItem('books', JSON.stringify(bookObj));
    

    ShowBooks();
}

// BOOKS CONSTRUCTOR
class Books {
  constructor(name, author, type) {
    this.name = name;
    this.author = author;
    this.type = type;
  }
}

// DISPLAY CLASS AND FUNCTIONS
class Display {
  // ADD BOOKS TO PAGE
  add(book) {
    let bookList = localStorage.getItem("books");
    let bookObj;

    if (bookList == null) {
      bookObj = [];
    } else {
      bookObj = JSON.parse(bookList);
    }
    bookObj.push(book);
    localStorage.setItem("books", JSON.stringify(bookObj));
  }

  // MAKING SURE NAME AND AUTHOR IS NOT EMPTY AND IS A LEGIT ONE
  validate(book) {
    if (book.name.length < 2 || book.author.length < 2) {
      return false;
    } else {
      return true;
    }
  }

  // SHOW ERROR
  error(type, message) {
    let messageElement = document.getElementById("message");
    let msg = "";
    if (type === "success") {
      msg += `<div class="alert alert-${type} alert-dismissible">
    <button type="button" class="close" data-dismiss="alert">&times;</button>
    <strong> Success! </strong> ${message}
  </div>`;
      messageElement.innerHTML = msg;
    } else if (type === "danger") {
      msg += `<div class="alert alert-${type} alert-dismissible">
        <button type="button" class="close" data-dismiss="alert">&times;</button>
        <strong> Failed! </strong> ${message}
      </div>`;
      messageElement.innerHTML = msg;
    }
    setTimeout(() => {
      messageElement.innerHTML = "";
    }, 2000);
  }
  // CLEAR THE DATA IN PLACEHOLDERS
  clear() {
    let libraryForm = document.getElementById("libraryForm");
    libraryForm.addEventListener("submit", formReset);
    function formReset() {
      libraryForm.reset();
    }
  }
}

// CONNECTING TO HTML ELEMENTS
let libraryForm = document.getElementById("libraryForm");
libraryForm.addEventListener("submit", formSubmit);

function formSubmit(e) {
  e.preventDefault();
  let name = document.getElementById("bookName").value;
  let author = document.getElementById("author").value;
  let type;
  let fiction = document.getElementById("fiction");
  let programming = document.getElementById("programming");
  let cooking = document.getElementById("cooking");

  if (fiction.checked) {
    type = fiction.value;
  } else if (programming.checked) {
    type = programming.value;
  } else if (cooking.checked) {
    type = cooking.value;
  }

  let books = new Books(name, author, type);

  display = new Display();

  if (display.validate(books)) {
    display.add(books);
    ShowBooks();
    display.error("success", "A book has been added");
    display.clear();
  } else {
    display.error("danger", "Name or author invalid. Try agian!");
  }
}
