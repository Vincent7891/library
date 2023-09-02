class Book {
    constructor(title, author, pages, read) {
    this.title = title 
    this.author = author
    this.pages = pages
    this.read = read    
    }
}

class Library {

    constructor(library) {
        this.myLibrary = []
    }


    addBookToLibrary(title,author,pages,read) {
        const newBook = new Book(title,author,pages,read)
        this.myLibrary.push(newBook)
        this.addBookToUI(newBook); // Update the UI with the new book
    }

    addBookToUI(book) {
        const bookContainer = document.querySelector('.book-container');
    
        // Create a new book element
        const bookElement = document.createElement('div');
        bookElement.className = `book-element${this.myLibrary.indexOf(book)}`;
    
        // Populate the book element with details
        bookElement.innerHTML = `
        <h3> Title: ${book.title}</h3>
        <p>Author: ${book.author}</p>
        <p>Pages: ${book.pages}</p>
        <button id = "book-read${this.myLibrary.indexOf(book)}">Read: ${book.read ? 'Yes' : 'No'}</button>
        <button id="delete-button${this.myLibrary.indexOf(book)}"> Delete Book </button>`;
        // Append the new book element to the book container
        bookContainer.appendChild(bookElement);
    }

    deleteBook(){
        document.querySelector(".book-container").addEventListener('click', (e) => {
            for (let i = 0; i < this.myLibrary.length; i++) {
                if (e.target.id === `delete-button${i}`) {
                    document.querySelector(`.book-element${i}`).remove();
                }
            }
        });
    }

    toggleRead(){
        document.querySelector(".book-container").addEventListener('click', (e) => {
            for (let i = 0; i < this.myLibrary.length; i++) {
                if (e.target.id === `book-read${i}`) {
                    this.myLibrary[i].read =! this.myLibrary[i].read;
                    document.getElementById(`book-read${i}`).textContent = `Read: ${this.myLibrary[i].read ? 'Yes' : 'No'}`;
                }
            }
        });
    }
}


const myLibrary = new Library();

function handleModalEvents(){
    const addBookButton = document.getElementById('addBookButton');
    const bookDialog = document.getElementById('bookDialog');
    const closeDialogButton = document.getElementById('closeDialogButton');
    const submit = document.getElementById('submit')

    addBookButton.addEventListener('click', () => {
        bookDialog.showModal();
    });

    closeDialogButton.addEventListener('click', () => {
        bookDialog.close();
    });

    submit.addEventListener('click', () => {
        bookDialog.close();
    });
}

function formSubmission(){
    document.getElementById("bookForm").addEventListener("submit", function(event) {
        event.preventDefault();
      // Get values from the form
        const title = document.getElementById("title").value;
        const author = document.getElementById("author").value;
        const pages = document.getElementById("pageNumber").value;
        const read = document.getElementById("readStatus").checked;
    
        myLibrary.addBookToLibrary(title, author, pages, read);
    
        // Clear the form
        event.target.reset();
    });
}

handleModalEvents();
formSubmission();
myLibrary.deleteBook();
myLibrary.toggleRead();