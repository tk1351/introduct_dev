const { MongoMemoryServer } = require('mongodb-memory-server')
const mongoose = require('mongoose')

jasmine.DEFAULT_TIMEOUT_INTERVAL = 600000

module.exports.connect = async () => {
  mongod = await new MongoMemoryServer({ binary: { version: '4.0.14' } })
  const uri = await mongod.getUri()

  await mongoose.connect(uri, { useNewUrlParser: true })
  mongoose.set('debug', true)
}

module.exports.closeDB = async () => {
  await mongoose.connection.dropDatabase()
  await mongoose.connection.close()
  await mongod.stop()
}

module.exports.clearDB = async () => {
  const collections = mongoose.connection.collections

  for (const key in collections) {
    const collection = collections[key]
    await collection.deleteMany()
  }
}
