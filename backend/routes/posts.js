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
router.post(
  '/comment/:post_id',
  [auth, [check('text', '本文が必要です').not().isEmpty()]],
  postsController.createComment
)
router.put('/like/:post_id', auth, postsController.likePost)
router.delete('/:post_id', auth, postsController.deletePost)
router.delete(
  '/comment/:post_id/:comment_id',
  auth,
  postsController.deleteComment
)

module.exports = router
