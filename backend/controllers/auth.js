const User = require('../models/User')

module.exports = {
  getAuthUser: async (req, res) => {
    try {
      const user = await User.findById(req.user.id).select('-password')
      return res.json(user)
    } catch (err) {
      console.error(err)
      return res.status(500).send('Server Error')
    }
  },
}
