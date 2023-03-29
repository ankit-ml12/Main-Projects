const Review = require('../model/Review')
const Product = require('../model/product')
const User = require('../model/User')
const { StatusCodes } = require('http-status-codes')
const CustomError = require('../errors')
const { createTokenUser, attachCookiesToResponse } = require('../utils')

const createReview = async (req, res) => {
  const { product: productId } = req.body
  const isValidProduct = await Product.findOne({ _id: productId })
  if (!isValidProduct) {
    throw new CustomError.NotFoundError(`No product with id : ${productId}`)
  }

  const alreadySubmitted = await Review.findOne({
    product: productId,
    user: req.user.userId,
  })

  if (alreadySubmitted) {
    throw new CustomError.BadRequestError(
      'Already submitted review for this product'
    )
  }
  req.body.user = req.user.userId
  const review = await Review.create(req.body)
  res.status(StatusCodes.CREATED).json({ review })
}
const getAllReviews = async (req, res) => {
  res.send('get all Review')
}
const getSingleReview = async (req, res) => {
  res.send('getsingle Review')
}
const updateReview = async (req, res) => {
  res.send('update Review')
}
const deleteReview = async (req, res) => {
  res.send('delete Review')
}

module.exports = {
  createReview,
  getAllReviews,
  getSingleReview,
  updateReview,
  deleteReview,
}
