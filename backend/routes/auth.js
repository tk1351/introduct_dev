const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth')
const auth = require('../middleware/auth')
const { check } = require('express-validator')

router.get('/', auth, authController.getAuthUser)
router.post(
  '/',
  [
    check('email', '正しいメールアドレスを入力してください').isEmail(),
    check('password', 'パスワードを入力してください').exists(),
  ],
  authController.loginUser
)

module.exports = router
