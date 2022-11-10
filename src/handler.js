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
    console.log('===>', id)

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

module.exports = { addNoteHandler, getAllNotesHandler, getNoteByIdHandler };