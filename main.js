const addButton = document.querySelector('#add');
let title;
let author;
let pages;
let books = [];

addButton.addEventListener('click', addBook);

function addBook(){
    if(!isValid()){
        alert('Please fill out the forms');
        return;
    }
    let book = new Book(title, author, pages, false);
    books.push(book);
    console.table(books);
    document.forms[0].reset();
    return;
}

function Book(title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    
}


function isValid(){
    title = document.querySelector('#title').value;
    author = document.querySelector('#author').value;
    pages = document.querySelector('#pages').value;
    if (author && title && pages){
        return true;
    } else {
        return false;
    }
    
}