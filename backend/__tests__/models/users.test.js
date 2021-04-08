const mongod = require('../../mongo')
const User = require('../../models/User')

const users = [
  {
    name: 'name1',
    email: 'email1',
    password: 'password1',
    avatar: 'avatar1',
  },
  {
    name: 'name2',
    email: 'email2',
    password: 'password2',
    avatar: 'avatar2',
  },
  {
    name: 'name3',
    email: 'email3',
    password: 'password3',
    avatar: 'avatar3',
  },
]

beforeAll(async () => {
  await mongod.connect()
})

beforeEach(async () => {
  await User.deleteMany({})
  await User.collection.insertMany(users)
})

afterEach(async () => {
  await mongod.clearDB()
})

afterAll(async () => {
  await mongod.closeDB()
})

describe('User model test', () => {
  it('User model works correctly', async () => {
    const result = await User.find({})
    expect(result).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: 'name1' }),
        expect.objectContaining({ name: 'name2' }),
        expect.objectContaining({ name: 'name3' }),
      ])
    )
  })
})
