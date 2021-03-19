const express = require('express')
const router = express.Router()
const usersController = require('../controllers/users')
const { check } = require('express-validator')

router.get('/', usersController.getAllUsers)
router.post(
  '/',
  [
    check('name', '名前が必要です').not().isEmpty(),
    check('email', '正しいメールアドレスを入力してください').isEmail(),
    check('password', '6文字以上のパスワードを設定してください').isLength({
      min: 6,
    }),
  ],
  usersController.registerUser
)

module.exports = router
