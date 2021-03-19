const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProfileSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
    },
    company: {
      type: String,
    },
    website: {
      type: String,
    },
    location: {
      type: String,
    },
    bio: {
      type: String,
      required: true,
    },
    social: {
      twitter: {
        type: String,
      },
      facebook: {
        type: String,
      },
      linkedin: {
        type: String,
      },
      instagram: {
        type: String,
      },
      youtube: {
        type: String,
      },
    },
  },
  { timestamps: true }
)

module.exports = Profile = mongoose.model('profile', ProfileSchema)
