// terkait stream:
// Solusinya adalah dengan menggunakan teknik stream. 
// Teknik ini tidak membaca berkas secara sekaligus, 
// tapi dengan mengirim bagian demi bagian. 
// Cara inilah yang digunakan oleh YouTube 
// agar video dapat ditampilkan seketika kepada pengguna.

const fs = require('fs');

const readableStream = fs.createReadStream('./input.txt', {
    highWaterMark: 15,
})
const writeableStream = fs.createWriteStream('./output.txt')


const readableListener = () => {
    try{
        const data = readableStream.read()
        writeableStream.write(`${data}\n`)
    } catch(err){
        console.log('error message:', err);
    }
}

readableStream.on('readable', readableListener)
readableStream.on('end', () => {
    writeableStream.end('akhir dari write stream')
});