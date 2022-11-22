const { nanoid } = require('nanoid');
const books = require('../data/books');

const addBookHandler = (request, h) => {
    const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;
    const id = nanoid(16);
    
    const finished = pageCount === readPage ? true : false;
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;
    
    const newBook = {
        id,
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        finished,
        reading,
        insertedAt,
        updatedAt,
    }
    
    const posibleReadPage = readPage || readPage === 0
    const imposible = pageCount === 0 ? true : readPage > pageCount ? true : false;
    const isSuccess = name && year && author && summary && publisher && pageCount && posibleReadPage  ? true : false;


    if(isSuccess && !imposible){
        books.push(newBook)

        const response = h.response({
            status: 'success',
            message: 'Buku berhasil ditambahkan',
            data: {
                bookId: id,
            }
        })

        response.code(201);
        return response;
    } else {
        if(!name){
            const response = h.response({
                status: 'fail',
                message: 'Gagal menambahkan buku. Mohon isi nama buku'
            })
    
            response.code(400);
    
            return response;
        }
    
        if(imposible){
            const response = h.response({
                status: 'fail',
                message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount'
            })
    
            response.code(400);
            return response;
        }

        const response = h.response({
            status: 'error',
            message: 'Buku gagal ditambahkan'
        }).code(500)
    
        return response
    }
}

const getAllBooksHandler = (request, h) => {
    const isEmpty = books.length === 0 ? true : false;
    const params = request.query;

    if(isEmpty){
        const response = h.response({
            status: 'success',
            data: {
                books: []
            }
        }).code(200)

        return response
    }

    if(params){
        const isReading = params?.reading === 0 ? false : true;
        const isFinished = params?.finished > 0 ? true : false;


        if(params?.reading){
            const filteredBooks = books.filter(book => book.reading === isReading)
            const newBooksCollection = filteredBooks.map(book =>({
                id: book.id, 
                name: book.name, 
                publisher: book.publisher
            }));
            const response = h.response({
                status: 'success',
                data: {
                    books: newBooksCollection
                } 
            }).code(200)
        
            return response
        }

        if(params?.finished >= 0){
            const filteredBooks = books.filter(book => book.finished === isFinished)
            const newBooksCollection = filteredBooks.map(book =>({
                id: book.id, 
                name: book.name, 
                publisher: book.publisher
            }));
            const response = h.response({
                status: 'success',
                data: {
                    books: newBooksCollection
                } 
            }).code(200)
        
            return response
        }

        if(params?.name){
            const filteredBooks = books.filter(book => book.name.toLowerCase().includes(params?.name?.toLowerCase()))
            const newBooksCollection = filteredBooks.map(book =>({
                id: book.id, 
                name: book.name, 
                publisher: book.publisher
            }));
            const response = h.response({
                status: 'success',
                data: {
                    books: newBooksCollection
                } 
            }).code(200)
        
            return response
        }
    }

    const newBooksCollection = books.map(book => {
        return {
            id: book.id, 
            name: book.name, 
            publisher: book.publisher
        }
    })

    const response = h.response({
        status: 'success',
        data: {
            books: newBooksCollection
        }
    }).code(200)

    return response
}

const getBookById = (request, h) => {
    const { bookId } = request.params

    const findBook = books.find(book => book.id === bookId)

    if(!findBook){
        const response = h.response({
            status: 'fail',
            message: 'Buku tidak ditemukan'
        }).code(404)

        return response
    }

    const response = h.response({
        status: 'success',
        data: {
            book: findBook
        }
    }).code(200)

    return response
}

const updateBookHandler = (request, h) => {
    const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;
    const { bookId } = request.params;

    let bookIndex = books.findIndex(book => book.id === bookId);
   
    if(!name){
        const response = h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. Mohon isi nama buku'
        }).code(400);

        return response
    }

    if(readPage > pageCount){
        const response = h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount'
        }).code(400);

        return response
    }

    if(bookIndex < 0){
        const response = h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. Id tidak ditemukan'
        }).code(404)

        return response
    }

    const updatedAt = new Date().toISOString();
    books[bookIndex] = {
        ...books[bookIndex],
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        reading,
        updatedAt
    }

    const response = h.response({
        status: 'success',
        message: 'Buku berhasil diperbarui'
    }).code(200)

    return response

}

const deleteBookHandler = (request, h) => {
    const { bookId } = request.params;

    const bookIndex = books.findIndex(book => book.id === bookId);

    if(bookIndex < 0){
        const response = h.response({
            status: 'fail',
            message: 'Buku gagal dihapus. Id tidak ditemukan'
        }).code(404)

        return response
    }

    books.splice(bookIndex, 1)

    const response = h.response({
        status: 'success',
        message: 'Buku berhasil dihapus'
    }).code(200)

    return response
}

module.exports = {
    addBookHandler,
    getAllBooksHandler,
    getBookById,
    updateBookHandler,
    deleteBookHandler,
}