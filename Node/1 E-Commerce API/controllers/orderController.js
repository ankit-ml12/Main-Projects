const Order = require('../model/Order')
const Product = require('../model/product')
const { StatusCodes } = require('http-status-codes')
const CustomError = require('../errors')

const fackStripeAPI = async ({ amount, currency }) => {
  const client_secret = `some reandomValue`
  return { client_secret, amount }
}
const createOrder = async (req, res) => {
  const { items: cartItem, tax, shippingFee } = req.body
  if (!cartItem || cartItem.length < 1) {
    throw new CustomError.BadRequestError('No cart Items Provided')
  }

  if (!tax || !shippingFee) {
    throw new CustomError.BadRequestError('please provide tax and shipping fee')
  }
  let orderItems = []
  let subtotal = 0
  for (const item of cartItem) {
    const dbProduct = await Product.findOne({ _id: item.product })
    if (!dbProduct) {
      throw new CustomError.NotFoundError(`No product with id ${item.product}`)
    }
    const { name, price, image, _id } = dbProduct
    const singleOrderItem = {
      amount: item.amount,
      name,
      price,
      image,
      product: _id,
    }
    //add item to order
    orderItems = [...orderItems, singleOrderItem]
    //calculate and set total
    subtotal += item.amount * price
  }
  //calculate total
  const total = tax + shippingFee + subtotal
  //get client secret
  const paymentIntent = await fackStripeAPI({
    amount: total,
    currency: 'usd',
  })
  const order = await Order.create({
    orderItems,
    total,
    subtotal,
    tax,
    shippingFee,
    client_secret: paymentIntent.client_secret,
    user: req.user.userId,
  })
  res
    .status(StatusCodes.CREATED)
    .json({ order, client_secret: order.client_secret })
}
const getAllOrders = async (req, res) => {
  const orders = await Order.find({})
  res.status(StatusCodes.OK).json({ orders: orders.length, orders })
}
const getSingleOrder = async (req, res) => {
  const { id: orderId } = req.params
  const order = await Order.findOne({ _id: orderId })
  if (!order) {
    throw new CustomError.NotFoundError(`No order with id : ${orderId}`)
  }
  res.status(StatusCodes.OK).json({ order })
}
const getCurrentUserOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user.userId })
  res.status(StatusCodes.OK).json({ orders: orders.length, orders })
}
const updateOrder = async (req, res) => {
  const { id: orderId } = req.params
  const { paymentIntentId } = req.body

  const order = await Order.findOne({ _id: orderId })
  if (!order) {
    throw new CustomError.NotFoundError(`No order with id : ${orderId}`)
  }
  order.paymentIntentId = paymentIntentId
  order.status = 'paid'
  await order.save()
  res.status(StatusCodes.OK).json({ order })
}

module.exports = {
  getAllOrders,
  getSingleOrder,
  getCurrentUserOrders,
  createOrder,
  updateOrder,
}
