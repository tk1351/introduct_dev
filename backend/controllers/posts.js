const Post = require('../models/Post')
const User = require('../models/User')
const Profile = require('../models/Profile')
const { validationResult } = require('express-validator')

module.exports = {
  getAllPosts: async (req, res) => {
    try {
      // 最新の投稿からソートする
      const posts = await Post.find().sort({ createdAt: -1 })
      res.json(posts)
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server Error')
    }
  },
  getPostById: async (req, res) => {
    try {
      const post = await Post.findById(req.params.post_id)
      if (!post) {
        return res.status(404).json({ msg: '投稿がありません' })
      }
      res.json(post)
    } catch (err) {
      console.error(err.message)
      if (err.kind === 'ObjectId') {
        return res.status(404).json({ msg: '投稿がありません' })
      }
      res.status(500).send('Server Error')
    }
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
  deletePost: async (req, res) => {
    try {
      const post = await Post.findById(req.params.post_id)
      if (!post) {
        return res.status(404).json({ msg: '投稿がありません' })
      }

      // 記事を投稿したユーザーか確認する
      if (post.user.toString() !== req.user.id) {
        return res.status(401).json({ msg: '削除する権限がありません' })
      }

      await post.remove()
      res.json({ msg: '投稿は削除されました' })
    } catch (err) {
      console.error(err.message)
      if (err.kind === 'ObjectId') {
        return res.status(404).json({ msg: '投稿がありません' })
      }
      res.status(500).send('Server Error')
    }
  },
}
