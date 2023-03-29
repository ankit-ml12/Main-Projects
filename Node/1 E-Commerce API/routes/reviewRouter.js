const express = require('express')
const {
  createReview,
  getAllReviews,
  getSingleReview,
  updateReview,
  deleteReview,
} = require('../controllers/reviewController')

const {
  authenticateUser,
  authorizePermission,
} = require('../middleware/authentication')
const route = express.Router()

route.post('/', authenticateUser, createReview)
route.get('/', getAllReviews)
route.get('/:id', getSingleReview)
route.patch('/:id', authenticateUser, updateReview)
route.delete('/:id', authenticateUser, deleteReview)

module.exports = route
