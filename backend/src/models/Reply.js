const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const replySchema = new Schema({
  author: { type: String },
  author_title: { type: String },
  img_url: { type: String},
  content: {type: String},
  createAt: {type: Date},
});

const Reply = mongoose.model('Reply', replySchema);

module.exports = Reply;
