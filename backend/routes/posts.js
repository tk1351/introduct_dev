const express = require('express')
const router = express.Router()
const postsController = require('../controllers/posts')
const auth = require('../middleware/auth')
const { check } = require('express-validator')

router.get('/', postsController.sendRouterName)
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

module.exports = router
