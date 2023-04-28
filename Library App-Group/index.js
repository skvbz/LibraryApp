const addBtn = document.getElementById('addBtn');
const addForm = document.querySelector('.add');
const closeBtn = document.querySelector('.close');
const submitBtn = document.querySelector('.submit');
const formAdd = document.getElementById('form-add');
const authorInput = document.getElementById('author');
const titleInput = document.getElementById('title');
const priceInput = document.getElementById('price');
const bookContain = document.getElementById('book');

// Toggle Modals Add & Close
addBtn.addEventListener('click', () => {
	addForm.classList.add('showModal');
});

closeBtn.addEventListener('click', () => {
	addForm.classList.remove('showModal');
});

// Close on submit button
submitBtn.addEventListener('click', () => {
	addForm.classList.remove('showModal');
});

// Retrieve books array from the local storage or initialize it as an empty array
let books = JSON.parse(localStorage.getItem('books')) || [];

// Add books to newBook array && update the local storage with the array
function addBooks(author, title, price) {
	// create an object for newbooks
	const newBook = {
		author,
		title,
		price,
	};

	// push the object newBook into books array
	books.push(newBook);

	// call function createbookElement
	createBookElement(newBook);

	// update the local storage with new books array
	/* the setItem takes two argument
    1:  books which is a key
    2: books that was converted to a json strings
  */

	localStorage.setItem('books', JSON.stringify(books));
}

// functio to create Books element so it can be displayed to the UI
// createBookElement takes three parameters
function createBookElement(newBook, index) {
	const bookDiv = document.createElement('div');
	const bookImage = document.createElement('div');
	const bookInfo = document.createElement('div');
	const bookTitle = document.createElement('h2');
	const bookAuthor = document.createElement('h2');
	const bookPrice = document.createElement('h3');
	const deleteBtn = document.createElement('button');

	// add innerText to the created element using the parameters
	bookTitle.textContent = newBook.title;
	bookAuthor.textContent = newBook.author;
	bookPrice.textContent = `$ ${newBook.price}`;
	deleteBtn.textContent = 'Delete';

	// add event listener to the delete button
	deleteBtn.addEventListener('click', () => {
		// remove books frome the array
		books.splice(index, 1);
		// removes Book div from the UI
		bookDiv.remove();
		// update the local storage
		localStorage.setItem('books', JSON.stringify(books));
	});

	// bookTitle.classList.add('authorSTyle') NEXT
	bookContain.classList.add('bookContain')
	bookDiv.classList.add('bookDiv')
	bookImage.classList.add('bookImage')
	bookInfo.classList.add('bookInfo')
	deleteBtn.classList.add('deleteBtn')
	bookTitle.classList.add('bookTitle')
	bookPrice.classList.add('bookPrice')
	bookAuthor.classList.add('bookAuthor')
	

	// append the book div to the container
	bookContain.appendChild(bookDiv);
	bookDiv.append(bookImage, bookInfo)
	bookInfo.append(bookTitle, bookAuthor, bookPrice, deleteBtn)
}

// function to loop through through books array and display to the UI
function loadBooks() {
	books.forEach((book, index) => {
		createBookElement(book, index);
	});
}

// function to handle submission of forms and listen for events

function handleFormSubmit(event) {
	// prevents default form submission
	event.preventDefault();
	// collect the information for the input when submit is clicked
	addBooks(authorInput.value, titleInput.value, priceInput.value);
	// clears the input form after value has been collected
	formAdd.reset();
}

// listen for event listener
submitBtn.addEventListener('click', handleFormSubmit);

// call loadbook function to load the books to the page
loadBooks();

// Search Function
const search = document.getElementById('search');

// declares a function to search for books
function searchBooks() {
	// create a variable and assign it to a input value collected and set all to lower case
	const searchTerm = search.value.toLowerCase();

	// create a variable and assign it to books array which is filtered

	/* the filter method creates a new array and accepts a callback function
     - the callback function checks if the author or title property are contained
    in the searchTerm passed
     - if the searchTerm is found in either of the property then it is added to the array
  */
	const filteredBooks = books.filter(
		(book) =>
			book.author.toLowerCase().includes(searchTerm) ||
			book.title.toLowerCase().includes(searchTerm)
	);

	// Clear the book list
	bookContain.innerHTML = '';

	// Loop through the filterBooks array and display the search word if found
	filteredBooks.forEach(createBookElement);
}

// listen the event input, and is fired when something in inputed into the search input
search.addEventListener('input', searchBooks);
