const mongoose = require('mongoose');

const CancelEventSchema = new mongoose.Schema({
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
  reason: { type: String, required: true },
  isCanceled: { type: Boolean, default: false },
  organiserId: { type: mongoose.Schema.Types.ObjectId, ref: 'OrganizerInfo', required: true }
},{timestamps: true});

const CancelEventModel = mongoose.model('CancelEvent', CancelEventSchema);
module.exports = CancelEventModel
