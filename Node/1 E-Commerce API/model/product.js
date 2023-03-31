const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, 'please provide product name'],
      maxlength: [100, 'product name can not be greater then 100 character'],
    },
    price: {
      type: Number,
      required: [true, 'please provide product price'],
      default: 0,
    },
    description: {
      type: String,
      required: [true, 'please provide product description'],
      maxlength: [1000, 'Description can not be greater then 1000 character'],
    },
    image: {
      type: String,
      default: '/upload/example.jpeg',
    },
    category: {
      type: String,
      required: [true, 'please provide product category'],
      enum: ['office', 'kitchen', 'bedroom'],
    },
    company: {
      type: String,
      required: [true, 'please provide company name'],
      enum: ['ikea', 'liddy', 'marcos'],
      message: `{VALUE} is not supported`,
    },
    colors: {
      type: [String],
      default: 'black',
      required: true,
    },
    featured: {
      type: Boolean,
      required: false,
    },
    freeShipping: {
      type: Boolean,
      required: false,
    },
    inventory: {
      type: Number,
      required: true,
      default: 15,
    },
    averageRating: {
      type: Number,
      default: 0,
    },

    user: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
)

ProductSchema.virtual('reviews', {
  ref: 'Review',
  localField: '_id',
  foreignField: 'product',
  justOne: false,
  // match: {rating: 5}
})

ProductSchema.pre('remove', async function (next) {
  await this.model('Review').deleteMany({ product: this._id })
})
module.exports = mongoose.model('Product', ProductSchema)
