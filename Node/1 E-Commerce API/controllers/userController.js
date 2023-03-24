const User = require('../model/User')
const { StatusCodes } = require('http-status-codes')
const CustomError = require('../errors')

const getAllUsers = async (req, res) => {
  const user = await User.find({ role: 'user' }).select('-password')
  res.status(StatusCodes.OK).json({ totaluser: user.length, user })
}
const getSingleUser = async (req, res) => {
  const { id } = req.params
  const user = await User.findOne({ _id: id }).select('-password')
  if (!user) throw new CustomError(`No user with this ${id}`)
  res.status(StatusCodes.OK).json({ user })
}
const showCurrentUser = async (req, res) => {
  res.status(StatusCodes.OK).json({ user: req.user })
}
const updateUser = async (req, res) => {
  res.send('update users')
}
const updateUserPassword = async (req, res) => {
  res.send('update password')
}

module.exports = {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
}
