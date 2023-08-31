const myLibrary = [];

function Book(title,author,pages,read) {
    this.title = title 
    this.author = author
    this.pages = pages
    this.read = read
}

function addBookToLibrary(title,author,pages,read) {
    const newBook = new Book(title,author,pages,read)
    myLibrary.push(newBook)
    addBookToUI(newBook); // Update the UI with the new book
}

function addBookToUI(book) {
    const bookContainer = document.querySelector('.book-container');
  
    // Create a new book element
    const bookElement = document.createElement('div');
    bookElement.className = `book-element${myLibrary.indexOf(book)}`;
  
    // Populate the book element with details
    bookElement.innerHTML = `
      <h3> Title: ${book.title}</h3>
      <p>Author: ${book.author}</p>
      <p>Pages: ${book.pages}</p>
      <button id = "book-read${myLibrary.indexOf(book)}">Read: ${book.read ? 'Yes' : 'No'}</button>
      <button id="delete-button${myLibrary.indexOf(book)}"> Delete Book </button>`;
    // Append the new book element to the book container
    bookContainer.appendChild(bookElement);
  }

function deleteBook(){
    document.querySelector(".book-container").addEventListener('click', function(e) {
        for (let i = 0; i < myLibrary.length; i++) {
            if (e.target.id === `delete-button${i}`) {
                document.querySelector(`.book-element${i}`).remove();
            }
        }
    });
}

function toggleRead(){
    document.querySelector(".book-container").addEventListener('click', function(e) {
        for (let i = 0; i < myLibrary.length; i++) {
            if (e.target.id === `book-read${i}`) {
                myLibrary[i].read =! myLibrary[i].read;
                document.getElementById(`book-read${i}`).textContent = `Read: ${myLibrary[i].read ? 'Yes' : 'No'}`;
            }
        }
    });
}
  
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
    
        addBookToLibrary(title, author, pages, read);
    
        // Clear the form
        event.target.reset();
    });
}

handleModalEvents()

formSubmission()

deleteBook()

toggleRead()



