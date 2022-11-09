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
        return `Hello, ${username}.`
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