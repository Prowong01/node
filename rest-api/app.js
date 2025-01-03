const express = require('express')
const app = express();

// Middleware
app.use(express.json());

let books = [
    {
        id: '1',
        title: 'Book 1',
    },
    {
        id: '2',
        title: 'Book 2',
    },
    {
        id: '3',
        title: 'Book 3',
    }
]

app.get('/', (req,res) => {
    res.json({
        message: 'Welcome to our bookstore api!',
    });
});

// GET all books
app.get('/get', (req,res) => {
    res.json(books);
})

// GET single book
app.get('/get/:id', (req,res)=> {
    const bookId = req.params.id;
    const book = books.find(item => item.id === bookId);

    if (!book) {
        return res.status(404).json({
            message: 'Book not found'
        });
    }

    res.status(200).json(book)
})

// ADD a book
app.post('/add', (req,res)=> {
    const newBook = {
        id: books.length + 1,
        title: 'New Book',
    }

    books.push(newBook);
    res.status(201).json({
        data: newBook,
        message: 'Book added successfully'
    })
})

const PORT = 3000;
app.listen(PORT, ()=> {
    console.log(`Listening on port ${PORT}`);
})

// update a book
app.put('/update/:id', (req,res)=> {
    const bookId = req.params.id;
    const updatedBook = req.body;

    const bookIndex = books.findIndex(item => item.id === bookId);

    if (bookIndex === -1) {
        return res.status(404).json({
            message: 'Book not found'
        });
    }

    books[bookIndex] = {...books[bookIndex],...updatedBook};
    res.status(200).json({
        data: books[bookIndex],
        message: 'Book updated successfully'
    })
})

// delete a book
app.delete('/delete/:id', (req,res)=> {
    const bookId = req.params.id;

    const bookIndex = books.findIndex(item => item.id === bookId);

    if (bookIndex === -1) {
        return res.status(404).json({
            message: 'Book not found'
        });
    }

    books.splice(bookIndex, 1);
    res.status(200).json({
        message: 'Book deleted successfully'
    })
})
