const Book = require('../models/Book');

// Get all books or search
const getBooks = async (req, res) => {
    try {
        const books = await Book.find(req.query);
        res.status(200).json(books);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Add a new book
const addBook = async (req, res) => {
    try {
        const newBook = new Book(req.body);
        const savedBook = await newBook.save();
        res.status(201).json(savedBook);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Delete a book
const deleteBook = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedBook = await Book.findByIdAndDelete(id);
        
        if (!deletedBook) {
            return res.status(404).json({ message: 'Book not found' });
        }
        
        res.status(200).json({ message: 'Book deleted successfully', deletedBook });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    getBooks,
    addBook,
    deleteBook
};
