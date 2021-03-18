const express = require('express')
const app = express()
const PORT = process.env.PORT || 8080
const connectDB = require('./config/db')

// Connect DB
connectDB()

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`)
})
