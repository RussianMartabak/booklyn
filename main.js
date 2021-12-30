const addButton = document.querySelector('#add');
let title;
let author;
let pages;

addButton.addEventListener('click', isValid);


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