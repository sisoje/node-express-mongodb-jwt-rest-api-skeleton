const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const TripSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  destination: {
    type: String,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  comment: {
    type: String,
    default: ''
  }
})

TripSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('Trip', TripSchema)
