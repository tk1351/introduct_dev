const express = require('express')
const router = express.Router()
const profileController = require('../controllers/profile')
const auth = require('../middleware/auth')
const { check } = require('express-validator')

router.get('/', profileController.getAllProfiles)
router.get('/user/:user_id', profileController.getProfileByUserId)
router.get('/me', auth, profileController.getCurrentUserProfile)
router.post(
  '/',
  [auth, [check('bio', '自己紹介が必要です').not().isEmpty()]],
  profileController.createAndUpdateUserProfile
)
router.delete('/', auth, profileController.deleteProfile)

module.exports = router
