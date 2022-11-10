const { nanoid } = require('nanoid')
const notes = require('./notes')

const addNoteHandler = (request, h) => {
    const { title, tags, body } = request.payload
    const id = nanoid(16);
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const newNote = {
        title, tags, body, id, createdAt, updatedAt
    }

    notes.push(newNote)

    const isSuccess = notes.filter(note => note.id === id).length > 0;

    if(isSuccess){
        const response = h.response({
            status: 'success',
            message: 'Catatan berhasil ditambahkan',
            data: {
                noteId: id,
            },
        }).code(201);

        return response
    }

    const response = h.response({
        status: 'fail',
        message: 'Catatan gagal ditambahkan'
    }).code(500);

    return response
};

const getAllNotesHandler = () => ({
    status: 'success',
    data: {
        notes,
    }
})

const getNoteByIdHandler = (request, h) => {
    const { id } = request.params;

    const note = notes.find(item => item.id === id);

    if(note !== undefined) {
        return {
            status: 'succes',
            data: {
                note,
            }
        }
    }

    const response = h.response({
        status: 'fail',
        message: 'Catatan tidak ditemukan'
    });
    response.code(404);
    return response
}

const editByIdHandler = (request, h) => {
    const { id } = request.params
    const { body, tags, title } = request.payload

    const updatedAt = new Date().toISOString();
    const indexNote = notes.findIndex((note) => note.id === id)

    if (indexNote !== -1) {
        notes[indexNote] = {
            ...notes[indexNote],
            title,
            tags,
            body,
            updatedAt
        }

        const response = h.response({
            status: 'success',
            message: 'Catatan berhasil diperbaharui'
        })

        response.code(200)
        return response
    }

    const response = h.response({
        status: 'fail',
        message: 'Gagal memperbaharui catatan. ID tidak ditemukan'
    })

    response.code(404)
    return response

}    

module.exports = { addNoteHandler, getAllNotesHandler, getNoteByIdHandler, editByIdHandler };