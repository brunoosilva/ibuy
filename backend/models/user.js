var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, index: { unique: true } },
  password: { type: String, required: true, select: false },
  created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('user', UserSchema);
