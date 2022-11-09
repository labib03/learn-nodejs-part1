const fs = require('fs')

const readableStream = fs.createReadStream('./notes.txt', {
    highWaterMark: 21,
})

const readableListener = () => {
    try {
        const call = process.stdout.write(`[${readableStream.read()}]`)
        console.log(call);
    } catch(err) {
        console.log('error message:', err);
    }
}

readableStream.on('readable', readableListener)
readableStream.on('end', () => console.log('Done'));