const User = require('../model/User')
const { StatusCodes } = require('http-status-codes')
const CustomError = require('../errors')
const { createTokenUser, attachCookiesToResponse } = require('../utils')

const getAllUsers = async (req, res) => {
  const user = await User.find({ role: 'user' }).select('-password')
  res.status(StatusCodes.OK).json({ totaluser: user.length, user })
}
const getSingleUser = async (req, res) => {
  const { userId } = req.user
  const user = await User.findOne({ _id: userId }).select('-password')
  if (!user) throw new CustomError(`No user with this ${id}`)
  res.status(StatusCodes.OK).json({ user })
}
const showCurrentUser = async (req, res) => {
  res.status(StatusCodes.OK).json({ user: req.user })
}
const updateUser = async (req, res) => {
  const { email, name } = req.body
  if (!email || !name) {
    throw new CustomError.BadRequestError('Plese provide all values')
  }
  const user = await User.findOneAndUpdate(
    { _id: req.user.userId },
    { email, name },
    { new: true, runValidators: true }
  )
  const tokenUser = createTokenUser(user)
  attachCookiesToResponse({ res, user: tokenUser })
  res.status(StatusCodes.OK).json({ user: tokenUser })
}
const updateUserPassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body
  if (!oldPassword || !newPassword) {
    throw new CustomError.BadRequestError('Plese provide both values')
  }
  const user = await User.findOne({ _id: req.user.userId })
  //not needed because we allready check for token
  // if (!user) {
  //   throw new CustomError.UnauthenticatedError('Invalid credential')
  // }
  const isPasswordCorrect = await user.comparePassword(oldPassword)
  if (!isPasswordCorrect) {
    throw new CustomError.UnauthenticatedError('Invalid credential')
  }
  user.password = newPassword
  await user.save()
  // console.log(user)
  res.status(StatusCodes.OK).json({ msg: 'your password updated sucessfully' })
}

module.exports = {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
}
