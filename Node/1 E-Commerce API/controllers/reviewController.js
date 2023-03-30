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
  console.log(req.body)
  const review = await Review.create(req.body)
  res.status(StatusCodes.CREATED).json({ review })
}
const getAllReviews = async (req, res) => {
  const review = await Review.find({})
    .populate({
      path: 'product',
      select: 'name company price',
    })
    .populate({
      path: 'User',
      select: 'name',
      // strictPopulate: false,
    })
  res.status(StatusCodes.OK).json({ coutnt: review.length, review })
}
const getSingleReview = async (req, res) => {
  const { id: reviewId } = req.params
  const review = await Review.findOne({ _id: reviewId })

  if (!review) {
    throw new CustomError.NotFoundError(`No review with id ${reviewId}`)
  }
  res.status(StatusCodes.OK).json({ review })
}
const updateReview = async (req, res) => {
  const { id: reviewId } = req.params
  const { rating, title, comment } = req.body
  const review = await Review.findOne({ _id: reviewId })

  if (!review) {
    throw new CustomError.NotFoundError(`No review with id ${reviewId}`)
  }
  review.rating = rating
  review.title = title
  review.comment = comment
  await review.save()
  //check permission letter
  res.status(StatusCodes.OK).json({ review })
}
const deleteReview = async (req, res) => {
  const { id: reviewId } = req.params
  const review = await Review.findOne({ _id: reviewId })

  if (!review) {
    throw new CustomError.NotFoundError(`No review with id ${reviewId}`)
  }
  //add permission here
  await review.remove()
  res.status(StatusCodes.OK).json({ msg: 'Success! Review removed' })
}

module.exports = {
  createReview,
  getAllReviews,
  getSingleReview,
  updateReview,
  deleteReview,
}
