const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const TripSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
    destination: {
      type: String,
      default: ''
    },
    startDate: {
      type: Date,
      default: Date.now
    },
    endDate: {
      type: Date,
      default: Date.now
    },
    comment: {
      type: String,
      default: ''
    }
  },
  {
    versionKey: false,
    timestamps: true
  }
)

TripSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('Trip', TripSchema)
