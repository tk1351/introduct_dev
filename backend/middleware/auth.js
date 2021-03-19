const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = (req, res, next) => {
  // headerからtokenを取得
  const token = req.header('x-auth-token')

  // tokenの有無を確認
  if (!token)
    return res.status(401).json({ msg: 'Tokenが無いため認証が拒否されました' })

  // tokenを確かめる
  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'))
    req.user = decoded.user
    next()
  } catch (err) {
    res.status(401).json({ msg: 'Tokenが正しくありません' })
  }
}
