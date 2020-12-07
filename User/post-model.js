const knex = require("knex")
const config = require("../knexfile")
const db = knex(config.development)

function find(query = {}) {
	const { page = 1, limit = 100, sortBy = "id", sortDir = "asc" } = query
	const offset = limit * (page - 1)

	return db("posts")
		.orderBy(sortBy, sortDir)
		.limit(limit)
		.offset(offset)
		.select()
}

function findById(id) {
	return db("posts")
		.where({ id })
		.first()
}

async function add(hub) {
	const [id] = await db("posts").insert(hub)
	return findById(id)
}

function remove(id) {
	return db("posts")
		.where({ id })
		.del()
}

async function update(id, changes) {
	await db("posts")
		.where({ id })
		.update(changes)

	return findById(id)
}

function findPosts(postId) {
	return db("posts as p")
		.join("posts as u", "p.post_id", "u.id")
		.where({ post_id: postId })
		.select(["p.id", "p.text", "u.name as post"])
}

function findPostById(postId, id) {
	return db("posts")
		.where({ id, post_id: postId })
		.first()
}

async function addPost(postId, post) {
	const data = { post_id: postId, ...post }
	const [id] = await db("posts").insert(data)

	return findpostPostById(postId, id)
}

module.exports = {
	find,
	findById,
	add,
	remove,
	update,
	findPosts,
	findPostById,
	addPost,
}
