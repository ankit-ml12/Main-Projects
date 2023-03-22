const User = require('../model/User')
const { StatusCodes } = require('http-status-codes')
const CustomError = require('../errors')
const { createJwt } = require('../utils')
const register = async (req, res) => {
  const { email, name, password } = req.body

  console.log(email, name, password)

  const isFirstAccount = (await User.countDocuments({})) === 0
  const role = isFirstAccount ? 'admin' : 'user'

  const user = await User.create({ name, email, password, role })
  const tokenUser = { name: user.name, userId: user._id, role: user.role }
  const token = createJwt({ payload: tokenUser })

  //tosend the cookie
  const oneDay = 1000 * 60 * 60 * 24
  res.cookie('token', token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
  })
  res.status(StatusCodes.CREATED).json({ user: tokenUser })
}
//you can see cookie in the postmen
const login = (req, res) => {
  res.send('login')
}
const logout = (req, res) => {
  res.send('logout')
}

module.exports = { register, login, logout }
