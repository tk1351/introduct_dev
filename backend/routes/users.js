const express = require('express')
const router = express.Router()
const usersRouter = require('../controllers/users')

router.get('/', usersRouter.sendRouterName)

module.exports = router
