const mongoose = require('mongoose')

mongoose.set('strictQuery', true)

const connectDB = async (url) => {
  return await mongoose
    .connect(url)
    .then(() => {
      console.log(`connected to database successfully :)`)
    })
    .catch((err) => {
      console.log(err)
    })
}

module.exports = connectDB
