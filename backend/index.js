const express = require('express')
const app = express()
const PORT = process.env.PORT || 8080
const connectDB = require('./config/db')

// Connect DB
connectDB()

app.get('/', (req, res) => {
  res.send('Hello World!')
})

// Define Routes
const router = require('./routes')
app.use('/api/v1', router)

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`)
})
