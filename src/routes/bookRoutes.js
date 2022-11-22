const { addBookHandler, getAllBooksHandler, getBookById, updateBookHandler, deleteBookHandler } = require('../handlers/booksHandler')

const routes = [
    {
        method: 'POST',
        path: '/books',
        handler: addBookHandler
    },
    {
        method: 'GET',
        path: '/books',
        handler: getAllBooksHandler
    },
    {
        method: 'GET',
        path: '/books/{bookId}',
        handler: getBookById
    },
    {
        method: 'PUT',
        path: '/books/{bookId}',
        handler: updateBookHandler
    },
    {
        method: 'DELETE',
        path: '/books/{bookId}',
        handler: deleteBookHandler
    }
]

module.exports = routes