// Hardcoded data

// const Post = require("../models/Post")

// const post1 = {
//     id: 1,
//     title: "Post 1 Title",
//     body: "Contents of Post 1 goes here"
// }

// const post2 = {
//     id: 2,
//     title: "Post 2 Title",
//     body: "Contents of Post 2 goes here"
// }

// const post3 = {
//     id: 3,
//     title: "Post 3 Title",
//     body: "Contents of Post 3 goes here"
// }
// 
// const allPosts = [post1, post2, post3]

module.exports = {
    posts: async function(req, res) {
        try {
            const posts = await Post.find()
            res.send(posts)
        } catch (err) {
            res.serverError(err.toString())
        }

        // Post.find().exec(function(err, posts) {
        //     if (err) {
        //         return res.serverError(err.toString())
        //     }
        //     res.send(posts)
        // })
    },
    // posts: function(req, res) {
    //     // res.send('We are hitting the /posts endpoint')
    //     // res.send(post1)
    //     // res.send([post1, post2])
    //     res.send(allPosts)
    // },

    create: function(req, res) {
        const title = req.body.title
        const postBody = req.body.postBody

        // Use Postman to send POST request
        sails.log.debug("Title: " + title)
        sails.log.debug("Body: " + postBody)

        Post.create({ title: title, body: postBody }).exec(function(err) {
            if (err) {
                return res.serverError(err.toString())
            }
            console.log("Finished creating post object")
            return res.end()
        })
        // const newPosts = {
        //     id: 4,
        //     title: title,
        //     body: postBody
        // }
        // allPosts.push(newPosts)
        // res.end()
    },

    // create: function(req, res) {
    //     const title = req.param('title')
    //     const body = req.param('body')

    //     console.log(title + " " + body)
    //     sails.log.debug(title + " " + body) // debug, warn etc.

        // const newPosts = {
        //     id: 4,
        //     title: title,
        //     body: body
        // }
        // allPosts.push(newPosts)
        // res.end()
    // },

    // create: function(req, res) {
    //     const newPosts = {
    //         id: 4,
    //         title: "Post 4 Title",
    //         body: "Contents of Post 4 goes here"
    //     }
    //     allPosts.push(newPosts)
    //     res.end()
    // },

    findById: function(req, res) {
        const postId = req.param("postId")
        const filteredPosts = allPosts.filter(p => { return p.id == postId })

        // const filteredPosts = allPosts.filter(function(p) {
        //     return p.id == postId
        // })

        if (filteredPosts.length > 0) {
            res.send(filteredPosts[0])
        } else {
            res.send('Failed to find post with id: ' + postId)
        }
    },

    // findById: function(req, res) {
    //     const postId = req.param("postId")
    //     res.send(postId)
    // }

    delete: async function(req, res) {
        const postId = req.param('postId')
        
        await Post.destroy({ id: postId })

        res.send('Finished deleting post...')
    }
}