const { addBookHandler, getAllBooksHandler, getBookById } = require('../handlers/booksHandler')

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
    }
]

module.exports = routes