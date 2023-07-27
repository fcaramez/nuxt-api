import { Schema, model } from 'mongoose';

const commentSchema = new Schema({
  comment: {
    type: String,
    required: true,
  },
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  post: { type: Schema.Types.ObjectId, ref: 'Post' },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

export const Comment = model('Comment', commentSchema);
