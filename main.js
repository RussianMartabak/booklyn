const addButton = document.querySelector('#add');
const listContent = document.querySelector('.list__content');

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
    
    loadList();
    refreshEventListeners();
    document.forms[0].reset();
    return;
}

function Book(title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    
}

function refreshEventListeners(){
    let readStatus = document.querySelectorAll('button');
    console.log(readStatus);
    readStatus.forEach(el => {
        if (!el.classList.contains('read-status'))
            el.addEventListener('click', e => {
            let button = e.target;
            
            let index = parseInt(button.getAttribute('data-index'));
            if (!books[index - 1.].read){
            books[index - 1].read = true;
            button.classList.add('green');
            button.textContent = 'Read';
        } else {
            books[index - 1].read = false;
            button.classList.remove('green');
            button.textContent = 'Not Read';
        }
    })})

    let removeButtons = document.querySelectorAll('#remove');
    removeButtons.forEach(e => e.addEventListener('click', e => {
        let button = e.target;
        console.log(button);
        let index = parseInt(button.getAttribute('data-index'));
        books.splice(index - 1, 1);
        loadList();
        
    }))
    
}

function loadList(){
    
    //delete existingelements
    let listItems = Array.from(listContent.children);
    listItems.forEach(e => e.remove());
    //if empty
    if (books.length === 0) return;
    //load from array into the list as div element
    for (let i = 1; i <= books.length; i++){
        let listItem = makeListItem(i, books[i - 1]);
        
        listContent.appendChild(listItem);
    }
    
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

function addItem(prop, text, parent){

}

function makeListItem(order, book){
    //make a list item div for the reading list
    let itemContainer = document.createElement('div');
    itemContainer.setAttribute('class', 'list__content__item');
    
    
    let div = document.createElement('div');
    div.setAttribute('class', 'number');
    div.textContent = order;
    itemContainer.appendChild(div);
    
    div = document.createElement('div');
    div.setAttribute('class', 'desc');
    
    let h3 = document.createElement('h3');
    h3.textContent = book.title;
    div.appendChild(h3);
    
    let p = document.createElement('p');
    p.textContent = `${book.author}, ${book.pages} Pages`;
    div.appendChild(p);
    itemContainer.appendChild(div);

    div = document.createElement('div');
    div.classList.add('buttons');
    let button = document.createElement('button');
    button.setAttribute('id', 'read-status');
    if (!book.read) {
        button.classList.add('red');
        button.textContent = 'Not Read';
    } else {
        button.classList.add('green');
        button.textContent = 'Read';
    }
    button.setAttribute('data-index', order);
    
    div.appendChild(button);

    p = document.createElement('p');
    p.setAttribute('id', 'remove');
    p.textContent = 'Remove';
    p.setAttribute('data-index', order);
    div.appendChild(p);
    itemContainer.appendChild(div);

    return itemContainer;

}