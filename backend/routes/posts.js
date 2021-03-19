const express = require('express')
const router = express.Router()
const postsController = require('../controllers/posts')
const auth = require('../middleware/auth')
const { check } = require('express-validator')

router.get('/', auth, postsController.getAllPosts)
router.get('/:post_id', auth, postsController.getPostById)
router.post(
  '/',
  [
    auth,
    [
      check('title', 'タイトルが必要です').not().isEmpty(),
      check('text', '本文が必要です').not().isEmpty(),
    ],
  ],
  postsController.createPost
)
router.delete('/:post_id', auth, postsController.deletePost)

module.exports = router
