const express = require('express')
const app = express()
const PORT = process.env.PORT || 8080
const connectDB = require('./config/db')

// Connect DB
connectDB()

// Middleware初期化
app.use(express.json({ extended: false }))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

// Routeの定義
const router = require('./routes')
app.use('/api/v1', router)

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`)
})
