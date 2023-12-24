const jsonServer = require('json-server')

const server = jsonServer.create()
const router = jsonServer.router('./src/data/db.json')
const middlewares = jsonServer.defaults()

server.use(middlewares)
server.use(router)

const PORT = 4000

server.listen(PORT, () => {
	console.log(`JSON Server is running on port ${PORT}`)
})
