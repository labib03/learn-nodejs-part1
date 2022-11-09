const http = require('http')

const requestListener = (req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.statusCode = 200;
    const { method } = req;

    if(method === 'GET'){
        res.end(`Hallo, method yang anda gunakan adalah: ${method}`)
    }

    if(method === 'POST'){
        res.end(`Hai, method yang anda gunakan adalah: ${method}`)
    }

    if(method === 'PUT'){
        res.end(`Salam, method yang anda gunakan adalah: ${method}`)
    }

    if(method === 'DELETE'){
        res.end(`Bonjour, method yang anda gunakan adalah: ${method}`)
    }

   
}

const server = http.createServer(requestListener);

const port = 5000;
const host = 'localhost';

server.listen(port, host, () => {
    console.log(`Server berjalan pada http://${host}:${port}`);
});