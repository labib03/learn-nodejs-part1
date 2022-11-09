const http = require('http')

const requestListener = (req, res) => {
    res.setHeader('Content-Type', 'text/html');
    const { method, url } = req;
    
    if(url === '/'){
        switch (method) {
            case 'GET':
                res.statusCode = 200;
                res.end('<h1>Ini adalah halaman <b>Homepage</b></h1>.')
                break;
        
            default:
                res.statusCode = 400;
                res.end(`<h1>Halaman tidak dapat diakses dengan method ${method}</h1>`)
                break;
        }

    } else if (url === '/about') {
        if (method === 'GET') {
            res.statusCode = 200;
          res.end('<h1>Halo! Ini adalah halaman about</h1>')
        } else if (method === 'POST') {
          let body = [];
  
          req.on('data', (chunk) => {
            body.push(chunk);
          });
  
          req.on('end', () => {
            body = Buffer.concat(body).toString();
            const {name} = JSON.parse(body);
            res.statusCode = 200;
            res.end(`<h1>Halo, ${name}! Ini adalah halaman about</h1>`);
          });
        } else {
          res.statusCode = 400;
          res.end(`<h1>Halaman tidak dapat diakses menggunakan ${method} request</h1>`);
        }
    
    } else {
        res.statusCode = 404;
        res.end('<h1>Halaman tidak ditemukan</h1>')
    }
 

   
}

const server = http.createServer(requestListener);

const port = 5000;
const host = 'localhost';

server.listen(port, host, () => {
    console.log(`Server berjalan pada http://${host}:${port}`);
});