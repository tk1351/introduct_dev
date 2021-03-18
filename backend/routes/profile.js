const express = require('express')
const router = express.Router()
const profileRouter = require('../controllers/profile')

router.get('/', profileRouter.sendRouterName)

module.exports = router
