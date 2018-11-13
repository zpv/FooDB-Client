const express = require('express')
const next = require('next')
const { get } = require('./lib/request')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare()
    .then(() => {
        const server = express()
        
        server.get('/restaurant/:id', async (req, res) => {
            const actualPage = '/restaurant'
            const { id } = req.params
            const { data } = await get(`/restaurants/${id}`)
            const name = data.name

            const queryParams = {id, name}
            app.render(req, res, actualPage, queryParams)
        })

        server.get('*', (req, res) => {
            return handle(req, res)
        })

        server.listen(3000, (err) => {
            if (err) throw err
            console.log('> Ready on http://localhost:3000')
        })
    })
    .catch((ex) => {
        console.error(ex.stack)
        process.exit(1)
    })