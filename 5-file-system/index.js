const fs = require('fs')

//  Async
const fileReadAsync = (error, data) => {
    if(error){
        console.log('Gagal Membaca Berkas');
        return;
    }

    console.log(data);
}

fs.readFile('./notes.txt', 'utf-8', fileReadAsync)

// Sync
const data = fs.readFileSync('./notes.txt', 'utf-8')
console.log(data);