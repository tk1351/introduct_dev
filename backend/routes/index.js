const express = require('express')
const authRouter = require('./auth')
const postRouter = require('./posts')
const profileRouter = require('./profile')
const usersRouter = require('./users')

const router = express.Router()

router.use('/auth', authRouter)
router.use('/posts', postRouter)
router.use('/profile', profileRouter)
router.use('/users', usersRouter)

module.exports = router
