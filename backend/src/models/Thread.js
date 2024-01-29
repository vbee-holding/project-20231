const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const threadSchema = new Schema({
  threadId: { type: String },
  title: { type: String },
  author: { type: String},
  content: {type: String},
  summarizedContent: {type: String},
  summarizedRepliesContent: {type: String},
  tags: { type: [String] },
  latestRepliesLength: { type: Number }
});

const Thread = mongoose.model('Thread', threadSchema);

module.exports = Thread;
