const express = require("express")
const usersRouter = require("./User/post-router")
const welcomeRouter = require("./welcome/welcome-router")

const server = express()
const port = 4001

server.use(express.json())
server.use(usersRouter)
server.use(welcomeRouter)
server.use(function (req, res) {
	res.status(404).send("Ain't nobody got time for that!");
});

server.listen(port, () => {
	console.log(`Server running at http://localhost:${port}`)
})
