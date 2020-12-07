const express = require("express")
const usersRouter = require("./User/post-router")
const welcomeRouter = require("./welcome/welcome-router")

const server = express()
const port = 4001

server.use(express.json())
server.use(usersRouter)
server.use(welcomeRouter)

server.listen(port, () => {
	console.log(`Server running at http://localhost:${port}`)
})
