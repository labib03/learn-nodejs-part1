const fs = require('fs');

const writeableStream = fs.createWriteStream('./output.txt');

// Lalu untuk menuliskan data pada writable stream, gunakan method write().
writeableStream.write('Ini merupakan teks baris pertama!\n');
writeableStream.write('Ini merupakan teks baris kedua!\n');
writeableStream.write('Ini merupakan teks baris ketiga!\n');
writeableStream.end();
// Method end() digunakan untuk menandakan akhir dari writable stream sekaligus bisa digunakan sebagai penulisan writeable terakhir.
// writeableStream.end('Akhir dari writeable stream');