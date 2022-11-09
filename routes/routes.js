const routes = [
    {
        method: 'GET',
        path: '/',
        handler: (request, h) => {
            return 'Homepage'
        }
    },
    {
        method: '*',
        path: '/',
        handler: (request, h) => {
            return `Halaman tidak dapat diakses dengan method ${request.raw.req.method}`
        }
    },
    {
        method: 'GET',
        path: '/about',
        handler: (request, h) => {
            return 'About page'
        }
    },
{
    method: '*',
    path: '/about',
    handler: (request, h) => {
        return `Halaman tidak dapat diakses dengan method ${request.raw.req.method}`
    }
},
{
    method: 'GET',
    path: '/hello/{username?}',
    handler: (request, h) => {
        const { username = 'Stranger' } = request.params
        const { lang } = request.query
        // contoh query = http://localhost:5000/hello/user?lang=id

        if(lang === 'id'){
            return `Hai, ${username}`
        }

        return `Hello, ${username}.`
    }
},
{
    method: 'POST',
    path: '/login',
    handler: (request, h) => {
        const { username, password } = request.payload

        // return `Selamat datang kembali ${username}`
        
        // menggunakan hapi toolkit
        return h.response(`Selamat datang kembali ${username}`).code(200);
    }
},
{
    method: '*',
    path: '/{any*}',
    handler: (request, h) => {
        return 'Halaman tidak ditemukan'
    }
}
]

module.exports = routes