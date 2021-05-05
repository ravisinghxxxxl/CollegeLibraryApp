console.log('start');

function Book(name, author, type) {
    this.name = name;
    this.author = author;
    this.type = type;
}

//DISPLAY CONSTRUCTOR
function Display() {

}

// ADD METHOD TO DISPLAY PROTOTYPE


// ADD SUBMIT EVENtLISTENER TO libraryForm
let libraryForm = document.getElementById('libraryForm')
libraryForm.addEventListener('submit', libraryFormSubmit);
function libraryFormSubmit(e) {
    e.preventDefault();
    console.log('You have sumbmitted a library form !');
    let name = document.getElementById('bookName').value;
    let author = document.getElementById('author').value;
    let type;
    let fiction = document.getElementById('fiction');
    let programming = document.getElementById('programming');
    let cooking = document.getElementById('cooking');
    
    if(fiction.checked) {
        type = fiction.value;
    }
    if(programming.checked) {
        type = programming.value;
    }
    if(cooking.checked) {
        type = cooking.value;
    }
    let book = new Book(name, author, type);
    console.log(book);
}
