const mongod = require('../../mongo')
const Profile = require('../../models/Profile')

const profiles = [
  {
    user_id: 'user1',
    company: 'company1',
    website: 'website1',
    location: 'location1',
    bio: 'bio1',
    social: {
      twitter: 'twitter1',
      facebook: 'facebook1',
      linkedin: 'linkedin1',
      instagram: 'instagram1',
      youtube: 'youtube1',
    },
  },
  {
    user_id: 'user2',
    company: 'company2',
    website: 'website2',
    location: 'location2',
    bio: 'bio2',
    social: {
      twitter: 'twitter2',
      facebook: 'facebook2',
      linkedin: 'linkedin2',
      instagram: 'instagram2',
      youtube: 'youtube2',
    },
  },
  {
    user_id: 'user3',
    company: 'company3',
    website: 'website3',
    location: 'location3',
    bio: 'bio3',
    social: {
      twitter: 'twitter3',
      facebook: 'facebook3',
      linkedin: 'linkedin3',
      instagram: 'instagram3',
      youtube: 'youtube3',
    },
  },
]

beforeAll(async () => {
  await mongod.connect()
})

beforeEach(async () => {
  await Profile.deleteMany({})
  await Profile.collection.insertMany(profiles)
})

afterEach(async () => {
  await mongod.clearDB()
})

afterAll(async () => {
  await mongod.closeDB()
})

describe('Profile model test', () => {
  it('Profile model works correctly', async () => {
    const result = await Profile.find({})
    expect(result).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ company: 'company1' }),
        expect.objectContaining({ company: 'company2' }),
        expect.objectContaining({ company: 'company3' }),
      ])
    )

    const resultByUserId = await Profile.find({ user_id: 'user1' })
    expect(resultByUserId).toEqual(
      expect.arrayContaining([expect.objectContaining({ company: 'company1' })])
    )
  })
  it('Profile model should have bio', async () => {
    const invalidProfile = {
      user_id: 'user4',
      company: 'company4',
      website: 'website4',
      location: 'location4',
      social: {
        twitter: 'twitter4',
        facebook: 'facebook4',
        linkedin: 'linkedin4',
        instagram: 'instagram4',
        youtube: 'youtube4',
      },
    }
    await expect(Profile.create(invalidProfile)).rejects.toThrow()
  })
})
