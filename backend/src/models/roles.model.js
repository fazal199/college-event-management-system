const mongoose = require('mongoose');

const RoleSchema = new mongoose.Schema({
  usertype: { type: String, required: true }
});

module.exports = mongoose.model('Role', RoleSchema);