const Post = require('../models/Post')
const User = require('../models/User')
const Profile = require('../models/Profile')
const { validationResult } = require('express-validator')

module.exports = {
  sendRouterName: (req, res) => {
    res.send('Posts route')
  },
  createPost: async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    try {
      const user = await User.findById(req.user.id).select('-password')
      const newPost = new Post({
        title: req.body.title,
        text: req.body.text,
        image: req.body.image,
        url: req.body.url,
        user: req.user.id,
        name: user.name,
        avatar: user.avatar,
      })

      const post = await newPost.save()
      res.json(post)
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server Error')
    }
  },
}
