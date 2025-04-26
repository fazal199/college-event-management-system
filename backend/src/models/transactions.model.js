const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  ticketprice: { type: Number, required: true },
  amount: {
    type: Number,
    required: true,
    trim: true,

  },
  razorPayPaymentId: {
    type: String,
    required: true,
    trim: true,

  },
  razorpaySignature: {
    type: String,
    required: true,
    trim: true,
  },
  razorpayOrderId: {
    type: String,
    required: true,
    trim: true,
  },
}, { timestamps: true });

const TransactionModel = mongoose.model('Transaction', TransactionSchema);
module.exports = TransactionModel;

