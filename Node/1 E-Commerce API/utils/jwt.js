const jwt = require('jsonwebtoken')

const createJwt = ({ payload }) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  })
  return token
}

const isTokenValid = ({ token }) => jwt.verify(token, process.env.JWT_SECRET)

const attachCookiesToResponse = ({ req, user }) => {
  const token = createJwt({ payload: user })
}

module.exports = {
  createJwt,
  isTokenValid,
}
