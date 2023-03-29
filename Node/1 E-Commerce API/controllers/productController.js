const Product = require('../model/product')
const { StatusCodes } = require('http-status-codes')
const CustomError = require('../errors')

const createProduct = async (req, res) => {
  req.body.user = req.user.userId
  const product = await Product.create(req.body)
  res.status(StatusCodes.CREATED).json({ product })
}
const getAllProducts = async (req, res) => {
  const products = await Product.find({})
  res.status(StatusCodes.OK).json({ size: products.length, products })
}
const getSingleProduct = async (req, res) => {
  const { id: productId } = req.params
  const product = await Product.find({ _id: productId })
  if (!product.length) {
    throw new CustomError.NotFoundError(`No product with id ${productId}`)
  }
  res.status(StatusCodes.OK).json({ product })
}
const updateProduct = async (req, res) => {
  const { id: productId } = req.params
  const product = await Product.findOneAndUpdate({ _id: productId }, req.body, {
    new: true,
    runValidators: true,
  })
  if (!product) {
    throw new CustomError.NotFoundError(`No product with id ${productId}`)
  }
  res.status(StatusCodes.OK).json({ product })
}
const deleteProduct = async (req, res) => {
  const { id: productId } = req.params
  const product = await Product.findOne({ _id: productId })
  if (!product) {
    throw new CustomError.NotFoundError(`No product with id ${productId}`)
  }
  await product.remove()
  await res.status(StatusCodes.OK).json({ msg: 'success product remove' })
}
const uploadImage = async (req, res) => {
  res.send('upload image')
}

module.exports = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  uploadImage,
}
