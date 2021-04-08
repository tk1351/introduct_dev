const mongod = require('../../mongo')
const Post = require('../../models/Post')

const posts = [
  {
    user_id: 'user1',
    name: 'name1',
    avatar: 'avatar1',
    title: 'title1',
    text: 'text1',
    imageUrl: 'imageUrl1',
    url: 'url1',
    likes: [],
    comments: [],
  },
  {
    user_id: 'user2',
    name: 'name2',
    avatar: 'avatar2',
    title: 'title2',
    text: 'text2',
    imageUrl: 'imageUrl2',
    url: 'url2',
    likes: [{ user: 'user1' }],
    comments: [],
  },
  {
    user_id: 'user3',
    name: 'name3',
    avatar: 'avatar3',
    title: 'title3',
    text: 'text3',
    imageUrl: 'imageUrl3',
    url: 'url3',
    likes: [],
    comments: [
      {
        user: 'user2',
        text: 'text2',
        name: 'name2',
        avatar: 'avatar2',
        date: '2021-03-19T03:00:32.381Z',
      },
    ],
  },
]

beforeAll(async () => {
  await mongod.connect()
})

beforeEach(async () => {
  await Post.deleteMany({})
  await Post.collection.insertMany(posts)
})

afterEach(async () => {
  await mongod.clearDB()
})

afterAll(async () => {
  await mongod.closeDB()
})

describe('Post model test', () => {
  it('Post model works correctly', async () => {
    const result = await Post.find({})
    expect(result).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: 'name1' }),
        expect.objectContaining({ name: 'name2' }),
        expect.objectContaining({ name: 'name3' }),
      ])
    )

    const resultByUserId = await Post.find({ user_id: 'user3' })
    expect(resultByUserId).toEqual(
      expect.arrayContaining([expect.objectContaining({ title: 'title3' })])
    )
  })
  it('Post model should have title and text', async () => {
    const postWithoutTitle = {
      user_id: 'user4',
      name: 'name4',
      avatar: 'avatar4',
      text: 'text4',
      imageUrl: 'imageUrl4',
      url: 'url4',
      likes: [],
      comments: [],
    }
    await expect(Post.create(postWithoutTitle)).rejects.toThrow()

    const postWithoutText = {
      user_id: 'user5',
      name: 'name5',
      avatar: 'avatar5',
      title: 'title5',
      imageUrl: 'imageUrl5',
      url: 'url5',
      likes: [],
      comments: [],
    }
    await expect(Post.create(postWithoutText)).rejects.toThrow()
  })
})
