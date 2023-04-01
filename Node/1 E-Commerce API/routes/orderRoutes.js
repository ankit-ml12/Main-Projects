const express = require('express')
const route = express.Router()

const {
  authenticateUser,
  authorizePermission,
} = require('../middleware/authentication')
const {
  getAllOrders,
  getSingleOrder,
  getCurrentUserOrders,
  createOrder,
  updateOrder,
} = require('../controllers/orderController')

route.post('/', authenticateUser, createOrder)
route.get('/', authenticateUser, authorizePermission('admin'), getAllOrders)
route.get('/showallmyorders', authenticateUser, getCurrentUserOrders)
route.get('/:id', authenticateUser, getSingleOrder)
route.patch('/:id', authenticateUser, updateOrder)

module.exports = route
