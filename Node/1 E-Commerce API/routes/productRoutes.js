const express = require('express')
const route = express.Router()
const {
  authenticateUser,
  authorizePermission,
} = require('../middleware/authentication')

const { getSingleProductReviews } = require('../controllers/reviewController')
const {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  uploadImage,
} = require('../controllers/productController')

route.post('/', authenticateUser, authorizePermission('admin'), createProduct)
route.get('/', getAllProducts)
route.post(
  '/upload',
  authenticateUser,
  authorizePermission('admin'),
  uploadImage
)
route.get('/:id', getSingleProduct)
route.patch(
  '/:id',
  authenticateUser,
  authorizePermission('admin'),
  updateProduct
)
route.delete(
  '/:id',
  authenticateUser,
  authorizePermission('admin'),
  deleteProduct
)

route.get('/:id/reviews', getSingleProductReviews)
module.exports = route
