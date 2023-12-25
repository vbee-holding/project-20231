const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const threadSchema = new Schema({
  threadId: { type: String },
  title: { type: String },
  author: { type: String},
  content: {type: String},
});

const Thread = mongoose.model('Thread', threadSchema);

module.exports = Thread;
