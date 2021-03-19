const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth')
const auth = require('../middleware/auth')

router.get('/', auth, authController.getAuthUser)

module.exports = router
