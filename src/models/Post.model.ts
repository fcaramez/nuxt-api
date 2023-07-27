import { Schema, model } from 'mongoose';

const postSchema = new Schema({
  content: {
    type: String,
    required: true,
  },
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
  likeCount: {
    type: Number,
    default: 0,
  },
  likes: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  attachments: [
    {
      type: String,
      maxlength: 4,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

export const Post = model('Post', postSchema);
