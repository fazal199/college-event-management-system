const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  eventThumbnail: { type: String, required: true },
  location: { type: String, required: true },
  speakers: { type: String, required: true },
  date: { type: Date, required: true },
  description: { type: String, required: true },
  address: { type: String, required: true },
  capacity: { type: Number, required: true },
  ticketprice: { type: Number, required: true },
  isFree: { type: Boolean, default: false },
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  languageId: { type: mongoose.Schema.Types.ObjectId, ref: 'Language', required: true },
  organiserId: { type: mongoose.Schema.Types.ObjectId, ref: 'OrganizerInfo', required: true },
  status: { type: String, required: true }
},{timestamps: true});

const EventModel = mongoose.model('Event', EventSchema);
module.exports = EventModel;