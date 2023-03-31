const mongoose = require('mongoose')

const ReviewSchema = new mongoose.Schema(
  {
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: [true, 'please provide rating'],
    },
    title: {
      type: String,
      trim: true,
      required: [true, 'please provide title'],
      maxLength: 100,
    },
    comment: {
      type: String,
      trim: true,
      required: [true, 'please provide review text'],
    },
    numOfReviews: {
      type: Number,
      default: 0,
    },
    product: {
      type: mongoose.Schema.ObjectId,
      ref: 'Product',
      required: true,
    },

    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
)

ReviewSchema.index({ product: 1, user: 1 }, { unique: true })
ReviewSchema.post('save', async function () {
  console.log('post save hook called')
})
ReviewSchema.post('remove', async function () {
  console.log('post remove hook called')
})
module.exports = mongoose.model('Review', ReviewSchema)
