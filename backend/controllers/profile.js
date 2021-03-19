const Profile = require('../models/Profile')
const User = require('../models/User')
const { validationResult } = require('express-validator')

module.exports = {
  sendRouterName: (req, res) => {
    res.send('Profile route')
  },
  getCurrentUserProfile: async (req, res) => {
    try {
      const profile = await Profile.findOne({
        user: req.user.id,
      }).populate('user', ['name', 'avatar'])
      if (!profile) {
        return res
          .status(400)
          .json({ msg: 'ユーザーのプロフィールが存在しません' })
      }
      res.json(profile)
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server Error')
    }
  },
  createAndUpdateUserProfile: async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const {
      company,
      website,
      location,
      bio,
      twitter,
      facebook,
      linkedin,
      instagram,
      youtube,
    } = req.body

    // profileを作成する
    const profileFields = {}
    profileFields.user = req.user.id
    if (company) profileFields.company = company
    if (website) profileFields.website = website
    if (location) profileFields.location = location
    if (bio) profileFields.bio = bio

    // sns部分を作成する
    profileFields.social = {}
    if (twitter) profileFields.social.twitter = twitter
    if (facebook) profileFields.social.facebook = facebook
    if (linkedin) profileFields.social.linkedin = linkedin
    if (instagram) profileFields.social.instagram = instagram
    if (youtube) profileFields.social.youtube = youtube

    try {
      let profile = await Profile.findOne({ user: req.user.id })
      if (profile) {
        // 更新する
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        )
        return res.json(profile)
      }

      // 無ければ新たに作成する
      profile = new Profile(profileFields)
      await profile.save()
      return res.json(profile)
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server Error')
    }
  },
}
