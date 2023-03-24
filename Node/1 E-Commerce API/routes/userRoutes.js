const express = require('express')
const route = express.Router()
const {
  authenticateUser,
  authorizePermission,
} = require('../middleware/authentication')
const {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
} = require('../controllers/userController')

// route.get('/').get(authenticateUser, getAllUsers)
route.get('/', authenticateUser, authorizePermission('admin'), getAllUsers)
route.get('/showMe', authenticateUser, showCurrentUser)
route.get('/updateUser', updateUser)
route.get('/updateUserPassword', updateUserPassword)
route.get('/:id', authenticateUser, getSingleUser)
// route.get('/:id').get(authenticateUser, getSingleUser)

module.exports = route
