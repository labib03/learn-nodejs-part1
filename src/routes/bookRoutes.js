const { addBookHandler } = require('../handlers/booksHandler')

const routes = [
    {
        method: 'POST',
        path: '/books',
        handler: addBookHandler
    }
]

module.exports = routes