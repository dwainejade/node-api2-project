const express = require("express")
const posts = require("./post-model")

const router = express.Router()

router.get("/posts", (req, res) => {
    console.log(req.query)
    posts.find()
        .then((posts) => {
            res.status(200).json(posts)
        })
        .catch((error) => {
            console.log(error)
            res.status(500).json({
                message: "Error retrieving the posts",
            })
        })
})

router.post("/posts", (req, res) => {
    if (!req.body.title || !req.body.contents) {
        return res.status(400).json({
            errorMessage: "Please provide title and contents for the post."
        })
    }

    posts.add(req.body)
        .then((post) => {
            res.status(201).json(post)
        })
        .catch((error) => {
            console.log(error)
            res.status(500).json({
                message: "Error adding the post",
            })
        })
})



// router.get("/posts/:id", (req, res) => {
//     users.findById(req.params.id)
//         .then((user) => {
//             if (user) {
//                 res.status(200).json(user)
//             } else {
//                 res.status(404).json({
//                     message: "User not found",
//                 })
//             }
//         })
//         .catch((error) => {
//             console.log(error)
//             res.status(500).json({
//                 message: "Error retrieving the user",
//             })
//         })
// })



// router.put("/users/:id", (req, res) => {
//     if (!req.body.name || !req.body.email) {
//         return res.status(400).json({
//             message: "Missing user name or email",
//         })
//     }

//     users.update(req.params.id, req.body)
//         .then((user) => {
//             if (user) {
//                 res.status(200).json(user)
//             } else {
//                 res.status(404).json({
//                     message: "The user could not be found",
//                 })
//             }
//         })
//         .catch((error) => {
//             console.log(error)
//             res.status(500).json({
//                 message: "Error updating the user",
//             })
//         })
// })

// router.delete("/users/:id", (req, res) => {
//     users.remove(req.params.id)
//         .then((count) => {
//             if (count > 0) {
//                 res.status(200).json({
//                     message: "The user has been nuked",
//                 })
//             } else {
//                 res.status(404).json({
//                     message: "The user could not be found",
//                 })
//             }
//         })
//         .catch((error) => {
//             console.log(error)
//             res.status(500).json({
//                 message: "Error removing the user",
//             })
//         })
// })

// // create endpoint that returns all the posts for a user
// router.get("/users/:id/posts", (req, res) => {
//     users.findUserPosts(req.params.id)
//         .then((posts) => {
//             res.json(posts)
//         })
//         .catch((error) => {
//             console.log(error)
//             res.status(500).json({
//                 message: "Could not get users posts"
//             })
//         })
// })



// // create endpoint that returns a single post for a user
// router.get("/users/:userId/posts/:postId", (req, res) => {
//     users.findUserPostById(req.params.userId, req.params.postId)
//         .then((post) => {
//             if (post) {
//                 res.json(post)
//             } else {
//                 res.status(404).json({
//                     message: "Post not found bucko"
//                 })
//             }
//         })
//         .catch((error) => {
//             console.log(error)
//             res.status(500).json({
//                 message: "Could not get user post"
//             })
//         })
// })


// // create endpoint for adding a new post for a user
// router.post("/users/:userId/posts", (req, res) => {
//     if (!req.body.text) {
//         return res.status(400).json({
//             message: "Need a text in the body fam",
//         })
//     }

//     users.addUserPost(req.params.id, { text: req.body.text })
//         .then((post) => {
//             res.status(201).json(post)
//         })
//         .catch((err) => {
//             console.log(err)
//             res.status(500).json({
//                 message: "Something ain't right. We didn't add the post.",
//             })
//         })
// })

module.exports = router