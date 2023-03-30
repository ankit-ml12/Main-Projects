const validator = require('validator')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'please provide name'],
      minLength: 3,
      maxLength: 50,
    },
    email: {
      type: String,
      unique: [true, 'this email allready in use'],
      required: [true, 'Please provide Email'],
      // match: [
      //   /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      //   'Please, provide valid email',
      // ],
      validate: {
        validator: validator.isEmail,
        message: 'please provide valid email',
      },
    },
    password: {
      type: String,
      required: [true, 'Please provide Password'],
      minLength: 6,
    },
    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user',
    },
  },
  { strictPopulate: true }
)

UserSchema.pre('save', async function (next) {
  //this.modifiedPaths():- give list of all element modified when we calling this methode
  //this.isModified('name'):- return true/false based on modification
  //we check for password because in case of update we update only name and call save method then it also change save password because of this salt method
  //remember when we save using findandupdateOne we are not calling this save method until and unless i am not modifing the password
  if (!this.isModified('password')) return
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
  next()
})

UserSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password)
  return isMatch
}
module.exports = mongoose.model('User', UserSchema)
