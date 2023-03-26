const User = require('../model/User')
const { StatusCodes } = require('http-status-codes')
const CustomError = require('../errors')
const { attachCookiesToResponse, createTokenUser } = require('../utils')
const register = async (req, res) => {
  const { email, name, password } = req.body

  console.log(email, name, password)

  const isFirstAccount = (await User.countDocuments({})) === 0
  const role = isFirstAccount ? 'admin' : 'user'

  const user = await User.create({ name, email, password, role })
  const tokenUser = createTokenUser(user)

  attachCookiesToResponse({ res, user: tokenUser })
  res.status(StatusCodes.CREATED).json({ user: tokenUser })
}

//you can see cookie in the postmen
const login = async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    throw new CustomError.CustomAPIError('Email or Password is Missing')
  }
  const user = await User.findOne({ email })
  if (!user) {
    throw new CustomError.UnauthenticatedError('Invalid credential')
  }
  const isPasswordCorrect = await user.comparePassword(password)
  if (!isPasswordCorrect) {
    throw new CustomError.UnauthenticatedError('Invalid credential')
  }
  const tokenUser = createTokenUser(user)

  attachCookiesToResponse({ res, user: tokenUser })
  res.status(StatusCodes.CREATED).json({ user: tokenUser })
}
const logout = (req, res) => {
  res.cookie('token', 'logout', {
    httpOnly: true,
    expires: new Date(Date.now()),
  })
  res.status(StatusCodes.OK).json({ msg: 'user loggout out!' })
}

module.exports = { register, login, logout }
