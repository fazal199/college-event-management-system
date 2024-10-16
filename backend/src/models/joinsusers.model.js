const mongoose = require('mongoose');

const JoinUsersSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true }
},{timestamps: true});

const JoinUsersModel = mongoose.model('JoinUser', JoinUsersSchema);
module.exports = JoinUsersModel;
