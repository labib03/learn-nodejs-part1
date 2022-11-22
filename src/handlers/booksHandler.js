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
    
    
    const isSuccess = name && year && author && summary && publisher && pageCount && readPage ? true : false;
   console.log('==>', isSuccess);

    if(isSuccess && pageCount > readPage){
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
    
        if(readPage > pageCount){
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

    if(isEmpty){
        const response = h.response({
            status: 'success',
            data: {
                books: []
            }
        }).code(200)

        return response
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

module.exports = {
    addBookHandler,
    getAllBooksHandler
}