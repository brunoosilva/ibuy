var mongoose = require('mongoose');

var ProductsSchema = new mongoose.Schema({
  name: { type: String, required: true },
  alias: { type: String, required: true, index: { unique: true } },
  description: { type: String, required: true },
  photo: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('products', ProductsSchema);
