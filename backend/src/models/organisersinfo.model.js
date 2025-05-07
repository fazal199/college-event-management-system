const mongoose = require('mongoose');

const OrganizerInfoSchema = new mongoose.Schema({
  organisername: { type: String, required: true, trim: true },
  phoneno: { type: String, required: true },
  upiId: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  activityStatus: { type: String, default: "pending" },
  //allowed, not-allowed, rejected, pending
  walletbalance : {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

const OrganizerInfomationModel = mongoose.model('OrganizerInformation', OrganizerInfoSchema);
module.exports = OrganizerInfomationModel
