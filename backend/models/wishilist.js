var mongoose = require('mongoose');

var WishilistSchema = new mongoose.Schema({
  id_user: { type: String, required: true },
  id_product: { type: String, required: true },
  purchased: { type: Boolean, required: true }
});

module.exports = mongoose.model('wishilist', WishilistSchema);
