const createProduct = async (req, res) => {
  res.send('create Product')
}
const getAllProducts = async (req, res) => {
  res.send('get all Product')
}
const getSingleProduct = async (req, res) => {
  res.send('get single Product')
}
const updateProduct = async (req, res) => {
  res.send('update Product')
}
const deleteProduct = async (req, res) => {
  res.send('delete Product')
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